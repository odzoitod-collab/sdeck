import React from 'react';
import SupportButton from '../SupportButton';

interface Props {
  onBack: () => void;
  onNavigateToPayment: () => void;
}

const SendReceivePage: React.FC<Props> = ({ onBack, onNavigateToPayment }) => {
  const steps = [
    { num: '1', title: 'Оформите заказ', desc: 'Укажите адреса отправителя и получателя, выберите тип доставки' },
    { num: '2', title: 'Оплатите доставку', desc: 'Картой, СБП или наличными в пункте выдачи' },
    { num: '3', title: 'Передайте посылку', desc: 'В пункт выдачи или дождитесь курьера' },
    { num: '4', title: 'Получите уведомление', desc: 'SMS придёт, когда посылка будет готова к выдаче' }
  ];

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#25282B] mb-4">Отправить или получить</h1>
        <p className="text-gray-600 text-lg">Пошаговая инструкция по отправке и получению посылок через СДЭК</p>
      </section>

      <div className="space-y-6 mb-12">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-6 bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition">
            <div className="w-14 h-14 bg-[#82C12D] text-white rounded-xl flex items-center justify-center font-black text-xl shrink-0">{s.num}</div>
            <div>
              <h3 className="text-lg font-bold text-[#25282B] mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0D3628] rounded-2xl p-8 text-white mb-8">
        <h2 className="text-xl font-bold mb-4">Способы отправки</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-white/90 mb-2">Пункт выдачи СДЭК</h3>
            <p className="text-white/80 text-sm">Привезите посылку в любой пункт выдачи. Сеть из 12 000+ точек по России.</p>
          </div>
          <div>
            <h3 className="font-bold text-white/90 mb-2">Курьер</h3>
            <p className="text-white/80 text-sm">Закажите забор по адресу. Курьер заберёт посылку в удобное время.</p>
          </div>
        </div>
      </div>

      <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-[#25282B] mb-4">Документы для получения</h2>
        <p className="text-gray-600 mb-4">Для получения посылки возьмите с собой паспорт или другой документ, удостоверяющий личность. С CDEK ID можно получать посылки по коду из SMS — без документов.</p>
        <button onClick={onNavigateToPayment} className="px-6 py-3 bg-[#82C12D] text-white font-bold rounded-xl hover:bg-[#72a927] transition">
          Оплатить доставку онлайн
        </button>
      </div>

      <SupportButton variant="inline" />
    </div>
  );
};

export default SendReceivePage;
