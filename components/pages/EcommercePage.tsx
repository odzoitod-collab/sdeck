import React from 'react';

interface Props {
  onBack: () => void;
}

const INTEGRATIONS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
      </svg>
    ),
    name: '1С-Битрикс',
    desc: 'Готовая интеграция для интернет-магазинов',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
      </svg>
    ),
    name: 'Magento / OpenCart',
    desc: 'Модули для популярных CMS',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
    ),
    name: 'API СДЭК',
    desc: 'Гибкая интеграция под любые системы',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    ),
    name: 'Marketplace',
    desc: 'Ozon, Wildberries, Яндекс.Маркет',
  },
];

const PERKS = [
  'Автоматический расчёт стоимости при оформлении',
  'Печать накладных и этикеток из личного кабинета',
  'Виджет отслеживания для вашего сайта',
  'Безопасная сделка — защита покупателей и продавцов',
];

const EcommercePage: React.FC<Props> = ({ onBack }) => (
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

    <h1 className="text-[20px] font-black text-[#25282B] mb-1">Интернет-магазинам</h1>
    <p className="text-[13px] text-gray-400 mb-6">
      Расчёт стоимости, накладные и отслеживание — в одном месте
    </p>

    {/* Интеграции */}
    <div className="grid grid-cols-2 gap-3 mb-6">
      {INTEGRATIONS.map(({ icon, name, desc }) => (
        <div key={name} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-[#8DC63F]/30 transition">
          <div className="w-9 h-9 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] mb-3">
            {icon}
          </div>
          <h3 className="text-[13px] font-bold text-[#25282B] mb-1">{name}</h3>
          <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    {/* Преимущества */}
    <div className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-4 mb-5">
      <h3 className="text-[14px] font-bold text-[#25282B] mb-3">Преимущества для магазинов</h3>
      <div className="space-y-2.5">
        {PERKS.map((p) => (
          <div key={p} className="flex items-center gap-2.5">
            <svg className="w-3.5 h-3.5 shrink-0 text-[#8DC63F]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
            <span className="text-[12px] text-[#25282B]">{p}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Подключение */}
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      <h3 className="text-[14px] font-bold text-[#25282B] mb-2">Подключение</h3>
      <p className="text-[12px] text-gray-400 mb-3">
        Для подключения магазина к СДЭК обратитесь к специалистам:
      </p>
      <a
        href="tel:88002500405"
        className="btn-press inline-flex items-center gap-2 border border-[#8DC63F] text-[#8DC63F] rounded-xl px-4 py-2.5 text-[13px] font-bold hover:bg-[#8DC63F]/5 transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
        8 800 250-04-05
      </a>
    </div>
  </div>
);

export default EcommercePage;
