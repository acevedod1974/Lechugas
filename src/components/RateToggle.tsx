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
    <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
      {rateButtons.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onRateChange(id)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out
            ${selectedRate === id
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};