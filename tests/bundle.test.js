const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const app = require('../app');

describe('POST /bundle', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .post('/bundle')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b')
      .send({});
    assert.strictEqual(response.statusCode, 200);
  });
  it('the bundle id should be 2', async () => {
    const response = await request(app)
      .post('/bundle')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b')
      .send({});
    assert.strictEqual(JSON.parse(response.text).id, 2);
  });
});

describe('GET /bundle/1', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/bundle/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/bundle/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('the id of the bundle should be 1', async () => {
    const response = await request(app)
      .get('/bundle/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(JSON.parse(response.text).id, 1);
  });
});

describe('GET /bundle/donor/1', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/bundle/donor/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/bundle/donor/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('there should be two bundle', async () => {
    const response = await request(app)
      .get('/bundle/donor/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(JSON.parse(response.text).length, 2);
  });
  it('the donor_id should be 1', async () => {
    const response = await request(app)
      .get('/bundle/donor/1')
      .set('token', '1e8c296780242a701e6d9aa314f51c580640df72b122af58aa5ac3996d80c96b');
    assert.strictEqual(JSON.parse(response.text)[0].donor_id, 1);
  });
});
