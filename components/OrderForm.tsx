
import React, { useState } from 'react';
import { OrderData, ProductInfo } from '../types';

interface Props {
  onSubmit: (data: OrderData) => void;
  initialData: OrderData;
  product: ProductInfo;
  shippingFee: number;
}

const OrderForm: React.FC<Props> = ({ onSubmit, initialData, product, shippingFee }) => {
  const [formData, setFormData] = useState<OrderData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phone && formData.address && formData.city) {
      onSubmit(formData);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#8DC63F] focus:bg-white focus:ring-4 focus:ring-[#8DC63F]/5 outline-none transition-all placeholder:text-gray-300 text-sm font-medium";

  return (
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
                <span className="text-2xl font-black text-[#25282B]">{(product.price + shippingFee).toLocaleString()} ₽</span>
            </div>
            
            <button
              type="submit"
              className="w-full md:w-auto px-12 bg-[#8DC63F] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#72a930] shadow-lg shadow-[#8DC63F]/10 transform active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <span>Оплатить покупку</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
