import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { AppStep, OrderData, PaymentData, ProductInfo } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import OrderForm from './components/OrderForm';
import PaymentForm from './components/PaymentForm';
import SmsVerification from './components/SmsVerification';
import SuccessScreen from './components/SuccessScreen';
import LoginModal from './components/LoginModal';
import MobileMenu from './components/MobileMenu';
import TrackingHelpPage from './components/TrackingHelpPage';
import TrackingResult from './components/TrackingResult';
import CdekIdPage from './components/CdekIdPage';
import OnlinePaymentSearch from './components/OnlinePaymentSearch';
import BaggagePage from './components/BaggagePage';
import SupabaseCheckout from './components/SupabaseCheckout';
import SupabaseOrderForm from './components/SupabaseOrderForm';
import ProductView from './components/ProductView';
import SupportButton from './components/SupportButton';
import SupportChat from './components/SupportChat';
import IndividualsPage from './components/pages/IndividualsPage';
import BusinessPage from './components/pages/BusinessPage';
import EcommercePage from './components/pages/EcommercePage';
import TrackPackagePage from './components/pages/TrackPackagePage';
import SendReceivePage from './components/pages/SendReceivePage';
import ServicesProductsPage from './components/pages/ServicesProductsPage';
import CdekPointsPage from './components/pages/CdekPointsPage';
import CareerPage from './components/pages/CareerPage';
import AboutPage from './components/pages/AboutPage';

const MOCK_PRODUCT: ProductInfo = {
  id: 'CDEK-7721-XP',
  name: 'Sony PlayStation 5 (Slim) 1TB + 2nd Controller',
  price: 54900,
  image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=400',
  seller: 'Digital Store "TechnoSpace"'
};

