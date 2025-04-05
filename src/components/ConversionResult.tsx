import React from 'react';
import { LastUpdate } from './LastUpdate';
import { ConversionResult as ConversionResultType } from '../types/currency';
import { formatVES, formatUSD, formatTimeDifference } from '../utils/currency';
import { ArrowDown } from 'lucide-react';

interface ConversionResultProps {
  result: ConversionResultType;
}

export const ConversionResult: React.FC<ConversionResultProps> = ({ result }) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          From
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {formatTimeDifference(result.lastUpdate)}
        </div>
      </div>
      
      <div className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
        {formatUSD(result.usdAmount)}
      </div>
      
      <div className="my-2 flex justify-center">
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-1.5">
          <ArrowDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-300">
        To
      </div>
      
      <div className="mt-1 text-2xl font-bold text-primary-600 dark:text-primary-400">
        {formatVES(result.vesAmount)}
      </div>
      
      <div className="mt-3 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-2">
        <div>
          Using <span className="font-medium">{result.rateType}</span> rate
        </div>
        <div>
          {formatVES(result.rate)}/USD
        </div>
      </div>
      
      <div className="mt-1 pt-1">
        <LastUpdate timestamp={result.lastUpdate} />
      </div>
    </div>
  );
};