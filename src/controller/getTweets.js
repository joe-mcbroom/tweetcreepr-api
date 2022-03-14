import { TwitterApi } from "twitter-api-v2";

const getTweets = async (req, res) => {
  try {
    const twitterApi = new TwitterApi(process.env.BEARER_TOKEN);
    const client = twitterApi.readOnly;
    const userId = await getUserIdByUsername(client);
    const tweets = await client.v2.userTimeline(userId, { exclude: "replies" });
    res.json(tweets);
  } catch (error) {
    console.error(error);
  }
};

const getUserIdByUsername = async (client) => {
  const res = await client.v2.userByUsername("joemcbroomwt"); // my twitter handle
  if (res?.errors.length > 0) throw new Error(res.errors[0].detail);
  return res.id;
};

export { getTweets };
