//importar mongoose para criar uma tabela
const mongoose = require('mongoose');

//criar uma tabela
const TodoItemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }
});

//exportar o modelo
module.exports = mongoose.model('todo', TodoItemSchema);