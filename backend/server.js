const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const emissaoInsumosRoutes = require('./routes/emissaoInsumosRoutes');
const poderCaloricoRoutes = require('./routes/poderCaloricoRoutes');
const mudancaUsoTerra = require('./routes/mudancaUsoTerraRoutes');
const alocacaoMudancaUsoTerra = require('./routes/alocacaoMudancaUsoTerraRoutes');
const combustivelFossilSubstitutoRoutes = require('./routes/combustivelFossilSubstitutoRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/', emissaoInsumosRoutes);
app.use('/', poderCaloricoRoutes);
app.use('/', mudancaUsoTerra);
app.use('/', alocacaoMudancaUsoTerra);
app.use('/', combustivelFossilSubstitutoRoutes);



app.get("/", (req, res) => {
    res.send("Teste9")
})

mongoose.connect("mongodb+srv://ryanmeloandrade:sustentabilidadebiocalc@sustentabilidadebio.z09luqa.mongodb.net/Sustentabilidade")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar:", err));


app.listen(5000, () => console.log("Servidor rodando na porta 5000"));

