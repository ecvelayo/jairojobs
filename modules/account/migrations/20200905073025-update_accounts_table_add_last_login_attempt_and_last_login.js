'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'accounts',
        'lastLogin',
        {
          type: Sequelize.DataTypes.DATE,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'accounts',
        'loginAttempts',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false
        }
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
