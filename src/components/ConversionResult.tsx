import React from 'react';
import { LastUpdate } from './LastUpdate';
import { ConversionResult as ConversionResultType } from '../types/currency';
import { formatVES } from '../utils/currency';

interface ConversionResultProps {
  result: ConversionResultType;
}

export const ConversionResult: React.FC<ConversionResultProps> = ({ result }) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="text-sm text-gray-600">Conversion Result:</div>
      <div className="text-2xl font-bold text-gray-900">
        {formatVES(result.vesAmount)}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Using {result.rateType} rate
      </div>
      <LastUpdate timestamp={result.lastUpdate} />
    </div>
  );
};