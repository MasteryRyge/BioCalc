const mongoose = require("mongoose");

const CombustivelFossilSubstituto = new mongoose.Schema({
    CombustivelSubstituto: String,
    IntensidadeTotalCarbonoGramas: Number,
    IntensidadeTotalCarbonoKg: Number

});

module.exports = mongoose.model("CombustivelFossilSubstituto", CombustivelFossilSubstituto, "CombustivelFossilSubstituto");