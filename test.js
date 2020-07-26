require('should');
const supertest = require('supertest');
const app = require('./index');
const db = require('./sqlcon');

const server = app.listen();
const request = supertest.agent(server);

describe('API test', () => {
  before((done) => {
    app.on('appStarted', () => {
      done();
    });
  });

  after((done) => {
    console.log('server is closing');
    (async () => {
      await db.sequelize.close();
      server.close(() => {
        console.log('db && server closed');
        done();
      });
    })();
  });

  const reg = {
    teamid: 1,
    users: [
      'placerat@rutrummagna.edu',
      'auctor@diamdictumsapien.org'
    ]
  };

  describe('POST /api/user/register', () => {
    it('should return 204 when success', (done) => {
      request
        .post('/api/user/register')
        .send(reg)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            res.status.should.be.eql(204);
            done();
          }
        });
    });
  });

  const sampdat = {
    userid: 'auctor@diamdictumsapien.org'
  };

  describe('POST /api/user/suspend', () => {
    it('should return 200 when user suspended', (done) => {
      //  this.timeout(3000);
      request
        .post('/api/user/suspend')
        .send(sampdat)
        .end((err, res) => {
          if (err) {
            //  this.timeout(0);
            done(err);
          } else {
            res.status.should.be.eql(200);
            //  this.timeout(0);
            done();
          }
        });
    });
  });

  const sampdataretrievenoty = {
    team: 1,
    notification: 'Hello users! @panugantivbharathi2@gmail.com, @user-sample1@example.com, @user-sample2@example.com'
  };

  describe('POST /api/user/retrievefornotifications', () => {
    it('should return 200 when successfully give the list', (done) => {
      request
        .post('/api/user/retrievefornotifications')
        .send(sampdataretrievenoty)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            res.status.should.be.eql(200);
            done();
          }
        });
    });
  });

  const up = {
    userid: 2,
    photo: 'ads'
  };

  const up2 = {
    userid: 2,
    photo: 'uuLMhh=='
  };

  describe('POST /api/user/upload-photo', () => {
    it('should return 400 when the base64 string is invalid', (done) => {
      request
        .post('/api/user/upload-photo')
        .send(up)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            res.status.should.be.eql(400);
            done();
          }
        });
    });

    it('should return 200 when the request is successful', (done) => {
      request
        .post('/api/user/upload-photo')
        .send(up2)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            res.status.should.be.eql(200);
            done();
          }
        });
    });
  });
});
