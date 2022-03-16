import request from 'supertest';
import app from '../app.js';

describe('Test the tweets endpoint', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/api/tweets/jack?');
    expect(response.statusCode).toBe(200);
  });

  test('It should limit number of tweets with query param', async () => {
    const limit = 5;
    const response = await request(app).get(`/api/tweets/jack?limit=${limit}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.count).toBeLessThanOrEqual(limit);
    expect(response.body.tweets.length).toBe(response.body.count);
  });
});
