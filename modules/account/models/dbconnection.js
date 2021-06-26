const sql = require("mysql");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize ("ifoods_dev", "root", "", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max:  10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

try{
    sequelize.authenticate();
    console.log("DB connected");
}catch(e){
    console.log("Unable to connect");
}

exports.sequelize = sequelize;