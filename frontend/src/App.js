import {useState, useEffect} from "react";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cadastro from "./components/Cadastro";
import Calculadora from "./components/Calculadora";
import FaseAgricola from "./components/FaseAgricola";
import FaseIndustrial from "./components/FaseIndustrial";
import FaseDistribuicao from "./components/FaseDistribuicao";
import Resultados from "./components/Resultados";
import CalculoCFF from "./components/CalculoCFF";


function App() {

    const [InsumoEscolhido, setInsumoEscolhido] = useState("");
    const [EmissaoBiomassaAlocadaInsumo, setEmissaoBiomassaAlocadaInsumo] = useState(0);
    const [ItensidadeCarbonoAgricola, setItensidadeCarbonoAgricola] = useState(0)
    const [ItensidadeCarbonoIndustrial, setItensidadeCarbonoIndustrial] = useState(0)
    const [ItensidadeCarbonoDistribuicao, setItensidadeCarbonoDistribuicao] = useState(0)
    const [CombustaoEstacionariaInsumo, setCombustaoEstacionariaInsumo] = useState(0)
    const [MJKgInsumo, setMJKgInsumo] = useState(0)
    const [MJKgInsumoBio, setMJKgInsumoBio] = useState(0)
    const [Tabela1, setTabela1] = useState([0,0,0,0,0,0,0])
    const [ImpactoTransporteBiomassa, setImpactoTransporteBiomassa] = useState(0)
    const [ImpactoTotal, setImpactoTotal] = useState(0)
    const [TotalCFF, setTotalCFF] = useState(0)

    function recebeInsumo (dado) {

        setInsumoEscolhido(dado);

        setCombustaoEstacionariaInsumo(dado["Combustao estacionaria (queima em caldeira)"]);

        setMJKgInsumo(dado["MJ/kg"])
        setMJKgInsumoBio(dado["MJ/kg Biocombustivel"])

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

    function recebeDadosCFF (dado1, dado2) {

        setImpactoTotal(dado1);

        setImpactoTransporteBiomassa(dado2);


    }

    function recebeTotalCFF (dado) {

        setTotalCFF(dado);

    }

    function recebeIndustrial (dado) {


        setItensidadeCarbonoIndustrial(dado)

    }

    function recebeDistribuicao (dado) {

        setItensidadeCarbonoDistribuicao(dado)

    }

    useEffect(() => {
        
        setTabela1([ItensidadeCarbonoAgricola, ItensidadeCarbonoIndustrial, ItensidadeCarbonoDistribuicao, CombustaoEstacionariaInsumo, MJKgInsumo, MJKgInsumoBio, TotalCFF])

    }, [ItensidadeCarbonoAgricola, ItensidadeCarbonoIndustrial, ItensidadeCarbonoDistribuicao, CombustaoEstacionariaInsumo, MJKgInsumo, MJKgInsumoBio, TotalCFF]);


    const [mostrarResultados, setMostrarResultados] = useState(false);

    const abrirResultados = () => {
        setMostrarResultados(true);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const voltarPagina = () => {
        setMostrarResultados(false);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    return (
        <div className="App">
            <header className="App-header">

                <div style={{ display: mostrarResultados ? "none" : "block" }}>
                    <CalculoCFF
                        dadosIntensidadeCarbono={Tabela1}
                        ImpactoTransporteBiomassa={ImpactoTransporteBiomassa}
                        ImpactoTotal={ImpactoTotal}
                        funcaoTotalCFF={recebeTotalCFF}
                    />

                    <Cadastro/>


                    <FaseAgricola
                        funcaoInsumo={recebeInsumo}
                        funcaoResultadoAgricola={recebeAgricola}
                        funcaoDadosCFF={recebeDadosCFF}
                    />

                    <FaseIndustrial
                        poderCalorificoInsumo={InsumoEscolhido["g/MJ"] / 1000}
                        emissaoBiomassaAlocadaInsumo={EmissaoBiomassaAlocadaInsumo}
                        funcaoResultadoIndustrial={recebeIndustrial}
                    />

                    <FaseDistribuicao
                        poderCalorificoInsumo={InsumoEscolhido["g/MJ"] / 1000}
                        funcaoResultadoDistribuicao={recebeDistribuicao}
                    />

                    <Calculadora
                        dadosIntensidadeCarbono={Tabela1}
                        combustaoEstacionariaInsumoEscolhido={CombustaoEstacionariaInsumo}
                    />

                    <div className="container mb-5 d-flex flex-column justify-content-center align-items-center">
                            <button className="btn btn-success btn-lg" onClick={abrirResultados}>
                                Ver Resultados
                            </button>
                    </div>

                </div>

                <div style={{ display: mostrarResultados ? "block" : "none" }}>
                    <button className="btn btn-secondary btn-lg" onClick={voltarPagina} style={{
                        position: "fixed",
                        top: "20px",
                        left: "20px",
                        zIndex: 1000
                    }}>
                        Voltar
                    </button>

                    <Resultados temp={Tabela1} />
                </div>

            </header>
        </div>
    );
}

export default App;
