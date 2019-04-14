const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const app = require('../app');

describe('POST /bundle', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .post('/bundle')
      .send({});
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(JSON.parse(response.text).id, 1);
  });
});
