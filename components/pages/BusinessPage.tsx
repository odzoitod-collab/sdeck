import React from 'react';

interface Props {
  onBack: () => void;
}

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
      </svg>
    ),
    title: 'Массовые отправки',
    desc: 'Интеграция с 1С, CRM и складскими системами',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    title: 'Курьерская доставка',
    desc: 'Забор и доставка по адресу в день заказа',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    title: 'Пункты выдачи',
    desc: 'Сеть из 12 000+ ПВЗ по всей России',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/>
      </svg>
    ),
    title: 'Международная логистика',
    desc: 'Экспорт и импорт в 200+ стран мира',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    title: 'Аналитика и отчётность',
    desc: 'Детальная статистика по отправкам',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    ),
    title: 'Отсрочка платежа',
    desc: 'Удобные условия для корпоративных клиентов',
  },
];

const BusinessPage: React.FC<Props> = ({ onBack }) => (
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

    <h1 className="text-[20px] font-black text-[#25282B] mb-1">Логистика для бизнеса</h1>
    <p className="text-[13px] text-gray-400 mb-6">
      Полный комплекс услуг доставки: от мелких отправок до крупных партий
    </p>

    {/* Услуги */}
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
      {features.map(({ icon, title, desc }) => (
        <div key={title} className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="w-9 h-9 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] mb-3">
            {icon}
          </div>
          <h3 className="text-[13px] font-bold text-[#25282B] mb-1">{title}</h3>
          <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>

    {/* Подключение */}
    <div className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-4">
      <h3 className="text-[14px] font-bold text-[#25282B] mb-3">Подключение к СДЭК</h3>
      <div className="space-y-3">
        <div>
          <p className="text-[12px] font-semibold text-[#25282B] mb-0.5">Онлайн</p>
          <p className="text-[12px] text-gray-400 mb-1.5">
            Зарегистрируйтесь и начните отправлять уже сегодня
          </p>
          <a
            href="tel:88002500405"
            className="text-[12px] font-bold text-[#8DC63F] hover:underline"
          >
            8 800 250-04-05
          </a>
        </div>
        <div className="border-t border-gray-100 pt-3">
          <p className="text-[12px] font-semibold text-[#25282B] mb-0.5">Персональный менеджер</p>
          <p className="text-[12px] text-gray-400">
            Для крупных объёмов — индивидуальные условия и сопровождение
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default BusinessPage;
