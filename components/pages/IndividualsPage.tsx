import React from 'react';
import SupportButton from '../SupportButton';

interface Props {
  onBack: () => void;
  onTrackPackage: (number: string) => void;
  onNavigateToPayment: () => void;
  onNavigateToCdekId: () => void;
  onConnectCdekId: () => void;
}

const IndividualsPage: React.FC<Props> = ({
  onBack,
  onTrackPackage,
  onNavigateToPayment,
  onNavigateToCdekId,
  onConnectCdekId
}) => {
  const [trackingNumber, setTrackingNumber] = React.useState('');

  const handleTrack = () => {
    if (trackingNumber.trim()) onTrackPackage(trackingNumber.trim());
  };

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#25282B] mb-4">Сервисы для частных лиц</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Отправляйте и получайте посылки по всей России и за рубеж. Быстро, удобно и надёжно.
        </p>
      </section>

      {/* Отслеживание */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-[#25282B] mb-4">Отследить посылку</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Номер заказа (CDEK-xxx или 10 цифр)"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#82C12D] focus:ring-2 focus:ring-[#82C12D]/20 outline-none"
          />
          <button onClick={handleTrack} className="px-6 py-3 bg-[#82C12D] text-white font-bold rounded-xl hover:bg-[#72a927] transition">
            Отследить
          </button>
        </div>
      </div>

      {/* Карточки сервисов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div onClick={onNavigateToPayment} className="bg-[#0D3628] rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition group">
          <div className="text-2xl font-black mb-2">Онлайн-оплата</div>
          <p className="text-white/80 text-sm mb-4">Оплатите доставку картой или через СБП</p>
          <span className="inline-block border-b-2 border-white/30 group-hover:border-white transition">Перейти →</span>
        </div>
        <div onClick={onNavigateToCdekId} className="bg-[#0D3628] rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition group">
          <div className="text-2xl font-black mb-2">CDEK ID</div>
          <p className="text-white/80 text-sm mb-4">Получайте посылки без паспорта</p>
          <span className="inline-block border-b-2 border-white/30 group-hover:border-white transition">Подключить →</span>
        </div>
        <div onClick={onConnectCdekId} className="bg-[#82C12D] rounded-2xl p-6 text-white cursor-pointer hover:shadow-xl transition group">
          <div className="text-2xl font-black mb-2">Безопасная сделка</div>
          <p className="text-white/90 text-sm mb-4">Защита при покупке и продаже</p>
          <span className="inline-block border-b-2 border-white/50 group-hover:border-white transition">Узнать больше →</span>
        </div>
      </div>

      <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-[#25282B] mb-4">Почему выбирают СДЭК</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Более 12 000 пунктов выдачи по России</li>
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Доставка до 2 дней по крупным городам</li>
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Международная доставка в 200+ стран</li>
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Прозрачное отслеживание в реальном времени</li>
        </ul>
      </div>

      <div className="mt-8">
        <SupportButton variant="inline" />
      </div>
    </div>
  );
};

export default IndividualsPage;
