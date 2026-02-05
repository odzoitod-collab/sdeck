import React from 'react';
import SupportButton from '../SupportButton';

interface Props {
  onBack: () => void;
  onNavigateToCdekId: () => void;
  onNavigateToBaggage: () => void;
  onNavigateToPayment: () => void;
  onNavigateHome?: () => void;
}

const ServicesProductsPage: React.FC<Props> = ({
  onBack,
  onNavigateToCdekId,
  onNavigateToBaggage,
  onNavigateToPayment,
  onNavigateHome = () => {}
}) => {
  const services = [
    { title: 'CDEK ID', desc: 'Получайте посылки без паспорта, копите баллы', onClick: onNavigateToCdekId },
    { title: 'Онлайн-оплата', desc: 'Оплата картой или СБП', onClick: onNavigateToPayment },
    { title: 'Путешествуйте налегке', desc: 'Доставка багажа по России и ЕАЭС', onClick: onNavigateToBaggage },
    { title: 'СДЭК.Маркет', desc: 'Безопасные сделки между покупателем и продавцом', onClick: onNavigateHome },
    { title: 'Международная доставка', desc: 'Экспорт и импорт в 200+ стран', onClick: onNavigateHome },
    { title: 'CDEK.Pay', desc: 'Оплата доставки получателем', onClick: onNavigateHome }
  ];

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#25282B] mb-4">Сервисы и продукты</h1>
        <p className="text-gray-600 text-lg">Всё необходимое для отправки, получения и управления доставкой</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((s, i) => (
          <div
            key={i}
            onClick={s.onClick}
            className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#82C12D]/30 cursor-pointer transition group"
          >
            <h3 className="text-lg font-bold text-[#25282B] mb-2 group-hover:text-[#82C12D] transition">{s.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{s.desc}</p>
            <span className="text-[#82C12D] font-bold text-sm flex items-center">
              Подробнее
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </div>
        ))}
      </div>

      <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-[#25282B] mb-4">Дополнительные услуги</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Страхование груза</li>
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Упаковка в пунктах выдачи</li>
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Доставка в нестандартное время</li>
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Возврат и обмен</li>
        </ul>
      </div>

      <div className="mt-8">
        <SupportButton variant="inline" />
      </div>
    </div>
  );
};

export default ServicesProductsPage;
