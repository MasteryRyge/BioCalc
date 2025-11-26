const express = require('express');
const router = express.Router();
const MudancaUsoTerra = require('../models/mudancaUsoTerra');

// Rota para pegar informações do insumo
router.get('/mudancaUsoTerra/:estado', async (req, res) => {
    try {

        if (req.params.estado === 'todos') {

            const estados = await MudancaUsoTerra.find({ "Estado ": { $ne: "Brasil" }}, { "Estado ": 1, _id: 0 });
            res.json(estados);

        } else {
            const estado = await MudancaUsoTerra.find({"Estado ": req.params.estado});
            res.json(estado);
        }

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

module.exports = router;