import { fetchBCVRate, fetchParallelRate } from './api';
import { ExchangeRate } from '../types/currency';

// Fallback rates in case the API fails
const FALLBACK_RATES: ExchangeRate = {
  bcv: 36.40,
  parallel: 37.8,
  promedio: 37.1,
  lastUpdate: {
    bcv: new Date().toISOString(),
    parallel: new Date().toISOString(),
    promedio: new Date().toISOString(),
  },
};

export const fetchExchangeRates = async (): Promise<ExchangeRate> => {
  let bcvRate = 0;
  let bcvLastUpdate = '';
  let parallelRate = 0;
  let parallelLastUpdate = '';
  let usedFallback = false;

  // Try to fetch BCV Rate with network error handling
  try {
    const bcvData = await fetchBCVRate();
    bcvRate = bcvData.price;
    bcvLastUpdate = bcvData.last_update;
  } catch (error) {
    console.error('Error fetching BCV rate:', error);
    bcvRate = FALLBACK_RATES.bcv;
    bcvLastUpdate = FALLBACK_RATES.lastUpdate.bcv;
    usedFallback = true;
  }

  // Try to fetch Parallel Rate with network error handling
  try {
    const parallelData = await fetchParallelRate();
    parallelRate = parallelData.price;
    parallelLastUpdate = parallelData.last_update;
  } catch (error) {
    console.error('Error fetching parallel rate:', error);
    parallelRate = FALLBACK_RATES.parallel;
    parallelLastUpdate = FALLBACK_RATES.lastUpdate.parallel;
    usedFallback = true;
  }

  // Calculate average rate
  const promedioRate = (bcvRate + parallelRate) / 2;
  const promedioLastUpdate = new Date().toISOString();

  // Save to localStorage for offline access
  try {
    const rates = {
      bcv: bcvRate,
      parallel: parallelRate,
      promedio: promedioRate,
      lastUpdate: {
        bcv: bcvLastUpdate,
        parallel: parallelLastUpdate,
        promedio: promedioLastUpdate,
      },
    };
    localStorage.setItem('exchangeRates', JSON.stringify(rates));
    localStorage.setItem('lastFetchTime', new Date().toISOString());
  } catch (error) {
    console.error('Error saving rates to localStorage:', error);
  }

  if (usedFallback) {
    // If we're using fallback rates, first try to get the most recent rates from localStorage
    try {
      const savedRates = localStorage.getItem('exchangeRates');
      if (savedRates) {
        const parsedRates = JSON.parse(savedRates);
        const lastFetchTime = localStorage.getItem('lastFetchTime');
        
        // Use saved rates if they're less than 24 hours old
        if (lastFetchTime) {
          const fetchTime = new Date(lastFetchTime);
          const now = new Date();
          const hoursDiff = (now.getTime() - fetchTime.getTime()) / (1000 * 60 * 60);
          
          if (hoursDiff < 24) {
            return parsedRates;
          }
        }
      }
    } catch (error) {
      console.error('Error retrieving rates from localStorage:', error);
    }
  }

  return {
    bcv: bcvRate,
    parallel: parallelRate,
    promedio: promedioRate,
    lastUpdate: {
      bcv: bcvLastUpdate,
      parallel: parallelLastUpdate,
      promedio: promedioLastUpdate,
    },
  };
};