import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { OrderData } from '../types';

interface SupabaseOrder {
  id: string;
  order_number: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  status: string;
}

interface Props {
  orderId: string;
  onSubmit: (data: OrderData) => void;
  onBack: () => void;
}

const SupabaseOrderForm: React.FC<Props> = ({ orderId, onSubmit, onBack }) => {
  const [order, setOrder] = useState<SupabaseOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<OrderData>({
    fullName: '',
    phone: '',
    address: '',
    city: ''
  });

  // Инициализация Supabase клиента
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl || '', supabaseKey || '');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Order not found');

      setOrder(data);
    } catch (err) {
      console.error(err);
      setError('Заказ не найден или произошла ошибка загрузки.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phone && formData.address && formData.city) {
      onSubmit(formData);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#82C12D] focus:bg-white focus:ring-4 focus:ring-[#82C12D]/5 outline-none transition-all placeholder:text-gray-300 text-sm font-medium";

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
        <button onClick={onBack} className="text-[#82C12D] font-bold hover:underline">Вернуться на главную</button>
      </div>
    );
  }

  const SHIPPING_FEE = 1250; // Фиксированная стоимость доставки

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Форма данных получателя */}
      <div className="lg:col-span-8">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#25282B]">Данные получателя</h2>
            <p className="text-sm text-gray-400 mt-1">Укажите адрес, куда СДЭК доставит вашу покупку</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">ФИО Получателя</label>
                <input
                  type="text"
                  required
                  placeholder="Как в паспорте"
                  className={inputClass}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Телефон для связи</label>
                <input
                  type="tel"
                  required
                  placeholder="+7 (___) ___-__-__"
                  className={inputClass}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Город доставки</label>
              <input
                type="text"
                required
                placeholder="Напр: Санкт-Петербург"
                className={inputClass}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Точный адрес (Пункт выдачи или Курьер)</label>
              <input
                type="text"
                required
                placeholder="Улица, дом, кв / Офис СДЭК"
                className={inputClass}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="pt-6 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    <span className="text-sm text-gray-400 block mb-1 uppercase font-bold tracking-tighter">К оплате сейчас:</span>
                    <span className="text-2xl font-black text-[#25282B]">{(order.price + SHIPPING_FEE).toLocaleString()} ₽</span>
                </div>
                
                <button
                  type="submit"
                  className="w-full md:w-auto px-12 bg-[#82C12D] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#72a927] shadow-lg shadow-[#82C12D]/10 transform active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                >
                  <span>Оплатить покупку</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </div>
          </form>
        </div>
      </div>

      {/* Боковая панель с информацией о заказе */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
          <h3 className="font-bold text-gray-900 mb-4">Детали сделки</h3>
          <div className="flex items-start space-x-4 mb-6">
            {order.image_url && (
              <img src={order.image_url} className="w-16 h-16 rounded-lg object-cover border border-gray-100" alt={order.title} />
            )}
            <div>
              <p className="text-sm font-semibold leading-tight">{order.title}</p>
              <p className="text-[11px] text-gray-400 mt-1">Заказ: {order.order_number}</p>
            </div>
          </div>
          
          <div className="space-y-3 border-t border-gray-100 pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Товар:</span>
              <span className="font-medium text-gray-900">{order.price.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Доставка СДЭК:</span>
              <span className="font-medium text-gray-900">{SHIPPING_FEE.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="font-bold text-gray-900 text-lg">Итого:</span>
              <span className="font-bold text-[#82C12D] text-lg">{(order.price + SHIPPING_FEE).toLocaleString()} ₽</span>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-[#82C12D]/5 rounded-xl flex items-start space-x-3">
            <svg className="w-5 h-5 text-[#82C12D] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 20c3.859 1.281 7.12 1.281 11 0l1.618-14.016z"></path></svg>
            <p className="text-[11px] text-gray-600 leading-normal">
              <strong>Безопасная сделка СДЭК.</strong> Деньги будут заморожены и переданы продавцу только после того, как вы проверите товар в пункте выдачи.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupabaseOrderForm;