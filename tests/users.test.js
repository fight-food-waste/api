const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const app = require('../app');

describe('GET /donor/1', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/donor/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/donor/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('the id of the user should be 1', async () => {
    const response = await request(app)
      .get('/donor/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(JSON.parse(response.text).id, 1);
  });
  it('the first name of the user should be John', async () => {
    const response = await request(app)
      .get('/donor/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(JSON.parse(response.text).first_name, 'John');
  });
  it('the last name of the user should be Doe', async () => {
    const response = await request(app)
      .get('/donor/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(JSON.parse(response.text).last_name, 'Doe');
  });
});
