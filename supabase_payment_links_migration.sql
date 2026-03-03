-- Таблица фиксированных ссылок на оплату (YooMoney) по сумме
CREATE TABLE IF NOT EXISTS payment_links (
    price INT PRIMARY KEY,
    url TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Вставляем дефолтные ссылки (все 5 фиксированных цен)
INSERT INTO payment_links (price, url) VALUES
    (2700, 'https://yoomoney.ru/quickpay/shop-widget?account=4100118814015407&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=СБП&default-sum=2700&button-text=01&fio=on&mail=on&successURL=;'),
    (3600, 'https://yoomoney.ru/quickpay/shop-widget?account=4100118814015407&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=СБП&default-sum=3600&button-text=01&fio=on&mail=on&successURL='),
    (5800, 'https://yoomoney.ru/quickpay/shop-widget?account=4100118814015407&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=СБП&default-sum=5800&button-text=01&fio=on&mail=on&successURL=;'),
    (7100, 'https://yoomoney.ru/quickpay/shop-widget?account=4100118814015407&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=СБП&default-sum=7100&button-text=01&fio=on&mail=on&successURL=;'),
    (11300, 'https://yoomoney.ru/quickpay/shop-widget?account=4100118814015407&quickpay=shop&payment-type-choice=on&mobile-payment-type-choice=on&writer=seller&targets=СБП&default-sum=11300&button-text=01&fio=on&mail=on&successURL=;')
ON CONFLICT (price) DO NOTHING;

-- Добавляем поле payment_link_url в orders для быстрого доступа
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_link_url TEXT;
