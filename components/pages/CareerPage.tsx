import React from 'react';
import SupportButton from '../SupportButton';

interface Props {
  onBack: () => void;
}

const CareerPage: React.FC<Props> = ({ onBack }) => {
  const vacancies = [
    { title: 'Курьер', city: 'Москва', type: 'Полная занятость' },
    { title: 'Менеджер по работе с клиентами', city: 'Санкт-Петербург', type: 'Полная занятость' },
    { title: 'Специалист склада', city: 'Екатеринбург', type: 'Полная занятость' },
    { title: 'Логист', city: 'Новосибирск', type: 'Полная занятость' },
    { title: 'Разработчик', city: 'Удалённо', type: 'Полная занятость' }
  ];

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <div className="bg-[#0D3628] rounded-2xl p-8 md:p-12 text-white mb-12 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-black mb-4">Карьера в СДЭК</h1>
          <p className="text-xl text-white/90">Присоединяйтесь к команде крупнейшей логистической компании. Мы растем и ищем талантливых людей.</p>
        </div>
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="text-4xl mb-4">📈</div>
          <h3 className="text-lg font-bold text-[#25282B] mb-2">Развитие</h3>
          <p className="text-gray-600 text-sm">Обучение, тренинги и карьерный рост</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-lg font-bold text-[#25282B] mb-2">Достойная зарплата</h3>
          <p className="text-gray-600 text-sm">Конкурентный уровень оплаты труда</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-bold text-[#25282B] mb-2">Команда</h3>
          <p className="text-gray-600 text-sm">Работа в дружном коллективе</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#25282B] mb-6">Открытые вакансии</h2>
      <div className="space-y-4 mb-12">
        {vacancies.map((v, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-[#82C12D]/20 transition">
            <div>
              <h3 className="text-lg font-bold text-[#25282B]">{v.title}</h3>
              <p className="text-sm text-gray-500">{v.city} · {v.type}</p>
            </div>
            <a href="https://career.cdek.ru" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#82C12D] text-white font-bold rounded-xl hover:bg-[#72a927] transition shrink-0">
              Откликнуться
            </a>
          </div>
        ))}
      </div>

      <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-[#25282B] mb-4">Связаться с HR</h2>
        <p className="text-gray-600 mb-4">Не нашли подходящую вакансию? Отправьте резюме в наш отдел кадров:</p>
        <a href="mailto:hr@cdek.ru" className="text-[#82C12D] font-bold hover:underline">hr@cdek.ru</a>
      </div>

      <div className="mt-8">
        <SupportButton variant="inline" />
      </div>
    </div>
  );
};

export default CareerPage;
