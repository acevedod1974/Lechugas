import axios from 'axios';

const API_BASE_URL = 'https://pydolarve.org/api/v1/dollar';

export interface RateResponse {
  price: number;
  last_update: string;
}

export const fetchBCVRate = async (): Promise<RateResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}?monitor=bcv`);
    return response.data;
  } catch (error) {
    console.error('Error fetching BCV rate:', error);
    throw error;
  }
};

export const fetchParallelRate = async (): Promise<RateResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}?monitor=enparalelovzla`);
    return response.data;
  } catch (error) {
    console.error('Error fetching parallel rate:', error);
    throw error;
  }
};