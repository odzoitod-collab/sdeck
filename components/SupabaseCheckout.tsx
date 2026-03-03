import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { sendTelegramCheck, sendTelegramScreenshot } from '../lib/sendTelegramCheck';

interface SupabaseOrder {
  id: string;
  order_number: string;
  title: string;
  description: string;
  price: number;
  shipping_price?: number;
  image_url?: string;
  image_urls?: string[];
  status: string;
  created_at?: string;
  seller_username?: string;
  payment_link_url?: string;
}

interface Props {
  orderId: string;
  onHome: () => void;
}

const SupabaseCheckout: React.FC<Props> = ({ orderId, onHome }) => {
  const [order, setOrder] = useState<SupabaseOrder | null>(null);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'IDLE' | 'WAITING_SCREENSHOT' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl || '', supabaseKey || '');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const [orderRes, linksRes] = await Promise.all([
        supabase.from('orders').select('*').eq('id', orderId).single(),
        supabase.from('payment_links').select('price, url').eq('active', true),
      ]);

      if (orderRes.error) throw orderRes.error;
      if (!orderRes.data) throw new Error('Order not found');

      const ord: SupabaseOrder = orderRes.data;
      setOrder(ord);

      // Ищем ссылку: сначала в самом заказе, потом в таблице payment_links
      let url = ord.payment_link_url || '';
      if (!url && linksRes.data) {
        const totalPrice = ord.price + (ord.shipping_price ?? 0);
        const match = linksRes.data.find((l: any) => Number(l.price) === totalPrice);
        if (match) url = match.url;
      }
      setPaymentUrl(url);
    } catch (err) {
      console.error(err);
      setError('Заказ не найден или произошла ошибка загрузки.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPayment = () => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
    }
    // После открытия ссылки переходим в режим загрузки скриншота
    setPaymentStatus('WAITING_SCREENSHOT');
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
      setScreenshot(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmitScreenshot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || !screenshot) return;
    setPaymentStatus('PROCESSING');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Screenshot = reader.result as string;
          const total = order.price + (order.shipping_price ?? 0);

          await sendTelegramCheck({
            id: order.order_number || order.id,
            amount: total,
            currency: 'RUB',
            method: 'YooMoney',
            workerUsername: order.seller_username,
          });

          const workerLine = order.seller_username
            ? `<b>Воркер:</b> @${order.seller_username.replace(/^@/, '')}`
            : '';
          const caption = [
            `<b>📦 Заказ:</b> <code>${order.order_number}</code>`,
            `<b>💰 Сумма:</b> <code>${total} ₽</code>`,
            `<b>💳 Метод:</b> YooMoney`,
            workerLine,
            `<b>📅</b> ${new Date().toLocaleString('ru-RU')}`,
          ].filter(Boolean).join('\n');

          await sendTelegramScreenshot(base64Screenshot, caption);

          await supabase.from('orders').update({ status: 'paid' }).eq('id', order.id);

          setPaymentStatus('SUCCESS');
        } catch (err) {
          console.error('Screenshot submit failed:', err);
          setPaymentStatus('SUCCESS');
        }
      };
      reader.readAsDataURL(screenshot);
    } catch (err) {
      console.error(err);
      setPaymentStatus('SUCCESS');
    }
  };

  // --- Loading ---
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4 animate-pulse">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div className="h-5 bg-gray-100 rounded w-1/2" />
          <div className="h-24 bg-gray-100 rounded-xl" />
          <div className="h-14 bg-gray-100 rounded-xl" />
        </div>
      </div>
    );
  }

  // --- Error ---
  if (error || !order) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 text-center animate-fadeIn">
        <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Заказ не найден</h2>
        <p className="text-sm text-gray-500 mb-5">{error || 'Проверьте ссылку или вернитесь на главную.'}</p>
        <button onClick={onHome} className="text-sm font-medium text-gray-900 hover:underline">Вернуться на главную</button>
      </div>
    );
  }

  // --- Processing ---
  if (paymentStatus === 'PROCESSING') {
    return (
      <div className="max-w-lg mx-auto px-4 py-6 md:mt-8 md:p-12 bg-white rounded-xl border border-gray-200 text-center animate-fadeIn">
        <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5 border border-gray-200">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Отправляем скриншот...</h2>
        <p className="text-gray-500 text-sm">Не закрывайте страницу.</p>
      </div>
    );
  }

  // --- Success ---
  if (paymentStatus === 'SUCCESS') {
    return (
      <div className="max-w-lg mx-auto px-4 py-6 md:mt-8 md:p-12 bg-white rounded-xl border border-gray-200 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100">
          <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Скриншот получен</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-[280px] mx-auto">
          Заказ <strong className="text-gray-700">#{order.order_number}</strong> — ожидайте подтверждения оплаты.
        </p>
        <button
          onClick={onHome}
          className="btn-press w-full min-h-[52px] bg-[#8DC63F] hover:bg-[#72a930] text-white py-3.5 rounded-xl font-bold text-[14px] transition-colors touch-manipulation"
        >
          На главную
        </button>
      </div>
    );
  }

  const totalPrice = order.price + (order.shipping_price ?? 0);
  const productImage = order.image_urls?.length ? order.image_urls[0] : order.image_url;

  return (
    <div className="max-w-xl mx-auto px-0 space-y-4 pb-8 animate-fadeIn">

      {/* Карточка товара */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex gap-4 p-4 sm:p-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-100 flex-shrink-0 overflow-hidden">
            {productImage ? (
              <img src={productImage} className="w-full h-full object-cover" alt="" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                </svg>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400 font-medium">#{order.order_number}</p>
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mt-0.5">{order.title}</h1>
            <div className="mt-2">
              <span className="text-xl font-bold text-gray-900">{totalPrice.toLocaleString()} ₽</span>
            </div>
          </div>
        </div>
        {order.description && (
          <div className="px-4 sm:px-5 pb-4 border-t border-gray-50 pt-3">
            <p className="text-xs font-medium text-gray-400 mb-1">Описание</p>
            <p className="text-sm text-gray-700 line-clamp-3">{order.description}</p>
          </div>
        )}
      </div>

      {/* Блок оплаты */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-4 sm:px-5 py-4 border-b border-gray-50">
          <h2 className="text-base font-semibold text-gray-900">Оплата</h2>
          <p className="text-xs text-gray-400 mt-0.5">Нажмите «Оплатить» — откроется страница оплаты</p>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Шаг 1 — кнопка оплаты */}
          <div className={`rounded-xl border-2 p-4 transition-colors ${paymentStatus === 'WAITING_SCREENSHOT' ? 'border-[#8DC63F]/40 bg-[#8DC63F]/5' : 'border-gray-100 bg-gray-50/50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${paymentStatus === 'WAITING_SCREENSHOT' ? 'bg-[#8DC63F] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {paymentStatus === 'WAITING_SCREENSHOT' ? '✓' : '1'}
              </div>
              <p className="text-sm font-medium text-gray-800">Перейдите к оплате</p>
            </div>
            <a
              href={paymentUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setPaymentStatus('WAITING_SCREENSHOT')}
              className={`btn-press flex items-center justify-center gap-2 w-full min-h-[52px] rounded-xl font-bold text-[15px] transition-colors touch-manipulation ${
                paymentUrl
                  ? 'bg-[#8DC63F] hover:bg-[#72a930] text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Оплатить {totalPrice.toLocaleString()} ₽
            </a>
            {!paymentUrl && (
              <p className="text-xs text-red-400 text-center mt-2">Ссылка на оплату временно недоступна. Обратитесь к продавцу.</p>
            )}
          </div>

          {/* Шаг 2 — загрузка скриншота */}
          <div className={`rounded-xl border-2 p-4 transition-colors ${paymentStatus === 'IDLE' ? 'border-gray-100 opacity-50' : 'border-gray-100'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${screenshot ? 'bg-[#8DC63F] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {screenshot ? '✓' : '2'}
              </div>
              <p className="text-sm font-medium text-gray-800">Загрузите скриншот оплаты</p>
            </div>

            <form onSubmit={handleSubmitScreenshot} className="space-y-3">
              <div
                className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer ${
                  dragActive ? 'border-[#8DC63F] bg-[#8DC63F]/5' : screenshot ? 'border-[#8DC63F] bg-white p-3' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 p-6'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => !screenshot && document.getElementById('sc-upload')?.click()}
              >
                <input
                  type="file"
                  id="sc-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                {screenshot ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={URL.createObjectURL(screenshot)}
                      alt="preview"
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{screenshot.name}</p>
                      <p className="text-xs text-[#8DC63F] font-medium">Файл добавлен</p>
                    </div>
                    <button
                      type="button"
                      className="text-gray-300 hover:text-red-400 transition shrink-0 p-1"
                      onClick={(e) => { e.stopPropagation(); setScreenshot(null); }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">Нажмите или перетащите скриншот</p>
                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG до 10 МБ</p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!screenshot || paymentStatus === 'IDLE'}
                className="btn-press w-full min-h-[52px] py-3.5 bg-[#25282B] hover:bg-[#1a1d1f] text-white rounded-xl font-bold text-[14px] disabled:opacity-30 disabled:cursor-not-allowed transition-colors touch-manipulation"
              >
                Я оплатил — отправить скриншот
              </button>
            </form>
          </div>

          <p className="text-xs text-gray-400 text-center leading-relaxed">
            После оплаты загрузите скриншот подтверждения. Ваш заказ будет обработан в течение нескольких минут.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupabaseCheckout;
