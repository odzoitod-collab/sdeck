import React from 'react';
import SupportButton from '../SupportButton';

interface Props {
  onBack: () => void;
}

const EcommercePage: React.FC<Props> = ({ onBack }) => {
  const integrations = [
    { name: '1С-Битрикс', desc: 'Готовая интеграция для интернет-магазинов' },
    { name: 'Magento / OpenCart', desc: 'Модули для популярных CMS' },
    { name: 'API СДЭК', desc: 'Гибкая интеграция под любые системы' },
    { name: 'Marketplace', desc: 'Подключение к Ozon, Wildberries, Яндекс.Маркет' }
  ];

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#25282B] mb-4">Решения для интернет-магазинов</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          Встройте доставку СДЭК в ваш магазин: расчёт стоимости, печать накладных, отслеживание — всё в одном месте.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {integrations.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#82C12D]/20 transition">
            <h3 className="text-lg font-bold text-[#25282B] mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0D3628] rounded-2xl p-8 text-white mb-8">
        <h3 className="text-xl font-bold mb-4">Преимущества для магазинов</h3>
        <ul className="space-y-3 text-white/90">
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Автоматический расчёт стоимости доставки при оформлении</li>
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Печать накладных и этикеток из личного кабинета</li>
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Виджет отслеживания для вашего сайта</li>
          <li className="flex items-start"><span className="w-2 h-2 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>Безопасная сделка — защита покупателей и продавцов</li>
        </ul>
      </div>

      <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-[#25282B] mb-4">Подключение</h3>
        <p className="text-gray-600 mb-4">Для подключения вашего интернет-магазина к СДЭК обратитесь к нашим специалистам:</p>
        <a href="tel:88002500405" className="inline-block px-6 py-3 bg-[#82C12D] text-white font-bold rounded-xl hover:bg-[#72a927] transition">
          8 800 250-04-05
        </a>
      </div>

      <div className="mt-8">
        <SupportButton variant="inline" />
      </div>
    </div>
  );
};

export default EcommercePage;
