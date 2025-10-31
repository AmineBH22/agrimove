import React from 'react';
import Layout from '../components/layout/Layout';
import { Tractor, CheckCircle, MapPin, Truck } from 'lucide-react';

const HowItWorksFarmers: React.FC = () => (
  <Layout>
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-primary-700 mb-6">How It Works for Farmers</h1>
      <p className="mb-8 text-neutral-600">
        AgriMove makes it easy for farmers to transport their products efficiently and securely.
      </p>
      <ol className="space-y-8 relative border-l-2 border-primary-100 pl-8">
        <li className="flex items-start gap-4">
          <div className="bg-primary-100 rounded-full p-2">
            <Tractor className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">1. Create a Transport Request</h2>
            <p className="text-neutral-600">Fill in your cargo details, pickup and delivery locations, and preferred date.</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="bg-primary-100 rounded-full p-2">
            <MapPin className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">2. Get Matched with Transporters</h2>
            <p className="text-neutral-600">Transport providers see your request and offer their services.</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="bg-primary-100 rounded-full p-2">
            <Truck className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">3. Track Your Shipment</h2>
            <p className="text-neutral-600">Monitor your shipment in real-time from pickup to delivery.</p>
          </div>
        </li>
        <li className="flex items-start gap-4">
          <div className="bg-primary-100 rounded-full p-2">
            <CheckCircle className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-1">4. Confirm Delivery & Rate</h2>
            <p className="text-neutral-600">Confirm delivery and rate your transporter for better service.</p>
          </div>
        </li>
      </ol>
      <div className="mt-12 text-center text-neutral-400 text-xs">
        Need help? Contact our support team.
      </div>
    </div>
  </Layout>
);

export default HowItWorksFarmers;