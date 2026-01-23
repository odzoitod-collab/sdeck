#!/usr/bin/env python3
"""
Скрипт для обновления URL в Telegram боте после деплоя
"""

import sys
import os

def update_bot_url(new_url):
    """Обновляет URL в файле main.py бота"""
    bot_file_path = "../sdek/main.py"
    
    if not os.path.exists(bot_file_path):
        print(f"❌ Файл {bot_file_path} не найден")
        return False
    
    try:
        # Читаем файл
        with open(bot_file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Ищем и заменяем URL
        lines = content.split('\n')
        updated = False
        
        for i, line in enumerate(lines):
            if line.startswith('WEB_APP_URL = '):
                old_url = line.split('=')[1].strip().strip('"')
                lines[i] = f'WEB_APP_URL = "{new_url}"'
                updated = True
                print(f"✅ URL обновлен:")
                print(f"   Старый: {old_url}")
                print(f"   Новый:  {new_url}")
                break
        
        if not updated:
            print("❌ Строка WEB_APP_URL не найдена в файле")
            return False
        
        # Записываем обратно
        with open(bot_file_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        
        print(f"📝 Файл {bot_file_path} обновлен")
        return True
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Использование: python update-bot-url.py <new_url>")
        print("Пример: python update-bot-url.py https://my-app.vercel.app")
        sys.exit(1)
    
    new_url = sys.argv[1].rstrip('/')  # Убираем слэш в конце
    
    if not new_url.startswith('http'):
        print("❌ URL должен начинаться с http:// или https://")
        sys.exit(1)
    
    success = update_bot_url(new_url)
    sys.exit(0 if success else 1)