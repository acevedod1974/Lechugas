import React, { useState } from 'react';
import { ConversionButton } from './components/ConversionButton';
import { ConversionResult } from './components/ConversionResult';
import { CurrencyInput } from './components/CurrencyInput';
import { RateDisplay } from './components/RateDisplay';
import { RateToggle } from './components/RateToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { RateHistory } from './components/RateHistory';
import { OfflineIndicator } from './components/OfflineIndicator';
import { useExchangeRate } from './context/ExchangeRateContext';
import { validateAmount } from './utils/currency';
import { RefreshCw, AlertCircle } from 'lucide-react';

function App() {
  const {
    rates,
    loading,
    error,
    selectedRate,
    setSelectedRate,
    updateRates,
    lastFetchTime,
    calculateConversion
  } = useExchangeRate();

  const [amount, setAmount] = useState('');
  const [validationError, setValidationError] = useState<string | undefined>();
  const [conversionResult, setConversionResult] = useState<ReturnType<typeof calculateConversion>>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setValidationError(undefined);
  };

  const handleRateChange = (rate: 'BCV' | 'PARALLEL' | 'PROMEDIO') => {
    setSelectedRate(rate);
    setConversionResult(null);
  };

  const handleRefreshRates = async () => {
    try {
      await updateRates();
      setConversionResult(null);
    } catch (error) {
      console.error('Failed to refresh rates:', error);
    }
  };

  const handleConvert = () => {
    if (!validateAmount(amount)) {
      setValidationError('Please enter a valid amount');
      return;
    }

    setIsConverting(true);
    setTimeout(() => {
      const result = calculateConversion(parseFloat(amount));
      setConversionResult(result);
      setIsConverting(false);
    }, 500); // Small delay for better UX
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">USD to VES Converter</h1>
          <ThemeToggle />
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Rate Display with Refresh Button */}
        <div className="mb-6">
          {loading ? (
            <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm animate-pulse">
              <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          ) : rates ? (
            <>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">Exchange Rates</h2>
                <button
                  onClick={handleRefreshRates}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                  aria-label="Refresh rates"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
              <RateDisplay rates={rates} selectedRate={selectedRate} />
            </>
          ) : null}
        </div>

        {/* Rate Toggle */}
        <div className="mb-4">
          <RateToggle selectedRate={selectedRate} onRateChange={handleRateChange} />
        </div>

        {/* Conversion Form */}
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Convert USD to VES</h2>
          
          <CurrencyInput 
            value={amount} 
            onChange={handleAmountChange}
            error={validationError}
          />
          
          <ConversionButton 
            onClick={handleConvert} 
            disabled={!rates || !amount || loading} 
            loading={isConverting}
          />
        </div>

        {/* Conversion Result */}
        {conversionResult && <ConversionResult result={conversionResult} />}

        {/* Rate History */}
        {rates && <RateHistory />}

        {/* Offline Indicator */}
        <OfflineIndicator />

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <p className="mb-1">Data provided by pydolarve.org API</p>
          <p>Last fetch: {lastFetchTime ? new Date(lastFetchTime).toLocaleString() : 'Never'}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;