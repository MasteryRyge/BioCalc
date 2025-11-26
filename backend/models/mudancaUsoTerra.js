const mongoose = require("mongoose");

const MudancaUsoTerraSchema = new mongoose.Schema({
    Estado: String,

    // Pinus
    TaxaEmissaoPinus: Number,
    TempoProducaoPinus: Number,
    ProdutividadePinus: Number,
    EmissaoFinalPinus: Number,

    // Eucalipto
    TaxaEmissaoEucalipto: Number,
    TempoProducaoEucalipto: Number,
    ProdutividadeEucalipto: Number,
    EmissaoFinalEucalipto: Number,

    // Amendoim
    TaxaEmissaoAmendoim: Number,
    TempoProducaoAmendoim: Number,
    ProdutividadeAmendoim: Number,
    EmissaoFinalAmendoim: Number,
});

module.exports = mongoose.model("MudancaUsoTerra", MudancaUsoTerraSchema, "MudancaUsoTerra");