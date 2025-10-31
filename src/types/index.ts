export type UserRole = 'farmer' | 'transporter' | 'store' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phoneNumber?: string;
  address?: string;
  createdAt: Date;
}

export interface Farmer extends User {
  farmName?: string;
  farmLocation?: Location;
  cropTypes?: string[];
  ratings?: number;
}

export interface Transporter extends User {
  companyName?: string;
  baseLocation?: Location;
  vehicleTypes?: Vehicle[];
  ratings?: number;
}

export interface Store extends User {
  storeName?: string;
  storeLocation?: Location;
  storeType?: 'supermarket' | 'restaurant' | 'wholesaler' | 'retailer' | 'processor' | 'other';
  businessLicense?: string;
  preferredProducts?: string[];
  ratings?: number;
  operatingHours?: {
    open: string;
    close: string;
    days: string[];
  };
}

export interface Vehicle {
  id: string;
  type: 'truck' | 'van' | 'refrigerated' | 'pickup' | 'other';
  licensePlate: string;
  capacity: number; // in tons
  isRefrigerated: boolean;
  isAvailable: boolean;
  currentLocation?: Location;
  driver?: {
    name: string;
    phoneNumber: string;
  };
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface TransportRequest {
  id: string;
  farmerId: string;
  status: 'pending' | 'accepted' | 'in-transit' | 'delivered' | 'cancelled';
  pickupLocation: Location;
  deliveryLocation: Location;
  pickupDate: Date;
  deliveryDate?: Date;
  cargoType: string;
  cargoWeight: number;
  requiresRefrigeration: boolean;
  notes?: string;
  price?: number;
  transporterId?: string;
  vehicleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  requestId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  method: 'card' | 'mobile' | 'cash';
  paidAt?: Date;
  transactionId?: string;
}

export interface Review {
  id: string;
  requestId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
}
export interface MarketplaceListing {
  id: string;
  farmerId: string;
  typeOfGood: string;
  condition: string;
  quantity: number;
  unit: string;
  quality: string;
  timeOfOffer: Date;
  location: string;
  description: string;
  photos: string[];
  pricePerUnit: number;
  deliveryOptions: {
    available: boolean;
    estimatedCost?: number;
    estimatedTime?: string;
  };
  status: 'available' | 'sold' | 'pending-delivery';
  category: 'fruits' | 'vegetables' | 'grains' | 'dairy' | 'meat' | 'other';
  specifications: {
    origin: string;
    harvestDate?: string;
    expiryDate?: string;
    certifications?: string[];
    storageRequirements?: string;
  };
  seller: {
    name: string;
    rating: number;
    totalSales: number;
  };
}