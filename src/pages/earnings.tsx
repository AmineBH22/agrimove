import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

// Placeholder chart (replace with a real chart library for production)
const EarningsChart = () => (
  <div className="w-full h-40 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg flex items-end px-4 py-2">
    {/* Simulated bars */}
    {[60, 80, 40, 100, 70, 90, 50].map((h, i) => (
      <div
        key={i}
        className="flex-1 mx-1 rounded-t bg-primary-500"
        style={{ height: `${h}%`, minHeight: 10 }}
      />
    ))}
  </div>
);

const Earnings: React.FC = () => {
  const [balance] = useState(12450.75);

  // Placeholder handlers
  const handleDeposit = () => alert('Deposit functionality coming soon!');
  const handleWithdraw = () => alert('Withdraw functionality coming soon!');

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-primary-700 text-center">Earnings</h1>
        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex flex-col items-center">
          <span className="text-neutral-500 mb-2">Current Balance</span>
          <span className="text-4xl font-bold text-primary-700 mb-4">
            {balance.toLocaleString()} <span className="text-lg font-normal">MAD</span>
          </span>
          <div className="flex gap-4">
            <button
              onClick={handleDeposit}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition"
            >
              Withdraw
            </button>
          </div>
        </div>
        {/* Earnings Chart */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-primary-700">Earnings Overview</h2>
          <EarningsChart />
          <div className="flex justify-between text-xs text-neutral-400 mt-2 px-1">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>
        {/* BI Prototype Section */}
        <div className="bg-neutral-50 rounded-xl p-6 shadow text-center">
          <h3 className="font-semibold mb-2 text-primary-700">Business Intelligence</h3>
          <p className="text-neutral-600 mb-2">
            Track your weekly earnings and manage your finances easily. More analytics and export options coming soon!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Earnings;