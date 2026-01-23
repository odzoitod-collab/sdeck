
import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onFound: () => void;
}

const OnlinePaymentSearch: React.FC<Props> = ({ onBack, onFound }) => {
  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim().length > 3) {
        onFound();
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 animate-fadeIn text-center">
       <button onClick={onBack} className="text-gray-400 font-bold text-sm mb-8 flex items-center justify-center hover:text-[#25282B] transition">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Вернуться назад
       </button>

       <div className="w-20 h-20 bg-[#82C12D]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#82C12D]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
       </div>

       <h2 className="text-2xl font-black text-[#25282B] mb-2">Онлайн-оплата</h2>
       <p className="text-gray-500 text-sm mb-8">
           Введите номер заказа или накладной, чтобы оплатить доставку или товар
       </p>

       <form onSubmit={handleSubmit} className="space-y-4">
            <input 
                type="text" 
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Номер заказа (например: 1250689930)"
                className="w-full h-14 px-6 rounded-xl text-lg text-center font-medium text-[#25282B] placeholder:text-gray-300 bg-white outline-none border-2 border-gray-200 focus:border-[#82C12D] transition-all"
            />
            
            <button 
                type="submit"
                disabled={orderNumber.length < 3}
                className="w-full h-14 bg-[#82C12D] text-white font-bold rounded-xl hover:bg-[#72a927] transition shadow-lg shadow-[#82C12D]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Найти и оплатить
            </button>
       </form>

       <div className="mt-8 pt-8 border-t border-gray-100 text-xs text-gray-400">
           <p>Безопасные платежи обеспечиваются процессинговым центром CDEK.Pay</p>
       </div>
    </div>
  );
};

export default OnlinePaymentSearch;
