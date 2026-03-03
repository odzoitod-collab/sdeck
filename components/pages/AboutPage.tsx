import React from 'react';

interface Props {
  onBack: () => void;
}

const STATS = [
  { value: '12 000+', label: 'Пунктов выдачи' },
  { value: '200+', label: 'Стран доставки' },
  { value: '25 лет', label: 'На рынке' },
  { value: '1 млн+', label: 'Отправлений/день' },
];

const AboutPage: React.FC<Props> = ({ onBack }) => (
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

    <h1 className="text-[20px] font-black text-[#25282B] mb-1">О компании СДЭК</h1>
    <p className="text-[13px] text-gray-400 mb-6">
      Одна из крупнейших логистических компаний России с 2000 года
    </p>

    {/* Статистика */}
    <div className="grid grid-cols-2 gap-3 mb-6">
      {STATS.map(({ value, label }) => (
        <div key={label} className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-[20px] font-black text-[#25282B]">{value}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>

    {/* Миссия */}
    <div className="bg-white border border-gray-100 rounded-xl p-4 mb-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <h2 className="text-[14px] font-bold text-[#25282B]">Наша миссия</h2>
      </div>
      <p className="text-[12px] text-gray-500 leading-relaxed">
        Сделать доставку быстрой, удобной и доступной для каждого. Мы стремимся, чтобы каждый мог легко отправить и получить посылку в любую точку страны и мира.
      </p>
    </div>

    {/* История */}
    <div className="bg-white border border-gray-100 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h2 className="text-[14px] font-bold text-[#25282B]">История</h2>
      </div>
      <p className="text-[12px] text-gray-500 leading-relaxed">
        Компания основана в 2000 году. Начав с доставки документов в Москве, СДЭК выросла в федеральную сеть с тысячами ПВЗ. Сегодня — это экосистема сервисов: СДЭК.Маркет, CDEK ID, международная доставка и другое.
      </p>
    </div>

    {/* Контакты */}
    <div className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-4">
      <h2 className="text-[14px] font-bold text-[#25282B] mb-3">Контакты</h2>
      <div className="space-y-2 text-[12px]">
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <a href="tel:88002500405" className="font-bold text-[#8DC63F] hover:underline">8 800 250-04-05</a>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <a href="mailto:info@cdek.ru" className="font-bold text-[#8DC63F] hover:underline">info@cdek.ru</a>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span className="text-gray-500">ООО «СДЭК-Глобал», ИНН 7722327677</span>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
