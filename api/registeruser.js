const _ = require('lodash');
const { Op } = require('sequelize');
const reguserValidate = require('../validators/registeruser');
const db = require('../sqlcon')
const { or, eq } = Op;

module.exports = async function registeruser(ctx) {
  const post = ctx.request.body;
  const val = reguserValidate(post);

  if (!val.valid) {
    //  console.log(val);
    const ers = _.map(val.errors, (err) => (err.stack));
    const e = new Error(JSON.stringify(ers));
    e.status = 400;
    throw e;
  }

  const usersForWhere = _.map(post.users, (user) => ({ email: { [eq]: user } }));
  //  console.log(usersForWhere);
  const usrs = await db.userModel.findAll({
    where: {
      [or]: usersForWhere
    },
    attributes: ['id'],
  });

  if (usrs && usrs.length > 0) {
    const uteam = _.map(usrs, (obj) => (obj.toJSON().id));

    const team = await db.teamModel.findOne({
      where: {
        groupnumber: post.teamid
      }
    });
    //  console.log(team);
    if (team) {
      await team.addUsers(uteam);
    } else {
      throw new Error('Invalid teamid.');
    }

    ctx.response.status = 204;
    //  ctx.response.body = JSON.stringify({ message: 'successfully registered.' });
  } else {
    throw new Error('Passed in users are not valid.');
  }
};
