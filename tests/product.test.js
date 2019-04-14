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
  it('the product should be part of bundle 1', async () => {
    const response = await request(app)
      .get('/product/1');
    assert.strictEqual(JSON.parse(response.text).bundle_id, 1);
  });
  it('the product name should be meat', async () => {
    const response = await request(app)
      .get('/product/1');
    assert.strictEqual(JSON.parse(response.text).details, '{name: "meat"}');
  });
  it('the quantity should be 1', async () => {
    const response = await request(app)
      .get('/product/1');
    assert.strictEqual(JSON.parse(response.text).quantity, 1);
  });
  it('the product should expire on 2019-07-22', async () => {
    const response = await request(app)
      .get('/product/1');
    assert.strictEqual(JSON.parse(response.text).expiration_date, '2019-07-22T22:00:00.000Z');
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
  it('there should be 1 product', async () => {
    const response = await request(app)
      .get('/product/bundle/1');
    assert.strictEqual(JSON.parse(response.text).length, 1);
  });
  it('the product should be part of bundle 1', async () => {
    const response = await request(app)
      .get('/product/bundle/1');
    assert.strictEqual(JSON.parse(response.text)[0].bundle_id, 1);
  });
});
