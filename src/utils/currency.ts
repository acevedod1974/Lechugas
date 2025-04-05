import { ConversionResult } from '../types/currency';

export const formatVES = (amount: number, options?: Intl.NumberFormatOptions): string => {
  try {
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: 'VES',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options
    }).format(amount);
  } catch (error) {
    console.error('Error formatting VES amount:', error);
    return `Bs. ${amount.toFixed(2)}`;
  }
};

export const formatUSD = (amount: number, options?: Intl.NumberFormatOptions): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options
    }).format(amount);
  } catch (error) {
    console.error('Error formatting USD amount:', error);
    return `$ ${amount.toFixed(2)}`;
  }
};

export const validateAmount = (value: string): boolean => {
  if (!value) return false;
  
  const amount = parseFloat(value);
  return !isNaN(amount) && amount > 0 && isFinite(amount);
};

export const convertCurrency = (
  amount: number,
  rate: number,
  lastUpdate: string,
  rateType: 'BCV' | 'PARALLEL' | 'PROMEDIO'
): ConversionResult | null => {
  try {
    if (!amount || amount <= 0) return null;
    if (!rate || rate <= 0) return null;
    if (!lastUpdate) return null;
    
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

export const getPercentageDifference = (rate1: number, rate2: number): number => {
  try {
    if (rate2 === 0) return 0;
    return ((rate1 - rate2) / rate2) * 100;
  } catch (error) {
    console.error('Error calculating percentage difference:', error);
    return 0;
  }
};

export const formatTimeDifference = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    
    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHr > 0) {
      return `${diffHr} hour${diffHr > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  } catch (error) {
    console.error('Error formatting time difference:', error);
    return 'Unknown time';
  }
};