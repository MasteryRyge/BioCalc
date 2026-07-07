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
import Instrucoes from "./components/Instrucoes";


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

    //config casas decimais

    const [casasDecimais, setCasasDecimais] = useState(2);
    const [inputCasas, setInputCasas] = useState(2);

    const alterarCasasDecimais = () => {
        setCasasDecimais(Number(inputCasas));
    };

    const [mostrarInstrucoes, setMostrarInstrucoes] = useState(false);

    //cadastro

    const atualizarCadastro = (dados) => {
        setDadosCadastro(dados);
    };

    const [dadosCadastro, setDadosCadastro] = useState({
        empresa: "",
        estado: "",
        cidade: "",
        responsavel: "",
        email: ""
    });

    return (
        <div className="App">
            <div className="cabecalho">

                <img
                    src="https://static.wixstatic.com/media/95903f_2388e7a4a1c64b2db106e2bab590ac2e~mv2.png"
                    className="logo"
                    alt="EngS"
                />

                <div className="titulo">
                    <h4>BioCalc</h4>

                    <h5>
                        Calculadora para contabilização de Eficiência Energético-Ambiental para<br/>
                        biocombustíveis sólidos (Pellets ou Briquetes)
                    </h5>
                </div>

            </div>

                {mostrarInstrucoes && (

                    <Instrucoes
                        fechar={() => setMostrarInstrucoes(false)}
                    />

                )}

                <div style={{ display: mostrarResultados ? "none" : "block" }}>

                    <div
                        className="position-fixed"
                        style={{
                            position: "fixed",
                            top: "150px",
                            left: "15px",
                            zIndex: 1000
                    }}
                    >
                        Casas decimais
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={inputCasas}
                            onChange={(e) => setInputCasas(e.target.value)}
                            className="form-control"
                            style={{ width: "60px" }}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={alterarCasasDecimais}
                            style={{ width: "80px" }}
                        >
                            Aplicar
                        </button>

                    </div>

                    <button
                        className="btn btn-info"
                        onClick={() => setMostrarInstrucoes(true)}
                        style={{
                            position: "fixed",
                            top: "280px",
                            left: "15px",
                            zIndex: 1000
                        }}>
                        Instruções
                    </button>



                    <CalculoCFF
                        dadosIntensidadeCarbono={Tabela1}
                        ImpactoTransporteBiomassa={ImpactoTransporteBiomassa}
                        ImpactoTotal={ImpactoTotal}
                        funcaoTotalCFF={recebeTotalCFF}
                    />

                    <Cadastro onChangeCadastro={atualizarCadastro}/>


                    <FaseAgricola
                        funcaoInsumo={recebeInsumo}
                        funcaoResultadoAgricola={recebeAgricola}
                        funcaoDadosCFF={recebeDadosCFF}
                        casasDecimais={casasDecimais}
                    />

                    <FaseIndustrial
                        poderCalorificoInsumo={InsumoEscolhido["g/MJ"] / 1000}
                        emissaoBiomassaAlocadaInsumo={EmissaoBiomassaAlocadaInsumo}
                        funcaoResultadoIndustrial={recebeIndustrial}
                        casasDecimais={casasDecimais}
                    />

                    <FaseDistribuicao
                        poderCalorificoInsumo={InsumoEscolhido["g/MJ"] / 1000}
                        funcaoResultadoDistribuicao={recebeDistribuicao}
                        casasDecimais={casasDecimais}
                    />

                    <Calculadora
                        dadosIntensidadeCarbono={Tabela1}
                        combustaoEstacionariaInsumoEscolhido={CombustaoEstacionariaInsumo}
                        casasDecimais={casasDecimais}
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
                        top: "150px",
                        left: "20px",
                        zIndex: 1000
                    }}>
                        Voltar
                    </button>

                    <div style={{
                            position: "fixed",
                            top: "230px",
                            left: "20px",
                            zIndex: 1000
                    }}>

                        <b>Casas decimais</b>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={inputCasas}
                            onChange={(e) => setInputCasas(e.target.value)}
                            className="form-control"
                            style={{ width: "60px" }}
                        />

                        <button
                            className="btn btn-primary"
                            onClick={alterarCasasDecimais}
                            style={{ width: "80px" }}
                        >
                            Aplicar
                        </button>
                    </div>

                    <button
                        className="btn btn-info"
                        onClick={() => setMostrarInstrucoes(true)}
                        style={{
                            position: "fixed",
                            top: "360px",
                            left: "20px",
                            zIndex: 1000
                        }}>

                        Instruções
                    </button>


                    <Resultados temp={Tabela1} casasDecimais={casasDecimais} dadosCadastro={dadosCadastro}/>
                </div>


        </div>
    );
}

export default App;
