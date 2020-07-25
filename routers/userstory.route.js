const router = require('@koa/router')();
const registeruser = require('../api/registeruser');
const uploadphoto = require('../api/uploadphoto');
const suspendUser = require('../api/suspenduser');
const retrievefornotifications = require('../api/retrievefornotifications');

module.exports = (app) => {
  router
    //  .get('/api', list)
    //  .post('/api', create)
    .post('/api/user/register', registeruser)
    .post('/api/user/upload-photo', uploadphoto)
    .post('/api/user/suspend', suspendUser)
    .post('/api/user/retrievefornotifications', retrievefornotifications);

  app.use(router.routes());
};
