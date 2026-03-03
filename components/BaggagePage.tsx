import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onNavigateToTrackPage?: () => void;
  onNavigateToPayment?: () => void;
}

const GREEN = '#8DC63F';
const CITIES = ['Москва', 'Санкт-Петербург', 'Новосибирск'];
const PACKAGE_SIZES = ['Маленькая (до 1 кг)', 'Средняя (1–5 кг)', 'Большая (5–30 кг)', 'Груз'];

const BaggagePage: React.FC<Props> = ({
  onBack,
  onNavigateToTrackPage,
  onNavigateToPayment,
}) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [packageSizeOpen, setPackageSizeOpen] = useState(false);
  const [packageSize, setPackageSize] = useState('');
  const [isLegalEntity, setIsLegalEntity] = useState(false);

  return (
    <div className="animate-fadeIn bg-white pb-24 px-4 max-w-3xl mx-auto pt-4 min-h-screen">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-[#25282B] mb-5 transition"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Назад
      </button>

      <h1 className="text-[20px] font-black text-[#25282B] mb-5">
        Рассчитать доставку
      </h1>

      {/* Откуда */}
      <div className="mb-4">
        <div className="border border-gray-200 rounded-xl bg-white focus-within:border-[#8DC63F] transition-colors">
          <input
            type="text"
            placeholder="Откуда"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="w-full px-4 py-3.5 text-[14px] text-[#25282B] placeholder:text-gray-400 bg-transparent outline-none rounded-xl"
          />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {CITIES.map((city) => (
            <button
              key={`from-${city}`}
              type="button"
              onClick={() => setFromCity(city)}
              className="text-[13px] text-gray-500 hover:text-[#8DC63F] underline underline-offset-2 transition"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Куда */}
      <div className="mb-4">
        <div className="border border-gray-200 rounded-xl bg-white focus-within:border-[#8DC63F] transition-colors">
          <input
            type="text"
            placeholder="Куда"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="w-full px-4 py-3.5 text-[14px] text-[#25282B] placeholder:text-gray-400 bg-transparent outline-none rounded-xl"
          />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
          {CITIES.map((city) => (
            <button
              key={`to-${city}`}
              type="button"
              onClick={() => setToCity(city)}
              className="text-[13px] text-gray-500 hover:text-[#8DC63F] underline underline-offset-2 transition"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Размер посылки — dropdown */}
      <div className="mb-4 relative">
        <button
          type="button"
          onClick={() => setPackageSizeOpen(!packageSizeOpen)}
          className="w-full flex items-center justify-between px-4 py-3.5 border border-gray-200 rounded-xl bg-white text-left text-[14px] text-[#25282B] placeholder:text-gray-400 focus:border-[#8DC63F] transition-colors"
        >
          <span className={packageSize ? '' : 'text-gray-400'}>
            {packageSize || 'Размер посылки'}
          </span>
          <svg
            className={`w-5 h-5 shrink-0 transition-transform ${packageSizeOpen ? 'rotate-180' : ''}`}
            style={{ color: GREEN }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
        {packageSizeOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
            {PACKAGE_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  setPackageSize(size);
                  setPackageSizeOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-[14px] text-[#25282B] hover:bg-[#F8F9FA] transition"
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Юридическое отправление — toggle */}
      <div className="flex items-center justify-between py-3 mb-6">
        <span className="text-[14px] text-[#25282B] font-medium">
          Юридическое отправление
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isLegalEntity}
          onClick={() => setIsLegalEntity(!isLegalEntity)}
          className={`relative w-11 h-6 rounded-full transition-colors ${isLegalEntity ? 'bg-[#8DC63F]' : 'bg-gray-200'}`}
        >
          <span
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${isLegalEntity ? 'left-6' : 'left-1'}`}
          />
        </button>
      </div>

      {/* Кнопка РАССЧИТАТЬ */}
      <button
        type="button"
        className="btn-press w-full py-4 bg-[#8DC63F] hover:bg-[#72a930] text-white font-bold text-[14px] uppercase tracking-wide rounded-xl transition-colors mb-8"
      >
        Рассчитать
      </button>

      {/* Две карточки внизу */}
      <div className="grid grid-cols-2 gap-3">
        {/* Отследить посылку */}
        <button
          type="button"
          onClick={onNavigateToTrackPage}
          className="btn-press rounded-2xl overflow-hidden relative text-left min-h-[100px]"
          style={{
            background: 'linear-gradient(145deg, #E0E8F5 0%, #D0DAF0 100%)',
          }}
        >
          <div className="p-4 relative z-10">
            <p className="text-[15px] font-black text-[#25282B] leading-tight">
              Отследить посылку
            </p>
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 flex items-end justify-end opacity-90">
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
              <path d="M20 48 L20 20 L44 20 L44 48 Z" fill="#E53E3E" stroke="#C53030" strokeWidth="1.5"/>
              <path d="M32 12 L32 20 L36 16 L32 20 L28 16 Z" fill="#E53E3E" stroke="#C53030" strokeWidth="1"/>
            </svg>
          </div>
        </button>

        {/* Оплатить посылку */}
        <button
          type="button"
          onClick={onNavigateToPayment}
          className="btn-press rounded-2xl overflow-hidden relative text-left min-h-[100px]"
          style={{
            background: 'linear-gradient(145deg, #FCE8E8 0%, #F5D5D5 100%)',
          }}
        >
          <div className="p-4 relative z-10">
            <p className="text-[15px] font-black text-[#25282B] leading-tight">
              Оплатить посылку
            </p>
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16 flex items-end justify-end opacity-90">
            <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
              <rect x="12" y="18" width="40" height="28" rx="3" fill="#E53E3E" stroke="#C53030" strokeWidth="1.5"/>
              <rect x="16" y="24" width="32" height="4" rx="1" fill="#FFF" opacity="0.9"/>
              <rect x="16" y="32" width="20" height="3" rx="1" fill="#FFF" opacity="0.6"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BaggagePage;
