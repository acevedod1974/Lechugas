import { ExchangeRate } from '../types/currency';
import { fetchBCVRate, fetchParallelRate } from './api';

export const fetchExchangeRates = async (): Promise<ExchangeRate> => {
  try {
    const [bcvData, parallelData] = await Promise.all([
      fetchBCVRate(),
      fetchParallelRate()
    ]);

    const promedioRate = (bcvData.price + parallelData.price) / 2;
    const promedioTimestamp = new Date().toISOString();

    return {
      bcv: bcvData.price,
      parallel: parallelData.price,
      promedio: promedioRate,
      lastUpdate: {
        bcv: bcvData.last_update,
        parallel: parallelData.last_update,
        promedio: promedioTimestamp
      }
    };
  } catch (error) {
    console.error('Error fetching rates:', error);
    // Fallback rates in case of API failure
    const now = new Date().toISOString();
    return {
      bcv: 35.50,
      parallel: 37.80,
      promedio: 36.65,
      lastUpdate: {
        bcv: now,
        parallel: now,
        promedio: now
      }
    };
  }
};