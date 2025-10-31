import React from 'react';
import Layout from '../components/layout/Layout';

const Pricing: React.FC = () => (
  <Layout>
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary-700 text-center">Pricing</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Transport Agency Side */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-primary-600 mb-4">For Transport Agencies</h2>
          <ul className="list-disc pl-6 text-neutral-700 space-y-2 mb-4">
            <li>
              <strong>Base Price:</strong> Set by the agency per kilometer and per ton.
            </li>
            <li>
              <strong>Commission:</strong> AgriMove charges a <span className="text-primary-700 font-semibold">5%</span> commission on each completed shipment.
            </li>
            <li>
              <strong>Instant Payouts:</strong> Agencies receive payments directly after delivery confirmation.
            </li>
            <li>
              <strong>Premium Listing:</strong> Optional feature to boost visibility for an extra monthly fee.
            </li>
          </ul>
          <div className="bg-primary-50 rounded-lg p-4 mt-4 text-primary-700 text-sm">
            Example: <br />
            <span className="font-semibold">Base Price:</span> 2 MAD/km/ton <br />
            <span className="font-semibold">Commission:</span> 5% per shipment <br />
            <span className="font-semibold">Premium:</span> +100 MAD/month (optional)
          </div>
        </div>
        {/* Farmers Side */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">For Farmers</h2>
          <ul className="list-disc pl-6 text-neutral-700 space-y-2 mb-4">
            <li>
              <strong>Transparent Pricing:</strong> See the total cost before booking, including all fees.
            </li>
            <li>
              <strong>No Hidden Fees:</strong> What you see is what you pay.
            </li>
            <li>
              <strong>Volume Discounts:</strong> Get better rates for larger shipments.
            </li>
            <li>
              <strong>Flexible Payment:</strong> Pay by card, PayPal, or cash on delivery.
            </li>
          </ul>
          <div className="bg-green-50 rounded-lg p-4 mt-4 text-green-700 text-sm">
            Example: <br />
            <span className="font-semibold">Transport Cost:</span> 2 MAD/km/ton <br />
            <span className="font-semibold">Total for 100km, 2 tons:</span> 400 MAD <br />
            <span className="font-semibold">Discount:</span> -5% for shipments over 5 tons
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-neutral-400 text-xs">
        For more details, contact our support team or check our FAQ.
      </div>
    </div>
  </Layout>
);

export default Pricing;