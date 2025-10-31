import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

const mockShipments = [
  {
    id: 'SHIP-001',
    title: 'Tomatoes to Casablanca',
    status: 'In Transit',
    origin: 'Agadir',
    destination: 'Casablanca',
    eta: '2025-06-05',
  },
  {
    id: 'SHIP-002',
    title: 'Oranges to Marrakech',
    status: 'Picked Up',
    origin: 'Taroudant',
    destination: 'Marrakech',
    eta: '2025-06-06',
  },
  {
    id: 'SHIP-003',
    title: 'Potatoes to Rabat',
    status: 'Requested',
    origin: 'Fes',
    destination: 'Rabat',
    eta: '2025-06-07',
  },
];

const ActiveShipments: React.FC = () => {
  const [shipments] = useState(mockShipments);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-primary-700 text-center">Active Shipments</h1>
        <div className="space-y-6">
          {shipments.map((ship) => (
            <div
              key={ship.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between transition hover:shadow-lg"
            >
              <div>
                <h2 className="font-semibold text-lg mb-1">{ship.title}</h2>
                <div className="text-neutral-500 text-sm mb-1">
                  <span className="mr-4">From: {ship.origin}</span>
                  <span className="mr-4">To: {ship.destination}</span>
                  <span>ETA: {ship.eta}</span>
                </div>
                <span className={`inline-block px-2 py-1 text-xs rounded ${
                  ship.status === 'In Transit'
                    ? 'bg-blue-100 text-blue-700'
                    : ship.status === 'Picked Up'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {ship.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ActiveShipments;