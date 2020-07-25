const _ = require('lodash');
const suspenduserValidate = require('../validators/suspenduser');
const db = require('../sqlcon');

module.exports = async function suspendUser(ctx) {
  const val = suspenduserValidate(ctx.request.body);
  if (!val.valid) {
    //  console.log(val);
    const ers = _.map(val.errors, (err) => (err.stack));
    const e = new Error(JSON.stringify(ers));
    e.status = 400;
    throw e;
  }

  await db.userModel.update({
    isdeleted: true
  }, {
    where: {
      email: ctx.request.body.userid
    }
  });
  ctx.response.body = JSON.stringify({ message: 'successfully suspended.' });
};
