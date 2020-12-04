'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await  queryInterface.bulkInsert('Users',[
    {username:"admin",token:"320ca9c4-ed20-4f09-bcb8-9b34b976b501",isAdmin:true},
    {username:"fizzbuzz",token:"a5c9700a-684e-11ea-bc55-0242ac130003",isAdmin:false},
    {username:"foobar",token:"a5c973fc-684e-11ea-bc55-0242ac130003",isAdmin:false}
  ])
  await queryInterface.bulkInsert('PermissionsRegisters',[
    {permissionName:'read',userId:2},
    {permissionName:'read',userId:3},
    {permissionName:'create',userId:3}
  ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
