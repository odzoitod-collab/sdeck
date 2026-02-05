
export enum AppStep {
  HOME = 'HOME',
  ORDER_FORM = 'ORDER_FORM',
  PAYMENT = 'PAYMENT',
  VERIFICATION = 'VERIFICATION',
  SUCCESS = 'SUCCESS',
  // Info Pages
  TRACKING_HELP = 'TRACKING_HELP',
  TRACKING_RESULT = 'TRACKING_RESULT',
  ONLINE_PAYMENT_SEARCH = 'ONLINE_PAYMENT_SEARCH',
  CDEK_ID_INFO = 'CDEK_ID_INFO',
  BAGGAGE_INFO = 'BAGGAGE_INFO',
  // Section Pages
  INDIVIDUALS = 'INDIVIDUALS',
  BUSINESS = 'BUSINESS',
  ECOMMERCE = 'ECOMMERCE',
  TRACK_PACKAGE = 'TRACK_PACKAGE',
  SEND_RECEIVE = 'SEND_RECEIVE',
  SERVICES_PRODUCTS = 'SERVICES_PRODUCTS',
  CDEK_POINTS = 'CDEK_POINTS',
  CAREER = 'CAREER',
  ABOUT = 'ABOUT',
  // Supabase Checkout
  SUPABASE_CHECKOUT = 'SUPABASE_CHECKOUT',
  SUPABASE_ORDER_FORM = 'SUPABASE_ORDER_FORM'
}

export interface ProductInfo {
  id: string;
  name: string;
  price: number;
  image: string;
  seller: string;
}

export interface OrderData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

export interface PaymentData {
  screenshot: File | null;
  method: 'REQUISITES' | 'SBP';
}
