
import React, { useState, useRef } from 'react';
import { PaymentData } from '../types';

interface Props {
  onSubmit: (data: PaymentData) => void;
  onBack: () => void;
  totalAmount: number;
  orderId: string;
}

const PaymentForm: React.FC<Props> = ({ onSubmit, onBack, totalAmount, orderId }) => {
  const [method, setMethod] = useState<'REQUISITES' | 'SBP'>('REQUISITES');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setScreenshot(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (screenshot) {
      onSubmit({ screenshot, method });
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-xl font-bold text-[#25282B]">Выбор способа оплаты</h2>
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
          <button 
            type="button"
            onClick={() => setMethod('REQUISITES')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${method === 'REQUISITES' ? 'bg-white shadow-sm text-[#82C12D]' : 'text-gray-400'}`}
          >
            ПО РЕКВИЗИТАМ
          </button>
          <button 
            type="button"
            onClick={() => setMethod('SBP')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${method === 'SBP' ? 'bg-white shadow-sm text-[#82C12D]' : 'text-gray-400'}`}
          >
            ЧЕРЕЗ СБП
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {method === 'REQUISITES' ? (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100 space-y-4">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100 pb-2">Реквизиты компании ООО «СДЭК-ГЛОБАЛ»</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2 flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Сумма к оплате</label>
                  <p className="text-lg font-black text-[#82C12D]">{totalAmount.toLocaleString()} ₽</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Получатель</label>
                  <p className="text-sm font-semibold">ООО «СДЭК-ГЛОБАЛ»</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">ИНН / КПП</label>
                  <p className="text-sm font-semibold">7722327677 / 772201001</p>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Расчетный счет</label>
                  <p className="text-sm font-mono font-bold tracking-wider">40702810844050012345</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">БИК</label>
                  <p className="text-sm font-semibold">044525225</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Банк</label>
                  <p className="text-sm font-semibold">ПАО СБЕРБАНК</p>
                </div>
                <div className="sm:col-span-2 bg-[#82C12D]/5 p-3 rounded-lg border border-[#82C12D]/10">
                  <label className="text-[10px] font-bold text-[#82C12D] uppercase">Назначение платежа</label>
                  <p className="text-xs font-bold text-[#25282B]">Оплата за товар и доставку по заказу №{orderId}</p>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 text-center italic">Переведите {totalAmount.toLocaleString()} ₽ по указанным реквизитам через ваш банк</p>
          </div>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4 text-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Logo_of_the_Faster_Payments_System.svg/2560px-Logo_of_the_Faster_Payments_System.svg.png" className="h-8 mx-auto mb-2" />
              <h3 className="font-bold text-gray-900">Инструкция по оплате через СБП</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-5 h-5 bg-[#82C12D] text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">1</div>
                  <p className="text-xs text-gray-600 leading-tight">Откройте мобильное приложение вашего банка и выберите раздел <b>«Платежи» → «СБП»</b></p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-5 h-5 bg-[#82C12D] text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">2</div>
                  <p className="text-xs text-gray-600 leading-tight">Введите номер телефона <b>+7 (900) 123-45-67</b> (ПАО СБЕРБАНК)</p>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-[#82C12D]/5 border border-[#82C12D]/10 rounded-xl">
                  <div className="w-5 h-5 bg-[#82C12D] text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">3</div>
                  <p className="text-xs text-[#25282B] leading-tight">Укажите сумму <b>{totalAmount.toLocaleString()} ₽</b> и в комментарии напишите <b>Заказ №{orderId}</b></p>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 text-center italic">После совершения перевода прикрепите чек ниже</p>
          </div>
        )}

        <div className="space-y-4 pt-4 border-t border-gray-50">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-900 block">Подтверждение оплаты</label>
          
          <div 
            className={`relative border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center cursor-pointer ${
              dragActive ? 'border-[#82C12D] bg-[#82C12D]/5' : screenshot ? 'border-[#82C12D] bg-white' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
            
            {screenshot ? (
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#82C12D]/10 text-[#82C12D] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{screenshot.name}</p>
                  <p className="text-[10px] text-[#82C12D] font-bold uppercase">Файл успешно добавлен</p>
                </div>
                <button 
                  type="button" 
                  className="text-gray-400 hover:text-red-500" 
                  onClick={(e) => { e.stopPropagation(); setScreenshot(null); }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </div>
                <p className="text-sm font-bold text-gray-700">Прикрепите скриншот чека</p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tight">Нажмите или перетащите файл сюда</p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-gray-200 text-gray-400 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
          >
            НАЗАД К ДОСТАВКЕ
          </button>
          <button
            type="submit"
            disabled={!screenshot}
            className={`flex-[2] py-4 rounded-xl font-bold text-lg shadow-xl transition-all transform active:scale-[0.98] ${
              screenshot ? 'bg-[#82C12D] text-white hover:bg-[#72a927] shadow-[#82C12D]/20' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            Я ОПЛАТИЛ, ПРОВЕРЬТЕ
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
