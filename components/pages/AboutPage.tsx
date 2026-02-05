import React from 'react';
import SupportButton from '../SupportButton';

interface Props {
  onBack: () => void;
}

const AboutPage: React.FC<Props> = ({ onBack }) => {
  const stats = [
    { value: '12 000+', label: 'Пунктов выдачи' },
    { value: '200+', label: 'Стран доставки' },
    { value: '25 лет', label: 'На рынке' },
    { value: '1 млн+', label: 'Отправлений в день' }
  ];

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#25282B] mb-4">О компании СДЭК</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          СДЭК — одна из крупнейших курьерских и логистических компаний России. Доставляем посылки по стране и миру с 2000 года.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#0D3628] rounded-2xl p-6 text-white text-center">
            <div className="text-2xl md:text-3xl font-black mb-1">{s.value}</div>
            <div className="text-sm text-white/80">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-8 mb-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#25282B] mb-4">Наша миссия</h2>
          <p className="text-gray-600 leading-relaxed">
            Сделать доставку быстрой, удобной и доступной для каждого. Мы стремимся к тому, чтобы каждый житель России мог легко отправить и получить посылку в любую точку страны и мира.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-[#25282B] mb-4">История</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Компания основана в 2000 году. Начав с доставки документов в Москве, СДЭК выросла в федеральную сеть с тысячами пунктов выдачи и развитой логистической инфраструктурой.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Сегодня СДЭК — это не только курьерская доставка, но и целая экосистема сервисов: СДЭК.Маркет, CDEK ID, международная доставка и многое другое.
          </p>
        </div>
      </div>

      <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-[#25282B] mb-4">Контакты</h2>
        <div className="space-y-3 text-gray-600">
          <p><strong>Телефон:</strong> <a href="tel:88002500405" className="text-[#82C12D] font-bold hover:underline">8 800 250-04-05</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@cdek.ru" className="text-[#82C12D] font-bold hover:underline">info@cdek.ru</a></p>
          <p><strong>Реквизиты:</strong> ООО «СДЭК-Глобал», ИНН 7722327677</p>
        </div>
      </div>

      <div className="mt-8">
        <SupportButton variant="inline" />
      </div>
    </div>
  );
};

export default AboutPage;
