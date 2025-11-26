const mongoose = require("mongoose");

const AlocacaoMudancaUsoTerraSchema = new mongoose.Schema({
    biomassa: String,
    estagioCicloVida: String,
    biomassaCicloVida: String,
    tipoBiomassa: String,
    produto: String,
    alocacaoProduto: Number,
    coProduto: String,
    AlocacaoCoProduto: Number,
    alocacaoProduto: Number,
    alocacaoConsideradaBiomassa: Number,
    filtro: String

});

module.exports = mongoose.model("AlocacaoMudancaUsoTerra", AlocacaoMudancaUsoTerraSchema, "AlocacaoMudancaUsoTerra");