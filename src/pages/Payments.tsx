import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { CreditCard, Apple, Smartphone } from 'lucide-react';

// Simple PayPal SVG icon component
const PaypalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect width="24" height="24" rx="4" fill="#003087"/>
    <path d="M7.5 17L9 7h5.5a3 3 0 012.96 3.5l-.5 3A3 3 0 0114 16.5H11.5l-.5 3H8a.5.5 0 01-.5-.5V17z" fill="#fff"/>
    <path d="M14.5 7h-5l-1.5 10h2l.5-3H14a2 2 0 002-1.67l.5-3A2 2 0 0014.5 7z" fill="#3086C8"/>
  </svg>
);

const Payment: React.FC = () => {
  const [method, setMethod] = useState<'card' | 'paypal' | 'google' | 'apple'>('card');

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-6 text-primary-700">Make a Payment</h1>
        <div className="flex justify-center gap-4 mb-8">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${method === 'card' ? 'bg-primary-600 text-white' : 'border-primary-200 text-primary-700'}`}
            onClick={() => setMethod('card')}
          >
            <CreditCard className="h-5 w-5" /> Card
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${method === 'paypal' ? 'bg-primary-600 text-white' : 'border-primary-200 text-primary-700'}`}
            onClick={() => setMethod('paypal')}
          >
            <PaypalIcon className="h-5 w-5" /> PayPal
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${method === 'google' ? 'bg-primary-600 text-white' : 'border-primary-200 text-primary-700'}`}
            onClick={() => setMethod('google')}
          >
            <Smartphone className="h-5 w-5" /> Google Pay
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${method === 'apple' ? 'bg-primary-600 text-white' : 'border-primary-200 text-primary-700'}`}
            onClick={() => setMethod('apple')}
          >
            <Apple className="h-5 w-5" /> Apple Pay
          </button>
        </div>

        {/* Payment Forms */}
        {method === 'card' && (
          <form className="space-y-4">
            <input className="w-full border rounded px-3 py-2" placeholder="Card Number" />
            <div className="flex gap-2">
              <input className="w-1/2 border rounded px-3 py-2" placeholder="MM/YY" />
              <input className="w-1/2 border rounded px-3 py-2" placeholder="CVC" />
            </div>
            <input className="w-full border rounded px-3 py-2" placeholder="Cardholder Name" />
            <button type="submit" className="w-full bg-primary-600 text-white py-2 rounded font-semibold mt-4">
              Pay Now
            </button>
          </form>
        )}
        {method === 'paypal' && (
          <div className="text-center py-8">
            <p>Redirecting to PayPal...</p>
            {/* Integrate PayPal SDK here */}
          </div>
        )}
        {method === 'google' && (
          <div className="text-center py-8">
            <p>Google Pay coming soon.</p>
            {/* Integrate Google Pay SDK here */}
          </div>
        )}
        {method === 'apple' && (
          <div className="text-center py-8">
            <p>Apple Pay coming soon.</p>
            {/* Integrate Apple Pay SDK here */}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Payment;