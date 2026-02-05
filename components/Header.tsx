import React from 'react';
import SupportButton from './SupportButton';
import { AppStep } from '../types';

interface Props {
  onLogoClick?: () => void;
  onLoginClick?: () => void;
  onMenuClick?: () => void;
  onNavigate?: (step: AppStep) => void;
  currentStep?: AppStep;
}

const Header: React.FC<Props> = ({ onLogoClick, onLoginClick, onMenuClick, onNavigate, currentStep = AppStep.HOME }) => {
  const nav = (step: AppStep) => {
    onNavigate?.(step);
    window.scrollTo(0, 0);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      {/* Top Navigation Bar */}
      <div className="hidden lg:block border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex space-x-8">
              <button onClick={() => nav(AppStep.INDIVIDUALS)} className={`text-[13px] font-bold h-10 flex items-center transition-colors border-b-2 ${currentStep === AppStep.INDIVIDUALS || currentStep === AppStep.HOME ? 'text-[#25282B] border-[#82C12D]' : 'text-gray-500 hover:text-[#82C12D] border-transparent'}`}>Частным лицам</button>
              <button onClick={() => nav(AppStep.BUSINESS)} className={`text-[13px] font-bold h-10 flex items-center transition-colors border-b-2 ${currentStep === AppStep.BUSINESS ? 'text-[#25282B] border-[#82C12D]' : 'text-gray-500 hover:text-[#82C12D] border-transparent'}`}>Бизнесу</button>
              <button onClick={() => nav(AppStep.ECOMMERCE)} className={`text-[13px] font-bold h-10 flex items-center transition-colors border-b-2 ${currentStep === AppStep.ECOMMERCE ? 'text-[#25282B] border-[#82C12D]' : 'text-gray-500 hover:text-[#82C12D] border-transparent'}`}>Интернет-магазинам</button>
              <button onClick={() => nav(AppStep.ABOUT)} className={`text-[13px] font-bold h-10 flex items-center transition-colors border-b-2 ${currentStep === AppStep.ABOUT ? 'text-[#25282B] border-[#82C12D]' : 'text-gray-500 hover:text-[#82C12D] border-transparent'}`}>О компании</button>
            </div>
            <div>
               <button onClick={() => nav(AppStep.BUSINESS)} className="text-[13px] font-bold text-[#25282B] flex items-center hover:text-[#82C12D] transition-colors">
                 <svg className="w-4 h-4 mr-2 text-[#82C12D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                 Отправляйте как юрлицо
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center cursor-pointer mr-8 md:mr-12" onClick={onLogoClick}>
            <img 
              src="https://posttrack.com/cdn/images/carriers/icons/0304-cdek.png" 
              alt="CDEK Logo" 
              className="h-8 md:h-10 w-auto object-contain" 
            />
          </div>
          
          <nav className="hidden xl:flex space-x-8">
            <button onClick={() => nav(AppStep.TRACK_PACKAGE)} className="text-[15px] font-bold text-[#25282B] hover:text-[#82C12D] transition">Отследить посылку</button>
            <button onClick={() => nav(AppStep.SEND_RECEIVE)} className="text-[15px] font-bold text-[#25282B] hover:text-[#82C12D] transition">Отправить или получить</button>
            <button onClick={() => nav(AppStep.SERVICES_PRODUCTS)} className="text-[15px] font-bold text-[#25282B] hover:text-[#82C12D] transition">Сервисы и продукты</button>
            <button onClick={() => nav(AppStep.CDEK_POINTS)} className="text-[15px] font-bold text-[#25282B] hover:text-[#82C12D] transition">Пункты CDEK</button>
            <button onClick={() => nav(AppStep.CAREER)} className="text-[15px] font-bold text-[#25282B] hover:text-[#82C12D] transition">Карьера</button>
            <SupportButton variant="header" />
          </nav>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
             <svg className="w-5 h-5 text-[#25282B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          
          <div className="hidden md:flex items-center space-x-2">
            <svg className="w-5 h-5 text-[#25282B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="text-[15px] font-bold text-[#25282B]">RU</span>
          </div>

          <button 
            onClick={onLoginClick}
            className="flex items-center space-x-2 bg-[#F2F3F5] hover:bg-[#e4e5e7] px-4 py-2.5 rounded-xl transition"
          >
            <svg className="w-5 h-5 text-[#25282B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
            <span className="text-[15px] font-bold text-[#25282B]">Войти</span>
          </button>

          <button 
            className="xl:hidden"
            onClick={onMenuClick}
          >
              <svg className="w-8 h-8 text-[#25282B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
