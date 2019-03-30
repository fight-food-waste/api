/* eslint-disable no-undef */
const request = require('supertest');

// eslint-disable-next-line no-unused-vars
const should = require('chai').should();
const app = require('../app');

describe('GET /users', () => {
    it('the status code should be 200', async () => {
        const response = await request(app).get('/users');
        response.statusCode.should.equal(200);
    });
    it('the content type should be JSON', async () => {
        const response = await request(app).get('/users');
        response.headers['content-type'].should.equal('application/json; charset=utf-8');
    });
    it('the response should contain 1 user', async () => {
        const response = await request(app).get('/users');
        JSON.parse(response.text).length.should.equal(1);
    });
    it('the id of the user should 1', async () => {
        const response = await request(app).get('/users');
        JSON.parse(response.text)[0].id.should.equal(1);
    });
    it('the username of the user should john', async () => {
        const response = await request(app).get('/users');
        JSON.parse(response.text)[0].username.should.equal('john');
    });
});
