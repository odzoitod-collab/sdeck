
import React from 'react';

interface Props {
  title: string;
  onBack: () => void;
}

const StubPage: React.FC<Props> = ({ title, onBack }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 animate-fadeIn text-center min-h-[400px] flex flex-col">
      <button onClick={onBack} className="self-start text-gray-400 font-bold text-sm mb-8 flex items-center hover:text-[#25282B] transition">
         <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
         Назад
      </button>
      
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>

        <h2 className="text-3xl font-black text-[#25282B] mb-4">{title}</h2>
        <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
            Этот раздел находится в разработке. Мы работаем над тем, чтобы сделать его максимально полезным для вас.
        </p>
        
        <button onClick={onBack} className="mt-8 px-8 py-3 bg-[#F2F3F5] text-[#25282B] font-bold rounded-xl hover:bg-gray-200 transition">
            На главную
        </button>
      </div>
    </div>
  );
};

export default StubPage;
