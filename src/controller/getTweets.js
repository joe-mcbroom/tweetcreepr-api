import { TwitterApi } from 'twitter-api-v2';
import { getScreenshotOfTweet } from './getScreenshot.js';

const getTweetsByUsername = async (req, res) => {
  const {
    params: { username },
    query: { limit },
  } = req;
  try {
    const twitterApi = new TwitterApi(process.env.BEARER_TOKEN);
    const client = twitterApi.readOnly;
    const userId = await getUserIdByUsername(client, username);
    const {
      _realData: { data: tweets, meta },
    } = await client.v2.userTimeline(userId, {
      exclude: 'replies',
      max_results: limit ? Math.min(limit, 10) : 10, // max 10 tweets
    });

    // TODO: get tweet ids from DB, compare, etc.
    const screenshots = await Promise.all(
      tweets.map(async ({ id }) => {
        const screenshot = await getScreenshotOfTweet(username, id);
        return screenshot;
      })
    );

    res.json(tweets);
    return {
      tweets,
      count: meta.result_count,
    };
  } catch (error) {
    res.status(500).json(error.message);
    throw new Error(error);
  }
};

const getUserIdByUsername = async (client, username) => {
  const res = await client.v2.userByUsername(username);
  if (res.errors && res.errors.length > 0) {
    throw new Error(res.errors[0].detail);
  }
  return res.data.id;
};

export { getTweetsByUsername };
