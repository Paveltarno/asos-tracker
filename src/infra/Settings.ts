import { reduce, set, indexOf, slice } from 'lodash';

const NAMESPACE_PREFIX = 'asos_tracker';

interface Settings {
  scraper: {
    basePage: string;
    maxConcurrentPages: string;
  };
}

// Load settings
export const settings = reduce(
  process.env,
  (acc, v, k: string) => {
    const index = indexOf(k, '.');

    if (index > 0) {
      const [prefix, key] = [k.slice(0, index), k.slice(index + 1)];
      if (prefix === NAMESPACE_PREFIX) {
        set(acc, k, v);
      }
    }
    return acc;
  },
  {}
) as Settings;
