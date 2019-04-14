const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const app = require('../app');

describe('POST /auth', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        email: 'john.doe@gmail.com',
        password: 'qwertyuiop',
      });
    assert.strictEqual(response.statusCode, 200);
  });
  it('the status code should be 400', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        email: 'john.doe@gmail.com',
        password: 'badpassword',
      });
    assert.strictEqual(response.statusCode, 400);
  });
});
