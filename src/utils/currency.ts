import { ConversionResult } from '../types/currency';

export const formatVES = (amount: number): string => {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const validateAmount = (value: string): boolean => {
  const amount = parseFloat(value);
  return !isNaN(amount) && amount > 0;
};

export const convertCurrency = (
  amount: number,
  rate: number,
  lastUpdate: string,
  rateType: 'BCV' | 'PARALLEL'
): ConversionResult | null => {
  try {
    if (amount <= 0) return null;
    
    const vesAmount = amount * rate;
    return {
      usdAmount: amount,
      vesAmount,
      rate,
      rateType,
      lastUpdate
    };
  } catch (error) {
    console.error('Error during conversion:', error);
    return null;
  }
};