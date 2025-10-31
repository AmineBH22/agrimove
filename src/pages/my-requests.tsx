import React from 'react';
import Layout from '../components/layout/Layout';
import { Package, MapPin, CalendarClock } from 'lucide-react';

const requests = Array.from({ length: 20 }).map((_, i) => ({
  id: `REQ-${(i + 1).toString().padStart(3, '0')}`,
  cargoType: ['Tomatoes', 'Oranges', 'Potatoes', 'Wheat', 'Carrots'][i % 5],
  cargoWeight: (Math.floor(Math.random() * 5) + 1) + ' tons',
  pickupLocation: ['Agadir', 'Taroudant', 'Fes', 'Marrakech', 'Rabat'][i % 5],
  deliveryLocation: ['Casablanca', 'Marrakech', 'Rabat', 'Fes', 'Tangier'][i % 5],
  pickupDate: `2025-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
  status: ['pending', 'accepted', 'in-transit', 'delivered', 'cancelled'][i % 5],
  price: (1000 + i * 50) + ' MAD',
}));

const statusColors: Record<string, string> = {
  pending: 'bg-neutral-100 text-neutral-800',
  accepted: 'bg-primary-100 text-primary-800',
  'in-transit': 'bg-secondary-100 text-secondary-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const MyRequests: React.FC = () => (
  <Layout>
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary-700 text-center">My Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((req) => (
          <div key={req.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-5 w-5 text-primary-600" />
              <span className="font-semibold">{req.cargoType}</span>
              <span className="text-neutral-400 text-xs">({req.cargoWeight})</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <MapPin className="h-4 w-4" />
              <span>From: {req.pickupLocation}</span>
              <span className="mx-2">→</span>
              <span>To: {req.deliveryLocation}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <CalendarClock className="h-4 w-4" />
              <span>Pickup: {req.pickupDate}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[req.status]}`}>
                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
              </span>
              <span className="ml-auto font-semibold text-primary-700">{req.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default MyRequests;