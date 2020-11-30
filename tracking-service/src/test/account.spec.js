const mongoose = require("mongoose");
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../build/app');
const should = chai.should();

chai.use(chaiHttp);

/*
  * Test the /GET route
  */
describe('/GET account with id 1', () => {
    it('it should GET account with id 1', (done) => {
        chai.request(server)
            .get('/api/account/1?data=data')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('isActive');
                res.body.should.have.property('accountName');
                res.body.should.have.property('accountId').eql(1);
                done();
            });
    });
});

describe('/GET account with id 3', () => {
    it('it should GET account with id 3', (done) => {
        chai.request(server)
            .get('/api/account/3?data=data')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('isActive').eq(true);
                res.body.should.have.property('accountName');
                res.body.should.have.property('accountId').eql(3);
                done();
            });
    });
});

describe('/GET account with wrong format of id', () => {
    it('it should return status 400', (done) => {
        chai.request(server)
            .get('/api/account/s?data=data')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

describe('/GET account which is not active', () => {
    it('it should return status 204', (done) => {
        chai.request(server)
            .get('/api/account/2?data=data')
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
});

