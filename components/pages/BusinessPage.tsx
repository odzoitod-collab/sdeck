import React from 'react';
import SupportButton from '../SupportButton';

interface Props {
  onBack: () => void;
}

const BusinessPage: React.FC<Props> = ({ onBack }) => {
  const features = [
    { icon: '📦', title: 'Массовые отправки', desc: 'Интеграция с 1С, CRM и складскими системами' },
    { icon: '🚚', title: 'Курьерская доставка', desc: 'Забор и доставка по адресу в день заказа' },
    { icon: '🏪', title: 'Пункты выдачи', desc: 'Сеть из 12 000+ ПВЗ по всей России' },
    { icon: '🌍', title: 'Международная логистика', desc: 'Экспорт и импорт в 200+ стран мира' },
    { icon: '📊', title: 'Аналитика и отчётность', desc: 'Детальная статистика по отправкам' },
    { icon: '💳', title: 'Отсрочка платежа', desc: 'Удобные условия для корпоративных клиентов' }
  ];

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <div className="bg-[#0D3628] rounded-2xl p-8 md:p-12 text-white mb-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Логистика для бизнеса</h1>
          <p className="text-xl text-white/90">Полный комплекс услуг доставки: от мелких отправок до крупных партий. Интеграции, API, индивидуальные условия.</p>
        </div>
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <h2 className="text-2xl font-bold text-[#25282B] mb-6">Услуги для компаний</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {features.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#82C12D]/20 transition">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-lg font-bold text-[#25282B] mb-2">{f.title}</h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100 mb-8">
        <h3 className="text-xl font-bold text-[#25282B] mb-4">Подключение к СДЭК</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Онлайн</h4>
            <p className="text-gray-600 text-sm mb-2">Зарегистрируйтесь на сайте и начните отправлять уже сегодня</p>
            <a href="tel:88002500405" className="text-[#82C12D] font-bold hover:underline">8 800 250-04-05</a>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Персональный менеджер</h4>
            <p className="text-gray-600 text-sm">Для крупных объёмов — индивидуальные условия и сопровождение</p>
          </div>
        </div>
      </div>

      <SupportButton variant="inline" />
    </div>
  );
};

export default BusinessPage;
