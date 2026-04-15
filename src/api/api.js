import { holdingsData, capitalGainsData } from "./mockData";

/**
 * Simulates an API call to fetch holdings data.
 * Returns a promise that resolves after a short delay to mimic network latency.
 */
export const fetchHoldings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(holdingsData);
    }, 800);
  });
};

/**
 * Simulates an API call to fetch capital gains data.
 * Returns a promise that resolves after a short delay to mimic network latency.
 */
export const fetchCapitalGains = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(capitalGainsData);
    }, 600);
  });
};
