const {DataTypes} =  require("sequelize");
const instance = require("../../../dbconnection");

const passwordReset = instance.sequelize.define('password_reset_codes', {
  id:{
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  accountUuid:{
    type: DataTypes.STRING,
    allowNull: false
  },
  code:{
      type: DataTypes.STRING,
      allowNull: false
  }
  },
  {
    createdAt: true,
    updatedAt: "usedAt",
    deletedAt: true,
    tableName: 'password_reset_codes'
  }
)

exports.model = passwordReset;