# 🔧 Быстрые исправления для деплоя

## ✅ Исправлено: Node.js Version

**Проблема**: `Found invalid or discontinued Node.js Version: "18.x"`

**Решение**: Обновлен `package.json` на Node.js 20.x

```json
"engines": {
  "node": "20.x"
}
```

## ✅ Готово к деплою

Проект полностью настроен для Vercel:

### Конфигурация
- ✅ Node.js 20.x
- ✅ Vite framework
- ✅ TypeScript настроен
- ✅ API функции готовы
- ✅ Переменные окружения документированы

### Файлы
- ✅ `vercel.json` - конфигурация Vercel
- ✅ `.vercelignore` - игнорируемые файлы
- ✅ `package.json` - зависимости и версия Node.js
- ✅ `api/send-to-telegram.ts` - API endpoint

### Проверка перед деплоем

```bash
# Убедитесь, что сборка проходит
npm run build

# Проверьте типы
npm run type-check
```

## 🚀 Деплой

После коммита изменений Vercel автоматически задеплоит проект.

### Что проверить после деплоя:

1. **Сайт работает**: https://sdeck.vercel.app/
2. **API доступен**: https://sdeck.vercel.app/api/send-to-telegram
3. **Telegram интеграция**: Создайте тестовый заказ

## 📋 Настройки Vercel Dashboard

Убедитесь, что в Vercel Dashboard указано:

```
Root Directory: cdek-express---order-and-payment
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

### Environment Variables

```
VITE_SUPABASE_URL=https://stkmdszqjwmuerskbvuj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0a21kc3pxandtdWVyc2tidnVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMzc4NTcsImV4cCI6MjA4NDcxMzg1N30.0opRkdf6MDT8apjvACEACSEioOBS2uaLejgLy34uY3Q
```

## ✨ Готово!

Проект готов к деплою на Vercel. Следующий коммит автоматически запустит деплой.