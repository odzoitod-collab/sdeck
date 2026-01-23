# 📋 Обзор проекта CDEK Clone

## 🎯 Описание

Полнофункциональная система для создания заказов и приема оплаты с интеграцией Telegram бота, веб-интерфейса и автоматической отправкой уведомлений.

## 🏗️ Архитектура

```
┌─────────────────┐
│  Telegram Bot   │ ← Создание заказов
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│    Supabase     │ ← База данных + Storage
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Web App       │ ← Оплата заказов
│   (Vercel)      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ Telegram Channel│ ← Уведомления об оплате
└─────────────────┘
```

## 🔧 Технологический стек

### Frontend
- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Vite** - Сборщик
- **Tailwind CSS** - Стилизация

### Backend
- **Vercel Serverless Functions** - API endpoints
- **Supabase** - База данных (PostgreSQL)
- **Supabase Storage** - Хранение изображений

### Integration
- **Telegram Bot API** - Бот для создания заказов
- **Telegram Channel** - Уведомления об оплате

## 📊 Основные функции

### 1. Telegram Bot (@irlaiwork_bot)

**Для пользователей:**
- ➕ Создание товаров (5 шагов)
- 📦 Просмотр своих товаров
- 💳 Просмотр реквизитов
- 🆘 Техподдержка

**Для администраторов:**
- ✏️ Изменение контакта техподдержки
- ✏️ Изменение реквизитов
- 💳 Настройка карты
- 📱 Настройка СБП

### 2. Web Interface (https://sdeck.vercel.app/)

**Главная страница:**
- 🔍 Поиск заказа по номеру
- 📊 Информация о системе

**Страница заказа:**
- 📦 Информация о товаре
- 📝 Форма данных получателя
- 💳 Оплата (карта или СБП)
- 📸 Загрузка скриншота оплаты

**Отслеживание:**
- 📍 Статус заказа
- 📅 История изменений
- 🚚 Этапы доставки

### 3. API Endpoints

**POST /api/send-to-telegram**
- Отправка скриншота оплаты в Telegram канал
- Автоматическое формирование сообщения
- Интеграция с Supabase

## 🗄️ База данных

### Таблица: orders

```sql
- id (UUID) - Уникальный идентификатор
- order_number (TEXT) - Номер заказа (CDEK-XXXXXXXXXX)
- seller_tg_id (BIGINT) - Telegram ID продавца
- seller_username (TEXT) - Никнейм продавца
- title (TEXT) - Название товара
- description (TEXT) - Описание товара
- price (NUMERIC) - Цена товара
- shipping_price (NUMERIC) - Стоимость доставки
- image_url (TEXT) - URL изображения
- status (TEXT) - Статус (pending/paid/shipped/delivered)
- created_at (TIMESTAMPTZ) - Дата создания
```

### Таблица: bot_settings

```sql
- key (TEXT) - Ключ настройки
- value (TEXT) - Значение настройки
```

**Настройки:**
- `support_username` - Контакт техподдержки
- `payment_details` - Общие реквизиты
- `card_number` - Номер карты
- `card_holder` - Держатель карты
- `bank_name` - Название банка
- `sbp_phone` - Номер телефона СБП
- `sbp_name` - Имя получателя СБП

### Storage: product-images

Хранение фотографий товаров с публичным доступом.

## 🔄 Процесс работы

### 1. Создание заказа

```
Пользователь → Telegram Bot
  ↓
Заполнение 5 шагов:
  1. Название товара
  2. Описание
  3. Цена товара
  4. Стоимость доставки
  5. Фото товара
  ↓
Сохранение в Supabase
  ↓
Генерация ссылки для оплаты
```

### 2. Оплата заказа

```
Покупатель → Открывает ссылку
  ↓
Заполняет данные получателя
  ↓
Переходит к оплате
  ↓
Выбирает способ (карта/СБП)
  ↓
Загружает скриншот оплаты
  ↓
Подтверждает оплату
```

### 3. Уведомление

```
Web App → API /send-to-telegram
  ↓
Получение данных из Supabase
  ↓
Формирование сообщения
  ↓
Отправка в Telegram канал
  ↓
Обновление статуса заказа
```

## 🔐 Безопасность

- ✅ Переменные окружения для чувствительных данных
- ✅ CORS настроен для API endpoints
- ✅ Валидация данных на клиенте и сервере
- ✅ Supabase RLS политики (опционально)
- ✅ Проверка размера и типа файлов

## 📈 Масштабирование

### Текущая конфигурация
- Vercel Hobby Plan (бесплатно)
- Supabase Free Tier
- Telegram Bot API (бесплатно)

### Возможности расширения
- Добавление платежных систем (Stripe, PayPal)
- Интеграция с реальным API СДЭК
- Добавление уведомлений по email
- Расширенная аналитика
- Мультиязычность

## 🚀 Деплой

### Production
- **URL**: https://sdeck.vercel.app/
- **Platform**: Vercel
- **Node.js**: 20.x
- **Auto-deploy**: Включен (при push в main)

### Environment Variables
```
VITE_SUPABASE_URL=https://stkmdszqjwmuerskbvuj.supabase.co
VITE_SUPABASE_ANON_KEY=***
```

## 📞 Контакты

- **Telegram Bot**: @irlaiwork_bot
- **Telegram Channel**: -1003631337137
- **Production URL**: https://sdeck.vercel.app/
- **Supabase Project**: stkmdszqjwmuerskbvuj

## 📚 Документация

- [README.md](./README.md) - Основная документация
- [DEPLOY.md](./DEPLOY.md) - Инструкции по деплою
- [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Настройка Vercel
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Чеклист деплоя
- [AFTER_DEPLOY.md](./AFTER_DEPLOY.md) - Действия после деплоя
- [CHANGES_SUMMARY.md](./CHANGES_SUMMARY.md) - Сводка изменений

## 🎯 Статус проекта

✅ **ГОТОВ К ПРОДАКШЕНУ**

Все компоненты протестированы и готовы к использованию.