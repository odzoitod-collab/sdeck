import React from 'react';
import { AppStep } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (step: AppStep) => void;
}

const menuItems: {
  step: AppStep;
  label: string;
  icon: React.ReactNode;
  group?: string;
}[] = [
  {
    step: AppStep.INDIVIDUALS,
    label: 'Частным лицам',
    group: 'Клиентам',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
    ),
  },
  {
    step: AppStep.BUSINESS,
    label: 'Бизнесу',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1"/>
      </svg>
    ),
  },
  {
    step: AppStep.ECOMMERCE,
    label: 'Интернет-магазинам',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
    ),
  },
  {
    step: AppStep.TRACK_PACKAGE,
    label: 'Отследить посылку',
    group: 'Услуги',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
      </svg>
    ),
  },
  {
    step: AppStep.ONLINE_PAYMENT_SEARCH,
    label: 'Онлайн-оплата',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    ),
  },
  {
    step: AppStep.SEND_RECEIVE,
    label: 'Отправить или получить',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    ),
  },
  {
    step: AppStep.SERVICES_PRODUCTS,
    label: 'Сервисы и продукты',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
      </svg>
    ),
  },
  {
    step: AppStep.CDEK_POINTS,
    label: 'Пункты CDEK',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  {
    step: AppStep.CAREER,
    label: 'Карьера',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
];

const MobileMenu: React.FC<Props> = ({ isOpen, onClose, onNavigate }) => {
  const handleNav = (step: AppStep) => {
    onNavigate(step);
    onClose();
    window.scrollTo(0, 0);
  };

  const groups = Array.from(new Set(menuItems.map((i) => i.group || ''))).filter(Boolean);
  const ungrouped = menuItems.filter((i) => !i.group);

  const renderGroup = (group: string) => {
    const items = menuItems.filter((i) => i.group === group);
    return (
      <div key={group} className="mb-4">
        <p className="px-4 mb-1 text-[11px] font-bold uppercase tracking-widest text-gray-300">{group}</p>
        {items.map((item) => (
          <button
            key={item.step}
            onClick={() => handleNav(item.step)}
            className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-[#1C2024] hover:bg-gray-50/80 rounded-xl transition text-left"
          >
            <span className="text-gray-300 shrink-0">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-250 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 w-[300px] bg-white z-[70] shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50/80">
          <div className="flex items-center gap-1.5">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M7 11h6l2 3-2 3H7l2-3-2-3z" fill="white"/>
              <path d="M15 11h4v2h3v2h-3v2h-4v-6z" fill="white"/>
              <path d="M23 11h2v6h-2v-6z" fill="white"/>
            </svg>
            <span className="text-[18px] font-black text-[#1C2024]">CDEK</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-300 hover:bg-gray-50 hover:text-gray-500 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          {groups.map(renderGroup)}
          {ungrouped.length > 0 && (
            <div>
              {ungrouped.map((item) => (
                <button
                  key={item.step}
                  onClick={() => handleNav(item.step)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-[#1C2024] hover:bg-gray-50/80 rounded-xl transition text-left"
                >
                  <span className="text-gray-300 shrink-0">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom contact — без верхней рамки, лёгкий фон */}
        <div className="bg-gray-50/50 px-5 py-4">
          <p className="text-[13px] font-bold text-[#25282B]">8 800 250-04-05</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Бесплатно по России, 24/7</p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
