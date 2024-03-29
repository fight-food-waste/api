const request = require('supertest');
const { describe, it } = require('mocha');
const assert = require('assert');

const token = require('./token');
const app = require('../app');

describe('POST /bundle', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .post('/bundle')
      .set('token', token)
      .send({});
    assert.strictEqual(response.statusCode, 200);
  });
  it('the bundle id should be 2', async () => {
    const response = await request(app)
      .post('/bundle')
      .set('token', token)
      .send({});
    assert.strictEqual(JSON.parse(response.text).id, 2);
  });
  it('should close bundle 2', async () => {
    const response = await request(app)
      .post('/bundle/2/close')
      .set('token', token)
      .send({});
    assert.strictEqual(response.statusCode, 200);
  });
});

describe('GET /bundle/1', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/bundle/1')
      .set('token', token);
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/bundle/1')
      .set('token', token);
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('the id of the bundle should be 1', async () => {
    const response = await request(app)
      .get('/bundle/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).id, 1);
  });
});

describe('GET /bundle/user/1', () => {
  it('the status code should be 200', async () => {
    const response = await request(app)
      .get('/bundle/user/1')
      .set('token', token);
    assert.strictEqual(response.statusCode, 200);
  });
  it('the content type should be JSON', async () => {
    const response = await request(app)
      .get('/bundle/user/1')
      .set('token', token);
    assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
  });
  it('there should be two bundle', async () => {
    const response = await request(app)
      .get('/bundle/user/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text).length, 2);
  });
  it('the user_id should be 1', async () => {
    const response = await request(app)
      .get('/bundle/user/1')
      .set('token', token);
    assert.strictEqual(JSON.parse(response.text)[0].user_id, 1);
  });

  describe('GET /bundle/2', () => {
    it('the status code should be 200', async () => {
      const response = await request(app)
        .get('/bundle/2')
        .set('token', token);
      assert.strictEqual(response.statusCode, 200);
    });
    it('the content type should be JSON', async () => {
      const response = await request(app)
        .get('/bundle/2')
        .set('token', token);
      assert.strictEqual(response.headers['content-type'], 'application/json; charset=utf-8');
    });
    it('the id of the bundle should be 2', async () => {
      const response = await request(app)
        .get('/bundle/2')
        .set('token', token);
      assert.strictEqual(JSON.parse(response.text).id, 2);
    });
    it('the bundle should be closed', async () => {
      const response = await request(app)
        .get('/bundle/2')
        .set('token', token);
      assert.strictEqual(JSON.parse(response.text).status, 'closed');
    });
  });
});
