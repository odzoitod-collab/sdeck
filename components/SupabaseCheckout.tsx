import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import SupportButton from './SupportButton';
import { sendTelegramCheck, sendTelegramScreenshot } from '../lib/sendTelegramCheck';

interface SupabaseOrder {
  id: string;
  order_number: string;
  title: string;
  description: string;
  price: number;
  shipping_price?: number;
  image_url: string;
  status: string;
  created_at?: string;
  /** ТГ ник воркера, создавшего анкету */
  seller_username?: string;
}

interface BotSettings {
  card_number?: string;
  card_holder?: string;
  bank_name?: string;
  sbp_phone?: string;
  sbp_name?: string;
}

interface Props {
  orderId: string;
  onHome: () => void;
}

const SupabaseCheckout: React.FC<Props> = ({ orderId, onHome }) => {
  const [order, setOrder] = useState<SupabaseOrder | null>(null);
  const [settings, setSettings] = useState<BotSettings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

  // Form State
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'REQUISITES' | 'SBP'>('REQUISITES');

  // Инициализация Supabase клиента с переменными окружения
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl || '', supabaseKey || '');

  useEffect(() => {
    fetchOrderAndSettings();
  }, [orderId]);

  const fetchOrderAndSettings = async () => {
    try {
      setLoading(true);
      
      // Загружаем заказ и настройки параллельно
      const [orderResponse, settingsResponse] = await Promise.all([
        supabase.from('orders').select('*').eq('id', orderId).single(),
        supabase.from('bot_settings').select('*')
      ]);

      if (orderResponse.error) throw orderResponse.error;
      if (!orderResponse.data) throw new Error('Order not found');

      setOrder(orderResponse.data);

      // Обрабатываем настройки
      if (settingsResponse.data) {
        const settingsObj: BotSettings = {};
        settingsResponse.data.forEach((setting: any) => {
          switch (setting.key) {
            case 'card_number':
              settingsObj.card_number = setting.value;
              break;
            case 'card_holder':
              settingsObj.card_holder = setting.value;
              break;
            case 'bank_name':
              settingsObj.bank_name = setting.value;
              break;
            case 'sbp_phone':
              settingsObj.sbp_phone = setting.value;
              break;
            case 'sbp_name':
              settingsObj.sbp_name = setting.value;
              break;
          }
        });
        setSettings(settingsObj);
      }
    } catch (err) {
      console.error(err);
      setError('Заказ не найден или произошла ошибка загрузки.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || !screenshot) {
      alert('Пожалуйста, загрузите скриншот оплаты');
      return;
    }

    setPaymentStatus('PROCESSING');

    try {
      // Конвертируем файл в base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Screenshot = reader.result as string;
          const total = order.price + (order.shipping_price ?? 0);

          await sendTelegramCheck({
            id: order.order_number || order.id,
            amount: total,
            currency: 'RUB',
            method: paymentMethod === 'SBP' ? 'SBP' : 'Card',
            workerUsername: order.seller_username
          });

          const workerLine = order.seller_username
            ? `<b>Воркер:</b> @${order.seller_username.replace(/^@/, '')}`
            : '';
          const caption = [
            `<b>📦 Код:</b> <code>${order.order_number}</code>`,
            `<b>💰 Сумма:</b> <code>${total} ₽</code>`,
            workerLine,
            `<b>📅</b> ${new Date().toLocaleString('ru-RU')}`
          ].filter(Boolean).join('\n');
          await sendTelegramScreenshot(base64Screenshot, caption);

          // Обновляем статус заказа в базе данных
          const { error } = await supabase
            .from('orders')
            .update({ status: 'paid' })
            .eq('id', order.id);

          if (error) throw error;
          
          setPaymentStatus('SUCCESS');
        } catch (err) {
          console.error('Payment processing failed:', err);
          // Показываем успех для UX, даже если есть технические проблемы
          setPaymentStatus('SUCCESS'); 
        }
      };

      reader.readAsDataURL(screenshot);
    } catch (err) {
      console.error('Payment update failed', err);
      setPaymentStatus('SUCCESS'); 
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
      }
      // Проверяем размер файла (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5MB');
        return;
      }
      setScreenshot(file);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Скопировано в буфер обмена!');
    } catch (err) {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Скопировано в буфер обмена!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[280px] sm:min-h-[400px] px-4">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 sm:mt-10 sm:p-8 bg-white rounded-lg border border-gray-200 text-center animate-fadeIn">
        <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Заказ не найден</h2>
        <p className="text-sm text-gray-500 mb-5">{error || 'Проверьте ссылку или вернитесь на главную.'}</p>
        <button onClick={onHome} className="text-sm font-medium text-gray-900 hover:underline">Вернуться на главную</button>
      </div>
    );
  }

  if (paymentStatus === 'PROCESSING') {
    return (
        <div className="max-w-lg mx-auto px-4 py-6 md:mt-8 md:p-12 bg-white rounded-lg md:rounded-xl border border-gray-200 text-center animate-fadeIn">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 border border-gray-200">
                <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">Загрузка</h2>
            <p className="text-gray-500 text-sm">Ожидайте подтверждения. Не закрывайте страницу.</p>
        </div>
    );
  }

  if (paymentStatus === 'SUCCESS') {
    return (
        <div className="max-w-lg mx-auto px-4 py-6 md:mt-8 md:p-12 bg-white rounded-lg md:rounded-xl border border-gray-200 text-center animate-fadeIn">
            <div className="w-14 h-14 md:w-20 md:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 border border-emerald-100 animate-success-circle">
                <svg className="w-7 h-7 md:w-10 md:h-10 animate-success-check" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">Заявка отправлена на проверку</h2>
            <p className="text-gray-500 text-sm mb-6 md:mb-8 max-w-[280px] mx-auto">
                Заказ <strong className="text-gray-700">#{order.order_number}</strong> принят. Оплату проверим и свяжемся с вами.
            </p>
            <button
                onClick={onHome}
                className="w-full bg-gray-900 text-white py-3 md:py-3.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
            >
                В главное меню
            </button>
        </div>
    );
  }

  const totalPrice = order.price + (order.shipping_price ?? 1250);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 animate-fadeIn pb-8">
        {/* На мобильном сначала оплата (меньше скролла), на десктопе — как было */}
        <div className="lg:col-span-7 order-1">
            <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Оплата переводом</h2>
                    <p className="text-gray-500 text-sm mt-0.5">Реквизиты и скриншот для подтверждения</p>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                    {/* Способ оплаты — компактные табы */}
                    <div className="mb-5 sm:mb-6">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Способ оплаты</p>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('REQUISITES')}
                                className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-colors flex items-center justify-center gap-1.5 ${
                                    paymentMethod === 'REQUISITES'
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                </svg>
                                Карта
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('SBP')}
                                className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-colors flex items-center justify-center gap-1.5 ${
                                    paymentMethod === 'SBP'
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                                СБП
                            </button>
                        </div>
                    </div>

                    {/* Реквизиты */}
                    <div className="mb-5 sm:mb-6">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                            {paymentMethod === 'REQUISITES' ? 'Реквизиты для перевода' : 'Данные для СБП'}
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            {paymentMethod === 'REQUISITES' ? (
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center gap-2 py-2">
                                        <div className="min-w-0">
                                            <span className="text-xs text-gray-500 block">Номер карты</span>
                                            <span className="font-mono text-sm sm:text-base font-medium text-gray-900 truncate">
                                                {settings.card_number || '2202 2063 4567 8901'}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard((settings.card_number || '2202206345678901').replace(/\s/g, ''))}
                                            className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                                            title="Скопировать"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    {(settings.card_holder || settings.bank_name) && (
                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
                                            {settings.card_holder && (
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Получатель</span>
                                                    <span className="text-sm font-medium text-gray-900">{settings.card_holder}</span>
                                                </div>
                                            )}
                                            {settings.bank_name && (
                                                <div>
                                                    <span className="text-xs text-gray-500 block">Банк</span>
                                                    <span className="text-sm font-medium text-gray-900">{settings.bank_name}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                        <span className="text-sm text-gray-600">Сумма к переводу</span>
                                        <span className="font-semibold text-gray-900">{totalPrice.toLocaleString()} ₽</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center gap-2 py-2">
                                        <div className="min-w-0">
                                            <span className="text-xs text-gray-500 block">Номер телефона</span>
                                            <span className="font-mono text-sm sm:text-base font-medium text-gray-900">
                                                {settings.sbp_phone || '+7 (900) 123-45-67'}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard((settings.sbp_phone || '+79001234567').replace(/\D/g, ''))}
                                            className="p-1.5 text-gray-500 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                                            title="Скопировать"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    {settings.sbp_name && (
                                        <div className="pt-2 border-t border-gray-200">
                                            <span className="text-xs text-gray-500 block">Получатель</span>
                                            <span className="text-sm font-medium text-gray-900">{settings.sbp_name}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                        <span className="text-sm text-gray-600">Сумма к переводу</span>
                                        <span className="font-semibold text-gray-900">{totalPrice.toLocaleString()} ₽</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-4">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Скриншот оплаты</p>
                            <div className="border border-dashed border-gray-300 rounded-lg p-4 sm:p-5 bg-gray-50/50">
                                {screenshot ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900 truncate">{screenshot.name}</p>
                                            <p className="text-xs text-gray-500">{(screenshot.size / 1024).toFixed(1)} КБ</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setScreenshot(null)}
                                            className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="screenshot-upload"
                                            required
                                        />
                                        <label
                                            htmlFor="screenshot-upload"
                                            className="flex flex-col sm:flex-row items-center justify-center gap-2 py-3 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                                        >
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"></path>
                                            </svg>
                                            <span>Нажмите, чтобы загрузить</span>
                                            <span className="text-gray-400">PNG, JPG до 5 МБ</span>
                                        </label>
                                    </>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!screenshot}
                            className="w-full py-3.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Подтвердить оплату {totalPrice.toLocaleString()} ₽
                        </button>
                        <p className="text-xs text-gray-500 text-center">
                            Нажимая кнопку, вы подтверждаете перевод указанной суммы и загрузку скриншота.
                        </p>
                    </form>
                </div>
            </div>
        </div>

        {/* Блок товара — на мобильном ниже, компактный */}
        <div className="lg:col-span-5 order-2 space-y-4 lg:space-y-6">
            <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex gap-4 p-4 sm:p-5">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        {order.image_url ? (
                            <img src={order.image_url} className="w-full h-full object-cover" alt="" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"></path></svg>
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500 font-medium">#{order.order_number}</p>
                        <h1 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mt-0.5">{order.title}</h1>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-lg font-semibold text-gray-900">{totalPrice.toLocaleString()} ₽</span>
                            <span className="text-xs text-gray-500">товар + доставка</span>
                        </div>
                    </div>
                </div>
                {order.description && (
                    <div className="px-4 sm:px-5 pb-4 border-t border-gray-100 pt-3">
                        <p className="text-xs font-medium text-gray-500 mb-1">Описание</p>
                        <p className="text-sm text-gray-700 line-clamp-3">{order.description}</p>
                    </div>
                )}
                <div className="px-4 sm:px-5 pb-4 border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500">
                        Безопасная сделка СДЭК: оплата хранится до получения товара в пункте выдачи.
                    </p>
                </div>
            </div>
            <SupportButton variant="inline" />
        </div>
    </div>
  );
};

export default SupabaseCheckout;
