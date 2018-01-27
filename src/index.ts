import * as logger from 'winston';
import { settings } from './infra/settings';

logger.info(`Initializing scraper`, settings);

async function cleanup() {
  console.info('Shutting down, closing stuff 💤');

  // if (_page) {
  //   await _page.close();
  // }

  // if (_instance) {
  //   await _instance.exit();
  // }
  console.log('Bye [=');
}

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(666);
});
process.on('exit', cleanup);
process.on('SIGINT', cleanup);
