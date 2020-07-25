const { Sequelize } = require('sequelize');
const team = require('./models/team');
const user = require('./models/user');
const userphoto = require('./models/userphoto');

const sequelize = new Sequelize('userstories', 'root', 'Tanvi@2017', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true
  }
});

const teamModel = sequelize.define('team', team);
const userModel = sequelize.define('user', user);
const userphotoModel = sequelize.define('userphoto', userphoto);

userModel.belongsToMany(teamModel, { as: 'teams', through: 'userteam' });
teamModel.belongsToMany(userModel, { as: 'users', through: 'userteam' });
userphotoModel.belongsTo(userModel, { as: 'User', foreignKey: 'userid' });

module.exports = {
  sequelize,
  teamModel,
  userModel,
  userphotoModel
};
