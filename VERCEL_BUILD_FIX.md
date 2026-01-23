# Исправление проблемы зависания сборки на Vercel

## Что было исправлено:

### 1. index.html (КРИТИЧНО!)
- **Удален `<script type="importmap">`** - это конфликтовало с Vite и вызывало зависание
- Удалена ссылка на несуществующий `/index.css`

### 2. vite.config.ts
- Исправлен импорт `path` на ESM-совместимый вариант с `fileURLToPath`
- Добавлены оптимизации: `target: 'es2020'`, `optimizeDeps`
- Добавлена обработка circular dependencies

### 3. App.tsx
- Заменен динамический импорт `@supabase/supabase-js` на статический

### 4. AiAssistant.tsx
- Заменен `process.env.API_KEY` на `import.meta.env.VITE_GEMINI_API_KEY`
- Добавлен динамический импорт `@google/genai`

### 5. package.json
- **Изменен скрипт сборки: убрана TypeScript проверка** (теперь просто `vite build`)
- Добавлен отдельный скрипт `build:check` для локальной проверки типов

### 6. tsconfig.json
- Понижен target с ES2022 до ES2020 для совместимости
- Добавлен `incremental: true` для ускорения

### 7. vercel.json
- Добавлен `NODE_OPTIONS: "--max-old-space-size=4096"` для увеличения памяти

### 8. .npmrc (новый файл)
- Отключены ненужные проверки для ускорения установки

## Следующие шаги:

1. Закоммитьте все изменения:
```bash
git add .
git commit -m "fix: remove importmap and optimize Vite build"
git push
```

2. Vercel автоматически запустит новую сборку

3. Сборка должна завершиться за ~1-2 минуты

## Проверка локально:

```bash
# Быстрая сборка (без проверки типов)
npm run build

# Полная сборка с проверкой типов
npm run build:check
```

## Если проблема сохраняется:

Проверьте в настройках Vercel:
- Node.js версия должна быть 20.x
- Build Command: `npm run build`
- Output Directory: `dist`
