const { Model, DataTypes } = require("sequelize");// экспорт данных с секвалайза
const sequelize = require ('./database')

class Book extends Model {}

Book.init({
  name: {
    type: DataTypes.STRING
  },
  autor: {
    type: DataTypes.STRING
  },
  money: {
    type: DataTypes.STRING
  },
  release: {
    type: DataTypes.STRING
  }
},
  {
  sequelize,
  modelName:'book'
});


module.exports = Book;
