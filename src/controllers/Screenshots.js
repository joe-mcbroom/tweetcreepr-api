import { buildTweetUrl } from '../utils/utils.js';
import puppeteer from 'puppeteer';

/**
 * Function to open a new page, load the tweet, and take a screenshot
 * @param {string} username
 * @param {string} tweetId
 * @param {object} browser (puppeteer browser instance)
 * @returns {Promise<Buffer>}
 *
 */
const getScreenshot = async (username, tweetId, browser) => {
  const tweetUrl = buildTweetUrl(username, tweetId);
  const selector = '[data-testid="tweet"]';

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
  );

  await page.goto(tweetUrl);
  await page.waitForSelector(selector, { timeout: 5000 });

  const tweetElement = await page.$(selector);

  // TODO: check if screenshot is already in DB
  // remove path and define return type
  const screenshot = await tweetElement.screenshot({
    path: `./src/screenshots/${username}-${tweetId}.png`,
  });

  await page.close();

  return screenshot;
};

/**
 * Function to get all screenshots for given ids and username
 * @param {string} username
 * @param {string[]} tweetIds array of tweet ids
 */
const getAllTweetScreenshots = async (username, tweetIds) => {
  const browser = await puppeteer.launch();

  const screenshots = await Promise.all(
    tweetIds.map(async (tweetId) => {
      const screenshot = await getScreenshot(username, tweetId, browser);
      return { tweetId, screenshot };
    })
  );

  console.log('screenshots', screenshots);

  await browser.close();
  // TODO: save screenshots to DB
};

export { getAllTweetScreenshots };
