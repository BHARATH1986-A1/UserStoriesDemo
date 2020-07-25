const db = require('../sqlcon');
const users = require('./users.json');
const teams = require('./teams.json');

module.exports = {
  insert: () => {
    db.userModel.bulkCreate(users)
      .then(() => {
        db.teamModel.bulkCreate(teams)
          .then(() => {
            console.log('Success adding users and teams');
          });
      })
      .catch((error) => {
        throw error;
      });
  }
};
