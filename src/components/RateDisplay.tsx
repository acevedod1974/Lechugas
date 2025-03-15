import React from 'react';
import { LastUpdate } from './LastUpdate';
import { ExchangeRate } from '../types/currency';
import { formatVES } from '../utils/currency';

interface RateDisplayProps {
  rates: ExchangeRate;
  selectedRate: 'BCV' | 'PARALLEL' | 'PROMEDIO';
}

export const RateDisplay: React.FC<RateDisplayProps> = ({ rates, selectedRate }) => {
  const currentRate = rates[selectedRate.toLowerCase() as keyof typeof rates];
  const lastUpdate = rates.lastUpdate[selectedRate.toLowerCase() as keyof typeof rates.lastUpdate];

  return (
    <div className="text-sm text-gray-600">
      <div>Current Rate: {formatVES(currentRate)}/USD</div>
      <LastUpdate timestamp={lastUpdate} />
    </div>
  );
};