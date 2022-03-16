# TweetCreepr
## Twitter Screenshot API

[![Build Status](https://app.travis-ci.com/joe-mcbroom/tweetcreepr-api.svg?branch=main)](https://app.travis-ci.com/joe-mcbroom/tweetcreepr-api)

> ### Node (Express + Firebase) API to get and store screenshots of tweets for a particular twitter user.

# Getting started

To get the Node server running locally:

- Clone this repo
- Sign up for a Twitter for Developers account and get an `$access_token` [(Bearer Token)](https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens) 
- Create a file called `.env` in the main directory. It should look like below:
```
#.env
BEARER_TOKEN="$access_token GOES HERE"
```
- `npm install` to install all required dependencies
- `npm run dev` to start the local server
- `npm run test` to run the tests
- `npm run test-watch` to run the tests in watch mode (will run tests on save)

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [puppeteer](https://github.com/puppeteer/puppeteer) - The headless browser for taking screenshots of **tweets**
- [firebase](https://firebase.google.com/) - The database for storing screenshots
- [jest](https://jestjs.io/) - The testing framework for Node

## Application Structure

- `src/app.js` - The entry point to our application. This file defines our express server 
- `src/router/` - API Routes
- `src/controllers/` - API controllers for handling requests
- `src/utils/` - utility functions
- `src/tests/` - unit tests (ie: `module.name.spec.js`)

## Error Handling

TBD

## Authentication

TBD