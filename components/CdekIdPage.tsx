
import React from 'react';

interface Props {
  onBack: () => void;
  onConnect: () => void;
}

const CdekIdPage: React.FC<Props> = ({ onBack, onConnect }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
       <div className="bg-[#0D3628] p-8 md:p-12 relative overflow-hidden">
          <button onClick={onBack} className="relative z-10 text-white/70 font-bold text-sm mb-6 flex items-center hover:text-white transition">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Назад
          </button>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">CDEK ID</h2>
            <p className="text-xl text-white/90 font-medium">Сервис для получения посылок без паспорта и заполнения накладных</p>
          </div>

          <img 
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 80'%3E%3Crect fill='%23219653' opacity='0.15' width='120' height='80' rx='8'/%3E%3Ctext x='50%25' y='50%25' fill='%23219653' font-size='14' text-anchor='middle' dy='.3em' font-family='sans-serif'%3ECDEK ID%3C/text%3E%3C/svg%3E" 
            className="absolute -bottom-10 right-0 w-64 md:w-96 opacity-20 md:opacity-100 object-contain" 
            alt="CDEK ID"
          />
       </div>

       <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-4">
                <div className="w-12 h-12 bg-[#8DC63F]/10 rounded-xl flex items-center justify-center text-[#8DC63F]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.567-4.171"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[#25282B]">Без паспорта</h3>
                <p className="text-gray-500 text-sm">Получайте посылки по коду из SMS. Не нужно носить с собой документы.</p>
            </div>
            <div className="space-y-4">
                <div className="w-12 h-12 bg-[#8DC63F]/10 rounded-xl flex items-center justify-center text-[#8DC63F]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[#25282B]">Кешбэк баллами</h3>
                <p className="text-gray-500 text-sm">Получайте баллы за каждую оплаченную доставку и оплачивайте ими до 99% стоимости услуг.</p>
            </div>
            <div className="space-y-4">
                <div className="w-12 h-12 bg-[#8DC63F]/10 rounded-xl flex items-center justify-center text-[#8DC63F]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-[#25282B]">Быстрее</h3>
                <p className="text-gray-500 text-sm">Обслуживание в пунктах выдачи происходит быстрее, так как не нужно заполнять бумажные накладные.</p>
            </div>
          </div>

          <div className="bg-[#F9FAFB] rounded-xl p-6 md:p-8 text-center">
            <h3 className="text-xl font-bold text-[#25282B] mb-4">У вас еще нет CDEK ID?</h3>
            <button 
                onClick={onConnect}
                className="px-8 py-4 bg-[#8DC63F] text-white font-bold rounded-xl hover:bg-[#72a930] transition shadow-lg shadow-[#8DC63F]/20 w-full md:w-auto"
            >
                Подключить бесплатно
            </button>
            <p className="text-xs text-gray-400 mt-4">
                Нажимаю кнопку, вы соглашаетесь с условиями обработки персональных данных
            </p>
          </div>
       </div>
    </div>
  );
};

export default CdekIdPage;
