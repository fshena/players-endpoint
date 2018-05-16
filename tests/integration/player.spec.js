require('dotenv').config();

const models = require('@localleague/database');

const server = require('../../devServer');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

models.Player.sync({force: true});

describe('Player', () => {
    describe('POST /players', () => {
        it('should create a Player record and return its link', done => {
            const playerRecord = {
                user_id: 101,
                birthday: '1987-03-12',
                height: 180,
                weight: 70,
            };
            chai.request(server)
                .post('/players')
                .set('Authorization', process.env.TEST_TOKEN)
                .set('content-type', 'application/json')
                .send(playerRecord)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.have.header('content-location');
                    done();
                });
        });
    });
    describe('PUT /players/:id', () => {
        it('should replace a Player record with a new one', done => {
            const playerRecord = {
                user_id: 102,
                birthday: '1987-2-12',
                height: 180,
                weight: 68,
            };
            chai.request(server)
                .put('/players/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .set('content-type', 'application/json')
                .send(playerRecord)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
    describe('PATCH /players/:id', () => {
        it('should update a Player record field value', done => {
            const patch =  {
                "op": "update",
                "path": "weight",
                "value": 75
            };
            chai.request(server)
                .patch('/players/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .send(patch)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
    describe('GET /players', () => {
        it('should return an array of Player objects', done => {
            chai.request(server)
                .get('/players')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.length(1);
                    res.body[0].should.be.an('object');
                    done();
                });
        });
        it('should return an array of Player objects with fields: name, telephone', done => {
            chai.request(server)
                .get('/players?fields=height,weight')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.be.an('object').that.has.all.keys('height', 'weight');
                    done();
                });
        });
        it('should return 400 when the requested fields are wrong', done => {
            chai.request(server)
                .get('/players?fields=height,doesNotExist')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    describe('GET /players/:id', () => {
        it('should return a Player object', done => {
            chai.request(server)
                .get('/players/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done();
                });
        });
        it('should return a Player object with fields: id, user_id, birthday', done => {
            chai.request(server)
                .get('/players/1?fields=id,user_id,birthday')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object').that.has.all.keys('id', 'user_id', 'birthday');
                    done();
                });
        });
        it('should return 400 when the requested fields are wrong', done => {
            chai.request(server)
                .get('/players/1?fields=id,doesNotExist')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

    });
    describe('DELETE /players/:id', () => {
        it('should delete a Player record', done => {
            chai.request(server)
                .delete('/players/1')
                .set('Authorization', process.env.TEST_TOKEN)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});
