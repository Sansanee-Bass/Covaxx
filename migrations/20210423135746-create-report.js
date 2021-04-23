'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hr_uid: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      change_cases: {
        type: Sequelize.INTEGER
      },
      change_fatalities: {
        type: Sequelize.INTEGER
      },
      change_tests: {
        type: Sequelize.INTEGER
      },
      change_hospitalizations: {
        type: Sequelize.INTEGER
      },
      change_criticals: {
        type: Sequelize.INTEGER
      },
      change_recoveries: {
        type: Sequelize.INTEGER
      },
      change_vaccinations: {
        type: Sequelize.INTEGER
      },
      change_vaccines_distributed: {
        type: Sequelize.INTEGER
      },
      total_cases: {
        type: Sequelize.INTEGER
      },
      total_fatalities: {
        type: Sequelize.INTEGER
      },
      total_tests: {
        type: Sequelize.INTEGER
      },
      total_hospitalizations: {
        type: Sequelize.INTEGER
      },
      total_criticals: {
        type: Sequelize.INTEGER
      },
      total_recoveries: {
        type: Sequelize.INTEGER
      },
      total_vaccinations: {
        type: Sequelize.INTEGER
      },
      total_vaccines_distributed: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reports');
  }
};