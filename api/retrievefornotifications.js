const _ = require('lodash');
const { Op } = require('sequelize');
const retrieveUserForNotyValidate = require('../validators/retrieveuserfornotification');
const db = require('../sqlcon');
const util = require('../utils/util');

const { or, eq } = Op;

module.exports = async function retrievefornotifications(ctx) {
  const { body } = ctx.request;

  const val = retrieveUserForNotyValidate(body);
  if (!val.valid) {
    //  console.log(val);
    const ers = _.map(val.errors, (err) => (err.stack));
    throw util.createErrorMsg(400, JSON.stringify(ers));
  }

  let emails = util.extractEmails(body.notification);
  let teamparsed = {};
  if (body.team) {
    const team = await db.teamModel.findOne({
      where: {
        groupnumber: body.team
      },
      include: [{
        model: db.userModel,
        as: 'users',
        attributes: ['email'],
        required: false,
        where: {
          isdeleted: false
        }
      }]
    });
    if (!team) {
      throw util.createErrorMsg(400, 'teamid doesn\'t exists');
    }
    teamparsed = team.toJSON();
  }

  if (!emails) {
    emails = [];
  } else {
    const usersForWhere = _.map(emails, (user) => ({ email: { [eq]: user } }));
    const usrs = await db.userModel.findAll({
      where: {
        [or]: usersForWhere,
        isdeleted: true
      },
      attributes: ['email'],
    });
    if (usrs && usrs.length > 0) {
      const parsedusrs = _.map(usrs, (obj) => (obj.toJSON().email));
      emails = _.filter(emails, (em) => (!(_.includes(parsedusrs, em))));
    }
  }

  if (teamparsed.users && teamparsed.users.length > 0) {
    _.each(teamparsed.users, (user) => (emails.push(user.email)));
  }

  if (emails.length === 0) {
    throw util.createErrorMsg(400, 'no users exist to send the notification.');
  }

  ctx.response.body = JSON.stringify({ recipients: _.uniq(emails) });
};
