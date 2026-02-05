import React, { useState } from 'react';
import SupportButton from '../SupportButton';

interface Props {
  onBack: () => void;
}

const CdekPointsPage: React.FC<Props> = ({ onBack }) => {
  const [city, setCity] = useState('');
  const points = [
    { name: 'СДЭК Москва, ул. Тверская, 1', work: 'Пн–Вс 9:00–21:00', type: 'Пункт выдачи' },
    { name: 'СДЭК Санкт-Петербург, Невский пр., 28', work: 'Пн–Вс 8:00–22:00', type: 'Пункт выдачи' },
    { name: 'СДЭК Казань, ул. Баумана, 58', work: 'Пн–Сб 9:00–20:00', type: 'Пункт выдачи' },
    { name: 'СДЭК Екатеринбург, ул. Ленина, 52', work: 'Пн–Вс 10:00–20:00', type: 'Пункт выдачи' },
    { name: 'СДЭК Новосибирск, Красный пр., 77', work: 'Пн–Вс 9:00–21:00', type: 'Пункт выдачи' }
  ];

  return (
    <div className="animate-fadeIn">
      <button onClick={onBack} className="text-[#82C12D] font-bold text-sm mb-6 flex items-center hover:underline">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Назад
      </button>

      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#25282B] mb-4">Пункты СДЭК</h1>
        <p className="text-gray-600 text-lg">Найдите ближайший пункт выдачи или постамат в вашем городе</p>
      </section>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Введите город или адрес"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#82C12D] focus:ring-2 focus:ring-[#82C12D]/20 outline-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
          </div>
          <button className="px-6 py-3 bg-[#82C12D] text-white font-bold rounded-xl hover:bg-[#72a927] transition">
            Найти
          </button>
        </div>
      </div>

      <div className="bg-[#F9FAFB] rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-[#25282B] mb-4">Примеры пунктов выдачи</h2>
        <p className="text-gray-600 text-sm mb-6">Введите город выше для поиска. Ниже — примеры адресов в крупных городах:</p>
        <div className="space-y-4">
          {points.map((p, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100">
              <div>
                <h3 className="font-bold text-[#25282B]">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.type} · {p.work}</p>
              </div>
              <a href="https://www.cdek.ru/offices" target="_blank" rel="noopener noreferrer" className="text-[#82C12D] font-bold text-sm hover:underline shrink-0">
                На карте →
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#0D3628] rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">12 000+ пунктов</h3>
          <p className="text-white/80 text-sm">По всей России и странам СНГ</p>
        </div>
        <div className="bg-[#0D3628] rounded-2xl p-6 text-white">
          <h3 className="text-xl font-bold mb-2">Постаматы</h3>
          <p className="text-white/80 text-sm">Получение посылок 24/7 без очередей</p>
        </div>
      </div>

      <SupportButton variant="inline" />
    </div>
  );
};

export default CdekPointsPage;
