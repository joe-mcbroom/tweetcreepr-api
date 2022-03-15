import { buildTweetUrl } from '../utils/utils.js';
import puppeteer from 'puppeteer';

const getScreenshotOfTweet = async (username, tweetId) => {
  // TODO: handle multiple tweetids without making new browser instance
  const tweetUrl = buildTweetUrl(username, tweetId);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
  );
  await page.goto(tweetUrl);
  const selector = '[data-testid="tweet"]';
  await page.waitForSelector(selector, { timeout: 5000 });
  const tweetElement = await page.$(selector);
  const screenshot = await tweetElement.screenshot({
    path: `./src/screenshots/${username}-${tweetId}.png`,
  });
  await page.close();
  await browser.close();
  return screenshot;
};

export { getScreenshotOfTweet };
