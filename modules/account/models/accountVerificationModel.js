const {DataTypes} =  require("sequelize");
const instance = require("../../../dbconnection");

const accountVerification = instance.sequelize.define('account_verifications', {
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
    tableName: 'account_verifications'
  }
)

exports.model = accountVerification;