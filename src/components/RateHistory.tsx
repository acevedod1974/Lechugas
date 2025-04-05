import React from 'react';
import { useExchangeRate } from '../context/ExchangeRateContext';

export const RateHistory: React.FC = () => {
  const { rateHistory, selectedRate } = useExchangeRate();
  const rateType = selectedRate.toLowerCase();
  const history = rateHistory[rateType] || [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (history.length < 2) {
    return (
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Collecting rate history data...
        </p>
      </div>
    );
  }

  // For now, we'll show the history as a simple table
  // Later, we can replace this with an actual chart using recharts
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="bg-white dark:bg-gray-800 p-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {selectedRate} Rate History
        </h3>
        <div className="mt-2 max-h-48 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rate</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {[...history].reverse().map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(item.timestamp)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs text-right text-gray-900 dark:text-gray-100">
                    {item.value.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};