const { Sequelize } = require('sequelize');//секвалайз для создания экземпляра
const sequelize = new Sequelize('booksTest','book', '123', {// имя базы, название модели таблицы, пароль
  dialect: 'sqlite',// база данных
  host: './books.sqlite'//папка куда все буду сохранять
}) 


module.exports = sequelize;
