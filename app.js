const express = require("express")
const path = require("path");


const PORT = 3005

const app = express()
const sequelize = require("./database")
const db = sequelize.sync().then()

//мидлвара для чтения json
app.use(express.json())


//импорт роутера(в этой папке вся логика с книгами)
const bookRouter = require('./routes/bookRouter')

//использование роута с определенным адресом
app.use("/book",bookRouter)


//запуск сервера
app.listen(PORT, console.log(`Сервер запущен на ${PORT} порту`))













