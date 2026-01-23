// Тестовый скрипт для проверки API после деплоя
// Запуск: node test-api.js

const testTelegramAPI = async () => {
  const API_URL = 'https://sdeck.vercel.app/api/send-to-telegram';
  
  // Тестовые данные
  const testData = {
    orderId: 'test-order-id',
    screenshot: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
  };

  try {
    console.log('🧪 Тестирование Telegram API...');
    console.log('📡 URL:', API_URL);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 Статус ответа:', response.status);
    
    const result = await response.json();
    console.log('📋 Результат:', result);

    if (response.ok) {
      console.log('✅ API работает корректно!');
    } else {
      console.log('❌ Ошибка API:', result.error);
    }
  } catch (error) {
    console.error('💥 Ошибка сети:', error.message);
  }
};

// Запуск теста
testTelegramAPI();