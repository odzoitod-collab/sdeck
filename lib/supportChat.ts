import { createClient, RealtimeChannel, User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export interface SupportThread {
  id: string;
  client_uid: string;
  created_at: string;
  updated_at: string;
}

export interface SupportMessage {
  id: string;
  thread_id: string;
  sender_type: 'client' | 'support';
  content: string;
  created_at: string;
}

function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Не настроен Supabase (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).');
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

/** Анонимный вход для стабильного client_uid (один тред на браузер). */
export async function ensureAnonymousAuth(): Promise<User> {
  const supabase = getSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) return user;
  const { data: { user: newUser }, error } = await supabase.auth.signInAnonymously();
  if (error) {
    if (error.message?.includes('422') || error.message?.toLowerCase().includes('anonymous')) {
      throw new Error('Включите анонимный вход в Supabase: Authentication → Providers → Anonymous.');
    }
    throw new Error('Ошибка входа в чат: ' + error.message);
  }
  if (!newUser) throw new Error('Не удалось создать сессию чата');
  return newUser;
}

/** Получить или создать тред для текущего пользователя. */
export async function getOrCreateThread(): Promise<SupportThread> {
  const user = await ensureAnonymousAuth();
  const supabase = getSupabase();
  const { data: existing } = await supabase
    .from('support_threads')
    .select('*')
    .eq('client_uid', user.id)
    .single();
  if (existing) return existing as SupportThread;
  const { data: created, error } = await supabase
    .from('support_threads')
    .insert({ client_uid: user.id })
    .select()
    .single();
  if (error) throw new Error('Ошибка создания чата: ' + error.message);
  return created as SupportThread;
}

/** Загрузить историю сообщений треда. */
export async function fetchMessages(threadId: string): Promise<SupportMessage[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('support_messages')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });
  if (error) throw new Error('Ошибка загрузки сообщений: ' + error.message);
  return (data ?? []) as SupportMessage[];
}

/** Отправить сообщение от клиента. */
export async function sendClientMessage(threadId: string, content: string): Promise<SupportMessage> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('support_messages')
    .insert({ thread_id: threadId, sender_type: 'client', content })
    .select()
    .single();
  if (error) throw new Error('Ошибка отправки: ' + error.message);
  return data as SupportMessage;
}

/** Подписаться на новые сообщения в треде (Realtime). При ошибке (например 422) возвращает null — можно использовать polling. */
export function subscribeMessages(
  threadId: string,
  onMessage: (msg: SupportMessage) => void
): RealtimeChannel | null {
  const supabase = getSupabase();
  try {
    const channel = supabase
      .channel(`support:${threadId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'support_messages',
          filter: `thread_id=eq.${threadId}`,
        },
        (payload) => {
          onMessage(payload.new as SupportMessage);
        }
      )
      .subscribe((status, err) => {
        if (status === 'CHANNEL_ERROR' && err) {
          console.warn('Support chat Realtime error (используется polling):', err);
        }
      });
    return channel;
  } catch {
    return null;
  }
}

export function unsubscribe(channel: RealtimeChannel | null) {
  if (!channel) return;
  const supabase = getSupabase();
  supabase.removeChannel(channel);
}
