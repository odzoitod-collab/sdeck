import { VercelRequest, VercelResponse } from '@vercel/node';
import FormData from 'form-data';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Разрешаем CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderId, screenshot } = req.body;

    if (!orderId || !screenshot) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Конфигурация
    const BOT_TOKEN = '7963734070:AAG5i2NL52UDanuqC7kRFNdZMXfapQG1c3E';
    const CHANNEL_ID = '-1003631337137';
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://stkmdszqjwmuerskbvuj.supabase.co';
    const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0a21kc3pxandtdWVyc2tidnVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMzc4NTcsImV4cCI6MjA4NDcxMzg1N30.0opRkdf6MDT8apjvACEACSEioOBS2uaLejgLy34uY3Q';

    // Получаем информацию о заказе из Supabase
    const supabaseResponse = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}&select=*`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!supabaseResponse.ok) {
      throw new Error('Failed to fetch order from Supabase');
    }

    const orders = await supabaseResponse.json();
    if (!orders || orders.length === 0) {
      throw new Error('Order not found');
    }

    const order = orders[0];

    // Формируем сообщение для канала
    const message = `💳 <b>НОВАЯ ОПЛАТА</b>\n\n` +
      `📦 <b>Код объявления:</b> <code>${order.order_number}</code>\n` +
      `👤 <b>Продавец:</b> @${order.seller_username || 'неизвестно'}\n` +
      `🏷️ <b>Товар:</b> ${order.title}\n` +
      `💰 <b>Цена товара:</b> ${Number(order.price).toLocaleString()} ₽\n` +
      `🚚 <b>Доставка:</b> ${Number(order.shipping_price || 1250).toLocaleString()} ₽\n` +
      `💳 <b>Итого:</b> ${(Number(order.price) + Number(order.shipping_price || 1250)).toLocaleString()} ₽\n\n` +
      `📅 <b>Дата:</b> ${new Date().toLocaleString('ru-RU')}\n` +
      `✅ <b>Статус:</b> Ожидает проверки`;

    // Конвертируем base64 скриншот в Buffer
    const base64Data = screenshot.replace(/^data:image\/[a-z]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Создаем FormData для отправки в Telegram
    const formData = new FormData();
    formData.append('chat_id', CHANNEL_ID);
    formData.append('caption', message);
    formData.append('parse_mode', 'HTML');
    formData.append('photo', buffer, {
      filename: 'payment_screenshot.jpg',
      contentType: 'image/jpeg'
    });

    // Отправляем в Telegram канал
    const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: formData as any,
      headers: formData.getHeaders()
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      throw new Error(`Telegram API error: ${JSON.stringify(errorData)}`);
    }

    const result = await telegramResponse.json();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Screenshot sent to Telegram channel',
      telegramResult: result
    });

  } catch (error: any) {
    console.error('Error sending to Telegram:', error);
    return res.status(500).json({ 
      error: 'Failed to send to Telegram', 
      details: error.message 
    });
  }
}