import { buildTweetUrl } from '../utils/utils.js';
import puppeteer from 'puppeteer';

const getScreenshot = async (username, tweetId, page) => {
  const tweetUrl = buildTweetUrl(username, tweetId);
  const selector = '[data-testid="tweet"]';

  await page.goto(tweetUrl);
  await page.waitForSelector(selector, { timeout: 5000 });

  const tweetElement = await page.$(selector);
  const screenshot = await tweetElement.screenshot({
    path: `./src/screenshots/${username}-${tweetId}.png`,
  });

  return screenshot;
};

const getAllTweetScreenshots = async (username, tweetIds) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
  );
  const screenshots = await Promise.all(
    tweetIds.map(async (tweetId) => {
      const screenshot = await getScreenshot(username, tweetId, page);
      return screenshot;
    })
  );

  await page.close();
  await browser.close();
  debugger;
};

export { getAllTweetScreenshots };
