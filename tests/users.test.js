const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const token = require('./token');
const app = require('../app');

describe('GET /user/1', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/user/1')
      .set('token', token);
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/user/1')
      .set('token', token);
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('the id of the user should be 1', async () => {
    const response = await request(app)
      .get('/user/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).id, 1);
  });
  it('the first name of the user should be John', async () => {
    const response = await request(app)
      .get('/user/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).first_name, 'John');
  });
  it('the last name of the user should be Doe', async () => {
    const response = await request(app)
      .get('/user/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).last_name, 'Doe');
  });
});

describe('GET /user', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/user')
      .set('token', token);
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/user')
      .set('token', token);
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('the id of the user should be 1', async () => {
    const response = await request(app)
      .get('/user')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).id, 1);
  });
  it('the first name of the user should be John', async () => {
    const response = await request(app)
      .get('/user')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).first_name, 'John');
  });
  it('the last name of the user should be Doe', async () => {
    const response = await request(app)
      .get('/user')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).last_name, 'Doe');
  });
});
