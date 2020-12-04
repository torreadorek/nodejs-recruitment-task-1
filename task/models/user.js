'use strict';
const { UUIDV4 } = require('../node_modules/sequelize/lib/data-types')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.PermissionsRegister,{foreignKey:'userId'})
    }
  };
  User.init({
    username:{ 
       type: DataTypes.STRING,
       allowNull:false
    },
    token: {
      type:DataTypes.UUID,  
      defaultValue:new UUIDV4(),
      allowNull:false
    },
    isAdmin: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
    } 
  }, {
    sequelize,
    modelName: 'User',
    timestamps:false
  });
  return User;
};