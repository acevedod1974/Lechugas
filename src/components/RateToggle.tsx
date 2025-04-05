import React from 'react';

interface RateToggleProps {
  selectedRate: 'BCV' | 'PARALLEL' | 'PROMEDIO';
  onRateChange: (rate: 'BCV' | 'PARALLEL' | 'PROMEDIO') => void;
}

export const RateToggle: React.FC<RateToggleProps> = ({ selectedRate, onRateChange }) => {
  const rateButtons = [
    { id: 'BCV', label: 'BCV Rate' },
    { id: 'PARALLEL', label: 'Parallel Rate' },
    { id: 'PROMEDIO', label: 'Promedio' },
  ] as const;

  return (
    <div
      role="group"
      aria-label="Exchange rate selection"
      className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800"
    >
      {rateButtons.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onRateChange(id)}
          aria-pressed={selectedRate === id}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
            ${selectedRate === id
              ? 'bg-primary-500 text-white shadow-sm'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};