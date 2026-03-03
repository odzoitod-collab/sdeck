import React from 'react';
import { AppStep } from '../types';

interface Props {
  onLogoClick?: () => void;
  onLoginClick?: () => void;
  onMenuClick?: () => void;
  onNavigate?: (step: AppStep) => void;
  currentStep?: AppStep;
}

const Header: React.FC<Props> = ({ onLogoClick, onLoginClick, onMenuClick }) => {
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-50/80">
      <div className="px-4 h-[56px] flex items-center justify-between max-w-3xl mx-auto">
        {/* Логотип CDEK */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={onLogoClick}
        >
          <img
            src="https://posttrack.com/cdn/images/carriers/icons/0304-cdek.png"
            alt="CDEK"
            className="h-7 w-auto"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-[18px] font-black text-[#25282B] tracking-tight">CDEK</span>
        </div>

        {/* Правая часть: вход + гамбургер */}
        <div className="flex items-center gap-1">
          <button
            onClick={onLoginClick}
            className="btn-press flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold text-[#25282B] hover:bg-gray-50/70 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Войти
          </button>
          <button
            type="button"
            onClick={onMenuClick}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[4.5px] rounded-lg hover:bg-gray-50 transition"
            aria-label="Меню"
          >
            <span className="w-[18px] h-[1.5px] bg-[#25282B] rounded-full"/>
            <span className="w-[18px] h-[1.5px] bg-[#25282B] rounded-full"/>
            <span className="w-[18px] h-[1.5px] bg-[#25282B] rounded-full"/>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
