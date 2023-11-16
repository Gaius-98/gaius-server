const {  DataTypes } = require('sequelize');
const createPage = (sequelize) =>{
  const Page = sequelize.define('Page', {
    // 在这里定义模型属性
    id: {
      type: DataTypes.NUMBER,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
    },
    width:{
      type:DataTypes.STRING,
    },
    height:{
        type:DataTypes.STRING,
    },
    img:{
        type:DataTypes.TEXT,
    },
    del:{
      type:DataTypes.NUMBER
    },
    config:{
      type:DataTypes.TEXT
    },
    createTime:{
      type:DataTypes.DATE(6),
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName:'gaius_page_list',
    timestamps: false,
  });
  return Page
}

module.exports = createPage