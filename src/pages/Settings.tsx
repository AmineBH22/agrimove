import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const COLORS = [
  { name: 'AgriMove Green', value: 'primary', description: 'The default AgriMove green theme.' },
  { name: 'Light Green', value: 'green', description: 'A lighter green theme for a fresh look.' },
  { name: 'Dark Green', value: 'secondary', description: 'A darker green theme for a professional feel.' },
  { name: 'Forest Green', value: 'success', description: 'A deep forest green theme for nature lovers.' },
];

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [color, setColor] = useState(() => localStorage.getItem('color') || 'primary');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-color', color);
    localStorage.setItem('color', color);
  }, [color]);

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8 text-primary-700">Settings</h1>
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">What can you change?</h2>
          <ul className="list-disc pl-6 text-neutral-700 mb-6 space-y-2">
            <li>
              <strong>Dark Mode:</strong> Switch between light and dark appearance for comfortable viewing day or night.
            </li>
            <li>
              <strong>Theme Color:</strong> Choose your preferred accent color for buttons and highlights.
            </li>
            <li>
              <strong>Personalization:</strong> Your choices are saved and applied automatically every time you visit.
            </li>
          </ul>
          <div className="rounded-lg bg-neutral-50 p-4 mb-6 border">
            <h3 className="font-semibold mb-2">Dark Mode</h3>
            <div className="flex items-center gap-4 mb-2">
              <span className="font-medium">Enable Dark Mode</span>
              <Button
                variant={darkMode ? 'secondary' : 'outline'}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? 'On' : 'Off'}
              </Button>
            </div>
            <p className="text-xs text-neutral-500">
              Dark mode reduces eye strain and saves battery on supported devices.
            </p>
          </div>
          <div className="rounded-lg bg-neutral-50 p-4 border">
            <h3 className="font-semibold mb-2">Theme Color</h3>
            <div className="flex gap-3 mt-2 mb-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${color === c.value ? 'border-primary-600 scale-110' : 'border-neutral-300'} bg-${c.value}-600`}
                  style={{ backgroundColor: `var(--color-${c.value}, #2563eb)` }}
                  onClick={() => setColor(c.value)}
                  aria-label={c.name}
                  title={c.name}
                />
              ))}
            </div>
            <p className="text-xs text-neutral-500">
              {COLORS.find(c => c.value === color)?.description}
            </p>
          </div>
        </div>
        <div className="text-xs text-neutral-400 text-center mt-8">
          More personalization options coming soon.
        </div>
      </div>
    </Layout>
  );
};

export default Settings;