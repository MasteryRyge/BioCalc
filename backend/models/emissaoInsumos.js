const mongoose = require("mongoose");

const EmissaoInsumosSchema = new mongoose.Schema({
    insumo: String,
    unidade: String,
    emissaoProcesso: Number,
    alocacaoProduto: Number,
    alocacaoCoProduto: Number,
    emissaoBiomassaAlocada: Number,
    tipoBiomassa: String
});

module.exports = mongoose.model("EmissaoInsumos", EmissaoInsumosSchema, "EmissaoInsumos");