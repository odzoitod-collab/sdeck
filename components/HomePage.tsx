import React, { useState } from 'react';

interface Props {
  onNavigateToPayment: () => void;
  onNavigateToTrackingHelp: () => void;
  onNavigateToCdekId: () => void;
  onNavigateToBaggage: () => void;
  onConnectCdekId: () => void;
  onTrackPackage: (trackingNumber: string) => void;
  onNavigateToTrackPage?: () => void;
}

const CITIES = ['Москва', 'Санкт-Петербург', 'Новосибирск'];

const PACKAGE_SIZES = [
  'Маленькая (до 1 кг)',
  'Средняя (1–5 кг)',
  'Большая (5–30 кг)',
  'Груз',
];

const HomePage: React.FC<Props> = ({
  onNavigateToBaggage,
  onNavigateToTrackPage,
  onNavigateToPayment,
  onNavigateToCdekId,
  onNavigateToTrackingHelp,
  onConnectCdekId,
}) => {
  const [bannerClosed, setBannerClosed] = useState(false);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [packageSize, setPackageSize] = useState('');
  const [packageSizeOpen, setPackageSizeOpen] = useState(false);
  const [isLegalEntity, setIsLegalEntity] = useState(false);

  const handleCityFrom = (city: string) => setFromCity(city);
  const handleCityTo = (city: string) => setToCity(city);
  const handleCalculate = () => {
    onNavigateToBaggage();
  };

  return (
    <div className="pb-16 bg-white min-h-screen">
      <div className="px-4 max-w-3xl mx-auto pt-4">
        {/* Информационный баннер — закрывается по X */}
        {!bannerClosed && (
          <div className="flex items-center gap-3 rounded-xl bg-[#F5F5F5] border border-gray-100 px-4 py-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-bold">i</span>
            </div>
            <p className="text-[13px] text-[#25282B] flex-1">
              График работы 8 и 9 марта
            </p>
            <button
              type="button"
              onClick={() => setBannerClosed(true)}
              className="text-gray-400 hover:text-gray-600 p-1 shrink-0"
              aria-label="Закрыть"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        )}

        {/* Промо: Интеграция с маркетплейсами */}
        <section
          onClick={onNavigateToBaggage}
          className="btn-press rounded-2xl overflow-hidden relative cursor-pointer mb-6 flex flex-col justify-end"
          style={{
            background: 'linear-gradient(165deg, #E8E0F5 0%, #D4C8EC 50%, #E0D8F0 100%)',
            minHeight: 160,
          }}
        >
          <img
            src="https://www.cdek.ru/storage/source/components/Universal/4784/1/KIGC6o69bTp_ajNqGEyNGVOcBj9NDkE_.webp"
            alt="Интеграция с маркетплейсами"
            className="absolute right-0 bottom-0 w-[50%] max-w-[200px] h-[110px] object-contain object-right-bottom pointer-events-none"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="relative z-10 p-5 pb-6">
            <h2 className="text-[18px] font-black text-[#25282B] mb-1.5">
              Интеграция с маркетплейсами
            </h2>
            <p className="text-[13px] text-[#4A5568] leading-snug max-w-[220px]">
              Автоматически передает информацию о заказах фулфилменту СДЭК
            </p>
          </div>
        </section>

        {/* Рассчитать доставку — виджет как на cdek.ru */}
        <section className="rounded-2xl border border-gray-100 bg-white overflow-hidden mb-6">
          <h2 className="text-[18px] font-black text-[#25282B] px-4 pt-4 pb-3">
            Рассчитать доставку
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-4">
            {/* Откуда */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Откуда
              </label>
              <div className="border border-gray-200 rounded-xl bg-white focus-within:border-[#8DC63F] transition-colors">
                <input
                  type="text"
                  placeholder="Город"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full px-3 py-3 text-[14px] text-[#25282B] placeholder:text-gray-400 bg-transparent outline-none rounded-xl"
                />
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5">
                {CITIES.map((city) => (
                  <button
                    key={`from-${city}`}
                    type="button"
                    onClick={() => handleCityFrom(city)}
                    className="text-[12px] text-gray-500 hover:text-[#8DC63F] underline underline-offset-1 transition"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Куда */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Куда
              </label>
              <div className="border border-gray-200 rounded-xl bg-white focus-within:border-[#8DC63F] transition-colors">
                <input
                  type="text"
                  placeholder="Город"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full px-3 py-3 text-[14px] text-[#25282B] placeholder:text-gray-400 bg-transparent outline-none rounded-xl"
                />
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5">
                {CITIES.map((city) => (
                  <button
                    key={`to-${city}`}
                    type="button"
                    onClick={() => handleCityTo(city)}
                    className="text-[12px] text-gray-500 hover:text-[#8DC63F] underline underline-offset-1 transition"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Размер посылки */}
            <div className="relative">
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Размер посылки
              </label>
              <button
                type="button"
                onClick={() => setPackageSizeOpen((v) => !v)}
                className="w-full flex items-center justify-between px-3 py-3 border border-gray-200 rounded-xl bg-white text-left text-[14px] text-[#25282B] placeholder:text-gray-400 focus:border-[#8DC63F] transition-colors"
              >
                <span className={packageSize ? 'text-[#25282B]' : 'text-gray-400'}>
                  {packageSize || 'Выберите'}
                </span>
                <svg
                  className={`w-5 h-5 shrink-0 text-[#8DC63F] transition-transform ${packageSizeOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m6 15 6-6 6 6" />
                </svg>
              </button>
              {packageSizeOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                  {PACKAGE_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setPackageSize(size);
                        setPackageSizeOpen(false);
                      }}
                      className="w-full px-3 py-2.5 text-left text-[13px] text-[#25282B] hover:bg-[#F8F9FA] transition"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Юридическое отправление */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-50">
            <span className="text-[13px] font-medium text-[#25282B]">
              Юридическое отправление
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isLegalEntity}
              onClick={() => setIsLegalEntity((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors ${isLegalEntity ? 'bg-[#8DC63F]' : 'bg-gray-200'}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${isLegalEntity ? 'left-6' : 'left-1'}`}
              />
            </button>
          </div>

          {/* Кнопка Рассчитать */}
          <div className="px-4 pb-4 pt-1">
            <button
              type="button"
              onClick={handleCalculate}
              className="btn-press w-full py-3.5 bg-[#8DC63F] hover:bg-[#72a930] text-white font-bold text-[14px] rounded-xl transition-colors"
            >
              Рассчитать
            </button>
          </div>
        </section>

        {/* Быстрые действия — под низом */}
        <section className="mt-8 pt-6 border-t border-gray-100">
          <h2 className="text-[14px] font-black text-[#25282B] mb-3">Сервисы</h2>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={onNavigateToTrackPage}
              className="btn-press flex flex-col items-center gap-2 py-3.5 px-2 bg-white border border-gray-100 rounded-xl hover:border-[#8DC63F]/50 transition-all"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#8DC63F]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-[#25282B] text-center leading-tight">Отследить</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToPayment}
              className="btn-press flex flex-col items-center gap-2 py-3.5 px-2 bg-white border border-gray-100 rounded-xl hover:border-[#8DC63F]/50 transition-all"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#8DC63F]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-[#25282B] text-center leading-tight">Оплатить</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToCdekId}
              className="btn-press flex flex-col items-center gap-2 py-3.5 px-2 bg-white border border-gray-100 rounded-xl hover:border-[#8DC63F]/50 transition-all"
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center text-[#8DC63F]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-[#25282B] text-center leading-tight">ПВЗ</span>
            </button>
          </div>
        </section>

        {/* Статистика */}
        <section className="mt-6">
          <div className="bg-[#F8F9FA] rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '900+', label: 'городов доставки' },
              { value: '40 000+', label: 'пунктов выдачи' },
              { value: '99.8%', label: 'доставок в срок' },
              { value: '24/7', label: 'поддержка' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center py-1">
                <p className="text-[18px] font-black text-[#25282B] leading-none">{value}</p>
                <p className="text-[10px] text-gray-400 font-medium leading-tight mt-1">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Документы для получения */}
        <section className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[14px] font-black text-[#25282B]">Документы для получения</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {[
              'Паспорт гражданина РФ',
              'Временное удостоверение (форма 2П)',
              'Военный билет',
            ].map((doc, i, arr) => (
              <div
                key={doc}
                className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <svg className="w-3.5 h-3.5 shrink-0 text-[#8DC63F]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span className="text-[12px] text-[#25282B] font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CDEK ID — компактный баннер */}
        <section className="mt-6 mb-8">
          <div
            onClick={onConnectCdekId}
            className="btn-press rounded-xl border-2 border-[#8DC63F]/30 bg-[#8DC63F]/05 p-4 flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8DC63F] mb-0.5">CDEK ID</p>
              <p className="text-[14px] font-black text-[#25282B] leading-snug">Посылки без паспорта</p>
              <p className="text-[11px] text-gray-400 mt-0.5">Бесплатно + 50 баллов</p>
            </div>
            <span className="shrink-0 text-[12px] font-bold text-[#8DC63F] border border-[#8DC63F] rounded-lg px-3 py-1.5">
              Подключить
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
