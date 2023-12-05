const {  DataTypes } = require('sequelize');
const createUser = (sequelize) =>{
  const User = sequelize.define('User', {
    // 在这里定义模型属性
    id: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    username:{
      type:DataTypes.STRING,
      primaryKey:true
    },
    password:{
      type:DataTypes.STRING
    },
    email:{
      type:DataTypes.STRING
    },
    permission:{
      type:DataTypes.STRING
    },
    createTime:{
      type:DataTypes.DATE(6),
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName:'gaius_user',
    timestamps: false,
  });
  return User
}

module.exports = createUser