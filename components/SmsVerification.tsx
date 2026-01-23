
import React, { useState } from 'react';

interface Props {
  onVerify: (code: string) => void;
  onBack: () => void;
}

const SmsVerification: React.FC<Props> = ({ onVerify, onBack }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleManualCheck = () => {
    setIsVerifying(true);
    // Simulate a check delay before proceeding to success
    setTimeout(() => {
      onVerify('SUCCESS');
    }, 2000);
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-xl mx-auto text-center">
      <div className="mb-8">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 bg-[#82C12D]/10 rounded-full animate-ping opacity-25"></div>
          <div className="relative w-20 h-20 bg-[#82C12D]/10 text-[#82C12D] rounded-full flex items-center justify-center border border-[#82C12D]/20">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 20c3.859 1.281 7.12 1.281 11 0l1.618-14.016z"></path>
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-black text-[#25282B] mb-3">Оплата на проверке</h2>
        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          Ваш скриншот успешно получен. Финансовый отдел проверяет поступление средств по указанным реквизитам.
        </p>
      </div>

      <div className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 mb-8 text-left">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.45-.42-1.39-.88.03-.24.36-.48 1-.72 3.94-1.71 6.57-2.83 7.89-3.37 3.76-1.53 4.54-1.8 5.05-1.81.11 0 .36.03.52.17.13.11.17.26.19.37.02.09.02.26 0 .33z"/>
            </svg>
          </div>
          <h3 className="font-bold text-[#25282B] text-sm uppercase tracking-tight">Ускоренная проверка</h3>
        </div>
        <p className="text-xs text-gray-600 mb-6 leading-relaxed">
          Обычно проверка занимает до 30 минут. Для <b>моментального</b> подтверждения платежа и выпуска транспортной накладной, пожалуйста, отправьте чек в нашу службу поддержки:
        </p>
        
        <a 
          href="https://t.me/cdek_official" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 w-full bg-[#0088cc] hover:bg-[#0077b5] text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
        >
          <span>ПОДДЕРЖКА СДЭК (TELEGRAM)</span>
        </a>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleManualCheck}
          disabled={isVerifying}
          className="w-full text-xs font-bold text-[#82C12D] hover:text-[#72a927] uppercase tracking-widest flex items-center justify-center space-x-2"
        >
          {isVerifying ? (
            <div className="w-4 h-4 border-2 border-[#82C12D]/30 border-t-[#82C12D] rounded-full animate-spin"></div>
          ) : (
            <span>Проверить статус оплаты</span>
          )}
        </button>
        
        <button
          onClick={onBack}
          className="text-[10px] text-gray-400 font-bold uppercase hover:text-gray-600 transition-colors"
        >
          Вернуться к способам оплаты
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-50">
        <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          <span>Защищено технологией CDEK.Pay</span>
        </div>
      </div>
    </div>
  );
};

export default SmsVerification;
