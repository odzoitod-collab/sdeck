-- Необязательная миграция: несколько фото к товару.
-- В веб-карточке товара фото можно листать (карусель).
-- Выполнить в Supabase SQL Editor если нужна поддержка image_urls.

ALTER TABLE orders
ADD COLUMN IF NOT EXISTS image_urls jsonb DEFAULT '[]';

COMMENT ON COLUMN orders.image_urls IS 'Массив URL фото товара (для карусели). Если пусто, используется image_url.';
