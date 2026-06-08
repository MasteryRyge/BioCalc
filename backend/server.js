const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require('cors');
const emissaoInsumosRoutes = require('./routes/emissaoInsumosRoutes');
const poderCaloricoRoutes = require('./routes/poderCaloricoRoutes');
const mudancaUsoTerra = require('./routes/mudancaUsoTerraRoutes');
const alocacaoMudancaUsoTerra = require('./routes/alocacaoMudancaUsoTerraRoutes');
const combustivelFossilSubstitutoRoutes = require('./routes/combustivelFossilSubstitutoRoutes');
const CFFRoutes = require('./routes/CFFRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/', emissaoInsumosRoutes);
app.use('/', poderCaloricoRoutes);
app.use('/', mudancaUsoTerra);
app.use('/', alocacaoMudancaUsoTerra);
app.use('/', combustivelFossilSubstitutoRoutes);
app.use('/', CFFRoutes);


app.get("/", (req, res) => {
    res.send("Teste9")
})

app.get("/cbio", async (req, res) => {
    try {
        const response = await axios.get(
            "https://precos.api.datagro.com/dados/?formato=json&a=CBIO&idioma=pt-br&bolsa=1",
            {
                headers: {
                    Referer: "https://cbio.datagro.com/",
                    "User-Agent": "Mozilla/5.0"
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ erro: "Falha ao buscar CBIO" });
    }
});

mongoose.connect("mongodb://0.0.0.0:27017/Sustentabilidade")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar:", err));


app.listen(5000, () => console.log("Servidor rodando na porta 5000"));

