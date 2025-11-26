const express = require('express');
const router = express.Router();
const EmissaoInsumos = require('../models/emissaoInsumos');


//pega todos os veiculos

router.get('/count/veiculos', async (req, res) => {
    try {
        const dados = await EmissaoInsumos.find({"Unidade ": "tkm"}, {"Insumo": 1, _id: 0});
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

//pega os caminhoes

router.get('/count/caminhoes', async (req, res) => {
    try {
        const dados = await EmissaoInsumos.find({"Insumo": {$regex: "caminhão"}}, {"Insumo": 1, _id: 0});
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

//pega os dados do ferroviario

router.get('/count/ferroviario', async (req, res) => {
    try {
        const dados = await EmissaoInsumos.find({"Insumo": "Transporte, ferroviário"});
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

//pega os dados da balsa

router.get('/count/balsa', async (req, res) => {
    try {
        const dados = await EmissaoInsumos.find({"Insumo": "Transporte, balsa"});
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.get('/count/navio', async (req, res) => {
    try {
        const dados = await EmissaoInsumos.find({"Insumo": "Transporte, navio"});
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

//pega as eletricidades

router.get('/count/eletricidades', async (req, res) => {
    try {
        const dados = await EmissaoInsumos.find({"Insumo": {$regex: "Eletricidade"}}, {"Insumo": 1 ,"Emissao biomassa alocada": 1, _id: 0});
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});


// Rota para pegar informações do insumo
router.get('/count/:tipoB', async (req, res) => {
    try {
        const tipo = req.params.tipoB;
        const dados = await EmissaoInsumos.find({"Insumo": tipo});
        res.json({dados});
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});



module.exports = router;