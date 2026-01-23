# CDEK Clone - Order & Payment System

Система для создания заказов и приема оплаты с интеграцией Telegram бота и Supabase.

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр сборки
npm run preview
```

### Переменные окружения

Создайте файл `.env.local`:

```env
VITE_SUPABASE_URL=https://stkmdszqjwmuerskbvuj.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📦 Деплой на Vercel

### Автоматический деплой

1. Подключите репозиторий к Vercel
2. Укажите Root Directory: `cdek-express---order-and-payment`
3. Framework Preset: Vite
4. Добавьте переменные окружения в Vercel Dashboard

### Ручной деплой

```bash
npm install -g vercel
vercel --prod
```

## 🔧 Структура проекта

```
cdek-express---order-and-payment/
├── api/                    # Vercel API функции
│   └── send-to-telegram.ts # Отправка в Telegram канал
├── components/             # React компоненты
├── src/                    # Исходники
├── dist/                   # Сборка (генерируется)
├── App.tsx                 # Главный компонент
├── index.tsx               # Точка входа
├── vercel.json             # Конфигурация Vercel
└── package.json            # Зависимости
```

## 🤖 Telegram Integration

- **Bot Token**: `7963734070:AAG5i2NL52UDanuqC7kRFNdZMXfapQG1c3E`
- **Channel ID**: `-1003631337137`
- **Функции**: Автоматическая отправка уведомлений об оплате

## 🗄️ База данных

Supabase PostgreSQL:
- Таблица `orders` - заказы с информацией о продавце
- Таблица `bot_settings` - настройки бота

SQL скрипты находятся в `../sdek/baza.sql`

## 📱 Функциональность

✅ Создание заказов через Telegram бота  
✅ Веб-интерфейс для оплаты  
✅ Автоматическая отправка скриншотов в Telegram канал  
✅ Динамические цены доставки  
✅ Отслеживание заказов  
✅ Интеграция с Supabase  

## 🛠️ Технологии

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📚 Документация

- [DEPLOY.md](./DEPLOY.md) - Подробная инструкция по деплою
- [POST-DEPLOY-TEST.md](./POST-DEPLOY-TEST.md) - Тестирование после деплоя

## 🔗 Ссылки

- **Production**: https://sdeck.vercel.app/
- **Telegram Bot**: @irlaiwork_bot
- **Supabase**: https://stkmdszqjwmuerskbvuj.supabase.co

## 📄 Лицензия

Private project