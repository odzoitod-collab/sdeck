import React from 'react';
import { AppStep } from '../types';

interface Props {
  onNavigate?: (step: AppStep) => void;
}

const Footer: React.FC<Props> = ({ onNavigate }) => {
  const nav = (step: AppStep) => {
    onNavigate?.(step);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-[#F8F9FA] border-t border-gray-100 pt-10 pb-8 mt-10">
      <div className="px-4 max-w-3xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 mb-3">
              <img
                src="https://posttrack.com/cdn/images/carriers/icons/0304-cdek.png"
                alt="CDEK"
                className="h-6 w-auto"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <span className="text-[16px] font-black text-[#25282B]">CDEK</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed max-w-[180px]">
              Логистические решения для бизнеса и частных лиц. Доставка по России и за рубеж.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Услуги</h4>
            <ul className="space-y-2.5">
              {[
                { step: AppStep.CDEK_ID_INFO, label: 'CDEK ID' },
                { step: AppStep.HOME, label: 'СДЭК.Маркет' },
                { step: AppStep.SERVICES_PRODUCTS, label: 'Международная доставка' },
                { step: AppStep.SERVICES_PRODUCTS, label: 'CDEK.Pay' },
              ].map(({ step, label }) => (
                <li key={label}>
                  <button
                    onClick={() => nav(step)}
                    className="text-[12px] text-gray-500 hover:text-[#25282B] transition font-medium text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Помощь</h4>
            <ul className="space-y-2.5">
              {[
                { step: AppStep.TRACKING_HELP, label: 'Центр поддержки' },
                { step: AppStep.TRACKING_HELP, label: 'Вопросы и ответы' },
                { step: AppStep.BUSINESS, label: 'Стать партнером' },
                { step: AppStep.ABOUT, label: 'Политика конфиденциальности' },
              ].map(({ step, label }) => (
                <li key={label}>
                  <button
                    onClick={() => nav(step)}
                    className="text-[12px] text-gray-500 hover:text-[#25282B] transition font-medium text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Контакты</h4>
            <div className="space-y-2.5">
              <div>
                <p className="text-[14px] font-bold text-[#25282B]">8 800 250-04-05</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Бесплатно, 24/7</p>
              </div>
              <p className="text-[12px] text-gray-500">info@cdek.ru</p>
              <div className="flex gap-2 pt-1">
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-[#8DC63F] flex items-center justify-center transition"
                  aria-label="ВКонтакте"
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.52c-.58 0-.76-.47-1.79-1.52-.9-.87-1.29-.99-1.52-.99-.3 0-.39.09-.39.52v1.39c0 .37-.12.59-1.12.59-1.64 0-3.46-.99-4.73-2.83C5.59 10.82 5 8.77 5 8.4c0-.23.09-.44.52-.44h1.52c.39 0 .53.17.69.61.77 2.22 2.06 4.16 2.59 4.16.2 0 .29-.09.29-.59V9.86c-.06-1.06-.62-1.15-.62-1.53 0-.18.15-.36.39-.36h2.39c.32 0 .44.17.44.56v2.99c0 .32.15.44.24.44.2 0 .37-.12.74-.5 1.15-1.28 1.96-3.26 1.96-3.26.11-.23.29-.44.68-.44h1.52c.46 0 .56.23.46.56-.19.88-2.05 3.51-2.05 3.51-.16.26-.22.38 0 .67.16.21.69.67 1.04 1.08.65.73 1.14 1.34 1.27 1.76.13.41-.09.62-.5.62z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:border-[#8DC63F] flex items-center justify-center transition"
                  aria-label="Telegram"
                >
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 6.888l-1.69 7.963c-.127.564-.458.702-.928.437l-2.56-1.887-1.234 1.188c-.136.136-.25.25-.513.25l.183-2.598 4.72-4.265c.205-.183-.045-.284-.317-.101l-5.83 3.67-2.51-.784c-.547-.17-.557-.547.114-.808l9.79-3.776c.456-.165.856.111.775.711z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-[10px] text-gray-400">© 2024 СДЭК — курьерская доставка. Все права защищены.</p>
          <div className="flex gap-4">
            <span className="text-[10px] text-gray-400">ООО «СДЭК-Глобал»</span>
            <span className="text-[10px] text-gray-400">ИНН: 7722327677</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
