import {useState, useEffect} from "react";

function FaseIndustrial({poderCalorificoInsumo, emissaoBiomassaAlocadaInsumo, funcaoResultadoIndustrial}) {


    const [CogeracaoEnergia, setCogeracaoEnergia] = useState('')
    const [QuantidadeBiomassaProcessada, setQuantidadeBiomassaProcessada] = useState(0)
    const [QuantidadeBiomassaConsumida, setQuantidadeBiomassaConsumida] = useState(0)

    const [EletricidadeRedeMedia, setEletricidadeRedeMedia] = useState(0);
    const [EletricidadeRedeAlta, setEletricidadeRedeAlta] = useState(0);
    const [EletricidadePCH, setEletricidadePCH] = useState(0);
    const [EletricidadeBiomassa, setEletricidadeBiomassa] = useState(0);
    const [EletricidadeEolica, setEletricidadeEolica] = useState(0);
    const [EletricidadeSolar, setEletricidadeSolar] = useState(0);
    const [ImpactoConsumoEletricidade, setImpactoConsumoEletricidade] = useState(0);
    const [ImpactoConsumoEletricidadeFinal, setImpactoConsumoEletricidadeFinal] = useState(0);

    const [EletricidadeRedeMediaValorEmissao, setEletricidadeRedeMediaValorEmissao] = useState(0);
    const [EletricidadeRedeAltaValorEmissao, setEletricidadeRedeAltaValorEmissao] = useState(0);
    const [EletricidadePCHValorEmissao, setEletricidadePCHValorEmissao] = useState(0);
    const [EletricidadeBiomassaValorEmissao, setEletricidadeBiomassaValorEmissao] = useState(0);
    const [EletricidadeEolicaValorEmissao, setEletricidadeEolicaValorEmissao] = useState(0);
    const [EletricidadeSolarValorEmissao, setEletricidadeSolarValorEmissao] = useState(0);


    const [Diesel, setDiesel] = useState(0);
    const [GasNatural, setGasNatural] = useState(0);
    const [GLP, setGLP] = useState(0);
    const [GasolinaA, setGasolinaA] = useState(0);
    const [EtanolAnidro, setEtanolAnidro] = useState(0);
    const [EtanolHidratado, setEtanolHidratado] = useState(0);
    const [CavacoMadeira, setCavacoMadeira] = useState(0);
    const [Lenha, setLenha] = useState(0);

    const [ImpactoProducaoCombustivel, setImpactoProducaoCombustivel] = useState(0);

    const [DieselValorEmissao, setDieselValorEmissao] = useState(0);
    const [GasNaturalValorEmissao, setGasNaturalValorEmissao] = useState(0);
    const [GLPValorEmissao, setGLPValorEmissao] = useState(0);
    const [GasolinaAValorEmissao, setGasolinaAValorEmissao] = useState(0);
    const [EtanolAnidroValorEmissao, setEtanolAnidroValorEmissao] = useState(0);
    const [EtanolHidratadoValorEmissao, setEtanolHidratadoValorEmissao] = useState(0);
    const [CavacoMadeiraValorEmissao, setCavacoMadeiraValorEmissao] = useState(0);
    const [LenhaValorEmissao, setLenhaValorEmissao] = useState(0);

    const [CombustaoDieselValorEmissao, setCombustaoDieselValorEmissao] = useState(0);
    const [UsoGasNaturalValorEmissao, setUsoGasNaturalValorEmissao] = useState(0);
    const [UsoGLPValorEmissao, setUsoGLPValorEmissao] = useState(0);
    const [CombustaoGasolinaAValorEmissao, setCombustaoGasolinaAValorEmissao] = useState(0);
    const [CombustaoEtanolAnidroValorEmissao, setCombustaoEtanolAnidroValorEmissao] = useState(0);
    const [CombustaoEtanolHidratadoValorEmissao, setCombustaoEtanolHidratadoValorEmissao] = useState(0);
    const [CombustaoCavacoMadeiraValorEmissao, setCombustaoCavacoMadeiraValorEmissao] = useState(0);
    const [CombustaoLenhaValorEmissao, setCombustaoLenhaValorEmissao] = useState(0);


    useEffect( () => {

        fetch(`http://localhost:5000/count/eletricidades`)
            .then(res => res.json())
            .then(data => {

                setEletricidadeRedeMediaValorEmissao(data.find(d => d.Insumo === "Eletricidade da rede - mix média voltagem")["Emissao biomassa alocada"])
                setEletricidadeRedeAltaValorEmissao(data.find(d => d.Insumo === "Eletricidade da rede - mix alta voltagem")["Emissao biomassa alocada"])
                setEletricidadePCHValorEmissao(data.find(d => d.Insumo === "Eletricidade - PCH")["Emissao biomassa alocada"])
                setEletricidadeBiomassaValorEmissao(data.find(d => d.Insumo === "Eletricidade - biomassa")["Emissao biomassa alocada"])
                setEletricidadeEolicaValorEmissao(data.find(d => d.Insumo === "Eletricidade - eólica")["Emissao biomassa alocada"])
                setEletricidadeSolarValorEmissao(data.find(d => d.Insumo === "Eletricidade - solar")["Emissao biomassa alocada"])

            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        //dados para o cálculo do impacto da produção de combustível

        fetch(`http://localhost:5000/count/${encodeURIComponent("Diesel (produção)")}`)
            .then(res => res.json())
            .then(data => {
                setDieselValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Gás Natural (produção)")}`)
            .then(res => res.json())
            .then(data => {
                setGasNaturalValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("GLP (produção)")}`)
            .then(res => res.json())
            .then(data => {
                setGLPValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Gasolina A (produção)")}`)
            .then(res => res.json())
            .then(data => {
                setGasolinaAValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Etanol anidro (produção)")}`)
            .then(res => res.json())
            .then(data => {
                setEtanolAnidroValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Etanol hidratado (produção)")}`)
            .then(res => res.json())
            .then(data => {
                setEtanolHidratadoValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Cavaco de madeira (produção)")}`)
            .then(res => res.json())
            .then(data => {
                setCavacoMadeiraValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Lenha (produção)")}`)
            .then(res => res.json())
            .then(data => {
                setLenhaValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));


        //dados para o impacto da combustão estacionária

        fetch(`http://localhost:5000/count/${encodeURIComponent("Combustão de Diesel (combustão)")}`)
            .then(res => res.json())
            .then(data => {
                setCombustaoDieselValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Uso de Gás Natural (combustão)")}`)
            .then(res => res.json())
            .then(data => {
                setUsoGasNaturalValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Uso de GLP (combustão)")}`)
            .then(res => res.json())
            .then(data => {
                setUsoGLPValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Combustão de Gasolina A (combustão)")}`)
            .then(res => res.json())
            .then(data => {
                setCombustaoGasolinaAValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Combustão de Etanol anidro (combustão)")}`)
            .then(res => res.json())
            .then(data => {
                setCombustaoEtanolAnidroValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Combustão de Etanol hidratado (combustão)")}`)
            .then(res => res.json())
            .then(data => {
                setCombustaoEtanolHidratadoValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Combustão de Cavaco de madeira (combustão)")}`)
            .then(res => res.json())
            .then(data => {
                setCombustaoCavacoMadeiraValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Combustão de Lenha (combustão)")}`)
            .then(res => res.json())
            .then(data => {
                setCombustaoLenhaValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));


        //dados insumos industriais

        fetch(`http://localhost:5000/count/${encodeURIComponent("Água")}`)
            .then(res => res.json())
            .then(data => {
                setAguaValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Óleo lubrificante")}`)
            .then(res => res.json())
            .then(data => {
                setOleoLubrificanteValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/${encodeURIComponent("Areia de sílica")}`)
            .then(res => res.json())
            .then(data => {
                setAreiaSilicaValorEmissao(data.dados[0]["Emissao biomassa alocada"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        poderCalorificoInsumo = 0;

        emissaoBiomassaAlocadaInsumo = 0;

    }, [])


    function mudaCogeracaoEnergia(e) {
        setCogeracaoEnergia(e.target.value)
    }

    function mudaQuantidadeBiomassaProcessada(e) {
        setQuantidadeBiomassaProcessada(e.target.value)
    }

    function mudaQuantidadeBiomassaConsumida(e) {
        setQuantidadeBiomassaConsumida(e.target.value)
    }

    function mudaEletricidadeRedeMedia(e) {
        setEletricidadeRedeMedia(e.target.value);
    }

    function mudaEletricidadeRedeAlta(e) {
        setEletricidadeRedeAlta(e.target.value);
    }

    function mudaEletricidadePCH(e) {
        setEletricidadePCH(e.target.value);
    }

    function mudaEletricidadeBiomassa(e) {
        setEletricidadeBiomassa(e.target.value);
    }

    function mudaEletricidadeEolica(e) {
        setEletricidadeEolica(e.target.value);
    }

    function mudaEletricidadeSolar(e) {
        setEletricidadeSolar(e.target.value);
    }

    useEffect( () => {

        setImpactoConsumoEletricidade(
            EletricidadeRedeMedia * EletricidadeRedeMediaValorEmissao +
            EletricidadeRedeAlta * EletricidadeRedeAltaValorEmissao +
            EletricidadePCH * EletricidadePCHValorEmissao +
            EletricidadeBiomassa * EletricidadeBiomassaValorEmissao +
            EletricidadeEolica * EletricidadeEolicaValorEmissao +
            EletricidadeSolar * EletricidadeSolarValorEmissao
        )

    }, [EletricidadeRedeMedia, EletricidadeRedeAlta, EletricidadePCH, EletricidadeBiomassa, EletricidadeEolica, EletricidadeSolar])


    useEffect( () => {

        if(QuantidadeBiomassaProcessada !== 0) {

            setImpactoConsumoEletricidadeFinal(ImpactoConsumoEletricidade * (1 / QuantidadeBiomassaProcessada) * poderCalorificoInsumo)

        }


    }, [QuantidadeBiomassaProcessada ,ImpactoConsumoEletricidade, poderCalorificoInsumo])




    function mudaDiesel(e) {
        setDiesel(e.target.value);
    }

    function mudaGasNatural(e) {
        setGasNatural(e.target.value);
    }

    function mudaGLP(e) {
        setGLP(e.target.value);
    }

    function mudaGasolinaA(e) {
        setGasolinaA(e.target.value);
    }

    function mudaEtanolAnidro(e) {
        setEtanolAnidro(e.target.value);
    }

    function mudaEtanolHidratado(e) {
        setEtanolHidratado(e.target.value);
    }

    function mudaCavacoMadeira(e) {
        setCavacoMadeira(e.target.value);
    }

    function mudaLenha(e) {
        setLenha(e.target.value);
    }

    useEffect(() => {

        setImpactoProducaoCombustivel(
            Diesel * DieselValorEmissao +
            GasNatural * GasNaturalValorEmissao +
            GLP * GLPValorEmissao +
            GasolinaA * GasolinaAValorEmissao +
            EtanolAnidro * EtanolAnidroValorEmissao +
            EtanolHidratado * EtanolHidratadoValorEmissao +
            CavacoMadeira * CavacoMadeiraValorEmissao +
            Lenha * LenhaValorEmissao
        );

    }, [Diesel, GasNatural, GLP, GasolinaA, EtanolAnidro, EtanolHidratado, CavacoMadeira, Lenha]);


    const [ImpactoCombustaoEstacionaria, setImpactoCombustaoEstacionaria] = useState(0)


    useEffect( () => {

        setImpactoCombustaoEstacionaria(
            Diesel * CombustaoDieselValorEmissao +
            GasNatural * UsoGasNaturalValorEmissao +
            GLP * UsoGLPValorEmissao +
            GasolinaA * CombustaoGasolinaAValorEmissao +
            EtanolAnidro * CombustaoEtanolAnidroValorEmissao +
            EtanolHidratado * CombustaoEtanolHidratadoValorEmissao +
            CavacoMadeira * CombustaoCavacoMadeiraValorEmissao +
            Lenha * CombustaoLenhaValorEmissao
        );

    }, [Diesel, GasNatural, GLP, GasolinaA, EtanolAnidro, EtanolHidratado, CavacoMadeira, Lenha] )

    const [ImpactoConsumoCombustivel, setImpactoConsumoCombustivel] = useState(0)

    useEffect( () => {

        if(QuantidadeBiomassaProcessada !== 0) {

            setImpactoConsumoCombustivel( (ImpactoProducaoCombustivel + ImpactoCombustaoEstacionaria)* (1 / QuantidadeBiomassaProcessada) * poderCalorificoInsumo)

        }


    }, [ImpactoProducaoCombustivel, ImpactoCombustaoEstacionaria, QuantidadeBiomassaProcessada, poderCalorificoInsumo])



    const [ImpactoCombustaoBiomassa, setImpactoCombustaoBiomassa] = useState(0)
    const [ImpactoCombustaoBiomassaFinal, setImpactoCombustaoBiomassaFinal] = useState(0)


    useEffect(() => {

        setImpactoCombustaoBiomassa(QuantidadeBiomassaConsumida * emissaoBiomassaAlocadaInsumo)

    }, [QuantidadeBiomassaConsumida, emissaoBiomassaAlocadaInsumo]);

    useEffect( () => {


        if (QuantidadeBiomassaProcessada !== 0){

            setImpactoCombustaoBiomassaFinal(ImpactoCombustaoBiomassa * (1 / QuantidadeBiomassaProcessada) * poderCalorificoInsumo)

        }

    }, [QuantidadeBiomassaProcessada, poderCalorificoInsumo, ImpactoCombustaoBiomassa])


    const [AguaValorEmissao, setAguaValorEmissao] = useState(0)
    const [OleoLubrificanteValorEmissao, setOleoLubrificanteValorEmissao] = useState(0)
    const [AreiaSilicaValorEmissao, setAreiaSilicaValorEmissao] = useState(0)

    const [Agua, setAgua] = useState(0)
    const [OleoLubrificante, setOleoLubrificante] = useState(0)
    const [AreiaSilica, setAreiaSilica] = useState(0)
    const [ImpactoFaseIndustrial, setImpactoFaseIndustrial] = useState(0)
    const [ImpactoFaseIndustrialFinal, setImpactoFaseIndustrialFinal] = useState(0)

    function mudaAgua (e) {

        setAgua(e.target.value)

    }

    function mudaOleoLubrificante (e) {

        setOleoLubrificante(e.target.value)

    }

    function mudaAreiaSilica (e) {

        setAreiaSilica(e.target.value)

    }

    useEffect(() => {

        setImpactoFaseIndustrial(Agua * AguaValorEmissao +
        OleoLubrificante * OleoLubrificanteValorEmissao +
        AreiaSilica * AreiaSilicaValorEmissao)

    }, [Agua, OleoLubrificante, AreiaSilica]);

    useEffect(() => {

        if(QuantidadeBiomassaProcessada !== 0){

            setImpactoFaseIndustrialFinal(ImpactoFaseIndustrial * (1 / QuantidadeBiomassaProcessada) * poderCalorificoInsumo)

        }



    }, [ImpactoFaseIndustrial, QuantidadeBiomassaProcessada, poderCalorificoInsumo]);


    useEffect(() => {

        funcaoResultadoIndustrial(
            ImpactoConsumoEletricidadeFinal +
            ImpactoConsumoCombustivel +
            ImpactoCombustaoBiomassaFinal +
            ImpactoFaseIndustrialFinal)

    },[ImpactoConsumoEletricidadeFinal, ImpactoConsumoCombustivel, ImpactoCombustaoBiomassaFinal, ImpactoFaseIndustrialFinal])


    return (

        <>

            <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
                <div className="py-2 px-3 w-100 text-center text-white fw-bold mb-2"
                     style={{backgroundColor: "#76b852", fontSize: "1.2rem", borderRadius: "4px"}}>
                    Fase Industrial - Processamento (Secagem e Densificação da biomassa)
                </div>
                <div className="text-center mb-4">
                    Informações sobre os elementos envolvidos na fase de produção do Biocombustível - Inserir os dados referentes ao consumo anual da unidade de fabricação
                    <br/>(Caso o elemento não seja utilizado, deixar em branco)
                </div>

                <div className="col-md-11">
                    <div className="mb-5" id="dadosDoSistema">
                        <h2 className="mb-3">Dados do sistema</h2>


                        <label>Existe co-geração de energia (aproveitamento da biomassa na geração de energia)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <select className="form-select mb-3" onChange={mudaCogeracaoEnergia}>
                                    <option>Não</option>
                                    <option>Sim</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <span></span>
                            </div>

                        </div>

                        <label>Quantidade de biomassa processada - (não considerar a biomassa usada na co-geração, se
                            houver)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number"
                                       onChange={mudaQuantidadeBiomassaProcessada}/>
                            </div>
                            <div className="col-md-3">
                                <span>kg/ano</span>
                            </div>

                        </div>


                        <label>"Quantidade de biomassa consumida na co-geração? - (Considerando a mesma biomassa obtida
                            na fase agricola)"</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number"
                                       onChange={mudaQuantidadeBiomassaConsumida}/>
                            </div>
                            <div className="col-md-3">
                                <span>kg/ano</span>
                            </div>

                        </div>


                    </div>

                    <div className="mb-5" id="energiaEletricidade">
                        <h2 className="mb-3">Energia - Eletricidade</h2>


                        <label>Eletricidade da rede - mix média voltagem</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaEletricidadeRedeMedia}/>
                            </div>
                            <div className="col-md-3">
                                <span>kWh/ano</span>
                            </div>

                        </div>

                        <label>Eletricidade da rede - mix alta voltagem</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaEletricidadeRedeAlta}/>
                            </div>
                            <div className="col-md-3">
                                <span>kWh/ano</span>
                            </div>

                        </div>

                        <label>Eletricidade - PCH</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaEletricidadePCH}/>
                            </div>
                            <div className="col-md-3">
                                <span>kWh/ano</span>
                            </div>

                        </div>

                        <label>Eletricidade - biomassa</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaEletricidadeBiomassa}/>
                            </div>
                            <div className="col-md-3">
                                <span>kWh/ano</span>
                            </div>

                        </div>

                        <label>Eletricidade - eólica</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaEletricidadeEolica}/>
                            </div>
                            <div className="col-md-3">
                                <span>kWh/ano</span>
                            </div>

                        </div>

                        <label>Eletricidade - solar</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaEletricidadeSolar}/>
                            </div>
                            <div className="col-md-3">
                                <span>kWh/ano</span>
                            </div>

                        </div>


                        <label>Impacto do consumo de eletricidade (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoConsumoEletricidade}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2/ano</span>
                            </div>

                        </div>

                        <label>Impacto do consumo de eletricidade</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoConsumoEletricidadeFinal}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2/MJ</span>
                            </div>

                        </div>


                    </div>


                    <div className="mb-5" id="energiaCombustivel">
                        <h2 className="mb-3">Energia - Combustível</h2>

                        <label>Diesel</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaDiesel}/>
                            </div>
                            <div className="col-md-3">
                                <span>Litros/ano</span>
                            </div>

                        </div>

                        <label>Gás natural</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaGasNatural}/>
                            </div>
                            <div className="col-md-3">
                                <span>Nm³/ano</span>
                            </div>

                        </div>

                        <label>GLP</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaGLP}/>
                            </div>
                            <div className="col-md-3">
                                <span>kg/ano</span>
                            </div>

                        </div>

                        <label>Gasolina A</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaGasolinaA}/>
                            </div>
                            <div className="col-md-3">
                                <span>Litros/ano</span>
                            </div>

                        </div>

                        <label>Etanol anidro</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaEtanolAnidro}/>
                            </div>
                            <div className="col-md-3">
                                <span>Litros/ano</span>
                            </div>

                        </div>

                        <label>Etanol hidratado</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaEtanolHidratado}/>
                            </div>
                            <div className="col-md-3">
                                <span>Litros/ano</span>
                            </div>

                        </div>

                        <label>Cavaco de madeira</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaCavacoMadeira}/>
                            </div>
                            <div className="col-md-3">
                                <span>kg/ano</span>
                            </div>

                        </div>

                        <label>Lenha</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaLenha}/>
                            </div>
                            <div className="col-md-3">
                                <span>kg/ano</span>
                            </div>

                        </div>

                        <label>Impacto da produção de combustível (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoProducaoCombustivel}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2/ano</span>
                            </div>

                        </div>

                        <label>Impacto da combustão estacionária (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoCombustaoEstacionaria}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2/ano</span>
                            </div>

                        </div>

                        <label>Impacto do consumo de combustível (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoConsumoCombustivel}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2/MJ</span>
                            </div>

                        </div>


                    </div>


                    <div className="mb-5" id="coGeracao">
                        <h2 className="mb-3">Co-geração (Aproveitamento energético)</h2>

                        <label>Fator de emissão da combustão da biomassa (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={emissaoBiomassaAlocadaInsumo}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2/ kg de biomassa queimada</span>
                            </div>

                        </div>

                        <label>Impacto da combustão da biomassa (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoCombustaoBiomassa}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2/ano</span>
                            </div>

                        </div>

                        <label>Impacto da combustão da biomassa (preenchimento automático)</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoCombustaoBiomassaFinal}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2/MJ</span>
                            </div>

                        </div>


                    </div>

                    <div className="mb-5" id="insumosManufatura">
                        <h2 className="mb-3">Insumos de manufatura</h2>

                        <label>Água</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaAgua}/>
                            </div>
                            <div className="col-md-3">
                                <span>litros/ano</span>
                            </div>

                        </div>

                        <label>Óleo lubrificante</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaOleoLubrificante}/>
                            </div>
                            <div className="col-md-3">
                                <span>kg/ano</span>
                            </div>

                        </div>

                        <label>Areia de silica</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" onChange={mudaAreiaSilica}/>
                            </div>
                            <div className="col-md-3">
                                <span>kg/ano</span>
                            </div>

                        </div>

                        <label>Impacto da fase industrial</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoFaseIndustrial} readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2 eq./ano</span>
                            </div>

                        </div>

                        <label>Impacto da fase industrial</label>
                        <div className="row align-items-center mb-3">
                            <div className="col-md-9">
                                <input className="form-control" type="number" value={ImpactoFaseIndustrialFinal}
                                       readOnly/>
                            </div>
                            <div className="col-md-3">
                                <span>kg CO2 eq. / MJ </span>
                            </div>

                        </div>


                    </div>

                </div>
            </div>


        </>

    )

}

export default FaseIndustrial