export interface ExchangeRate {
  bcv: number;
  parallel: number;
  promedio: number;
  lastUpdate: {
    bcv: string;
    parallel: string;
    promedio: string;
  };
}

export interface ConversionResult {
  usdAmount: number;
  vesAmount: number;
  rate: number;
  rateType: 'BCV' | 'PARALLEL' | 'PROMEDIO';
  lastUpdate: string;
}