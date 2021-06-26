'use strict';
//NOTE! YOU CAN USE NPX SEQUELIZE migration:create --NAME "NAMEOFMIGRATION" TO CREATE A MIGRATION
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('account_informations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountId:{
        type: Sequelize.BIGINT
      },
      firstName: {
        type: Sequelize.STRING
      },
      middleName: {
        type: Sequelize.STRING
      },
      lastName:{
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE
      },
      sex: {
        type: Sequelize.STRING
      },
      cellularNumber: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('account_informations');
  }
};