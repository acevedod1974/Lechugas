import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ExchangeRate, ConversionResult } from "../types/currency";
import { fetchExchangeRates } from "../services/exchangeRates";
import { convertCurrency } from "../utils/currency";

interface ExchangeRateContextType {
  rates: ExchangeRate | null;
  loading: boolean;
  error: string | null;
  selectedRate: "BCV" | "PARALLEL" | "PROMEDIO";
  setSelectedRate: (rate: "BCV" | "PARALLEL" | "PROMEDIO") => void;
  updateRates: () => Promise<void>;
  lastFetchTime: Date | null;
  calculateConversion: (amount: number) => ConversionResult | null;
  darkMode: boolean;
  toggleDarkMode: () => void;
  rateHistory: {
    [key: string]: { timestamp: string; value: number }[];
  };
}

const ExchangeRateContext = createContext<ExchangeRateContextType | undefined>(
  undefined
);

interface ExchangeRateProviderProps {
  children: ReactNode;
}

export const ExchangeRateProvider: React.FC<ExchangeRateProviderProps> = ({
  children,
}) => {
  const [rates, setRates] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<
    "BCV" | "PARALLEL" | "PROMEDIO"
  >("BCV");
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem("darkMode");
    return savedMode
      ? JSON.parse(savedMode)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [rateHistory, setRateHistory] = useState<{
    [key: string]: { timestamp: string; value: number }[];
  }>(() => {
    const savedHistory = localStorage.getItem("rateHistory");
    return savedHistory
      ? JSON.parse(savedHistory)
      : { bcv: [], parallel: [], promedio: [] };
  });

  const updateRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const newRates = await fetchExchangeRates();
      setRates(newRates);
      setLastFetchTime(new Date());

      // Add rates to history
      const now = new Date().toISOString();
      setRateHistory((prev) => {
        const updated = {
          bcv: [...prev.bcv, { timestamp: now, value: newRates.bcv }].slice(
            -30
          ),
          parallel: [
            ...prev.parallel,
            { timestamp: now, value: newRates.parallel },
          ].slice(-30),
          promedio: [
            ...prev.promedio,
            { timestamp: now, value: newRates.promedio },
          ].slice(-30),
        };

        // Save to localStorage
        localStorage.setItem("rateHistory", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error("Failed to fetch rates:", err);
      setError("Failed to fetch exchange rates. Using fallback rates.");
    } finally {
      setLoading(false);
    }
  };

  const calculateConversion = (amount: number): ConversionResult | null => {
    if (!rates || amount <= 0) return null;

    const rate = rates[selectedRate.toLowerCase() as keyof typeof rates];
    const lastUpdate =
      rates.lastUpdate[
        selectedRate.toLowerCase() as keyof typeof rates.lastUpdate
      ];

    return convertCurrency(amount, rate, lastUpdate, selectedRate);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    updateRates();
    const interval = setInterval(updateRates, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ExchangeRateContext.Provider
      value={{
        rates,
        loading,
        error,
        selectedRate,
        setSelectedRate,
        updateRates,
        lastFetchTime,
        calculateConversion,
        darkMode,
        toggleDarkMode,
        rateHistory,
      }}
    >
      {children}
    </ExchangeRateContext.Provider>
  );
};

// Removed useExchangeRate hook. It has been moved to a separate file.
