const {  DataTypes } = require('sequelize');
const createDict = (sequelize) =>{
  const Dict = sequelize.define('Dict', {
    // 在这里定义模型属性
    id: {
      type: DataTypes.NUMBER,
      primaryKey:true
    },
    dictType: {
      type: DataTypes.STRING,
    },
    dictTypeChdesc:{
      type:DataTypes.STRING,
    },
    value:{
      type: DataTypes.STRING,
    },
    label:{
        type: DataTypes.STRING,
    },
    orderNum:{
        type: DataTypes.NUMBER,
    },
    description:{
        type: DataTypes.STRING,
    },
    del:{
      type:DataTypes.NUMBER
    },
  }, {
    tableName:'gaius_sys_dict',
    timestamps: false,
  });
  return Dict
}

module.exports = createDict