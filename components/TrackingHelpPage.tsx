
import React from 'react';

interface Props {
  onBack: () => void;
}

const TrackingHelpPage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 animate-fadeIn">
      <button onClick={onBack} className="text-[#8DC63F] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <h2 className="text-3xl font-black text-[#25282B] mb-6">Где найти номер заказа?</h2>
      
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-gray-100 rounded-xl p-4 w-full md:w-1/3 text-center">
                <div className="text-6xl mb-2">📱</div>
                <p className="font-bold text-[#25282B]">В SMS уведомлении</p>
            </div>
            <div className="w-full md:w-2/3">
                <h3 className="text-lg font-bold mb-2">SMS от CDEK</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    После оформления заказа вам придет SMS-сообщение. Номер накладной (трек-номер) обычно состоит из 10 цифр.
                </p>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-mono text-sm text-gray-500">
                    Ваш заказ <span className="font-bold text-[#25282B]">1250689930</span> принят к доставке. Ожидаемая дата: 25.10
                </div>
            </div>
        </div>

        <div className="w-full h-[1px] bg-gray-100"></div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-gray-100 rounded-xl p-4 w-full md:w-1/3 text-center">
                <div className="text-6xl mb-2">🧾</div>
                <p className="font-bold text-[#25282B]">В накладной</p>
            </div>
            <div className="w-full md:w-2/3">
                <h3 className="text-lg font-bold mb-2">Печатная накладная</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Номер находится в верхнем правом углу под штрихкодом.
                </p>
            </div>
        </div>

        <div className="w-full h-[1px] bg-gray-100"></div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-gray-100 rounded-xl p-4 w-full md:w-1/3 text-center">
                <div className="text-6xl mb-2">🛍️</div>
                <p className="font-bold text-[#25282B]">В интернет-магазине</p>
            </div>
            <div className="w-full md:w-2/3">
                <h3 className="text-lg font-bold mb-2">Личный кабинет магазина</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    Зайдите в раздел "Мои заказы" в магазине, где вы совершали покупку. Продавец обычно прикрепляет трек-номер для отслеживания.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingHelpPage;
