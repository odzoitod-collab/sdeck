import React, { useState } from 'react';

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

  const features = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      title: 'В реальном времени',
      desc: 'Статус обновляется при каждом движении посылки',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: 'SMS-уведомления',
      desc: 'Оповещения на каждом этапе доставки',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: 'Адрес выдачи',
      desc: 'Узнайте адрес пункта и время работы',
    },
  ];

  return (
    <div className="animate-fadeIn bg-white pb-24 xl:pb-8 px-4 max-w-3xl mx-auto pt-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-[#25282B] mb-5 transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Назад
      </button>

      <h1 className="text-[20px] font-black text-[#25282B] mb-1">Отследить посылку</h1>
      <p className="text-[13px] text-gray-400 mb-5">
        Введите номер заказа или трек-номер
      </p>

      {/* Поиск */}
      <div className="flex gap-2 mb-2">
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 bg-white focus-within:border-[#8DC63F] transition-colors">
          <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Например: 1250689930"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
            className="flex-1 h-12 text-[14px] text-[#25282B] placeholder:text-gray-300 bg-transparent font-medium"
          />
        </div>
        <button
          onClick={handleTrack}
          className="btn-press h-12 px-5 bg-[#8DC63F] hover:bg-[#72a930] text-white font-bold text-[14px] rounded-xl transition-colors shrink-0"
        >
          Найти
        </button>
      </div>
      <button
        onClick={onTrackingHelp}
        className="text-[12px] text-gray-400 hover:text-[#8DC63F] transition flex items-center gap-1 mb-6"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01"/>
        </svg>
        Где найти номер заказа?
      </button>

      {/* Возможности */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] mb-3">
              {icon}
            </div>
            <h3 className="text-[13px] font-bold text-[#25282B] mb-1">{title}</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackPackagePage;
