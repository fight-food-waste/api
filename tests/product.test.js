const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const app = require('../app');

describe('POST /product', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        details: '{name: "meat"}',
        quantity: 1,
        bundle_id: 1,
        expiration_date: '2019-07-23',
      });
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(JSON.parse(response.text).id, 1);
  });
});

describe('GET /product/1', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/product/1');
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/product/1');
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('the id of the product should be 1', async () => {
    const response = await request(app)
      .get('/product/1');
    assert.strictEqual(JSON.parse(response.text).id, 1);
  });
});

describe('GET /product/bundle/1', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/product/bundle/1');
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/product/bundle/1');
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('the id of the user should be 1', async () => {
    const response = await request(app)
      .get('/product/bundle/1');
    assert.strictEqual(JSON.parse(response.text).length, 1);
  });
});
