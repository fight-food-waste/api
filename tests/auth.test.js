const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const app = require('../app');

describe('POST /auth', () => {
  it('the status code should be 200 with correct password', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        email: 'john.doe@gmail.com',
        password: 'qwertyuiop',
      });
    assert.strictEqual(response.statusCode, 200);
  });
  it('the status code should be 403 with bad password', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        email: 'john.doe@gmail.com',
        password: 'badpassword',
      });
    assert.strictEqual(response.statusCode, 403);
  });
  it('the status code should be 400 with bad email', async () => {
    const response = await request(app)
      .post('/auth')
      .send({
        email: 'doesnotexist@gmail.com',
        password: 'password',
      });
    assert.strictEqual(response.statusCode, 400);
  });
});
