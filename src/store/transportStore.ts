import { create } from 'zustand';
import { TransportRequest, Vehicle, Payment } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useDemoDataStore } from './demoDataStore';

interface TransportState {
  requests: TransportRequest[];
  vehicles: Vehicle[];
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
  
  // Farmer actions
  createTransportRequest: (request: Omit<TransportRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  cancelTransportRequest: (requestId: string) => Promise<void>;
  rateTransport: (requestId: string, rating: number, comment: string) => Promise<void>;
  
  // Transporter actions
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => Promise<void>;
  updateVehicleStatus: (vehicleId: string, isAvailable: boolean) => Promise<void>;
  acceptTransportRequest: (requestId: string, transporterId: string, vehicleId: string, price: number) => Promise<void>;
  updateTransportStatus: (requestId: string, status: TransportRequest['status'], location?: { latitude: number; longitude: number; address: string }) => Promise<void>;
  
  // Payment actions
  createPayment: (payment: Omit<Payment, 'id' | 'status' | 'paidAt'>) => Promise<void>;
  
  // Helper functions
  getRequestsByFarmer: (farmerId: string) => TransportRequest[];
  getRequestsByTransporter: (transporterId: string) => TransportRequest[];
  getAvailableRequests: () => TransportRequest[];
  getRequestById: (requestId: string) => TransportRequest | undefined;
  getVehiclesByTransporter: (transporterId: string) => Vehicle[];
}

// Mock data for demo
const mockRequests: TransportRequest[] = [
  {
    id: '1',
    farmerId: '1',
    status: 'pending',
    pickupLocation: {
      latitude: 31.6295,
      longitude: -7.9811,
      address: 'Farm Road 123, Marrakech',
    },
    deliveryLocation: {
      latitude: 33.5731,
      longitude: -7.5898,
      address: 'Central Market, Casablanca',
    },
    pickupDate: new Date('2025-06-15T10:00:00'),
    cargoType: 'Oranges',
    cargoWeight: 2.5,
    requiresRefrigeration: true,
    notes: 'Handle with care',
    createdAt: new Date('2025-06-10T14:30:00'),
    updatedAt: new Date('2025-06-10T14:30:00'),
  },
  {
    id: '2',
    farmerId: '1',
    transporterId: '2',
    vehicleId: '1',
    status: 'accepted',
    pickupLocation: {
      latitude: 31.6295,
      longitude: -7.9811,
      address: 'Farm Road 123, Marrakech',
    },
    deliveryLocation: {
      latitude: 34.0181,
      longitude: -6.8315,
      address: 'Distribution Center, Rabat',
    },
    pickupDate: new Date('2025-06-18T09:00:00'),
    cargoType: 'Tomatoes',
    cargoWeight: 1.8,
    requiresRefrigeration: true,
    price: 800,
    createdAt: new Date('2025-06-12T11:20:00'),
    updatedAt: new Date('2025-06-13T09:45:00'),
  },
  {
    id: '3',
    farmerId: '1',
    transporterId: '2',
    vehicleId: '2',
    status: 'in-transit',
    pickupLocation: {
      latitude: 31.6295,
      longitude: -7.9811,
      address: 'Farm Road 123, Marrakech',
    },
    deliveryLocation: {
      latitude: 31.5085,
      longitude: -9.7595,
      address: 'Export Hub, Safi',
    },
    pickupDate: new Date('2025-06-14T08:30:00'),
    deliveryDate: new Date('2025-06-14T16:00:00'),
    cargoType: 'Olives',
    cargoWeight: 3.2,
    requiresRefrigeration: false,
    price: 1200,
    createdAt: new Date('2025-06-08T15:40:00'),
    updatedAt: new Date('2025-06-14T09:10:00'),
  }
];

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    type: 'refrigerated',
    licensePlate: 'AB-12345',
    capacity: 5,
    isRefrigerated: true,
    isAvailable: true,
    currentLocation: {
      latitude: 33.5731,
      longitude: -7.5898,
      address: 'Transport Street 456, Casablanca',
    },
    driver: {
      name: 'Karim Driver',
      phoneNumber: '+212601234567',
    },
  },
  {
    id: '2',
    type: 'truck',
    licensePlate: 'CD-67890',
    capacity: 8,
    isRefrigerated: false,
    isAvailable: false,
    currentLocation: {
      latitude: 31.6295,
      longitude: -7.9811,
      address: 'En route to Marrakech',
    },
    driver: {
      name: 'Youssef Driver',
      phoneNumber: '+212607654321',
    },
  }
];

