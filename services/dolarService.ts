
import axios from 'axios';
import { DolarRate } from '../types';

const API_BASE_URL = 'https://dolarapi.com/v1/dolares';

const dolarTypes = [
  'oficial',
  'blue',
  'bolsa',
  'ccl',
  'tarjeta',
  'mayorista',
  'cripto'
];

export const getDolarRates = async (): Promise<DolarRate[]> => {
  try {
    const promises = dolarTypes.map(type => axios.get<DolarRate>(`${API_BASE_URL}/${type}`));
    const results = await Promise.allSettled(promises);

    const rates: DolarRate[] = [];
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        rates.push(result.value.data);
      } else {
        // Log the specific endpoint that failed
        console.error(`Failed to fetch ${dolarTypes[index]}: ${result.reason.message}`);
      }
    });

    if (rates.length === 0 && results.some(r => r.status === 'rejected')) {
      // If all requests failed, throw a generic error
      throw new Error("Could not fetch any dollar rates");
    }

    return rates;
  } catch (error) {
    console.error("Error fetching dollar rates:", error);
    throw new Error("Could not fetch dollar rates");
  }
};
