// Import axios
import axios from 'axios';
import { COINGECKO_API_KEY } from './ApiKey';  // Assuming your API key is stored here

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Function to fetch market data
const fetchMarketData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
        x_cg_demo_api_key: COINGECKO_API_KEY  // Include the API key as a query parameter
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market data from CoinGecko:', error);
    return [];
  }
};

// Function to fetch historical data for a specific coin
const fetchHistoricalData = async (coinId) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '1',
        interval: 'hourly',
        x_cg_demo_api_key: COINGECKO_API_KEY  // Include the API key as a query parameter
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching historical data for ${coinId}:`, error);
    return {};
  }
};

export { fetchMarketData, fetchHistoricalData };
