# ✅ Чеклист перед деплоем на Vercel

## Локальная проверка

- [ ] `npm install` выполнен успешно
- [ ] `npm run build` проходит без ошибок
- [ ] `npm run type-check` не показывает ошибок
- [ ] `npm run preview` работает корректно
- [ ] Все переменные окружения в `.env.local`

## Файлы проекта

- [x] `package.json` - зависимости и скрипты
- [x] `vercel.json` - конфигурация Vercel
- [x] `tsconfig.json` - конфигурация TypeScript
- [x] `.gitignore` - игнорируемые файлы
- [x] `.vercelignore` - файлы для игнорирования при деплое
- [x] `api/send-to-telegram.ts` - API функция
- [x] `api/tsconfig.json` - конфигурация для API

## Настройки Vercel Dashboard

### Project Settings

- [ ] **Root Directory**: `cdek-express---order-and-payment`
- [ ] **Framework Preset**: Vite
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`
- [ ] **Install Command**: `npm install`
- [ ] **Node.js Version**: 20.x (автоматически)

### Environment Variables

- [ ] `VITE_SUPABASE_URL` добавлен
- [ ] `VITE_SUPABASE_ANON_KEY` добавлен
- [ ] Переменные добавлены для всех окружений (Production, Preview, Development)

## База данных Supabase

- [ ] Таблица `orders` создана
- [ ] Поле `seller_username` добавлено
- [ ] Таблица `bot_settings` создана
- [ ] Storage bucket `product-images` создан
- [ ] RLS политики настроены (если нужно)

## Telegram Bot

- [ ] Bot Token: `7963734070:AAG5i2NL52UDanuqC7kRFNdZMXfapQG1c3E`
- [ ] Channel ID: `-1003631337137`
- [ ] Бот добавлен в канал как администратор
- [ ] WEB_APP_URL обновлен на `https://sdeck.vercel.app/`

## После деплоя

- [ ] Главная страница загружается
- [ ] API endpoint `/api/send-to-telegram` доступен
- [ ] Создание заказа через бота работает
- [ ] Оплата на сайте работает
- [ ] Скриншоты отправляются в Telegram канал
- [ ] Отслеживание заказов работает

## Команды для проверки

```bash
# Локальная проверка
npm install
npm run type-check
npm run build
npm run preview

# Очистка перед деплоем
rm -rf dist node_modules .vercel
npm install
npm run build

# Ручной деплой (если нужно)
vercel --prod
```

## Возможные проблемы

### Сборка не проходит
1. Проверьте логи в Vercel Dashboard
2. Запустите `npm run build` локально
3. Проверьте все зависимости в package.json

### API не работает
1. Проверьте логи функций в Vercel
2. Убедитесь, что `@vercel/node` и `form-data` установлены
3. Проверьте переменные окружения

### Telegram не получает сообщения
1. Проверьте права бота в канале
2. Убедитесь, что Channel ID правильный
3. Проверьте Bot Token

## Готово к деплою! 🚀

Если все пункты отмечены, проект готов к деплою на Vercel.