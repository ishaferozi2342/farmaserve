export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  servicesCount: number;
  icon: string;
}

export interface Provider {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  jobsCompleted: number;
}

export interface Booking {
  id: string;
  service: string;
  customer: string;
  customerPhone: string;
  date: string;
  time: string;
  location: string;
  price: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  userType: 'customer' | 'provider';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'customer' | 'provider') => Promise<void>;
  signup: (name: string, email: string, password: string, userType?: 'customer' | 'provider') => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
}

export type RootStackParamList = {
  Login: undefined;
  Signup: { userType?: 'customer' | 'provider' } | undefined;
  Main: 
    | { screen: 'Home' }
    | { screen: 'Explore' }
    | { screen: 'Services'; params?: { categoryId?: string } }
    | { screen: 'Bookings' }
    | { screen: 'Profile' }
    | undefined;
  ProviderMain:
    | { screen: 'ProviderDashboard' }
    | { screen: 'ProviderBookings' }
    | { screen: 'ProviderEarnings' }
    | { screen: 'ProviderReviews' }
    | { screen: 'ProviderProfile' }
    | undefined;
  ServiceDetail: { service: Service };
  ProviderDetail: { provider: Provider };
  BookingConfirmation: { service: Service; selectedDate: TimeSlot };
  ProviderServices: undefined;
  ProviderStories: undefined;
  ProviderReels: undefined;
  ProviderVideos: undefined;
  Notifications: undefined;
  Help: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Services: { categoryId?: string };
  Bookings: undefined;
  Profile: undefined;
};

export type ProviderTabParamList = {
  ProviderDashboard: undefined;
  ProviderBookings: undefined;
  ProviderEarnings: undefined;
  ProviderReviews: undefined;
  ProviderProfile: undefined;
};
