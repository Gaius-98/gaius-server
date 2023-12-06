const {  DataTypes } = require('sequelize');
const createForm = (sequelize) =>{
  const Form = sequelize.define('Form', {
    // 在这里定义模型属性
    id: {
      type: DataTypes.NUMBER,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
    },
    list:{
      type:DataTypes.TEXT,
    },
    del:{
      type:DataTypes.NUMBER
    },
    formProp:{
      type:DataTypes.STRING
    },
    img:{
      type:DataTypes.TEXT
    },
    creator:{
      type:DataTypes.STRING
    },
    createTime:{
      type:DataTypes.DATE(6),
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName:'gaius_form_list',
    timestamps: false,
  });
  return Form
}

module.exports = createForm