const router = require("express").Router();

//importar model
const todoItemsModel = require("../models/todoItems");

//rota para adicionar um item
router.post("/api/item", async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
    });
    //salvar item no mongodb
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

//retornar data do banco de dados
router.get("/api/items", async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

//atualizar um item
router.put("/api/item/:id", async (req, res) => {
  try {
    //procurar item pelo id e atualizar
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Item atualizado com sucesso!");
  } catch (err) {
    res.json(err);
  }
});

//deletar um item
router.delete("/api/item/:id", async (req, res) => {
  try {
    //procurar item pelo id e deletar
    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item deletado com sucesso!");
  } catch (err) {
    res.json(err);
  }
});

//exportar router
module.exports = router;
