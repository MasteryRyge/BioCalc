import {useState, useEffect} from "react";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Teste from "./components/testeProps";
import Cadastro from "./components/Cadastro";
import Calculadora from "./components/Calculadora";
import FaseAgricola from "./components/FaseAgricola";
import FaseIndustrial from "./components/FaseIndustrial";
import FaseDistribuicao from "./components/FaseDistribuicao";
import Resultados from "./components/Resultados";


function App() {

    const [InsumoEscolhido, setInsumoEscolhido] = useState("");
    const [EmissaoBiomassaAlocadaInsumo, setEmissaoBiomassaAlocadaInsumo] = useState(0);
    const [ItensidadeCarbonoAgricola, setItensidadeCarbonoAgricola] = useState(0)
    const [ItensidadeCarbonoIndustrial, setItensidadeCarbonoIndustrial] = useState(0)
    const [ItensidadeCarbonoDistribuicao, setItensidadeCarbonoDistribuicao] = useState(0)
    const [CombustaoEstacionariaInsumo, setCombustaoEstacionariaInsumo] = useState(0)
    const [MJKgInsumo, setMJKgInsumo] = useState(0)
    const [Tabela1, setTabela1] = useState([0,0,0,0,0])

    function recebeInsumo (dado) {

        setInsumoEscolhido(dado);

        setCombustaoEstacionariaInsumo(dado["Combustao estacionaria (queima em caldeira)"]);

        setMJKgInsumo(dado["MJ/kg"])

        fetch(`http://localhost:5000/count/${encodeURIComponent(dado["Fontes de Biomassa"] + " (combustão)")}`)
            .then(res => res.json())
            .then(data => {
                setEmissaoBiomassaAlocadaInsumo(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

    }

    function recebeAgricola (dado) {


        setItensidadeCarbonoAgricola(dado)
        
    }

    function recebeIndustrial (dado) {


        setItensidadeCarbonoIndustrial(dado)

    }

    function recebeDistribuicao (dado) {

        console.log(dado)

        setItensidadeCarbonoDistribuicao(dado)

    }

    useEffect(() => {
        
        setTabela1([ItensidadeCarbonoAgricola, ItensidadeCarbonoIndustrial, ItensidadeCarbonoDistribuicao, CombustaoEstacionariaInsumo, MJKgInsumo])
        
    }, [ItensidadeCarbonoAgricola, ItensidadeCarbonoIndustrial, ItensidadeCarbonoDistribuicao, CombustaoEstacionariaInsumo, MJKgInsumo]);



  return (
    <div className="App">
      <header className="App-header">

          <Calculadora dadosIntensidadeCarbono={Tabela1} combustaoEstacionariaInsumoEscolhido={CombustaoEstacionariaInsumo}/>

          <FaseAgricola funcaoInsumo={recebeInsumo} funcaoResultadoAgricola={recebeAgricola}/>

          <FaseIndustrial poderCalorificoInsumo = {InsumoEscolhido['g/MJ']/1000}
                          emissaoBiomassaAlocadaInsumo = {EmissaoBiomassaAlocadaInsumo}
                          funcaoResultadoIndustrial = {recebeIndustrial}/>

          <FaseDistribuicao poderCalorificoInsumo = {InsumoEscolhido['g/MJ']/1000} funcaoResultadoDistribuicao = {recebeDistribuicao}/>

          <div className="md-5"/>

          <Resultados temp={Tabela1}/>

      </header>
    </div>
  );
}

export default App;
