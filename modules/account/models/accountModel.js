const {DataTypes} =  require("sequelize");
const instance = require("../../../dbconnection");

const account = instance.sequelize.define('accounts', {
  id:{
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  code:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false
  },
  accountType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastLogin:{
    type: DataTypes.DATE,
    allowNull: true
  },
  loginAttempts:{
    type: DataTypes.INTEGER,
    allowNull: true
  }
  },
  {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'accounts'
  }
)

exports.model = account;