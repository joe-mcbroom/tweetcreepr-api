import request from 'supertest';
import app from '../app.js';

describe('Test the root endpoints', () => {
  it('should return a 404 for a non-existent endpoint', async () => {
    const response = await request(app).get('/api/v1/non-existent-endpoint');
    expect(response.status).toBe(404);
  });
  it('should return a 400 with message at /tweets endpoint', async () => {
    const response = await request(app).get('/api/tweets');
    expect(response.status).toBe(400);
    expect(response.body.error).toEqual('Please specify a username');
  });
});

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
