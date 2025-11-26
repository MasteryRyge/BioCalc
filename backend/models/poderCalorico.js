const mongoose = require("mongoose");

const PoderCaloricoSchema = new mongoose.Schema({
    fonte: String,
    gMJ: Number,
    MJKg: Number,
    combustao: Number,
    biocombustivel: String,
    MJKgBiocombustivel: Number
});

module.exports = mongoose.model("PoderCalorico", PoderCaloricoSchema, "PoderCalorico");