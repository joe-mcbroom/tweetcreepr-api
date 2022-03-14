import { TwitterApi } from "twitter-api-v2";

const getTweetsByUsername = async ({ params: { username } }, res) => {
  try {
    const twitterApi = new TwitterApi(process.env.BEARER_TOKEN);
    const client = twitterApi.readOnly;
    const userId = await getUserIdByUsername(client, username);
    const tweets = await client.v2.userTimeline(userId, { exclude: "replies" });
    res.json(tweets);
  } catch (error) {
    console.error(error);
  }
};

const getUserIdByUsername = async (client, username) => {
  const res = await client.v2.userByUsername(username); // my twitter handle
  if (res.errors && res.errors.length > 0) {
    throw new Error(res.errors[0].detail);
  }
  return res.data.id;
};

export { getTweetsByUsername };
