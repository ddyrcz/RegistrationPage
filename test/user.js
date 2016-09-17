process.env.NODE_ENV = 'test';

var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server');

var should = chai.should();

chai.use(chaiHttp);

var User = require('../lib/models/user');

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    describe('/POST api/users', () => {
        it('it should create new user', (done) => {
            var user = {
                name:'ddyrcz', 
                password:'pass'
            };
            chai.request(server)
                .post('/api/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/GET api/users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
});