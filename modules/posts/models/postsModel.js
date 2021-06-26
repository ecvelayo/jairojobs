const {DataTypes} =  require("sequelize");
const instance = require("../../../dbconnection");


const posts = instance.sequelize.define("posts", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      jobPosition: {
        allowNull: false,
        type: DataTypes.STRING
      },
      jobPostedBy: {
        allowNull: false,
        type: DataTypes.BIGINT
      },
      branchLocation: {
        allowNull: false,
        type: DataTypes.BIGINT
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING
      },
      postedTime: {
        allowNull: false,
        type: DataTypes.DATE
      },
      jobDescription: {
        allowNull: false,
        type: DataTypes.STRING
      },
      jobQualifications: {
        allowNull: false,
        type: DataTypes.STRING
      },
      careerLevel: {
        allowNull: false,
        type: DataTypes.STRING
      },
      experienceYears: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      jobSpecializations: {
        allowNull: false,
        type: DataTypes.STRING
      },
      jobQualifications: {
        allowNull: false,
        type: DataTypes.STRING
      },
      jobType: {
        allowNull: false,
        type: DataTypes.STRING
      },
    },
    {
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        tableName: "jobposts"
    }
)

exports.model = posts;