const {DataTypes} =  require("sequelize");
const instance = require("../../../dbconnection");

const account = instance.sequelize.define('accounts', {
  id:{
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  accountId:{
    type: DataTypes.BIGINT
  },
  firstName:{
      type: DataTypes.STRING,
      allowNull: false
  },
  middleName: {
      type: DataTypes.STRING,
      allowNull: false
  },
  lastName:{
      type: DataTypes.STRING,
      allowNull: false
  },
  birthDate:{
      type: DataTypes.DATE,
      allowNull: false
  },
  sex: {
      type: DataTypes.STRING,
      allowNull: false
  },
  cellularNumber: {
      type: DataTypes.STRING,
      allowNull: false
  },
  address: {
      type: DataTypes.STRING,
      allowNull: false
  }
  },
  {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'account_informations'
  }
)

exports.model = account;