-- Чат поддержки: треды и сообщения, Realtime, RLS
-- Выполнить в Supabase SQL Editor.
-- В Dashboard включите Anonymous sign-in: Authentication -> Providers -> Email -> Enable Anonymous sign-in (или отдельная вкладка Anonymous).

-- Тред = один клиент (один анонимный пользователь)
CREATE TABLE IF NOT EXISTS support_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_uid uuid NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Сообщения в треде
CREATE TABLE IF NOT EXISTS support_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES support_threads(id) ON DELETE CASCADE,
  sender_type text NOT NULL CHECK (sender_type IN ('client', 'support')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_support_messages_thread_id ON support_messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_support_messages_created_at ON support_messages(created_at);

-- Обновлять updated_at треда при новом сообщении (для сортировки тредов)
CREATE OR REPLACE FUNCTION support_thread_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE support_threads SET updated_at = now() WHERE id = NEW.thread_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS support_messages_updated_at ON support_messages;
CREATE TRIGGER support_messages_updated_at
  AFTER INSERT ON support_messages
  FOR EACH ROW EXECUTE PROCEDURE support_thread_updated_at();

-- RLS
ALTER TABLE support_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "support_threads_select_own" ON support_threads;
DROP POLICY IF EXISTS "support_threads_insert_own" ON support_threads;
DROP POLICY IF EXISTS "support_messages_select_own" ON support_messages;
DROP POLICY IF EXISTS "support_messages_insert_client" ON support_messages;

CREATE POLICY "support_threads_select_own"
  ON support_threads FOR SELECT
  USING (client_uid = auth.uid());

CREATE POLICY "support_threads_insert_own"
  ON support_threads FOR INSERT
  WITH CHECK (client_uid = auth.uid());

CREATE POLICY "support_messages_select_own"
  ON support_messages FOR SELECT
  USING (
    thread_id IN (SELECT id FROM support_threads WHERE client_uid = auth.uid())
  );

CREATE POLICY "support_messages_insert_client"
  ON support_messages FOR INSERT
  WITH CHECK (
    sender_type = 'client'
    AND thread_id IN (SELECT id FROM support_threads WHERE client_uid = auth.uid())
  );

-- Realtime (если ошибка — включите таблицу support_messages в Dashboard -> Database -> Replication)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND tablename = 'support_messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE support_messages;
  END IF;
END $$;

COMMENT ON TABLE support_threads IS 'Один тред на клиента (client_uid = auth.uid() при анонимном входе)';
COMMENT ON TABLE support_messages IS 'Сообщения чата поддержки; support = ответ из Telegram-бота админа';
