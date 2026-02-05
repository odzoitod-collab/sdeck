import React, { useState } from 'react';
import SupportButton from '../SupportButton';

interface Props {
  onBack: () => void;
  onTrackPackage: (number: string) => void;
  onTrackingHelp: () => void;
}

const TrackPackagePage: React.FC<Props> = ({ onBack, onTrackPackage, onTrackingHelp }) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrack = () => {
    if (trackingNumber.trim()) onTrackPackage(trackingNumber.trim());
  };

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#25282B] mb-4">Отследить посылку</h1>
        <p className="text-gray-600 text-lg">Введите номер заказа или трек-номер, чтобы узнать статус доставки</p>
      </section>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Номер заказа (CDEK-xxx или 10 цифр)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
              className="w-full h-14 md:h-16 px-6 rounded-xl text-lg font-medium text-[#25282B] placeholder:text-gray-400 bg-gray-50 border-2 border-transparent focus:border-[#82C12D] focus:bg-white outline-none transition-all"
            />
          </div>
          <button
            onClick={handleTrack}
            className="h-14 md:h-16 px-10 bg-[#82C12D] text-white font-bold text-lg rounded-xl hover:bg-[#72a927] transition shadow-lg shadow-[#82C12D]/20"
          >
            Отследить
          </button>
        </div>
        <button onClick={onTrackingHelp} className="mt-4 text-[#82C12D] font-bold text-sm hover:underline flex items-center">
          Где найти номер заказа?
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#F9FAFB] rounded-xl p-6 border border-gray-100">
          <div className="w-12 h-12 bg-[#82C12D]/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#82C12D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h3 className="font-bold text-[#25282B] mb-2">В реальном времени</h3>
          <p className="text-gray-600 text-sm">Статус обновляется при каждом движении посылки</p>
        </div>
        <div className="bg-[#F9FAFB] rounded-xl p-6 border border-gray-100">
          <div className="w-12 h-12 bg-[#82C12D]/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#82C12D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
          <h3 className="font-bold text-[#25282B] mb-2">SMS-уведомления</h3>
          <p className="text-gray-600 text-sm">Получайте оповещения на каждом этапе доставки</p>
        </div>
        <div className="bg-[#F9FAFB] rounded-xl p-6 border border-gray-100">
          <div className="w-12 h-12 bg-[#82C12D]/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#82C12D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <h3 className="font-bold text-[#25282B] mb-2">Адрес доставки</h3>
          <p className="text-gray-600 text-sm">Узнайте адрес пункта выдачи и время работы</p>
        </div>
      </div>

      <SupportButton variant="inline" />
    </div>
  );
};

export default TrackPackagePage;
