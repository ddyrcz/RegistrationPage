process.env.NODE_ENV = 'test';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server');

let should = chai.should();

// var User = require('../lib/models/user');

chai.use(chaiHttp);

describe('/GET api/users', () => {
    it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});