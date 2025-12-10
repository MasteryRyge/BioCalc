import {useState, useEffect} from "react";

function FaseAgricola({funcaoInsumo, funcaoResultadoAgricola, funcaoDadosCFF}) {

    //produção de biomassas

    const biomassas = ["Resíduo de Pinus", "Resíduo de Eucaliptus", "Carvão vegetal de eucalipto",
        "Casca de Amendoin", "Eucaliptus Virgem", "Pinus Virgem"]


    const [Insumo, setInsumo] = useState("")

    const [EmissaoBiomassaAlocada, setEmissaoBiomassaAlocada] = useState(0)

    const [DadoEspecifico, setDadoEspecifico] = useState("Não")

    const [ValorDadoEspecifico, setValorDadoEspecifico] = useState(0)

    const [PoderCalorico, setPoderCalorico] = useState(0)

    const [ImpactoMilho, setImpactoMilho] = useState(0)

    const [ImpactoTotal, setImpactoTotal] = useState(0)

    const [ResiduoMadeira, setResiduoMadeira] = useState([])


    function mudaInsumo(e) {

        if (e.target.value !== "") {

            setInsumo(e.target.value)

            //envia o valor pro app


            var nomeInsumo = e.target.value + " (produção)"

            fetch(`http://localhost:5000/count/${encodeURIComponent(nomeInsumo)}`)
                .then(res => res.json())
                .then(data => {
                    setEmissaoBiomassaAlocada(data.dados[0]["Emissao biomassa alocada"]);
                    setCultivoAgricola(data.dados[0]["Tipo de biomassa"]);
                })
                .catch(err => console.error('Erro ao buscar dados:', err));


            fetch(`http://localhost:5000/poderCalorico/${encodeURIComponent(e.target.value)}`)
                .then(res => res.json())
                .then(data => {
                    setPoderCalorico(data.dados[0]['g/MJ']/1000)
                    funcaoInsumo(data.dados[0])
                    setQuantidadeMediaBiomassaTransportada(data.dados[0]['g/MJ']/1000000)
                })
                .catch(err => console.error('Erro ao buscar dados:', err));



            fetch(`http://localhost:5000/alocacaoMudancaUsoTerra/${encodeURIComponent(e.target.value)}`)
                .then(res => res.json())
                .then(data => {
                    const temp = data.dados.map(item => item["Estagios do ciclo de vida"]);
                   setResiduoMadeira(temp);
                })
                .catch(err => console.error('Erro ao buscar dados:', err));


            setResiduoMadeiraEscolhido("")


        } else {
            setInsumo("");
            setEmissaoBiomassaAlocada("");
            setPoderCalorico("");
        }

    }


    function mudaDadoEspecifico(e){

        setDadoEspecifico(e.target.value)

    }

    function mudaValorDadoEspecifico(e){

        setValorDadoEspecifico(e.target.value)

    }


    function mudaMilho(e){

        var nomeInsumo2 = "Amido de milho (produção)"

        fetch(`http://localhost:5000/count/${encodeURIComponent(nomeInsumo2)}`)
            .then(res => res.json())
            .then(data => setImpactoMilho(data.dados[0]["Emissao biomassa alocada"] * e.target.value))
            .catch(err => console.error('Erro ao buscar dados:', err));




    }


    useEffect(() => {

        if(DadoEspecifico === "Não"){

            setImpactoTotal(EmissaoBiomassaAlocada * PoderCalorico + ImpactoMilho);

        } else {

            setImpactoTotal(ValorDadoEspecifico * EmissaoBiomassaAlocada * PoderCalorico + ImpactoMilho);

        }

    }, [EmissaoBiomassaAlocada, PoderCalorico, ImpactoMilho, ValorDadoEspecifico, DadoEspecifico]);


    //mudança de uso da terra

    const [CultivoAgricola, setCultivoAgricola] = useState("")

    const [FatorImpactoMut, setFatorImpactoMut] = useState("")

    const [PercentualAlocacaoBiomassa, setPercentualAlocacaoBiomassaAlocada] = useState("")

    const [ImpactoMUT, setImpactoMut] = useState("")

    const [ListaEstados, setListaEstados] = useState([])

    const [EstadoEscolhido, setEstadoEscolhido] = useState("")

    const [ResiduoMadeiraEscolhido, setResiduoMadeiraEscolhido] = useState("")


    //carregamento de dados inicial, só executa uma vez
    useEffect(() => {

        fetch(`http://localhost:5000/mudancaUsoTerra/todos`)
            .then(res => res.json())
            .then(data => {
                const temp = data.map(item => item["Estado "]);
                setListaEstados(temp)
            })
            .catch(err => console.error('Erro ao buscar dados:', err));


        fetch(`http://localhost:5000/count/veiculos`)
            .then(res => res.json())
            .then(data => {
                const temp = data.map(item => item["Insumo"]);
                setTiposVeiculos(temp)
            })
            .catch(err => console.error('Erro ao buscar dados:', err));




    }, [] )


    useEffect(() => {

        if(EstadoEscolhido !== "" && CultivoAgricola !== ""){

            fetch(`http://localhost:5000/mudancaUsoTerra/${encodeURIComponent(EstadoEscolhido)}`)
                .then(res => res.json())
                .then(data => {
                    let temp = "Emissao Final " + CultivoAgricola
                    setFatorImpactoMut(data[0][temp]*1000)
                })
                .catch(err => console.error('Erro ao buscar dados:', err));

        }


    }, [EstadoEscolhido, CultivoAgricola]);


    useEffect(() => {


        if(ResiduoMadeiraEscolhido !== ""){

            fetch(`http://localhost:5000/alocacaoMudancaUsoTerra/${encodeURIComponent(Insumo)}/${encodeURIComponent(ResiduoMadeiraEscolhido)}`)
                .then(res => res.json())
                .then(data => { setPercentualAlocacaoBiomassaAlocada(data.dados[0]["Alocacao considerada para biomassa"])})
                .catch(err => console.error('Erro ao buscar dados:', err));


        } else {

            setPercentualAlocacaoBiomassaAlocada("")

        }

    }, [ResiduoMadeiraEscolhido])



    useEffect(() => {


        if(FatorImpactoMut !== "" && PercentualAlocacaoBiomassa !== "" && PoderCalorico !== ""){

            setImpactoMut(FatorImpactoMut*PercentualAlocacaoBiomassa*PoderCalorico)

        } else {

            setImpactoMut("")

        }



    }, [FatorImpactoMut, PercentualAlocacaoBiomassa, PoderCalorico])





    function mudaEstado(e){

        setEstadoEscolhido(e.target.value)

    }

    function mudaResiduo(e){

        setResiduoMadeiraEscolhido(e.target.value)

    }

    //transporte da biomassa até a planta industrial


    const [DistanciaTransporte, setDistanciaTransporte] = useState("")
    const [TiposVeiculos, setTiposVeiculos] = useState([])
    const [TipoVeiculoEscolhido, setTipoVeiculoEscolhido] = useState("")
    const [ImpactoTransporteBiomassa, setImpactoTransporteBiomassa] = useState(0)
    const [EmissaoProcessoVeiculo, setEmissaoProcessoVeiculo] = useState(0)

    const [QuantidadeMediaBiomassaTransportada, setQuantidadeMediaBiomassaTransportada] = useState(0)

    function mudaDistanciaTransporte(e) {

        setDistanciaTransporte(e.target.value)


    }

    function mudaTipoVeiculo(e) {

        setTipoVeiculoEscolhido(e.target.value)


        fetch(`http://localhost:5000/count/${encodeURIComponent(e.target.value)}`)
            .then(res => res.json())
            .then(data => { setEmissaoProcessoVeiculo(data.dados[0]["Emissao processo"])})
            .catch(err => console.error('Erro ao buscar dados:', err));

    }


    useEffect(() => {

        funcaoResultadoAgricola(Number(ImpactoTotal) + Number(ImpactoMUT) + Number(ImpactoTransporteBiomassa))

    }, [ImpactoTotal, ImpactoMUT, ImpactoTransporteBiomassa]);

    useEffect(() => {

        funcaoDadosCFF(ImpactoTotal, ImpactoTransporteBiomassa)

    }, [ImpactoTransporteBiomassa, ImpactoTotal]);

    useEffect(() => {

        setImpactoTransporteBiomassa(EmissaoProcessoVeiculo * (QuantidadeMediaBiomassaTransportada * DistanciaTransporte))

    }, [EmissaoProcessoVeiculo, QuantidadeMediaBiomassaTransportada, DistanciaTransporte])


    return (
        <>
            <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
                <div className="py-2 px-3 w-100 text-center text-white fw-bold mb-2"
                    style={{backgroundColor: "#76b852", fontSize: "1.2rem", borderRadius: "4px"}}>
                    Fase Agricola e transporte da biomassa até a fábrica
                </div>
                <div className="col-md-11">
                    <div className="mb-5" id="producaoBiomassa">
                        <h2 className="mb-3">Produção de biomassa</h2>

                        <label>Tipo de Biomassa (Ex. Pinus, Casca de amendoim, etc.)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <select className="form-select" id="insumo" onChange={mudaInsumo}>
                                    <option value="">Selecione...</option>
                                    {biomassas.map((tipo, index) => (
                                        <option key={index} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-3">
                                <span>Selecionar na lista suspensa</span>
                            </div>

                        </div>

                        <label>Possui informação sobre o consumo de Biomassa (em kg de biomassa por kg de
                            biocombustivel)?</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <select className="form-select mb-3" onChange={mudaDadoEspecifico}>
                                    <option>Não</option>
                                    <option>Sim</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <span>Selecionar na lista suspensa</span>
                            </div>

                        </div>

                        <label>Entrada de biomassa - dado especifico
                            (se não possuir a informação, não preencher, será considerado o dado padrão)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaValorDadoEspecifico}/>
                            </div>
                            <div className="col-md-3">
                                <span>kg de biomassa / kg de biocombustível</span>
                            </div>

                        </div>

                        <label>Fator de impacto da biomassa selecionada (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control mb-3" type="text" value={EmissaoBiomassaAlocada}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2 eq./ kg biomassa</span>
                            </div>

                        </div>

                        <label>Poder calorífico da biomassa selecionada (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control mb-3" type="text" value={PoderCalorico} readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg / MJ de biocombustível</span>
                            </div>

                        </div>

                        <label>Entrada de amido de milho</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" defaultValue='0' onChange={mudaMilho}/>
                            </div>
                            <div className="col-md-3">
                                <span>kg / MJ de biocombustível</span>
                            </div>

                        </div>

                        <label>Impacto associado ao consumo de amido de milho (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoMilho} readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2 eq / MJ</span>
                            </div>

                        </div>

                        <label>Impacto da produção de biomassa</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoTotal} readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2 eq. / MJ de biocombustível</span>
                            </div>

                        </div>

                    </div>

                    <div className='mb-5' id="mudancaDeUsoTerra">
                        <h2 className="mb-3">Mudança de uso da terra</h2>

                        <label>Estado da produção da Biomassa</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <select className="form-select mb-3" id="estado" onChange={mudaEstado}>
                                    <option value="">Selecione...</option>
                                    {ListaEstados.map((tipo, index) => (
                                        <option key={index} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <span>Selecionar na lista suspensa</span>
                            </div>

                        </div>

                        <label>Cultivo agrícola (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control mb-3" type="text" value={CultivoAgricola} readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>-</span>
                            </div>

                        </div>

                        <label>Se resíduo de madeira, informe qual etapa do ciclo de vida da madeira os resíduos foram
                            obtidos</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <select value={ResiduoMadeiraEscolhido} className="form-select mb-3" id="residuos"
                                        onChange={mudaResiduo}>
                                    <option value="">Selecione...</option>
                                    {ResiduoMadeira.map((tipo, index) => (
                                        <option key={index} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <span>Selecionar na lista suspensa</span>
                            </div>

                        </div>

                        <label>Fator de impacto do MUT (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control mb-3" type="text" value={FatorImpactoMut} readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2 eq./ kg biomassa</span>
                            </div>

                        </div>

                        <label>Percentual de alocação da biomassa (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control mb-3" type="text" value={PercentualAlocacaoBiomassa}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>%</span>
                            </div>

                        </div>

                        <label>Impacto MUT</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control mb-3" type="text" value={ImpactoMUT} readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2 eq. / MJ de biocombustivel</span>
                            </div>

                        </div>

                    </div>

                    <div className='mb-5' id="transportBiomassa">

                        <h2 className='mb-3'>Transporte da biomassa até a planta industrial</h2>

                        <label>Distância de transporte da biomassa até a fábrica</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaDistanciaTransporte}/>
                            </div>
                            <div className="col-md-3">
                                <span>km</span>
                            </div>

                        </div>


                        <label>Tipo de veículo usado no transporte</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <select className="form-select mb-3" id="tipoVeiculo" onChange={mudaTipoVeiculo}>
                                    <option value="">Selecione...</option>
                                    {TiposVeiculos.map((tipo, index) => (
                                        <option key={index} value={tipo}>
                                            {tipo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <span>Selecionar na lista suspensa</span>
                            </div>

                        </div>

                        <label>Quantidade média de Biomassa transportada por veículo (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control mb-3" type="text"
                                       value={QuantidadeMediaBiomassaTransportada}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>tonelada</span>
                            </div>

                        </div>

                        <label>Demanda de transporte (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control mb-3" type="text"
                                       value={QuantidadeMediaBiomassaTransportada * DistanciaTransporte} readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>t.km</span>
                            </div>

                        </div>

                        <label>Impacto do transporte da biomassa</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control mb-3" type="text" value={ImpactoTransporteBiomassa}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2 eq. / MJ de biocombustivel</span>
                            </div>

                        </div>


                    </div>

                </div>
            </div>
        </>
    )

}

export default FaseAgricola