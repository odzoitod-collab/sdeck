
import React from 'react';

interface Props {
  onBack: () => void;
}

const BaggagePage: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
        <div className="relative h-64 md:h-80 bg-blue-600 overflow-hidden">
             <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
                alt="Travel"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0D3628] to-transparent opacity-90"></div>
             
             <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                 <button onClick={onBack} className="absolute top-8 left-8 text-white/80 font-bold text-sm flex items-center hover:text-white transition">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    Назад
                 </button>
                 <h2 className="text-3xl md:text-5xl font-black text-white mb-2">Путешествуйте налегке</h2>
                 <p className="text-white/90 font-medium text-lg">Доставка багажа по России и странам ЕАЭС</p>
             </div>
        </div>

        <div className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
                <p className="text-[#25282B] text-lg leading-relaxed mb-8">
                    Отправьте чемоданы СДЭКом и наслаждайтесь поездкой с самого начала. Мы заберем багаж у вас дома и доставим прямо в отель или квартиру.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-[#F9FAFB] p-6 rounded-2xl">
                        <h4 className="font-bold text-[#25282B] mb-2">Без очередей</h4>
                        <p className="text-sm text-gray-500">Не нужно стоять на регистрации багажа в аэропорту и ждать выдачи по прилету.</p>
                    </div>
                    <div className="bg-[#F9FAFB] p-6 rounded-2xl">
                        <h4 className="font-bold text-[#25282B] mb-2">Без переплат</h4>
                        <p className="text-sm text-gray-500">Часто доставка СДЭКом дешевле, чем доплата за перевес или дополнительное место багажа в авиакомпании.</p>
                    </div>
                    <div className="bg-[#F9FAFB] p-6 rounded-2xl">
                        <h4 className="font-bold text-[#25282B] mb-2">Страховка</h4>
                        <p className="text-sm text-gray-500">Ответственность за сохранность груза мы берем на себя. Объявленная стоимость — по вашему желанию.</p>
                    </div>
                    <div className="bg-[#F9FAFB] p-6 rounded-2xl">
                        <h4 className="font-bold text-[#25282B] mb-2">От двери до двери</h4>
                        <p className="text-sm text-gray-500">Курьер заберет вещи в удобное время и привезет в пункт назначения.</p>
                    </div>
                </div>

                <div className="bg-[#82C12D] rounded-2xl p-8 text-center text-white">
                    <h3 className="text-2xl font-black mb-4">Рассчитать стоимость доставки</h3>
                    <p className="mb-6 opacity-90">Узнайте цену за пару кликов</p>
                    <button className="bg-white text-[#25282B] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">
                        Калькулятор
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BaggagePage;
