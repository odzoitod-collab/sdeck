# Настройка Vercel для деплоя

## Шаг 1: Настройки проекта в Vercel Dashboard

### Build & Development Settings

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Development Command: npm run dev
```

### Root Directory

```
Root Directory: cdek-express---order-and-payment
```

**ВАЖНО**: Если у вас многокорневой репозиторий (несколько папок), обязательно укажите `cdek-express---order-and-payment` как Root Directory!

## Шаг 2: Environment Variables

Добавьте в Vercel Dashboard → Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://stkmdszqjwmuerskbvuj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0a21kc3pxandtdWVyc2tidnVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMzc4NTcsImV4cCI6MjA4NDcxMzg1N30.0opRkdf6MDT8apjvACEACSEioOBS2uaLejgLy34uY3Q
```

Для всех окружений: Production, Preview, Development

## Шаг 3: Node.js Version

Vercel автоматически использует Node.js 20.x (указано в package.json)

## Шаг 4: Проверка деплоя

После деплоя проверьте:

1. **Главная страница**: https://your-app.vercel.app/
2. **API endpoint**: https://your-app.vercel.app/api/send-to-telegram
3. **Статические файлы**: Должны загружаться корректно

## Возможные проблемы

### Ошибка: "No Output Directory named 'dist' found"

**Решение**: Убедитесь, что:
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `cdek-express---order-and-payment`

### Ошибка: "Module not found"

**Решение**: 
- Проверьте, что все зависимости в package.json
- Запустите `npm install` локально
- Проверьте, что сборка проходит локально: `npm run build`

### API функции не работают

**Решение**:
- Проверьте, что папка `api/` находится в корне проекта
- Убедитесь, что `@vercel/node` установлен
- Проверьте логи функций в Vercel Dashboard

### TypeScript ошибки

**Решение**:
- Запустите `npm run type-check` локально
- Исправьте все ошибки типов
- Убедитесь, что tsconfig.json правильно настроен

## Команды для отладки

```bash
# Проверка типов
npm run type-check

# Локальная сборка
npm run build

# Предпросмотр сборки
npm run preview

# Очистка и пересборка
rm -rf dist node_modules
npm install
npm run build
```

## Логи деплоя

Если деплой не удался, проверьте логи в Vercel Dashboard:
1. Откройте проект
2. Перейдите в Deployments
3. Кликните на неудачный деплой
4. Изучите логи сборки

## Контакты

При проблемах с деплоем проверьте:
- Логи в Vercel Dashboard
- GitHub Actions (если настроены)
- Локальную сборку проекта