import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

const mockRequests = [
  {
    id: 'REQ-001',
    title: 'Transport Tomatoes from Agadir to Casablanca',
    date: '2025-06-04',
    quantity: '2 Tons',
    price: '1,200 MAD',
    status: 'Available',
  },
  {
    id: 'REQ-002',
    title: 'Move Oranges to Marrakech',
    date: '2025-06-05',
    quantity: '1.5 Tons',
    price: '950 MAD',
    status: 'Available',
  },
  {
    id: 'REQ-003',
    title: 'Deliver Potatoes to Rabat',
    date: '2025-06-06',
    quantity: '3 Tons',
    price: '1,800 MAD',
    status: 'Available',
  },
  {
    id: 'REQ-004',
    title: 'Ship Wheat to Fes',
    date: '2025-06-07',
    quantity: '5 Tons',
    price: '2,500 MAD',
    status: 'Available',
  },
];

const AvailableRequests: React.FC = () => {
  const [added, setAdded] = useState<string[]>([]);

  const handleAdd = (id: string) => {
    setAdded(prev => [...prev, id]);
    // TODO: Add logic to actually add to dashboard/store
    alert('Request added to your dashboard!');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-primary-700 text-center">Available Requests</h1>
        <div className="space-y-6">
          {mockRequests.map(req => (
            <div
              key={req.id}
              className={`bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between transition hover:shadow-lg cursor-pointer ${
                added.includes(req.id) ? 'opacity-60 pointer-events-none' : ''
              }`}
              onClick={() => !added.includes(req.id) && handleAdd(req.id)}
            >
              <div>
                <h2 className="font-semibold text-lg mb-1">{req.title}</h2>
                <div className="text-neutral-500 text-sm mb-1">
                  <span className="mr-4">Date: {req.date}</span>
                  <span className="mr-4">Quantity: {req.quantity}</span>
                  <span>Price: {req.price}</span>
                </div>
                <span className="inline-block px-2 py-1 text-xs rounded bg-primary-100 text-primary-700">
                  {req.status}
                </span>
              </div>
              <button
                className={`mt-4 md:mt-0 md:ml-6 px-5 py-2 rounded-lg font-semibold shadow transition ${
                  added.includes(req.id)
                    ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
                disabled={added.includes(req.id)}
                onClick={e => {
                  e.stopPropagation();
                  if (!added.includes(req.id)) handleAdd(req.id);
                }}
              >
                {added.includes(req.id) ? 'Added' : 'Add to Dashboard'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AvailableRequests;