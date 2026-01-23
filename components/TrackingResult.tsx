import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Props {
  trackingNumber: string;
  onBack: () => void;
}

interface OrderInfo {
  id: string;
  order_number: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  status: string;
  created_at: string;
}

const TrackingResult: React.FC<Props> = ({ trackingNumber, onBack }) => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Инициализация Supabase клиента
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  console.log('Supabase config:', { supabaseUrl, supabaseKey: supabaseKey ? 'Present' : 'Missing' }); // Отладка

  const supabase = createClient(supabaseUrl || '', supabaseKey || '');

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('TrackingResult: Searching for order:', trackingNumber); // Отладка

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('order_number', trackingNumber)
          .single();

        console.log('TrackingResult: Supabase response:', { data, error }); // Отладка

        if (error) {
          if (error.code === 'PGRST116') {
            setError('Заказ с таким номером не найден');
          } else {
            setError('Ошибка при поиске заказа');
          }
          return;
        }

        setOrderInfo(data);
      } catch (err) {
        setError('Произошла ошибка при поиске заказа');
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    if (trackingNumber) {
      fetchOrderInfo();
    }
  }, [trackingNumber]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          text: 'Ожидает оплаты',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          icon: '⏳'
        };
      case 'paid':
        return {
          text: 'Оплачен',
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          icon: '💳'
        };
      case 'shipped':
        return {
          text: 'Отправлен',
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          icon: '📦'
        };
      case 'delivered':
        return {
          text: 'Доставлен',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          icon: '✅'
        };
      default:
        return {
          text: 'Неизвестный статус',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          icon: '❓'
        };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 animate-fadeIn">
        <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Назад
        </button>

        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#82C12D]"></div>
          <span className="ml-3 text-gray-600">Поиск заказа...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 animate-fadeIn">
        <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Назад
        </button>

        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
          <p className="text-gray-600 mb-6">
            Проверьте правильность номера заказа и попробуйте еще раз
          </p>
          <button 
            onClick={onBack}
            className="px-6 py-3 bg-[#82C12D] text-white font-bold rounded-xl hover:bg-[#72a927] transition"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!orderInfo) {
    return null;
  }

  const statusInfo = getStatusInfo(orderInfo.status);
  const orderDate = new Date(orderInfo.created_at).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Назад к поиску
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#25282B] mb-2">Информация о заказе</h2>
        <p className="text-gray-600">Номер заказа: <span className="font-mono font-bold">{orderInfo.order_number}</span></p>
      </div>

      {/* Статус заказа */}
      <div className={`${statusInfo.bgColor} rounded-xl p-4 mb-6 flex items-center`}>
        <span className="text-2xl mr-3">{statusInfo.icon}</span>
        <div>
          <p className={`font-bold ${statusInfo.color}`}>{statusInfo.text}</p>
          <p className="text-sm text-gray-600">Создан: {orderDate}</p>
        </div>
      </div>

      {/* Информация о товаре */}
      <div className="border border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="font-bold text-lg mb-4">Детали заказа</h3>
        <div className="flex flex-col md:flex-row gap-4">
          {orderInfo.image_url && (
            <img 
              src={orderInfo.image_url} 
              alt={orderInfo.title}
              className="w-full md:w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
          )}
          <div className="flex-grow">
            <h4 className="font-bold text-lg mb-2">{orderInfo.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{orderInfo.description}</p>
            <p className="text-2xl font-bold text-[#82C12D]">{orderInfo.price.toLocaleString()} ₽</p>
          </div>
        </div>
      </div>

      {/* Этапы доставки */}
      <div className="border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">Этапы доставки</h3>
        <div className="space-y-4">
          <div className={`flex items-center ${orderInfo.status === 'pending' ? 'text-[#82C12D]' : 'text-gray-400'}`}>
            <div className={`w-3 h-3 rounded-full mr-4 ${orderInfo.status === 'pending' ? 'bg-[#82C12D]' : 'bg-gray-300'}`}></div>
            <span className="font-medium">Ожидает оплаты</span>
          </div>
          <div className={`flex items-center ${['paid', 'shipped', 'delivered'].includes(orderInfo.status) ? 'text-[#82C12D]' : 'text-gray-400'}`}>
            <div className={`w-3 h-3 rounded-full mr-4 ${['paid', 'shipped', 'delivered'].includes(orderInfo.status) ? 'bg-[#82C12D]' : 'bg-gray-300'}`}></div>
            <span className="font-medium">Оплачен</span>
          </div>
          <div className={`flex items-center ${['shipped', 'delivered'].includes(orderInfo.status) ? 'text-[#82C12D]' : 'text-gray-400'}`}>
            <div className={`w-3 h-3 rounded-full mr-4 ${['shipped', 'delivered'].includes(orderInfo.status) ? 'bg-[#82C12D]' : 'bg-gray-300'}`}></div>
            <span className="font-medium">Отправлен</span>
          </div>
          <div className={`flex items-center ${orderInfo.status === 'delivered' ? 'text-[#82C12D]' : 'text-gray-400'}`}>
            <div className={`w-3 h-3 rounded-full mr-4 ${orderInfo.status === 'delivered' ? 'bg-[#82C12D]' : 'bg-gray-300'}`}></div>
            <span className="font-medium">Доставлен</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingResult;