const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const app = require('../app');

describe('GET /', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/');
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/');
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('the response should be a welcome message', async () => {
    const response = await request(app)
      .get('/');
    assert.strictEqual(response.text, JSON.stringify({ message: 'Welcome to the FFW API!' }));
  });
});
