import React from 'react';
import { DollarSign } from 'lucide-react';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter amount in USD"
          min="0"
          step="0.01"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};