
import React from 'react';
import SupportButton from './SupportButton';
import { AppStep } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (step: AppStep) => void;
}

const MobileMenu: React.FC<Props> = ({ isOpen, onClose, onNavigate }) => {
  const handleNav = (step: AppStep) => {
    onNavigate(step);
    onClose();
    window.scrollTo(0, 0);
  };

  return (
    <>
        {/* Backdrop */}
        <div 
            className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        ></div>

        {/* Sidebar */}
        <div className={`fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <img 
                    src="https://posttrack.com/cdn/images/carriers/icons/0304-cdek.png" 
                    alt="CDEK" 
                    className="h-6 w-auto" 
                />
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
                <div className="space-y-1 mb-8">
                    <button onClick={() => handleNav(AppStep.INDIVIDUALS)} className="w-full text-left px-4 py-3 text-[#25282B] font-bold hover:bg-gray-50 rounded-xl transition">Частным лицам</button>
                    <button onClick={() => handleNav(AppStep.BUSINESS)} className="w-full text-left px-4 py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl hover:text-[#82C12D] transition">Бизнесу</button>
                    <button onClick={() => handleNav(AppStep.ECOMMERCE)} className="w-full text-left px-4 py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl hover:text-[#82C12D] transition">Интернет-магазинам</button>
                </div>

                <div className="space-y-1 border-t border-gray-100 pt-4">
                    <button onClick={() => handleNav(AppStep.TRACK_PACKAGE)} className="w-full text-left px-4 py-3 text-[#25282B] font-medium hover:bg-gray-50 rounded-xl transition">Отследить посылку</button>
                    <button onClick={() => handleNav(AppStep.SEND_RECEIVE)} className="w-full text-left px-4 py-3 text-[#25282B] font-medium hover:bg-gray-50 rounded-xl transition">Отправить или получить</button>
                    <button onClick={() => handleNav(AppStep.SERVICES_PRODUCTS)} className="w-full text-left px-4 py-3 text-[#25282B] font-medium hover:bg-gray-50 rounded-xl transition">Сервисы и продукты</button>
                    <button onClick={() => handleNav(AppStep.CDEK_POINTS)} className="w-full text-left px-4 py-3 text-[#25282B] font-medium hover:bg-gray-50 rounded-xl transition">Пункты CDEK</button>
                    <button onClick={() => handleNav(AppStep.CAREER)} className="w-full text-left px-4 py-3 text-[#25282B] font-medium hover:bg-gray-50 rounded-xl transition">Карьера</button>
                </div>
                
                {/* Кнопка поддержки в мобильном меню */}
                <div className="mt-6 px-4">
                    <SupportButton variant="inline" />
                </div>
            </div>
        </div>
    </>
  );
};

export default MobileMenu;
