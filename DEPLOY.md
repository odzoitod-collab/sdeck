# 🚀 Инструкция по деплою на Vercel

## Шаг 1: Подготовка репозитория

1. Загрузите код на GitHub
2. Убедитесь, что все файлы находятся в папке `cdek-express---order-and-payment`

## Шаг 2: Настройка Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Подключите ваш GitHub аккаунт
3. Нажмите "New Project"
4. Выберите ваш репозиторий
5. **Важно**: В настройках проекта укажите:
   - **Root Directory**: `cdek-express---order-and-payment`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## Шаг 3: Переменные окружения

В настройках проекта Vercel добавьте переменные:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Шаг 4: Обновление Telegram бота

После деплоя обновите URL в файле `sdek/main.py`:

```python
WEB_APP_URL = "https://your-app-name.vercel.app"
```

## Шаг 5: Настройка Supabase

1. Выполните SQL из `../sdek/baza.sql` в Supabase SQL Editor
2. Создайте Storage bucket "product-images"
3. Настройте RLS политики если нужно

## 🔧 Локальная проверка

Перед деплоем проверьте локально:

```bash
npm install
npm run build
npm run preview
```

## 📱 Тестирование

После деплоя протестируйте:

1. Откройте сайт
2. Введите тестовый номер заказа: `CDEK-8883043358`
3. Проверьте форму оплаты
4. Убедитесь, что Telegram бот генерирует правильные ссылки

## 🛠️ Troubleshooting

### Ошибка сборки
- Проверьте, что все зависимости установлены
- Убедитесь, что TypeScript типы корректны

### Ошибки Supabase
- Проверьте переменные окружения
- Убедитесь, что anon key правильный

### Проблемы с изображениями
- Проверьте, что bucket "product-images" создан
- Настройте публичный доступ к bucket