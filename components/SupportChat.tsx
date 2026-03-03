import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ensureAnonymousAuth,
  getOrCreateThread,
  fetchMessages,
  sendClientMessage,
  subscribeMessages,
  unsubscribe,
  type SupportThread,
  type SupportMessage,
} from '../lib/supportChat';

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [thread, setThread] = useState<SupportThread | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<ReturnType<typeof subscribeMessages> | null>(null);

  const loadThreadAndMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await ensureAnonymousAuth();
      const t = await getOrCreateThread();
      setThread(t);
      const list = await fetchMessages(t.id);
      setMessages(list);
      if (channelRef.current) {
        unsubscribe(channelRef.current);
        channelRef.current = null;
      }
      const ch = subscribeMessages(t.id, (msg) => {
        setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
      });
      channelRef.current = ch;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка загрузки чата');
    } finally {
      setLoading(false);
    }
  }, []);

  // Polling: только когда чат открыт; раз в 8 сек (меньше запросов в консоль)
  useEffect(() => {
    if (!open || !thread) return;
    const interval = setInterval(async () => {
      try {
        const list = await fetchMessages(thread.id);
        setMessages((prev) => {
          if (list.length === prev.length && list.every((m, i) => prev[i]?.id === m.id)) return prev;
          return list;
        });
      } catch {
        // ignore
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [open, thread]);

  useEffect(() => {
    if (open && !thread) loadThreadAndMessages();
  }, [open, thread, loadThreadAndMessages]);

  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    return () => {
      if (channelRef.current) {
        unsubscribe(channelRef.current);
        channelRef.current = null;
      }
    };
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !thread || sending) return;
    setSending(true);
    setInput('');
    try {
      const msg = await sendClientMessage(thread.id, text);
      setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка отправки');
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Кнопка чата внизу справа */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-4 xl:right-6 z-[100] w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-[#8DC63F] hover:bg-[#72a930] text-white shadow-lg shadow-[#8DC63F]/30 flex items-center justify-center transition-all active:scale-95 touch-manipulation"
        aria-label="Открыть чат с поддержкой"
      >
        <svg className="w-5 h-5 xl:w-6 xl:h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      </button>

      {/* Полноэкранный чат */}
      {open && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-white animate-fadeIn">
          {/* Шапка */}
          <div className="flex items-center justify-between shrink-0 h-14 px-4 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8DC63F] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <div>
                <h2 className="text-[14px] font-bold text-[#1C2024] leading-none">Поддержка СДЭК</h2>
                <p className="text-[11px] text-gray-400 mt-0.5">Ответим в течение нескольких минут</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition touch-manipulation"
              aria-label="Закрыть чат"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Контент */}
          <div className="flex-1 flex flex-col min-h-0">
            {error && (
              <div className="shrink-0 px-4 py-2 bg-red-50 text-red-700 text-sm flex items-center justify-between">
                <span>{error}</span>
                <button type="button" onClick={() => setError(null)} className="underline">Скрыть</button>
              </div>
            )}
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#8DC63F]/30 border-t-[#8DC63F] rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <div
                  ref={listRef}
                  className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3"
                >
                  {messages.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-8">
                      Напишите сообщение — мы ответим в этом чате.
                    </p>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender_type === 'client' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.sender_type === 'client'
                            ? 'bg-[#8DC63F] text-white rounded-br-md'
                            : 'bg-gray-100 text-gray-900 rounded-bl-md'
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                        <p className={`text-[10px] mt-1 ${msg.sender_type === 'client' ? 'text-white/80' : 'text-gray-400'}`}>
                          {new Date(msg.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Поле ввода */}
                <div className="shrink-0 p-3 border-t border-gray-200 bg-gray-50">
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Сообщение..."
                      className="flex-1 min-h-[48px] px-4 rounded-xl border border-gray-200 bg-white focus:border-[#8DC63F] focus:ring-2 focus:ring-[#8DC63F]/20 outline-none text-base placeholder:text-gray-400"
                      disabled={sending || loading}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || sending || loading}
                      className="shrink-0 w-12 h-12 rounded-xl bg-[#8DC63F] text-white flex items-center justify-center hover:bg-[#72a930] disabled:opacity-50 disabled:cursor-not-allowed transition touch-manipulation"
                      aria-label="Отправить"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 2 9 18z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
