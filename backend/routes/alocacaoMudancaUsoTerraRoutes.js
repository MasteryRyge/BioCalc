const express = require('express');
const router = express.Router();
const AlocacaoMudancaUsoTerra = require('../models/AlocacaoMudancaUsoTerra');

// Rota para pegar os tipos de estagios
router.get('/alocacaoMudancaUsoTerra/:biomassa', async (req, res) => {
    try {
        const tipo = req.params.biomassa;
        const dados = await AlocacaoMudancaUsoTerra.find({"Biomassa": tipo}, {"Estagios do ciclo de vida": 1, _id: 0});
        res.json({dados});
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota para pegar alocação da biomassa
router.get('/alocacaoMudancaUsoTerra/:biomassa/:estagio', async (req, res) => {
    try {
        const tipo = req.params.biomassa;
        const estagioCiclo = req.params.estagio;
        const dados = await AlocacaoMudancaUsoTerra.find({"Biomassa": tipo, "Estagios do ciclo de vida": estagioCiclo}, {"Alocacao considerada para biomassa": 1, _id: 0});
        res.json({dados});
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;