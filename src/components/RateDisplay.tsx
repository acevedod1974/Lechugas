import React from 'react';
import { LastUpdate } from './LastUpdate';
import { ExchangeRate } from '../types/currency';
import { formatVES, getPercentageDifference } from '../utils/currency';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface RateDisplayProps {
  rates: ExchangeRate;
  selectedRate: 'BCV' | 'PARALLEL' | 'PROMEDIO';
}

export const RateDisplay: React.FC<RateDisplayProps> = ({ rates, selectedRate }) => {
  const currentRate = rates[selectedRate.toLowerCase() as keyof typeof rates];
  const lastUpdate = rates.lastUpdate[selectedRate.toLowerCase() as keyof typeof rates.lastUpdate];
  
  // Calculate difference percentage between BCV and parallel rates
  const pctDiff = getPercentageDifference(rates.parallel, rates.bcv);
  const isParallelHigher = rates.parallel > rates.bcv;
  
  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Current Rate:
        </div>
        {selectedRate !== 'PROMEDIO' && (
          <div className="flex items-center text-xs">
            <span className={`mr-1 font-medium ${isParallelHigher ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {Math.abs(pctDiff).toFixed(2)}%
            </span>
            {isParallelHigher ? (
              <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
            )}
          </div>
        )}
      </div>
      
      <div className="mt-1 text-xl font-bold text-primary-600 dark:text-primary-400">
        {formatVES(currentRate)}/USD
      </div>
      
      <div className="mt-2 flex justify-between items-center text-xs">
        <div className="text-gray-500 dark:text-gray-400">
          <div>BCV: {formatVES(rates.bcv)}</div>
          <div>Parallel: {formatVES(rates.parallel)}</div>
        </div>
        
        <LastUpdate timestamp={lastUpdate} />
      </div>
    </div>
  );
};