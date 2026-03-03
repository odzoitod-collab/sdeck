import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

export interface ProductViewOrder {
  id: string;
  order_number: string;
  title: string;
  description: string;
  price: number;
  shipping_price?: number;
  image_url?: string;
  /** Несколько фото товара (из ТГ-бота). Если есть — листаются в карусели. */
  image_urls?: string[];
  status: string;
}

interface Props {
  orderId: string;
  onBack: () => void;
  onCheckout: () => void;
}

const SWIPE_THRESHOLD = 50;

const ProductView: React.FC<Props> = ({ orderId, onBack, onCheckout }) => {
  const [order, setOrder] = useState<ProductViewOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl || '', supabaseKey || '');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError('');
        const { data, err } = await supabase
          .from('orders')
          .select('*')
          .eq('id', orderId)
          .single();

        if (err) throw err;
        if (!data) throw new Error('Order not found');
        setOrder(data);
      } catch (e) {
        console.error(e);
        setError('Товар не найден или ссылка устарела.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const images: string[] = order?.image_urls?.length
    ? order.image_urls
    : order?.image_url
      ? [order.image_url]
      : [];

  const goPrev = useCallback(() => {
    setPhotoIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setPhotoIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  const onTouchStartHandler = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMoveHandler = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (touchStart == null || touchEnd == null || images.length <= 1) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto pb-6 px-0 sm:px-0 animate-fadeIn">
        <div className="skeleton h-5 w-16 mb-5 rounded-lg"/>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="skeleton aspect-square md:aspect-auto md:min-h-[320px]"/>
            <div className="p-5 md:p-8 space-y-4">
              <div className="skeleton h-7 w-3/4 rounded-lg"/>
              <div className="skeleton h-4 w-full rounded-lg"/>
              <div className="skeleton h-4 w-5/6 rounded-lg"/>
              <div className="mt-8 space-y-3">
                <div className="skeleton h-10 w-1/2 rounded-lg"/>
                <div className="skeleton h-px w-full"/>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-1/3 rounded-lg"/>
                  <div className="skeleton h-4 w-1/4 rounded-lg"/>
                </div>
                <div className="skeleton h-14 w-full rounded-xl mt-2"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-md mx-auto mt-6 sm:mt-10 p-6 sm:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center animate-fadeIn">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-[#25282B] mb-2">Товар не найден</h2>
        <p className="text-gray-500 text-sm sm:text-base mb-6">{error || 'Проверьте ссылку или номер заказа.'}</p>
        <button
          onClick={onBack}
          className="min-h-[48px] px-6 py-3 rounded-xl bg-[#8DC63F] text-white font-bold text-sm sm:text-base hover:bg-[#72a930] transition active:scale-[0.98]"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  const total = order.price;
  const canCheckout = order.status === 'pending';
  const hasMultiplePhotos = images.length > 1;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pb-6 sm:pb-8 px-0 sm:px-0">
      <button
        type="button"
        onClick={onBack}
        className="min-h-[44px] mb-5 flex items-center gap-1.5 text-gray-400 font-medium text-[13px] hover:text-[#1C2024] transition touch-manipulation"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Назад
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Карусель фото — свайп на телефоне */}
          <div
            className="aspect-square sm:aspect-[4/3] md:aspect-auto md:min-h-[320px] bg-gray-100 relative overflow-hidden touch-pan-y select-none"
            onTouchStart={onTouchStartHandler}
            onTouchMove={onTouchMoveHandler}
            onTouchEnd={onTouchEndHandler}
          >
            {images.length > 0 ? (
              <>
                <div
                  className="absolute inset-0 flex transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(-${photoIndex * 100}%)` }}
                >
                  {images.map((url, i) => (
                    <div key={i} className="w-full h-full flex-shrink-0 bg-gray-100">
                      <img
                        src={url}
                        alt={`${order.title} — фото ${i + 1}`}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
                {hasMultiplePhotos && (
                  <>
                    <button
                      type="button"
                      onClick={goPrev}
                      className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md items-center justify-center text-gray-700 hover:bg-white transition"
                      aria-label="Предыдущее фото"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md items-center justify-center text-gray-700 hover:bg-white transition"
                      aria-label="Следующее фото"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPhotoIndex(i)}
                          className={`w-2 h-2 rounded-full transition-colors touch-manipulation ${
                            i === photoIndex ? 'bg-white scale-125 shadow' : 'bg-white/60'
                          }`}
                          aria-label={`Фото ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                <svg className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                </svg>
              </div>
            )}
            <span className="absolute top-3 left-3 px-2.5 py-1.5 bg-white/95 rounded-lg text-xs font-mono font-medium text-gray-600 shadow-sm">
              #{order.order_number}
            </span>
          </div>

          {/* Описание и цена — адаптивно */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#25282B] leading-tight mb-2">
              {order.title}
            </h1>
            {order.description && (
              <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-4">
                {order.description}
              </p>
            )}

            <div className="mt-auto space-y-3 sm:space-y-4">
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-bold text-gray-900">К оплате</span>
                <span className="font-black text-2xl sm:text-3xl text-[#8DC63F]">{total.toLocaleString()} ₽</span>
              </div>

              {canCheckout ? (
                <>
                  <button
                    type="button"
                    onClick={onCheckout}
                    className="btn-press w-full min-h-[52px] py-4 bg-[#8DC63F] hover:bg-[#72a930] text-white rounded-xl font-bold text-[16px] shadow-md shadow-[#8DC63F]/20 transition-colors flex items-center justify-center gap-2 touch-manipulation"
                  >
                    Оформить заказ
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>
                  <p className="text-[12px] text-gray-400 text-center">
                    Далее укажете адрес доставки и способ оплаты
                  </p>
                </>
              ) : (
                <div className="py-4 px-4 bg-blue-50 border border-blue-100 rounded-xl text-center">
                  <p className="text-blue-800 font-medium text-sm">
                    Обработка оплаты. Ожидайте.
                  </p>
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-[#8DC63F] font-bold text-sm mt-2 hover:underline min-h-[44px] flex items-center justify-center mx-auto"
                  >
                    Вернуться на главную
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-5 md:px-8 py-4 bg-[#F8F9FA] border-t border-gray-100 flex items-center gap-3">
          <svg className="w-4 h-4 text-[#8DC63F] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 20c3.859 1.281 7.12 1.281 11 0l1.618-14.016z"/>
          </svg>
          <p className="text-[12px] text-gray-500">
            <strong className="text-[#1C2024]">Безопасная сделка СДЭК</strong> — оплата хранится до получения товара в пункте выдачи.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
