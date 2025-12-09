const mongoose = require("mongoose");

const CFFSchema = new mongoose.Schema({
    nome: String,
    valor: Number,
    descricao: String
});

module.exports = mongoose.model("CFF", CFFSchema, "CFF");