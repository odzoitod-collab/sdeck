import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

const SAMPLE_POINTS = [
  { name: 'ул. Тверская, 1', city: 'Москва', work: 'Пн–Вс 9:00–21:00' },
  { name: 'Невский пр., 28', city: 'Санкт-Петербург', work: 'Пн–Вс 8:00–22:00' },
  { name: 'ул. Баумана, 58', city: 'Казань', work: 'Пн–Сб 9:00–20:00' },
  { name: 'ул. Ленина, 52', city: 'Екатеринбург', work: 'Пн–Вс 10:00–20:00' },
  { name: 'Красный пр., 77', city: 'Новосибирск', work: 'Пн–Вс 9:00–21:00' },
];

const CdekPointsPage: React.FC<Props> = ({ onBack }) => {
  const [city, setCity] = useState('');

  return (
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

      <h1 className="text-[20px] font-black text-[#25282B] mb-1">Пункты СДЭК</h1>
      <p className="text-[13px] text-gray-400 mb-5">
        Найдите ближайший пункт выдачи или постамат
      </p>

      {/* Поиск */}
      <div className="flex gap-2 mb-5">
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-xl px-3 bg-white focus-within:border-[#8DC63F] transition-colors">
          <svg className="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Город или адрес"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 h-11 text-[14px] text-[#25282B] placeholder:text-gray-300 bg-transparent font-medium"
          />
        </div>
        <button className="btn-press h-11 px-4 bg-[#8DC63F] hover:bg-[#72a930] text-white font-bold text-[13px] rounded-xl transition-colors shrink-0">
          Найти
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-100 text-center">
          <p className="text-[22px] font-black text-[#25282B]">12 000+</p>
          <p className="text-[11px] text-gray-400 mt-0.5">пунктов по России и СНГ</p>
        </div>
        <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-100 text-center">
          <p className="text-[22px] font-black text-[#25282B]">24/7</p>
          <p className="text-[11px] text-gray-400 mt-0.5">постаматы без очередей</p>
        </div>
      </div>

      {/* Список ПВЗ */}
      <h2 className="text-[13px] font-bold text-[#25282B] mb-3">Примеры пунктов выдачи</h2>
      <div className="space-y-2">
        {SAMPLE_POINTS.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between gap-3 bg-white border border-gray-100 rounded-xl p-3.5"
          >
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-[#25282B] truncate">
                СДЭК {p.city}, {p.name}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">Пункт выдачи · {p.work}</p>
            </div>
            <a
              href="https://www.cdek.ru/offices"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[12px] font-bold text-[#8DC63F] hover:underline"
            >
              Карта →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CdekPointsPage;
