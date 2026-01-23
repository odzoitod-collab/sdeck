# CDEK Express - Order and Payment System

Система заказов и оплаты с интеграцией Telegram бота и Supabase.

## 🚀 Деплой на Vercel

### 1. Подготовка

1. Форкните репозиторий или загрузите код на GitHub
2. Убедитесь, что у вас настроен Supabase проект
3. Подготовьте переменные окружения

### 2. Переменные окружения

В Vercel Dashboard добавьте следующие переменные:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key (опционально)
```

### 3. Настройка Supabase

Выполните SQL из файла `../sdek/baza.sql` в Supabase SQL Editor

### 4. Деплой

1. Подключите GitHub репозиторий к Vercel
2. Выберите папку `cdek-express---order-and-payment` как root directory
3. Добавьте переменные окружения
4. Нажмите Deploy

## 🔧 Локальная разработка

```bash
npm install
npm run dev
```

## 📱 Telegram Bot

Обновите URL в боте (`sdek/main.py`):

```python
WEB_APP_URL = "https://your-vercel-app.vercel.app"
```