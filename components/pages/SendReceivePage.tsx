import React from 'react';

interface Props {
  onBack: () => void;
  onNavigateToPayment: () => void;
}

const STEPS = [
  {
    num: '1',
    title: 'Оформите заказ',
    desc: 'Укажите адреса отправителя и получателя, выберите тип доставки',
  },
  {
    num: '2',
    title: 'Оплатите доставку',
    desc: 'Картой, СБП или наличными в пункте выдачи',
  },
  {
    num: '3',
    title: 'Передайте посылку',
    desc: 'В пункт выдачи или дождитесь курьера дома',
  },
  {
    num: '4',
    title: 'Получите уведомление',
    desc: 'SMS придёт, когда посылка будет готова к выдаче',
  },
];

const SendReceivePage: React.FC<Props> = ({ onBack, onNavigateToPayment }) => (
  <div className="animate-fadeIn bg-white pb-24 xl:pb-8 px-4 max-w-3xl mx-auto pt-4">
    <button
      onClick={onBack}
      className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-[#25282B] mb-5 transition"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
      Назад
    </button>

    <h1 className="text-[20px] font-black text-[#25282B] mb-1">Отправить или получить</h1>
    <p className="text-[13px] text-gray-400 mb-6">
      Пошаговая инструкция по отправке и получению посылок
    </p>

    {/* Шаги */}
    <div className="space-y-3 mb-6">
      {STEPS.map(({ num, title, desc }) => (
        <div key={num} className="flex gap-3 bg-white border border-gray-100 rounded-xl p-4">
          <div className="w-8 h-8 bg-[#8DC63F] text-white rounded-lg flex items-center justify-center font-black text-[14px] shrink-0">
            {num}
          </div>
          <div className="pt-0.5">
            <h3 className="text-[13px] font-bold text-[#25282B] mb-0.5">{title}</h3>
            <p className="text-[12px] text-gray-400 leading-relaxed">{desc}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Способы отправки */}
    <div className="grid grid-cols-2 gap-3 mb-6">
      <div className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-4">
        <div className="w-9 h-9 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
        <h3 className="text-[13px] font-bold text-[#25282B] mb-1">Пункт выдачи</h3>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Привезите посылку в любой из 12 000+ ПВЗ
        </p>
      </div>
      <div className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-4">
        <div className="w-9 h-9 rounded-lg bg-[#8DC63F]/10 flex items-center justify-center text-[#8DC63F] mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
        </div>
        <h3 className="text-[13px] font-bold text-[#25282B] mb-1">Курьер</h3>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Забор по адресу в удобное время
        </p>
      </div>
    </div>

    {/* Документы для получения */}
    <div className="bg-[#F8F9FA] rounded-xl border border-gray-100 p-4">
      <h2 className="text-[14px] font-bold text-[#25282B] mb-2">Документы для получения</h2>
      <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
        Возьмите паспорт или документ, удостоверяющий личность. С CDEK ID — получение по коду из SMS без документов.
      </p>
      <button
        onClick={onNavigateToPayment}
        className="btn-press w-full bg-[#8DC63F] hover:bg-[#72a930] text-white rounded-xl py-3 text-[13px] font-bold transition"
      >
        Оплатить доставку онлайн
      </button>
    </div>
  </div>
);

export default SendReceivePage;
