const express = require('express');
const router = express.Router();
const CFF = require('../models/CFF');

// Rota para pegar os valores
router.get('/CFF/todos', async (req, res) => {
    try {
        const dados = await CFF.find({}, {"Nome": 1, "Valor": 1, _id: 0});
        res.json({dados});
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});



module.exports = router;