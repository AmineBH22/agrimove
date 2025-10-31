import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Search, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';

const mockTrackingData = {
  id: 'AGR-20240603-001',
  status: 'In Transit',
  steps: [
    { label: 'Requested', completed: true, icon: <CheckCircle className="text-green-600" /> },
    { label: 'Picked Up', completed: true, icon: <CheckCircle className="text-green-600" /> },
    { label: 'In Transit', completed: true, icon: <Truck className="text-blue-600" /> },
    { label: 'Delivered', completed: false, icon: <Clock className="text-gray-400" /> },
  ],
  details: {
    origin: 'Agadir',
    destination: 'Casablanca',
    estimatedDelivery: '2025-06-05',
    transporter: 'TransAgri SARL',
  },
};

const TrackShipment: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingData, setTrackingData] = useState<typeof mockTrackingData | null>(null);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Simulate search
    if (trackingId === mockTrackingData.id) {
      setTrackingData(mockTrackingData);
    } else {
      setTrackingData(null);
      setError('No shipment found with this tracking number.');
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4 text-primary-700">Track Your Shipment</h1>
        <p className="mb-8 text-neutral-600">
          Enter your transport request ID or tracking number to view the status of your shipment.
        </p>
        <form onSubmit={handleTrack} className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="e.g. AGR-20240603-001"
            value={trackingId}
            onChange={e => setTrackingId(e.target.value)}
            className="flex-1 border border-primary-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            required
          />
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
          >
            <Search size={18} /> Track
          </button>
        </form>
        {error && (
          <div className="flex items-center gap-2 text-red-600 mb-6">
            <XCircle size={20} /> {error}
          </div>
        )}
        {trackingData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Truck className="text-primary-600" size={28} />
              <span className="font-bold text-lg">Tracking ID:</span>
              <span className="text-primary-700">{trackingData.id}</span>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                {trackingData.steps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div className={`rounded-full p-2 mb-1 ${step.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {step.icon}
                    </div>
                    <span className={`text-xs ${step.completed ? 'text-green-700' : 'text-gray-500'}`}>{step.label}</span>
                  </div>
                ))}
              </div>
              {/* Progress bar */}
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div
                  className="absolute h-2 bg-primary-600 rounded-full transition-all"
                  style={{
                    width: `${
                      (trackingData.steps.filter(s => s.completed).length - 1) /
                      (trackingData.steps.length - 1) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Origin:</span> {trackingData.details.origin}
              </div>
              <div>
                <span className="font-semibold">Destination:</span> {trackingData.details.destination}
              </div>
              <div>
                <span className="font-semibold">Transporter:</span> {trackingData.details.transporter}
              </div>
              <div>
                <span className="font-semibold">Estimated Delivery:</span> {trackingData.details.estimatedDelivery}
              </div>
            </div>
            <div className="mt-6">
              <span className="font-semibold">Current Status:</span>{' '}
              <span className="text-primary-700">{trackingData.status}</span>
            </div>
          </div>
        )}
        <div className="text-center text-neutral-400 text-xs mt-8">
          For assistance, contact our support team.
        </div>
      </div>
    </Layout>
  );
};

export default TrackShipment;