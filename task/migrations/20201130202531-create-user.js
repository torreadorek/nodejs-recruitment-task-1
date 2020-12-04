'use strict';
const { UUIDV4 } = require('../node_modules/sequelize/lib/data-types')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      token: {
        type:Sequelize.UUID,
        defaultValue:new UUIDV4(),
        allowNull:false
      },
      isAdmin: {
        type:Sequelize.BOOLEAN,
        defaultValue:false,
        allowNull:false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};