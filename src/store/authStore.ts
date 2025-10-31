import { create } from 'zustand';
import { User, UserRole } from '../types';
import { useDemoDataStore } from './demoDataStore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phoneNumber?: string;
  }) => Promise<void>;
  logout: () => void;
}

// Get all users from demo data store
const getAllMockUsers = () => {
  const demoData = useDemoDataStore.getState();
  return [
    ...demoData.farmers.map(farmer => ({ ...farmer, password: 'password' })),
    ...demoData.transporters.map(transporter => ({ ...transporter, password: 'password' })),
    ...demoData.stores.map(store => ({ ...store, password: 'password' })),
    // Add some quick login accounts
    {
      id: 'quick-farmer',
      name: 'Demo Farmer',
      email: 'farmer@demo.com',
      password: 'password',
      role: 'farmer' as UserRole,
      avatar: 'https://i.pravatar.cc/150?img=1',
      phoneNumber: '+212601020304',
      address: 'Demo Farm, Marrakech',
      createdAt: new Date('2023-01-15'),
      farmName: 'Demo Farm',
      farmLocation: {
        latitude: 31.6295,
        longitude: -7.9811,
        address: 'Demo Farm, Marrakech',
      },
      cropTypes: ['Olives', 'Oranges', 'Tomatoes'],
      ratings: 4.7,
    },
    {
      id: 'quick-transport',
      name: 'Demo Transport',
      email: 'transport@demo.com',
      password: 'password',
      role: 'transporter' as UserRole,
      avatar: 'https://i.pravatar.cc/150?img=2',
      phoneNumber: '+212607080910',
      address: 'Demo Transport, Casablanca',
      createdAt: new Date('2023-02-20'),
      companyName: 'Demo Logistics',
      baseLocation: {
        latitude: 33.5731,
        longitude: -7.5898,
        address: 'Demo Transport, Casablanca',
      },
      ratings: 4.5,
    },
    {
      id: 'quick-store',
      name: 'Demo Store',
      email: 'store@demo.com',
      password: 'password',
      role: 'store' as UserRole,
      avatar: 'https://i.pravatar.cc/150?img=3',
      phoneNumber: '+212608090102',
      address: 'Demo Store, Rabat',
      createdAt: new Date('2023-03-01'),
      storeName: 'Demo Supermarket',
      storeLocation: {
        latitude: 34.0209,
        longitude: -6.8417,
        address: 'Demo Store, Rabat',
      },
      storeType: 'supermarket',
      businessLicense: 'DEMO-2023-001',
      preferredProducts: ['Fruits', 'Vegetables', 'Dairy'],
      ratings: 4.6,
      operatingHours: {
        open: '08:00',
        close: '22:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      }
    }
  ];
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUsers = getAllMockUsers();
      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Remove password before storing user data
      const { password: _, ...secureUser } = user;

      set({
        user: secureUser as User,
        isAuthenticated: true,
        isLoading: false,
      });

      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(secureUser));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email already exists
      const mockUsers = getAllMockUsers();
      if (mockUsers.some(u => u.email === userData.email)) {
        throw new Error('Email already in use');
      }

      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        ...userData,
        createdAt: new Date(),
      };

      // Remove password before storing user data
      const { password: _, ...secureUser } = newUser;

      set({
        user: secureUser as User,
        isAuthenticated: true,
        isLoading: false,
      });

      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(secureUser));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));

// Initialize auth state from localStorage
export const initAuth = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      useAuthStore.setState({
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      localStorage.removeItem('user');
    }
  }
};