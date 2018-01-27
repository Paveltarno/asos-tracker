import { reduce, set } from 'lodash';

interface Settings {
  scraper: {
    basePage: string;
    maxConcurrentPages: string;
  };
}

// Load settings
export const settings = reduce(
  process.env,
  (acc, v, k) => set(acc, k, v),
  {}
) as Settings;
