import React, { useState, useEffect } from 'react';
import { CurrencyInput } from './components/CurrencyInput';
import { RateToggle } from './components/RateToggle';
import { RateDisplay } from './components/RateDisplay';
import { ConversionButton } from './components/ConversionButton';
import { ConversionResult } from './components/ConversionResult';
import { fetchExchangeRates } from './services/exchangeRates';
import { validateAmount, convertCurrency } from './utils/currency';
import { ExchangeRate, ConversionResult as ConversionResultType } from './types/currency';
import { RefreshCw } from 'lucide-react';

function App() {
  const [amount, setAmount] = useState<string>('');
  const [selectedRate, setSelectedRate] = useState<'BCV' | 'PARALLEL' | 'PROMEDIO'>('BCV');
  const [rates, setRates] = useState<ExchangeRate | null>(null);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<ConversionResultType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);

  const updateRates = async () => {
    setLoading(true);
    try {
      const newRates = await fetchExchangeRates();
      setRates(newRates);
      // If there's an amount, recalculate with new rates
      if (amount && !error) {
        handleConversion(newRates);
      }
    } catch (error) {
      console.error('Failed to fetch rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateRates();
    // Refresh rates every 5 minutes
    const interval = setInterval(updateRates, 300000);
    return () => clearInterval(interval);
  }, []);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setError('');
    setAutoUpdate(true); // Re-enable auto-update when amount changes
    
    if (!value) {
      setResult(null);
      return;
    }

    if (!validateAmount(value)) {
      setError('Please enter a valid positive number');
      setResult(null);
    }
  };

  const handleConversion = (currentRates = rates) => {
    if (!amount || !currentRates || error) {
      return;
    }

    const rate = currentRates[selectedRate.toLowerCase() as keyof typeof currentRates];
    const lastUpdate = currentRates.lastUpdate[selectedRate.toLowerCase() as keyof typeof currentRates.lastUpdate];
    
    const conversionResult = convertCurrency(
      parseFloat(amount),
      rate,
      lastUpdate,
      selectedRate
    );
    
    setResult(conversionResult);
  };

  // Auto-update effect when typing
  useEffect(() => {
    if (autoUpdate && rates && amount && !error) {
      handleConversion();
    }
  }, [amount, autoUpdate]);

  useEffect(() => {
    if (rates && amount && !error) {
      handleConversion();
      setAutoUpdate(false); // Disable auto-update when manually selecting a rate
    }
  }, [selectedRate]); // Re-run conversion when rate type changes

  const isConversionDisabled = !amount || !!error || !rates;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">USD to VES Converter</h1>
            <p className="mt-2 text-sm text-gray-600">
              Convert US Dollars to Venezuelan Bolívares
            </p>
          </div>

          <div className="space-y-4">
            <CurrencyInput
              value={amount}
              onChange={handleAmountChange}
              error={error}
            />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <RateToggle
                selectedRate={selectedRate}
                onRateChange={(rate) => {
                  setSelectedRate(rate);
                  setAutoUpdate(false);
                }}
              />
              
              <button
                onClick={updateRates}
                className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Refresh Rates
              </button>
            </div>

            {rates && <RateDisplay rates={rates} selectedRate={selectedRate} />}

            <ConversionButton
              onClick={() => handleConversion()}
              disabled={isConversionDisabled}
            />

            {result && !error && <ConversionResult result={result} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;