
import React from 'react';
import { ProductInfo } from '../types';

interface Props {
  product: ProductInfo;
  onGoHome: () => void;
}

const SuccessScreen: React.FC<Props> = ({ product, onGoHome }) => {
  return (
    <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center max-w-lg mx-auto">
      <div className="w-24 h-24 bg-[#82C12D]/10 text-[#82C12D] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#82C12D]/20">
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
      </div>
      
      <h2 className="text-3xl font-black text-[#25282B] mb-2 tracking-tight">Заказ оплачен!</h2>
      <p className="text-gray-400 text-sm mb-10 max-w-[280px] mx-auto">
        Ваша покупка <strong>{product.name}</strong> успешно оформлена.
      </p>

      <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100 mb-10 text-left space-y-4">
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-medium">Накладная СДЭК:</span>
            <span className="font-mono font-bold text-[#25282B] bg-white px-2 py-1 rounded border border-gray-100 shadow-sm">1582937402</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400 font-medium">Статус сделки:</span>
            <span className="text-[#82C12D] font-bold flex items-center">
                <span className="w-2 h-2 bg-[#82C12D] rounded-full mr-2 animate-pulse"></span>
                В обработке
            </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
            onClick={onGoHome}
            className="w-full bg-[#25282B] text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg uppercase tracking-wider text-sm"
        >
            В главное меню
        </button>
        <button
            onClick={() => window.location.reload()}
            className="w-full bg-white border border-gray-200 text-gray-500 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
        >
            Личный кабинет
        </button>
      </div>
    </div>
  );
};

export default SuccessScreen;
