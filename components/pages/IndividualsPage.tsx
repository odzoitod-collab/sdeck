import React from 'react';

interface Props {
  onBack: () => void;
  onTrackPackage: (number: string) => void;
  onNavigateToPayment: () => void;
  onNavigateToCdekId: () => void;
  onConnectCdekId: () => void;
}

const services = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    ),
    title: 'Онлайн-оплата',
    desc: 'Картой или через СБП в один клик',
    key: 'pay',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"/>
      </svg>
    ),
    title: 'CDEK ID',
    desc: 'Получайте посылки без паспорта',
    key: 'cdekid',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: 'Безопасная сделка',
    desc: 'Защита при покупке и продаже',
    key: 'deal',
  },
];

const perks = [
  'Более 12 000 пунктов выдачи по России',
  'Доставка до 2 дней по крупным городам',
  'Международная доставка в 200+ стран',
  'Прозрачное отслеживание в реальном времени',
];

const IndividualsPage: React.FC<Props> = ({
  onBack,
  onNavigateToPayment,
  onNavigateToCdekId,
  onConnectCdekId,
}) => {
  const handleServiceClick = (key: string) => {
    if (key === 'pay') onNavigateToPayment();
    else if (key === 'cdekid') onNavigateToCdekId();
    else if (key === 'deal') onConnectCdekId();
  };

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

      <h1 className="text-[20px] font-black text-[#25282B] mb-1">Частным лицам</h1>
      <p className="text-[13px] text-gray-400 mb-6">
        Отправляйте и получайте посылки по России и за рубеж
      </p>

      {/* Сервисы */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {services.map(({ icon, title, desc, key }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleServiceClick(key)}
            className="btn-press text-left bg-white border border-gray-100 rounded-xl p-4 hover:border-[#8DC63F]/40 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] mb-3">
              {icon}
            </div>
            <h3 className="text-[13px] font-bold text-[#25282B] mb-1">{title}</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
          </button>
        ))}
      </div>

      {/* Почему CDEK */}
      <div className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-4">
        <h2 className="text-[14px] font-bold text-[#25282B] mb-3">Почему выбирают СДЭК</h2>
        <div className="space-y-2.5">
          {perks.map((p) => (
            <div key={p} className="flex items-center gap-2.5">
              <svg className="w-3.5 h-3.5 shrink-0 text-[#8DC63F]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-[12px] text-[#25282B]">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndividualsPage;
