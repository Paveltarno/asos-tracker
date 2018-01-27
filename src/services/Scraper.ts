import * as puppeteer from 'puppeteer';
import { chunk } from 'lodash';
import { Product } from 'models/Product';

const CONCURRENT_PAGES = 1;

export class Scraper {
  /**
   *
   */
  constructor(
    baseUrl: string,
    options: {
      concurrentPages: number;
    }
  ) {}
}

export async function run(products: Array<Product>) {
  const browser = await puppeteer.launch();

  // We batch our products for concurrancy
  const batches = chunk(products, CONCURRENT_PAGES);

  await Promise.all();
  const page = await browser.newPage();
}
