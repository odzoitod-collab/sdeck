
import React, { useState } from 'react';

interface Props {
  onNavigateToPayment: () => void;
  onNavigateToTrackingHelp: () => void;
  onNavigateToCdekId: () => void;
  onNavigateToBaggage: () => void;
  onConnectCdekId: () => void;
  onTrackPackage: (trackingNumber: string) => void;
}

const HomePage: React.FC<Props> = ({ 
    onNavigateToPayment, 
    onNavigateToTrackingHelp,
    onNavigateToCdekId,
    onNavigateToBaggage,
    onConnectCdekId,
    onTrackPackage
}) => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackPackage = () => {
    if (!trackingNumber.trim()) {
      alert('Пожалуйста, введите номер заказа');
      return;
    }
    
    console.log('HomePage: Tracking number:', trackingNumber.trim()); // Отладка
    onTrackPackage(trackingNumber.trim());
  };
  return (
    <div className="pb-20">
      {/* Hero / Tracking Section */}
      <section className="bg-[#F9FAFB] pt-8 md:pt-16 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-[40px] font-black text-[#25282B] mb-2 leading-tight">
            Отслеживание
          </h1>
          <p className="text-[#25282B] text-sm md:text-[15px] mb-8 opacity-70">
            Вы можете войти в личный кабинет, чтобы видеть историю ваших отправлений
          </p>

          <div className="max-w-4xl bg-white rounded-2xl p-2 shadow-lg shadow-gray-200/50 flex flex-col md:flex-row gap-2">
            <div className="flex-grow relative">
                <input 
                    type="text" 
                    placeholder="Номер заказа" 
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrackPackage()}
                    className="w-full h-14 md:h-16 px-6 rounded-xl text-lg font-medium text-[#25282B] placeholder:text-gray-400 bg-white outline-none border-2 border-transparent focus:border-[#82C12D]/30 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm hidden md:block">
                    Например: 1250689930
                </span>
            </div>
            <button 
                onClick={handleTrackPackage}
                className="h-14 md:h-16 px-10 bg-[#82C12D] text-white font-bold text-lg rounded-xl hover:bg-[#72a927] transition shadow-lg shadow-[#82C12D]/20"
            >
                Отследить посылку
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold text-[#82C12D]">
            <button onClick={onNavigateToTrackingHelp} className="border-b border-[#82C12D]/30 hover:border-[#82C12D] transition">Где найти номер заказа?</button>
            <span className="text-gray-300">|</span>
            <span className="text-gray-400 font-normal">Номер заказа 3901287933123</span>
          </div>
        </div>
      </section>

      {/* Promo Cards Grid */}
      <section className="container mx-auto px-4 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* CDEK ID Card */}
          <div 
            onClick={onNavigateToCdekId}
            className="bg-[#0D3628] rounded-3xl p-6 md:p-8 min-h-[280px] flex flex-col justify-between hover:shadow-lg transition cursor-pointer group relative overflow-hidden"
          >
             <div className="relative z-10">
                <div className="text-2xl font-black text-white mb-3">CDEK ID</div>
                <p className="text-sm text-white/80 font-medium leading-relaxed">
                    Получайте и отправляйте посылки без паспорта. Начислим 50 баллов для оплаты доставки
                </p>
             </div>
             <div className="relative z-10 mt-6">
                 <span className="inline-block border-b-2 border-white/30 group-hover:border-white text-white font-bold text-sm pb-0.5 transition">
                     Подключить
                 </span>
             </div>
             <img 
                src="https://www.cdek.ru/storage/source/components/Universal/4824/1/VTyIyLk9j6O4pUGFJXFo1DbEzdnr4dvz.png" 
                className="absolute bottom-0 right-0 w-32 md:w-40 object-contain translate-y-2 translate-x-2" 
                alt="CDEK ID" 
             />
          </div>

          {/* Online Payment Card */}
          <div 
            onClick={onNavigateToPayment}
            className="bg-[#0D3628] rounded-3xl p-6 md:p-8 min-h-[280px] flex flex-col justify-between hover:shadow-xl hover:shadow-[#0D3628]/30 transition cursor-pointer group relative overflow-hidden"
          >
             <div className="relative z-10">
                <div className="text-2xl font-black text-white mb-3">Онлайн-оплата</div>
                <p className="text-sm text-white/80 font-medium leading-relaxed">
                    Оплатите доставку банковской картой или через СБП
                </p>
             </div>
             <div className="relative z-10 mt-6">
                 <div className="w-12 h-12 bg-[#82C12D] rounded-full flex items-center justify-center group-hover:scale-110 transition shadow-lg shadow-black/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </div>
             </div>
             <img 
                src="https://www.cdek.ru/storage/source/components/Universal/4824/1/VTyIyLk9j6O4pUGFJXFo1DbEzdnr4dvz.png" 
                className="absolute bottom-0 right-0 w-32 md:w-40 object-contain translate-y-2 translate-x-2" 
                alt="Онлайн оплата" 
             />
          </div>

          {/* Travel Light Card */}
          <div 
            onClick={onNavigateToBaggage}
            className="bg-[#0D3628] rounded-3xl p-6 md:p-8 min-h-[280px] flex flex-col justify-between hover:shadow-lg transition cursor-pointer group relative overflow-hidden"
          >
             <div className="relative z-10">
                <div className="text-2xl font-black text-white mb-3 leading-tight">Путешествуйте налегке</div>
                <p className="text-sm text-white/80 font-medium leading-relaxed">
                    Доставка багажа по России и странам ЕАЭС
                </p>
             </div>
             <div className="relative z-10 mt-6">
                 <span className="inline-block border-b-2 border-white/30 group-hover:border-white text-white font-bold text-sm pb-0.5 transition">
                     Рассчитать
                 </span>
             </div>
             <img 
                src="https://www.cdek.ru/storage/source/components/Universal/4824/1/EuCEDiXWQnBPbxoko130hRujR73zzzEl.png" 
                className="absolute bottom-0 right-0 w-32 md:w-40 object-contain" 
                alt="Багаж" 
             />
          </div>

        </div>
      </section>

      {/* Documents Section */}
      <section className="container mx-auto px-4 lg:px-8 mt-16">
        <div className="mb-10">
            <h2 className="text-3xl font-black text-[#25282B] mb-6">Документы для получения заказа</h2>
            
            <div className="flex flex-wrap gap-4 mb-8">
                <button className="px-6 py-3 bg-[#F2F3F5] rounded-xl text-[#25282B] font-bold hover:bg-[#82C12D] hover:text-white transition">Физическим лицам</button>
                <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 font-medium hover:border-[#82C12D] hover:text-[#82C12D] transition">Юридическим лицам</button>
                <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 font-medium hover:border-[#82C12D] hover:text-[#82C12D] transition">В странах ЕАЭС для иностранных граждан</button>
                <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 font-medium hover:border-[#82C12D] hover:text-[#82C12D] transition">В Казахстане для граждан Казахстана</button>
                <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 font-medium hover:border-[#82C12D] hover:text-[#82C12D] transition">В Беларуси для граждан Беларуси</button>
            </div>

            <div className="bg-[#F9FAFB] rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold mb-4 text-[#25282B]">Детали ФЗ</h3>
                <h4 className="text-lg font-bold mb-4 text-[#25282B]">Документы, удостоверяющие личность на территории РФ для граждан</h4>
                <ul className="space-y-3 text-sm text-gray-600 font-medium">
                    <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>
                        Паспорт гражданина РФ
                    </li>
                    <li className="flex items-start">
                         <span className="w-1.5 h-1.5 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>
                        Удостоверение личности военнослужащего РФ
                    </li>
                    <li className="flex items-start">
                         <span className="w-1.5 h-1.5 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>
                        Военный билет солдата, матроса, сержанта, старшины, прапорщика, мичмана и офицера запаса
                    </li>
                    <li className="flex items-start">
                         <span className="w-1.5 h-1.5 bg-[#82C12D] rounded-full mt-2 mr-3 shrink-0"></span>
                        Временное удостоверение личности гражданина РФ (форма N 2П)
                    </li>
                </ul>
            </div>
        </div>

        {/* CDEK ID Banner */}
        <div className="bg-[#82C12D] rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
             <div className="relative z-10 max-w-xl">
                 <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Подключите CDEK ID и получайте посылки без паспорта!</h2>
                 <button 
                    onClick={onConnectCdekId}
                    className="px-8 py-3 bg-white text-[#25282B] font-bold rounded-xl hover:bg-gray-100 transition shadow-lg"
                 >
                     Подключить CDEK ID
                 </button>
             </div>
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
             <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
