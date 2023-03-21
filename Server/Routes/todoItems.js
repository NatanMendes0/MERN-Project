const router = require('express').Router();

//importar model
const todoItemsModel = require('../models/todoItems');

//rota para adicionar um item

router.post('/api/items', async (req, res) => {
    try {
        const newItem = new todoItemsModel({
            item: req.body.item
        });
        
        //salvar item no mongodb
        const savedItem = await newItem.save();
        res.status(200).json('Item adicionado com sucesso!');
    } catch (err) {
        res.json(err);
    }
});