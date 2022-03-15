const buildTweetUrl = (username, tweetId) => {
  return `https://twitter.com/${username}/status/${tweetId}`;
};

export { buildTweetUrl };
