const Koa = require('koa');
const koaBody = require('koa-body');
const db = require('./sqlcon');
const userRouter = require('./routers/userstory.route');
const seed = require('./seed/seed-db');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.type = 'application/json';
    ctx.body = { 'error(s)': err.message };
  }
});

app.use(koaBody());

(async () => {
  await db.sequelize.sync({});
  //  seed.insert(); //should be running this only for the initial run
  userRouter(app);
  app.listen(process.env.PORT || 3300, () => {
    console.log('App has started');
    app.emit('appStarted');
  });
})();

module.exports = app;
