const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

//usar express.json() para poder conseguir a data no formato json
app.use(express.json());

//importar rotas
const PORT = process.env.PORT || 5500;

//conectar ao mongodb
mongoose.connect(process.env.DB_CONNECT).then(() => console.log('Connected to DB!')).catch(err => console.log(err));

//adicionar porta e conectar ao mongodb
app.listen( PORT, () => console.log(`Server running on port ${PORT}`));