const mockPayments: Payment[] = [
  {
    id: '1',
    requestId: '2',
    amount: 800,
    status: 'completed',
    method: 'card',
    paidAt: new Date('2025-06-13T10:15:00'),
    transactionId: 'TXN123456',
  }
];

export const useTransportStore = create<TransportState>((set, get) => ({
  requests: mockRequests,
  vehicles: useDemoDataStore.getState().vehicles,
  payments: mockPayments,
  isLoading: false,
  error: null,
  
  createTransportRequest: async (request) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequest: TransportRequest = {
        id: Math.random().toString(36).substring(2, 9),
        ...request,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      set(state => ({
        requests: [...state.requests, newRequest],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
  
  cancelTransportRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        requests: state.requests.map(req => 
          req.id === requestId ? { ...req, status: 'cancelled', updatedAt: new Date() } : req
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
  
  rateTransport: async (requestId, rating, comment) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real app, this would create a review record
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we're just simulating success
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
  
  addVehicle: async (vehicle) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newVehicle: Vehicle = {
        id: Math.random().toString(36).substring(2, 9),
        ...vehicle,
      };
      
      set(state => ({
        vehicles: [...state.vehicles, newVehicle],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
  
  updateVehicleStatus: async (vehicleId, isAvailable) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        vehicles: state.vehicles.map(vehicle => 
          vehicle.id === vehicleId ? { ...vehicle, isAvailable } : vehicle
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
  
  acceptTransportRequest: async (requestId, transporterId, vehicleId, price) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        requests: state.requests.map(req => 
          req.id === requestId ? { 
            ...req, 
            status: 'accepted', 
            transporterId, 
            vehicleId, 
            price,
            updatedAt: new Date() 
          } : req
        ),
        vehicles: state.vehicles.map(vehicle => 
          vehicle.id === vehicleId ? { ...vehicle, isAvailable: false } : vehicle
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
  
  updateTransportStatus: async (requestId, status, location) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => {
        const updatedRequests = state.requests.map(req => {
          if (req.id === requestId) {
            const updates: Partial<TransportRequest> = { 
              status, 
              updatedAt: new Date() 
            };
            
            if (status === 'delivered') {
              updates.deliveryDate = new Date();
            }
            
            return { ...req, ...updates };
          }
          return req;
        });
        
        const updatedVehicles = state.vehicles.map(vehicle => {
          const request = updatedRequests.find(r => r.vehicleId === vehicle.id);
          
          if (request && request.id === requestId) {
            const updates: Partial<Vehicle> = {};
            
            if (location) {
              updates.currentLocation = location;
            }
            
            if (status === 'delivered') {
              updates.isAvailable = true;
            }
            
            return { ...vehicle, ...updates };
          }
          return vehicle;
        });
        
        return {
          requests: updatedRequests,
          vehicles: updatedVehicles,
          isLoading: false,
        };
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
  
  createPayment: async (payment) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPayment: Payment = {
        id: Math.random().toString(36).substring(2, 9),
        ...payment,
        status: 'completed',
        paidAt: new Date(),
        transactionId: `TXN${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      };
      
      set(state => ({
        payments: [...state.payments, newPayment],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },
  
  // Helper functions
  getRequestsByFarmer: (farmerId) => {
    return get().requests.filter(req => req.farmerId === farmerId);
  },
  
  getRequestsByTransporter: (transporterId) => {
    return get().requests.filter(req => req.transporterId === transporterId);
  },
  
  getAvailableRequests: () => {
    return get().requests.filter(req => req.status === 'pending');
  },
  
  getRequestById: (requestId) => {
    return get().requests.find(req => req.id === requestId);
  },
  
  getVehiclesByTransporter: (transporterId) => {
    // In a real app, vehicles would have a transporterId field
    // For demo purposes, we're returning all vehicles
    return get().vehicles;
  },
}));