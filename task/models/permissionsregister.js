'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionsRegister extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PermissionsRegister.belongsTo(models.User,{foreignKey:'id'})
    }
  };
  PermissionsRegister.init({
    permissionName:{
      type:DataTypes.ENUM('read','create'),
      allowNull:false
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'PermissionsRegister',
    timestamps:false
  });
  return PermissionsRegister;
};