const {  DataTypes } = require('sequelize');
const createTable = (sequelize) =>{
  const Table = sequelize.define('Table', {
    // 在这里定义模型属性
    id: {
      type: DataTypes.NUMBER,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
    },
    del:{
      type:DataTypes.NUMBER
    },
    dataSetting:{
      type:DataTypes.TEXT
    },
    globalCfg:{
      type:DataTypes.TEXT
    },
    tableCfg:{
      type:DataTypes.TEXT
    },
    creator:{
      type:DataTypes.STRING
    },
    createTime:{
      type:DataTypes.DATE(6),
      defaultValue: DataTypes.NOW
    },

  }, {
    tableName:'gaius_table_list',
    timestamps: false,
  });
  return Table
}

module.exports = createTable