'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("account_verifications",{
      id: 
      {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT,
        allowNull: false
      },
      accountUuid:{
        type: Sequelize.STRING,
        allowNull: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      //updatedAt functionality
      usedAt:{
        type: Sequelize.DATE,
      },
      deletedAt:{
        type: Sequelize.DATE
      }
    }

    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable("account_verifications");
  }
};
