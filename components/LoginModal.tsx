
import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'PRIVATE' | 'LEGAL'>('PRIVATE');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fadeIn">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-8">
            <h2 className="text-2xl font-black text-[#25282B] mb-6">Вход в CDEK ID</h2>
            
            <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                <button 
                    onClick={() => setActiveTab('PRIVATE')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                        activeTab === 'PRIVATE' 
                        ? 'bg-white text-[#25282B] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Частное лицо
                </button>
                <button 
                    onClick={() => setActiveTab('LEGAL')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                        activeTab === 'LEGAL' 
                        ? 'bg-white text-[#25282B] shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Юр. лицо
                </button>
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Электронная почта</label>
                    <input 
                        type="email" 
                        placeholder="example@mail.ru"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/10 outline-none transition-all font-medium"
                    />
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Пароль</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:border-[#8DC63F] focus:ring-4 focus:ring-[#8DC63F]/10 outline-none transition-all font-medium"
                    />
                </div>

                <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-[#8DC63F] focus:ring-[#8DC63F]" />
                        <span className="text-gray-500">Запомнить меня</span>
                    </label>
                    <a href="#" className="text-[#8DC63F] font-bold hover:underline">Забыли пароль?</a>
                </div>

                <button className="w-full h-12 bg-[#8DC63F] text-white font-bold rounded-xl hover:bg-[#72a930] transition-all shadow-lg shadow-[#8DC63F]/20 mt-4">
                    Войти
                </button>
            </form>
            
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    Нет аккаунта? <a href="#" className="text-[#8DC63F] font-bold hover:underline">Зарегистрироваться</a>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
