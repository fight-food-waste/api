const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const token = require('./token');
const app = require('../app');

describe('POST /product', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .post('/product')
      .set('token', token)
      .send({
        name: 'Pocari Sweat Drink',
        barcode: 8801097150010,
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
      .get('/product/1')
      .set('token', token);
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/product/1')
      .set('token', token);
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('the id of the product should be 1', async () => {
    const response = await request(app)
      .get('/product/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).id, 1);
  });
  it('the product should be part of bundle 1', async () => {
    const response = await request(app)
      .get('/product/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).bundle_id, 1);
  });
  it('the product\'s name should be Pocari Sweat Drink', async () => {
    const response = await request(app)
      .get('/product/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).name, 'Pocari Sweat Drink');
  });
  it('the product\'s bardcode should be 8801097150010', async () => {
    const response = await request(app)
      .get('/product/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).barcode, 8801097150010);
  });
  it('the quantity should be 1', async () => {
    const response = await request(app)
      .get('/product/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).quantity, 1);
  });
});

describe('GET /product/bundle/1', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/product/bundle/1')
      .set('token', token);
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/product/bundle/1')
      .set('token', token);
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('there should be 1 product', async () => {
    const response = await request(app)
      .get('/product/bundle/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).length, 1);
  });
  it('the product should be part of bundle 1', async () => {
    const response = await request(app)
      .get('/product/bundle/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text)[0].bundle_id, 1);
  });
});
