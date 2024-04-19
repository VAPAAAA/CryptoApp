// NewsApi.js
import { newsApiKey } from "./ApiKey";
import axios from "axios";

// Endpoints

const apiBaseUrl = "https://newsapi.org/v2";

const breakingKeywords = "bitcoin";
const recommendedKeywords = "crypto OR cryptocurrency OR ethereum OR litecoin NOT bitcoin";
const pageSize = 10;  // Limit the number of articles to 10

const breakingNewsUrl = `${apiBaseUrl}/everything?q=${encodeURIComponent(breakingKeywords)}&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${newsApiKey}`;
const recommendedNewsUrl = `${apiBaseUrl}/everything?q=${encodeURIComponent(recommendedKeywords)}&sortBy=relevancy&pageSize=${pageSize}&apiKey=${newsApiKey}`;


const searchNewsUrl = (query) =>
  `${apiBaseUrl}/everything?q=${query}&apiKey=${newsApiKey}`;

const newsApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const fetchBreakingNews = async () => {
  return await newsApiCall(breakingNewsUrl);
};

export const fetchRecommendedNews = async () => {
  return await newsApiCall(recommendedNewsUrl);
};


export const fetchSearchNews = async (query) => {
  const endpoint = searchNewsUrl(query);
  return await newsApiCall(endpoint);
};
