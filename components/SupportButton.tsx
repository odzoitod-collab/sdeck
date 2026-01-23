import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Props {
  className?: string;
  variant?: 'header' | 'floating' | 'inline';
}

const SupportButton: React.FC<Props> = ({ className = '', variant = 'floating' }) => {
  const [supportUsername, setSupportUsername] = useState<string>('@support');
  const [loading, setLoading] = useState(true);

  // Инициализация Supabase клиента
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl || '', supabaseKey || '');

  useEffect(() => {
    fetchSupportUsername();
  }, []);

  const fetchSupportUsername = async () => {
    try {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('value')
        .eq('key', 'support_username')
        .single();

      if (data && data.value) {
        setSupportUsername(data.value);
      }
    } catch (err) {
      console.error('Error fetching support username:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSupportClick = () => {
    const telegramUrl = `https://t.me/${supportUsername.replace('@', '')}`;
    window.open(telegramUrl, '_blank');
  };

  if (loading) {
    return null; // Или показать скелетон
  }

  // Вариант для хедера
  if (variant === 'header') {
    return (
      <button
        onClick={handleSupportClick}
        className={`flex items-center space-x-2 text-[#25282B] hover:text-[#82C12D] transition-colors ${className}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span className="text-[15px] font-bold">Поддержка</span>
      </button>
    );
  }

  // Вариант для встраивания в контент
  if (variant === 'inline') {
    return (
      <button
        onClick={handleSupportClick}
        className={`flex items-center space-x-3 w-full p-4 bg-gradient-to-r from-[#82C12D]/10 to-[#82C12D]/5 rounded-xl border border-[#82C12D]/20 hover:from-[#82C12D]/20 hover:to-[#82C12D]/10 transition-all group ${className}`}
      >
        <div className="w-12 h-12 bg-[#82C12D] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </div>
        <div className="text-left">
          <h3 className="font-bold text-[#25282B] group-hover:text-[#82C12D] transition-colors">Техподдержка</h3>
          <p className="text-sm text-gray-600">Напишите нам в Telegram: <span className="font-mono font-bold text-[#82C12D]">{supportUsername}</span></p>
        </div>
        <svg className="w-5 h-5 text-[#82C12D] ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </button>
    );
  }

  // Плавающая кнопка (по умолчанию)
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <button
        onClick={handleSupportClick}
        className="group bg-[#82C12D] hover:bg-[#72a927] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center space-x-3"
        title={`Написать в поддержку ${supportUsername}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span className="hidden group-hover:block text-sm font-bold whitespace-nowrap">
          Поддержка
        </span>
      </button>
    </div>
  );
};

export default SupportButton;