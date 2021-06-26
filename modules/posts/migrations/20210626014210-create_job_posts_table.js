'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('jobposts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      jobPosition: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jobPostedBy: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      branchLocation: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      postedTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      jobDescription: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jobQualifications: {
        allowNull: false,
        type: Sequelize.STRING
      },
      careerLevel: {
        allowNull: false,
        type: Sequelize.STRING
      },
      experienceYears: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      jobSpecializations: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jobQualifications: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jobType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('jobposts');
  }
};