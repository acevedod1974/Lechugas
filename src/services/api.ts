import axios from "axios";

const API_BASE_URL = "https://pydolarve.org/api/v1/dollar";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export interface RateResponse {
  price: number;
  last_update: string;
}

const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async <T>(url: string): Promise<T> => {
  let retries = 0;
  let lastError: Error | null = null;

  while (retries < MAX_RETRIES) {
    try {
      // Add a small jitter to prevent all retries happening at the exact same time
      if (retries > 0) {
        const jitter = Math.random() * 500;
        await sleep(RETRY_DELAY * retries + jitter);
      }

      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      lastError = error as Error;
      console.error(`Attempt ${retries + 1} failed for ${url}:`, error);
      retries++;

      // If it's a 4xx error (except 429), don't retry
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500 &&
        error.response.status !== 429
      ) {
        break;
      }
    }
  }

  // If we get here, all retries failed
  throw (
    lastError || new Error(`Failed to fetch data after ${MAX_RETRIES} attempts`)
  );
};

export const fetchBCVRate = async (): Promise<RateResponse> => {
  try {
    // Use the cache API if available
    if ("caches" in window) {
      const cache = await caches.open("exchange-rates-cache");
      const cachedResponse = await cache.match(`${API_BASE_URL}?monitor=bcv`);

      if (cachedResponse && navigator.onLine === false) {
        const data = await cachedResponse.json();
        return data;
      }
    }

    const data = await fetchWithRetry<RateResponse>(
      `${API_BASE_URL}?monitor=bcv`
    );

    // Store in cache for offline use
    if ("caches" in window) {
      const cache = await caches.open("exchange-rates-cache");
      const responseToCache = new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      cache.put(`${API_BASE_URL}?monitor=bcv`, responseToCache);
    }

    return data;
  } catch (error) {
    console.error("Error fetching BCV rate:", error);
    throw error;
  }
};

export const fetchParallelRate = async (): Promise<RateResponse> => {
  try {
    // Use the cache API if available
    if ("caches" in window) {
      const cache = await caches.open("exchange-rates-cache");
      const cachedResponse = await cache.match(
        `${API_BASE_URL}?monitor=enparalelovzla`
      );

      if (cachedResponse && navigator.onLine === false) {
        const data = await cachedResponse.json();
        return data;
      }
    }

    const data = await fetchWithRetry<RateResponse>(
      `${API_BASE_URL}?monitor=enparalelovzla`
    );

    // Store in cache for offline use
    if ("caches" in window) {
      const cache = await caches.open("exchange-rates-cache");
      const responseToCache = new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
      cache.put(`${API_BASE_URL}?monitor=enparalelovzla`, responseToCache);
    }

    return data;
  } catch (error) {
    console.error("Error fetching parallel rate:", error);
    throw error;
  }
};
