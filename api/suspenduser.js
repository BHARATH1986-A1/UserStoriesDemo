const _ = require('lodash');
const suspenduserValidate = require('../validators/suspenduser');
const db = require('../sqlcon');
const util = require('../utils/util');

module.exports = async function suspendUser(ctx) {
  const val = suspenduserValidate(ctx.request.body);
  if (!val.valid) {
    //  console.log(val);
    const ers = _.map(val.errors, (err) => (err.stack));
    throw util.createErrorMsg(400, JSON.stringify(ers));
  }

  const user = await db.userModel.update({
    isdeleted: true
  }, {
    where: {
      email: ctx.request.body.userid
    }
  });
  if (user && user[0] >= 1) {
    console.log(user);
    ctx.response.body = JSON.stringify({ message: 'successfully suspended.' });
  } else {
    throw util.createErrorMsg(400, 'User doesn\'t exist');
  }
};
