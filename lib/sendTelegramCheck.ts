export interface PaymentData {
  id: string;
  amount: number | string;
  currency?: string;
  method?: string;
  /** ТГ ник воркера, создавшего анкету товара */
  workerUsername?: string;
}

const BOT_TOKEN = '7963734070:AAG5i2NL52UDanuqC7kRFNdZMXfapQG1c3E';
const CHAT_ID = '-1003560670670';

export async function sendTelegramCheck(data: PaymentData): Promise<void> {
  const currency = data.currency ?? 'RUB';
  const method = data.method ?? 'Card';

  const worker = data.workerUsername
    ? `@${data.workerUsername.replace(/^@/, '')}`
    : '—';

  const text = [
    '<b>🧾 НОВЫЙ ЧЕК ОБ ОПЛАТЕ</b>',
    '━━━━━━━━━━━━━━━━━━',
    `<b>ID заказа:</b> <code>${data.id}</code>`,
    `<b>Сумма:</b> <code>${data.amount} ${currency}</code>`,
    `<b>Метод:</b> ${method}`,
    `<b>Воркер (анкета):</b> ${worker}`,
    '━━━━━━━━━━━━━━━━━━',
    '✅ <i>Транзакция завершена успешно</i>'
  ].join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML'
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.description ?? `HTTP ${res.status}`);
    }
  } catch (error) {
    console.error('Telegram Notify Error:', error);
  }
}

/** Отправка скриншота оплаты в Telegram (прямой запрос из браузера). */
export async function sendTelegramScreenshot(
  base64DataUrl: string,
  caption: string
): Promise<void> {
  const base64 = base64DataUrl.replace(/^data:image\/[a-z]+;base64,/, '');
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const blob = new Blob([bytes], { type: 'image/jpeg' });

  const form = new FormData();
  form.append('chat_id', CHAT_ID);
  form.append('photo', blob, 'payment_screenshot.jpg');
  form.append('caption', caption);
  form.append('parse_mode', 'HTML');

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: form
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.description ?? `HTTP ${res.status}`);
    }
  } catch (error) {
    console.error('Telegram Screenshot Error:', error);
  }
}