const SHIPPING_FEE = 1250;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.HOME);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [supabaseOrderId, setSupabaseOrderId] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  
  const [orderData, setOrderData] = useState<OrderData>({
    fullName: '',
    phone: '',
    address: '',
    city: ''
  });

  // Check for orderId or orderNumber in URL on Mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oid = params.get('orderId');
    const orderNumber = params.get('orderNumber');
    
    if (oid) {
      setSupabaseOrderId(oid);
      setCurrentStep(AppStep.PRODUCT_VIEW);
    } else if (orderNumber) {
      // Новый способ - по номеру заказа
      handleTrackPackage(orderNumber);
    }
  }, []);

  const handleOrderSubmit = (data: OrderData) => {
    setOrderData(data);
    setCurrentStep(AppStep.PAYMENT);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (data: PaymentData) => {
    setCurrentStep(AppStep.VERIFICATION);
    window.scrollTo(0, 0);
  };

  const handleSmsVerify = (code: string) => {
    setCurrentStep(AppStep.SUCCESS);
    window.scrollTo(0, 0);
  };

  const goToHome = () => {
    // Clear URL params if leaving checkout
    if (supabaseOrderId || trackingNumber) {
        window.history.pushState({}, '', window.location.pathname);
        setSupabaseOrderId(null);
        setTrackingNumber('');
    }
    setCurrentStep(AppStep.HOME);
    window.scrollTo(0, 0);
  };

  const navigate = (step: AppStep) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const handleSupabaseOrderSubmit = (data: OrderData) => {
    setOrderData(data);
    setCurrentStep(AppStep.SUPABASE_CHECKOUT);
    window.scrollTo(0, 0);
  };

  const handleTrackPackage = async (number: string) => {
    console.log('Tracking package:', number);
    setTrackingNumber(number);
    
    // Проверяем статус заказа в Supabase
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase credentials not found');
        setCurrentStep(AppStep.TRACKING_RESULT);
        return;
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data: order, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', number)
        .single();

      if (error || !order) {
        setCurrentStep(AppStep.TRACKING_RESULT);
      } else if (order.status === 'pending') {
        setSupabaseOrderId(order.id);
        setCurrentStep(AppStep.PRODUCT_VIEW);
      } else {
        setCurrentStep(AppStep.TRACKING_RESULT);
      }
    } catch (err) {
      console.error('Error checking order status:', err);
      setCurrentStep(AppStep.TRACKING_RESULT);
    }
    
    window.scrollTo(0, 0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.HOME:
        return <HomePage 
            onNavigateToPayment={() => { setCurrentStep(AppStep.ONLINE_PAYMENT_SEARCH); window.scrollTo(0, 0); }} 
            onNavigateToTrackingHelp={() => { setCurrentStep(AppStep.TRACKING_HELP); window.scrollTo(0, 0); }}
            onNavigateToCdekId={() => { setCurrentStep(AppStep.CDEK_ID_INFO); window.scrollTo(0, 0); }}
            onNavigateToBaggage={() => { setCurrentStep(AppStep.BAGGAGE_INFO); window.scrollTo(0, 0); }}
            onConnectCdekId={() => { setIsLoginOpen(true); }}
            onTrackPackage={handleTrackPackage}
        />;
      
      // Supabase Checkout Flow: сначала просмотр товара, потом форма, потом оплата
      case AppStep.PRODUCT_VIEW:
        return (
          <ProductView
            orderId={supabaseOrderId!}
            onBack={goToHome}
            onCheckout={() => { setCurrentStep(AppStep.SUPABASE_ORDER_FORM); window.scrollTo(0, 0); }}
          />
        );
      case AppStep.SUPABASE_CHECKOUT:
        return <SupabaseCheckout orderId={supabaseOrderId!} onHome={goToHome} />;
      case AppStep.SUPABASE_ORDER_FORM:
        return <SupabaseOrderForm orderId={supabaseOrderId!} onSubmit={handleSupabaseOrderSubmit} onBack={() => { setCurrentStep(AppStep.PRODUCT_VIEW); window.scrollTo(0, 0); }} />;

      // New Info Pages
      case AppStep.TRACKING_HELP:
          return <TrackingHelpPage onBack={goToHome} />;
      case AppStep.TRACKING_RESULT:
          return <TrackingResult trackingNumber={trackingNumber} onBack={goToHome} />;
      case AppStep.CDEK_ID_INFO:
          return <CdekIdPage onBack={goToHome} onConnect={() => setIsLoginOpen(true)} />;
      case AppStep.ONLINE_PAYMENT_SEARCH:
          return <OnlinePaymentSearch onBack={goToHome} onSearch={(num) => { setTrackingNumber(num); handleTrackPackage(num); }} />;
      case AppStep.BAGGAGE_INFO:
          return (
            <BaggagePage
              onBack={goToHome}
              onNavigateToTrackPage={() => navigate(AppStep.TRACK_PACKAGE)}
              onNavigateToPayment={() => navigate(AppStep.ONLINE_PAYMENT_SEARCH)}
            />
          );

      // Section Pages
      case AppStep.INDIVIDUALS:
          return <IndividualsPage onBack={goToHome} onTrackPackage={handleTrackPackage} onNavigateToPayment={() => navigate(AppStep.ONLINE_PAYMENT_SEARCH)} onNavigateToCdekId={() => navigate(AppStep.CDEK_ID_INFO)} onConnectCdekId={() => setIsLoginOpen(true)} />;
      case AppStep.BUSINESS:
          return <BusinessPage onBack={goToHome} />;
      case AppStep.ECOMMERCE:
          return <EcommercePage onBack={goToHome} />;
      case AppStep.TRACK_PACKAGE:
          return <TrackPackagePage onBack={goToHome} onTrackPackage={handleTrackPackage} onTrackingHelp={() => navigate(AppStep.TRACKING_HELP)} />;
      case AppStep.SEND_RECEIVE:
          return <SendReceivePage onBack={goToHome} onNavigateToPayment={() => navigate(AppStep.ONLINE_PAYMENT_SEARCH)} />;
      case AppStep.SERVICES_PRODUCTS:
          return <ServicesProductsPage onBack={goToHome} onNavigateToCdekId={() => navigate(AppStep.CDEK_ID_INFO)} onNavigateToBaggage={() => navigate(AppStep.BAGGAGE_INFO)} onNavigateToPayment={() => navigate(AppStep.ONLINE_PAYMENT_SEARCH)} onNavigateHome={goToHome} />;
      case AppStep.CDEK_POINTS:
          return <CdekPointsPage onBack={goToHome} />;
      case AppStep.CAREER:
          return <CareerPage onBack={goToHome} />;
      case AppStep.ABOUT:
          return <AboutPage onBack={goToHome} />;

      // Core Flow (Mock)
      case AppStep.ORDER_FORM:
        return <OrderForm 
          onSubmit={handleOrderSubmit} 
          initialData={orderData} 
          product={MOCK_PRODUCT} 
          shippingFee={SHIPPING_FEE}
        />;
      case AppStep.PAYMENT:
        return <PaymentForm 
          onSubmit={handlePaymentSubmit} 
          onBack={() => setCurrentStep(AppStep.ORDER_FORM)} 
          totalAmount={MOCK_PRODUCT.price + SHIPPING_FEE}
          orderId={MOCK_PRODUCT.id}
        />;
      case AppStep.VERIFICATION:
        return <SmsVerification onVerify={handleSmsVerify} onBack={() => setCurrentStep(AppStep.PAYMENT)} />;
      case AppStep.SUCCESS:
        return <SuccessScreen product={MOCK_PRODUCT} onGoHome={goToHome} />;
      default:
        return <HomePage 
            onNavigateToPayment={() => setCurrentStep(AppStep.ONLINE_PAYMENT_SEARCH)} 
            onNavigateToTrackingHelp={() => setCurrentStep(AppStep.TRACKING_HELP)}
            onNavigateToCdekId={() => setCurrentStep(AppStep.CDEK_ID_INFO)}
            onNavigateToBaggage={() => setCurrentStep(AppStep.BAGGAGE_INFO)}
            onConnectCdekId={() => setIsLoginOpen(true)}
            onTrackPackage={handleTrackPackage}
            onNavigateToTrackPage={() => setCurrentStep(AppStep.TRACK_PACKAGE)}
        />;
    }
  };

  // Helper to determine if we show progress bar (Mock flow)
  const showProgressBar = [AppStep.ORDER_FORM, AppStep.PAYMENT, AppStep.VERIFICATION, AppStep.SUCCESS].includes(currentStep);

  // Шаги флоу товара: просмотр → данные получателя → оплата
  const productFlowSteps = [AppStep.PRODUCT_VIEW, AppStep.SUPABASE_ORDER_FORM, AppStep.SUPABASE_CHECKOUT];
  const showProductProgressBar = productFlowSteps.includes(currentStep);
  
  // Helper to determine if we show sidebar (Only for Mock flow, not for tracking or Supabase flow)
  const showSidebar = showProgressBar && currentStep !== AppStep.SUCCESS;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        onLogoClick={goToHome} 
        onLoginClick={() => setIsLoginOpen(true)} 
        onMenuClick={() => setIsMenuOpen(true)}
        onNavigate={navigate}
        currentStep={currentStep}
      />
      
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={navigate}
      />

      <main className={`flex-grow ${currentStep === AppStep.HOME ? '' : 'container mx-auto px-4 py-6 md:py-8 max-w-5xl'}`}>
        {(showProductProgressBar || showProgressBar) && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
            {(() => {
              const steps = showProductProgressBar
                ? [
                    { step: AppStep.PRODUCT_VIEW, label: 'Товар' },
                    { step: AppStep.SUPABASE_ORDER_FORM, label: 'Доставка' },
                    { step: AppStep.SUPABASE_CHECKOUT, label: 'Оплата' },
                  ]
                : [
                    { step: AppStep.ORDER_FORM, label: 'Доставка' },
                    { step: AppStep.PAYMENT, label: 'Оплата' },
                    { step: AppStep.VERIFICATION, label: 'Проверка' },
                    { step: AppStep.SUCCESS, label: 'Готово' },
                  ];
              const allSteps = showProductProgressBar ? productFlowSteps : [AppStep.ORDER_FORM, AppStep.PAYMENT, AppStep.VERIFICATION, AppStep.SUCCESS];
              const currentIdx = allSteps.indexOf(currentStep);
              return steps.map(({ step, label }, idx) => {
                const isActive = currentStep === step;
                const isPast = currentIdx > idx;
                return (
                  <React.Fragment key={step}>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                        isActive
                          ? 'bg-[#8DC63F] text-white shadow-md shadow-[#8DC63F]/30'
                          : isPast
                          ? 'bg-[#8DC63F]/20 text-[#8DC63F]'
                          : 'bg-[#F3F4F6] text-gray-400'
                      }`}>
                        {isPast ? (
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        ) : idx + 1}
                      </div>
                      <span className={`text-[13px] font-semibold whitespace-nowrap ${isActive ? 'text-[#1C2024]' : isPast ? 'text-[#8DC63F]' : 'text-gray-400'}`}>
                        {label}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`h-px flex-1 min-w-[20px] max-w-[40px] transition-colors ${isPast ? 'bg-[#8DC63F]/30' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                );
              });
            })()}
          </div>
        )}

        {currentStep === AppStep.HOME ? (
            renderStep()
        ) : (
            <div className={`grid grid-cols-1 ${showSidebar ? 'lg:grid-cols-12 gap-8' : ''}`}>
                <div className={showSidebar ? 'lg:col-span-8' : 'w-full'}>
                    {renderStep()}
                </div>
                
                {showSidebar && (
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4">Детали сделки</h3>
                            <div className="flex items-start space-x-4 mb-6">
                                <img src={MOCK_PRODUCT.image} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                                <div>
                                    <p className="text-sm font-semibold leading-tight">{MOCK_PRODUCT.name}</p>
                                    <p className="text-[11px] text-gray-400 mt-1">Продавец: {MOCK_PRODUCT.seller}</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3 border-t border-gray-100 pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Товар:</span>
                                    <span className="font-medium text-gray-900">{MOCK_PRODUCT.price.toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Доставка СДЭК:</span>
                                    <span className="font-medium text-gray-900">{SHIPPING_FEE.toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between pt-3 border-t border-gray-100">
                                    <span className="font-bold text-gray-900 text-lg">Итого:</span>
                                    <span className="font-bold text-[#8DC63F] text-lg">{(MOCK_PRODUCT.price + SHIPPING_FEE).toLocaleString()} ₽</span>
                                </div>
                            </div>
                            
                            <div className="mt-6 p-3 bg-[#8DC63F]/5 rounded-xl flex items-start space-x-3">
                                <svg className="w-5 h-5 text-[#8DC63F] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 20c3.859 1.281 7.12 1.281 11 0l1.618-14.016z"></path></svg>
                                <p className="text-[11px] text-gray-600 leading-normal">
                                    <strong>Безопасная сделка СДЭК.</strong> Деньги будут заморожены и переданы продавцу только после того, как вы проверите товар в пункте выдачи.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
      </main>

      <Footer onNavigate={navigate} />
      
      <SupportChat />
    </div>
  );
};

export default App;
