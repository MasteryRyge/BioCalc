const express = require('express');
const router = express.Router();
const CombustivelFossilSubstitutoRoutes = require('../models/combustivelFossilSubstituto');

// Rota para pegar informações do poder calórico
router.get('/combustivelFossilSubstituto/:tipoB', async (req, res) => {
    try {
        const tipo = req.params.tipoB;
        const dados = await CombustivelFossilSubstitutoRoutes.find({"Combustivel fossil substituto": tipo});
        res.json({dados});
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;