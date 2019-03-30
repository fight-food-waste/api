/* eslint-disable no-undef */
const request = require('supertest');

// eslint-disable-next-line no-unused-vars
const should = require('chai').should();
const app = require('../app');

describe('GET /', () => {
    it('the status code should be 200', async () => {
        const response = await request(app).get('/');
        response.statusCode.should.equal(200);
    });
    it('the content type should be JSON', async () => {
        const response = await request(app).get('/');
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
    });
    it('the response should be a welcome message', async () => {
        const response = await request(app).get('/');
        response.text.should.equal(JSON.stringify({ message: 'Welcome to the FFW API!' }));
    });
});
