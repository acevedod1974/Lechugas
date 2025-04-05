import React from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';

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
      <label htmlFor="currency-input" className="sr-only">
        Enter amount in USD
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          id="currency-input"
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    focus:ring-primary-500 focus:border-primary-500 dark:focus:border-primary-400
                    disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500 dark:disabled:text-gray-400"
          placeholder="Enter amount in USD"
          min="0.01"
          step="0.01"
          inputMode="decimal"
          aria-invalid={!!error}
          aria-describedby={error ? "currency-input-error" : undefined}
        />
      </div>
      {error && (
        <div className="mt-1.5 flex items-center text-sm text-red-600 dark:text-red-400" id="currency-input-error">
          <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};