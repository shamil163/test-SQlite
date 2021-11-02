const express = require("express");
 const router = express.Router();
 const Book = require("../BookModel")//Моя модель в базе данных

//Проверку осуществлял в постмане, поэтому просто возвращал res.send("удачно/неудачно")
//В реальном же проекте возвращал определенный статус и клиенте проверял этот статус и уже делал какие либо изменения(если на сервере все отлично)


 //ручка на вывод всех книг
 router.get("/allbook", async(req,res) => {
   const allbook = await Book.findAll()
   res.json(allbook)
 })


//ручка на создание книги
router.post("/new",async(req,res) => {
  const {name , autor ,money ,release} = req.body;
  await Book.create({ name, autor, money, release });
  res.send("Книга создана")
})


//ручка на удаление
router.delete("/:id", async(req, res) => {
  //console.log(req.params.id);
try {
  //долго не мог найти ошибку в методе destoy(невнимательность)!!!!
    await Book.destroy({ where: {id:req.params.id }});
    res.send("запись удалена");
    
  } catch (error) {
     res.send("ошибка");
  }
})


/////////////////////////////////////////////
//ручка для отправления данных клиенту для редактирования книги(передам данные книги  в заполненую форму)  
router.get("/edit/:id", async (req, res) => {
  try {
    const book = await Book.findOne({ where: { id: req.params.id } });
    res.json(book)
  } catch (error) {
    res.send("ошибка");
  }
});


//ручка для изменения данных о книге (которые я передал в заполненную форму)
 router.post("/edit/:id",  async (req, res) => {
  const { name, autor, money, release } = req.body;
  
  await Book.update(
    { name, autor, money, release },
    {where: { id: req.params.id },
    
  });
  res.send("Данные изменены");
});
///////////////////////////////////////////////////////////



// Поиск книги по имени цене автору(строгое соответствие). Можно вынести в разные ручки(router) для конкретного поля
//Или добавить условие ИЛИ
router.post("/search", async (req, res) => {
  const { nameSearch, autorSearch, moneySearch } = req.body;
    try {
    //Ниже сырой запрос
    //const books = SELECT * FROM 'book' WHERE name = nameSearch OR autor= autorSearch OR monew = moneySearch;
    const books = await Book.findAll({
      where: {
        name: nameSearch,
        autor: autorSearch,
        money: Number(moneySearch),
      },
    });
    if(books.length) {
      res.json(books);

    }
    res.send("книг нет");
  } catch (error) {
    console.log(error);
  }
});



 module.exports = router;
