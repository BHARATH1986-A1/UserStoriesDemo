const { DataTypes } = require('sequelize');

module.exports = {
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  isdeleted: DataTypes.BOOLEAN
};
