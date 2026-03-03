import React from 'react';

interface Props {
  onBack: () => void;
}

const PERKS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
      </svg>
    ),
    title: 'Развитие',
    desc: 'Обучение, тренинги и карьерный рост',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Достойная зарплата',
    desc: 'Конкурентный уровень оплаты',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: 'Команда',
    desc: 'Работа в дружном коллективе',
  },
];

const VACANCIES = [
  { title: 'Курьер', city: 'Москва', type: 'Полная занятость' },
  { title: 'Менеджер по работе с клиентами', city: 'Санкт-Петербург', type: 'Полная занятость' },
  { title: 'Специалист склада', city: 'Екатеринбург', type: 'Полная занятость' },
  { title: 'Логист', city: 'Новосибирск', type: 'Полная занятость' },
  { title: 'Разработчик', city: 'Удалённо', type: 'Полная занятость' },
];

const CareerPage: React.FC<Props> = ({ onBack }) => (
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

    <h1 className="text-[20px] font-black text-[#25282B] mb-1">Карьера в СДЭК</h1>
    <p className="text-[13px] text-gray-400 mb-6">
      Присоединяйтесь к команде крупнейшей логистической компании
    </p>

    {/* Преимущества */}
    <div className="grid grid-cols-3 gap-3 mb-6">
      {PERKS.map(({ icon, title, desc }) => (
        <div key={title} className="bg-white border border-gray-100 rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] mb-2">
            {icon}
          </div>
          <h3 className="text-[12px] font-bold text-[#25282B] mb-1">{title}</h3>
          <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    {/* Вакансии */}
    <h2 className="text-[14px] font-bold text-[#25282B] mb-3">Открытые вакансии</h2>
    <div className="space-y-2 mb-6">
      {VACANCIES.map((v) => (
        <div
          key={v.title}
          className="flex items-center justify-between gap-3 bg-white border border-gray-100 rounded-xl p-3.5 hover:border-[#8DC63F]/30 transition"
        >
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#25282B] truncate">{v.title}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{v.city} · {v.type}</p>
          </div>
          <a
            href="https://career.cdek.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 btn-press border border-[#8DC63F] text-[#8DC63F] rounded-lg px-3 py-1.5 text-[11px] font-bold hover:bg-[#8DC63F]/5 transition"
          >
            Откликнуться
          </a>
        </div>
      ))}
    </div>

    {/* HR */}
    <div className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-4">
      <h2 className="text-[14px] font-bold text-[#25282B] mb-1.5">Связаться с HR</h2>
      <p className="text-[12px] text-gray-400 mb-2.5">
        Не нашли подходящую вакансию? Отправьте резюме в отдел кадров:
      </p>
      <a href="mailto:hr@cdek.ru" className="text-[13px] font-bold text-[#8DC63F] hover:underline">
        hr@cdek.ru
      </a>
    </div>
  </div>
);

export default CareerPage;
