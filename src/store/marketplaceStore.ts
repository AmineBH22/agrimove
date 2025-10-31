import { create } from 'zustand';
import { MarketplaceListing } from '../types';
import { useDemoDataStore } from './demoDataStore';

interface MarketplaceState {
  listings: MarketplaceListing[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createListing: (listing: Omit<MarketplaceListing, 'id' | 'timeOfOffer' | 'status'>) => Promise<void>;
  updateListing: (listingId: string, updates: Partial<MarketplaceListing>) => Promise<void>;
  deleteListing: (listingId: string) => Promise<void>;
  purchaseListing: (listingId: string, buyerId: string) => Promise<void>;
  
  // Getters
  getListingsByFarmer: (farmerId: string) => MarketplaceListing[];
  getAvailableListings: () => MarketplaceListing[];
  getListingById: (listingId: string) => MarketplaceListing | undefined;
  searchListings: (query: string) => MarketplaceListing[];
  filterListings: (filters: {
    typeOfGood?: string;
    condition?: string;
    location?: string;
    maxPrice?: number;
    minQuantity?: number;
  }) => MarketplaceListing[];
}

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  listings: useDemoDataStore.getState().marketplaceListings,
  isLoading: false,
  error: null,

  createListing: async (listing) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newListing: MarketplaceListing = {
        id: Math.random().toString(36).substring(2, 9),
        ...listing,
        timeOfOffer: new Date(),
        status: 'available',
      };
      
      set(state => ({
        listings: [newListing, ...state.listings],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },

  updateListing: async (listingId, updates) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        listings: state.listings.map(listing => 
          listing.id === listingId ? { ...listing, ...updates } : listing
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

  deleteListing: async (listingId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => ({
        listings: state.listings.filter(listing => listing.id !== listingId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false,
      });
    }
  },

  purchaseListing: async (listingId, buyerId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        listings: state.listings.map(listing => 
          listing.id === listingId ? { ...listing, status: 'sold' } : listing
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

  // Getter functions
  getListingsByFarmer: (farmerId) => {
    return get().listings.filter(listing => listing.farmerId === farmerId);
  },

  getAvailableListings: () => {
    return get().listings.filter(listing => listing.status === 'available');
  },

  getListingById: (listingId) => {
    return get().listings.find(listing => listing.id === listingId);
  },

  searchListings: (query) => {
    const lowercaseQuery = query.toLowerCase();
    return get().listings.filter(listing => 
      listing.typeOfGood.toLowerCase().includes(lowercaseQuery) ||
      listing.location.toLowerCase().includes(lowercaseQuery) ||
      listing.quality.toLowerCase().includes(lowercaseQuery) ||
      listing.condition.toLowerCase().includes(lowercaseQuery)
    );
  },

  filterListings: (filters) => {
    return get().listings.filter(listing => {
      if (filters.typeOfGood && !listing.typeOfGood.toLowerCase().includes(filters.typeOfGood.toLowerCase())) {
        return false;
      }
      if (filters.condition && listing.condition !== filters.condition) {
        return false;
      }
      if (filters.location && !listing.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      if (filters.maxPrice && listing.pricePerUnit > filters.maxPrice) {
        return false;
      }
      if (filters.minQuantity && listing.quantity < filters.minQuantity) {
        return false;
      }
      return true;
    });
  },
}));
