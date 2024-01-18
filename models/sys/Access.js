const {  DataTypes } = require('sequelize');
const createAccess = (sequelize) =>{
  const Access = sequelize.define('Access', {
    // 在这里定义模型属性
    id: {
      type: DataTypes.STRING,
      primaryKey:true
    },
    ip: {
      type: DataTypes.STRING,
    },
    address:{
      type:DataTypes.STRING,
    },
    accessTime:{
      type:DataTypes.DATE(6),
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName:'gaius_access',
    timestamps: false,
  });
  return Access
}

module.exports = createAccess