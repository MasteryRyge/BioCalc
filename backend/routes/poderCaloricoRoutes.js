const express = require('express');
const router = express.Router();
const PoderCalorico = require('../models/poderCalorico');

// Rota para pegar informações do poder calórico
router.get('/poderCalorico/:tipoB', async (req, res) => {
    try {
        const tipo = req.params.tipoB;
        const dados = await PoderCalorico.find({"Fontes de Biomassa": tipo});
        res.json({dados});
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;