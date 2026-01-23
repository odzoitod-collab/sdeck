
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#25282B] text-white pt-16 pb-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start mb-6">
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black italic tracking-tighter text-white">CDEK</span>
                    <div className="w-2 h-2 bg-[#82C12D] rounded-full"></div>
                </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto md:mx-0">
              Логистические решения для бизнеса и частных лиц. Быстрая доставка по всей России и за рубеж.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/90">Услуги</h4>
            <ul className="space-y-4 text-xs text-gray-400 font-medium">
              <li><a href="#" className="hover:text-[#82C12D] transition">CDEK ID</a></li>
              <li><a href="#" className="hover:text-[#82C12D] transition">СДЭК.Маркет</a></li>
              <li><a href="#" className="hover:text-[#82C12D] transition">Международная доставка</a></li>
              <li><a href="#" className="hover:text-[#82C12D] transition">CDEK.Pay</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/90">Помощь</h4>
            <ul className="space-y-4 text-xs text-gray-400 font-medium">
              <li><a href="#" className="hover:text-[#82C12D] transition">Центр поддержки</a></li>
              <li><a href="#" className="hover:text-[#82C12D] transition">Вопросы и ответы</a></li>
              <li><a href="#" className="hover:text-[#82C12D] transition">Стать партнером</a></li>
              <li><a href="#" className="hover:text-[#82C12D] transition">Политика конфиденциальности</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/90">Контакты</h4>
            <div className="space-y-4 text-xs text-gray-400 font-medium">
              <p className="text-white font-bold">8 800 250-04-05</p>
              <p>info@cdek.ru</p>
              <div className="flex space-x-3 pt-4 justify-center md:justify-start">
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#82C12D] transition cursor-pointer">
                    <span className="font-bold text-[10px]">VK</span>
                </div>
                <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#82C12D] transition cursor-pointer">
                    <span className="font-bold text-[10px]">TG</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 font-medium">
          <p>© 2024 СДЭК — курьерская доставка. Все права защищены.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 uppercase tracking-tighter">
            <span>ООО «СДЭК-Глобал»</span>
            <span>ИНН: 7722327677</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
