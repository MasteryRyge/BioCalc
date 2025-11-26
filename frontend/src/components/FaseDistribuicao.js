import {useState, useEffect} from "react";

function FaseDistribuicao({poderCalorificoInsumo, funcaoResultadoDistribuicao}) {


    const [QuantidadeBiomassaTransportada, setQuantidadeBiomassaTransportada] = useState(0)
    const [DistanciaTransporteProdutoFinal, setDistanciaTransporteProdutoFinal] = useState(0)
    const [Ferroviario, setFerroviario] = useState(0)
    const [Hidroviario, setHidroviario] = useState(0)
    const [Rodoviario, setRodoviario] = useState(0)
    const [ListaCaminhoes, setListaCaminhoes] = useState([])
    const [TipoVeiculoRodoviario, setTipoVeiculoRodoviario] = useState(0)
    const [EmissaoProcessoFerroviario, setEmissaoProcessoFerroviario] = useState(0)
    const [EmissaoProcessoBalsa, setEmissaoProcessoBalsa] = useState(0)
    const [EmissaoProcessoNavio, setEmissaoProcessoNavio] = useState(0)
    const [EmissaoProcessoRodoviario, setEmissaoProcessoRodoviario] = useState(0)

    const [ImpactoFaseDistribuicao, setImpactoFaseDistribuicao] = useState(0)
    const [MJTransportadoAnual, setMJTransportadoAnual] = useState(0)
    const [ImpactoDistribuicaoMercado, setImpactoDistribuicaoMercado] = useState(0)




    useEffect(() => {

        fetch(`http://localhost:5000/count/caminhoes`)
            .then(res => res.json())
            .then(data => {
                const temp = data.map(item => item["Insumo"]);
                setListaCaminhoes(temp)
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/ferroviario`)
            .then(res => res.json())
            .then(data => {
                setEmissaoProcessoFerroviario(data[0]["Emissao biomassa alocada"])
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/balsa`)
            .then(res => res.json())
            .then(data => {
                setEmissaoProcessoBalsa(data[0]["Emissao biomassa alocada"])
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/count/navio`)
            .then(res => res.json())
            .then(data => {
                setEmissaoProcessoNavio(data[0]["Emissao biomassa alocada"])
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        poderCalorificoInsumo = 0;


    }, [])

    useEffect(() => {




    }, [poderCalorificoInsumo])


    function mudaQuantidadeBiomassaTransportada (e) {

        setQuantidadeBiomassaTransportada(e.target.value)

    }

    function mudaDistanciaTransporteProdutoFinal (e) {

        setDistanciaTransporteProdutoFinal(e.target.value)

    }

    function mudaFerroviario (e) {

        setFerroviario(e.target.value/100)

    }

    function mudaHidroviario (e) {

        setHidroviario(e.target.value/100)

    }


    useEffect(() => {

        setRodoviario((1 - (Ferroviario + Hidroviario)))

    }, [Ferroviario, Hidroviario])





    useEffect( () => {

        setImpactoFaseDistribuicao((QuantidadeBiomassaTransportada * DistanciaTransporteProdutoFinal * Ferroviario * EmissaoProcessoFerroviario)
            + (QuantidadeBiomassaTransportada * DistanciaTransporteProdutoFinal * Hidroviario * EmissaoProcessoBalsa)
            + (QuantidadeBiomassaTransportada * DistanciaTransporteProdutoFinal * Rodoviario * EmissaoProcessoRodoviario))


    }, [QuantidadeBiomassaTransportada, DistanciaTransporteProdutoFinal, Ferroviario, Hidroviario, Rodoviario, EmissaoProcessoFerroviario, EmissaoProcessoBalsa, EmissaoProcessoRodoviario])


    useEffect(() => {

        if(MJTransportadoAnual !== 0){

            setImpactoDistribuicaoMercado(ImpactoFaseDistribuicao / MJTransportadoAnual)

        }

    }, [ImpactoFaseDistribuicao, MJTransportadoAnual])

    useEffect( () => {

        if(poderCalorificoInsumo !== 0){


            setMJTransportadoAnual((QuantidadeBiomassaTransportada * 1000 * (1 / poderCalorificoInsumo)))
        }


    }, [QuantidadeBiomassaTransportada, poderCalorificoInsumo])


    function mudaTipoVeiculoRodoviario (e) {

        setTipoVeiculoRodoviario(e.target.value)



        if(e.target.value !== ""){

            fetch(`http://localhost:5000/count/${encodeURIComponent(e.target.value)}`)
                .then(res => res.json())
                .then(data => {
                    setEmissaoProcessoRodoviario(data.dados[0]["Emissao biomassa alocada"])
                })
                .catch(err => console.error('Erro ao buscar dados:', err));

        }

    }

    //exportação container maritimo -----------

    const [QuantidadeBiocombustivel, setQuantidadeBiocombustivel] = useState(0)

    const [DistanciaFabricaPorto, setDistanciaFabricaPorto] = useState(0)

    const [FerroviarioPorto, setFerroviarioPorto] = useState(0)
    const [HidroviarioPorto, setHidroviarioPorto] = useState(0)
    const [RodoviarioPorto, setRodoviarioPorto] = useState(0)
    const [TipoVeiculoRodoviarioPorto, setTipoVeiculoRodoviarioPorto] = useState('')

    const [EmissaoProcessoRodoviarioPorto ,setEmissaoProcessoRodoviarioPorto] = useState('')

    const [DistanciaPortoHidroviarioMercado, setDistanciaPortoHidroviarioMercado] = useState(0)

    const [ImpactoFaseDistribuicaoExterno, setImpactoFaseDistribuicaoExterno] = useState(0)

    const [MJExportadoAnual, setMJExportadoAnual] = useState(0)

    const [ImpactoFaseDistribuicaoExternoPorto, setImpactoFaseDistribuicaoExternoPorto] = useState(0)

    const [ImpactoExportacao, setImpactoExportacao] = useState(0)


    function mudaQuantidadeBiocombustivel (e) {

        setQuantidadeBiocombustivel(e.target.value)
    }

    function mudaDistanciaFabricaPorto (e) {

        setDistanciaFabricaPorto(e.target.value)

    }


    function mudaFerroviarioPorto (e) {

        setFerroviarioPorto(e.target.value/100)

    }

    function mudaHidroviarioPorto (e) {

        setHidroviarioPorto(e.target.value/100)

    }


    useEffect(() => {

        setRodoviarioPorto((1 - (FerroviarioPorto + HidroviarioPorto)))

    }, [FerroviarioPorto, HidroviarioPorto])

    function mudaTipoVeiculoRodoviarioPorto (e) {

        setTipoVeiculoRodoviarioPorto(e.target.value)

        if(e.target.value !== ""){

            fetch(`http://localhost:5000/count/${encodeURIComponent(e.target.value)}`)
                .then(res => res.json())
                .then(data => {
                    setEmissaoProcessoRodoviarioPorto(data.dados[0]["Emissao biomassa alocada"])
                })
                .catch(err => console.error('Erro ao buscar dados:', err));

        }

    }

    function mudaDistanciaPortoHidroviarioMercado (e) {

        setDistanciaPortoHidroviarioMercado(e.target.value)

    }

    useEffect( () => {

        setImpactoFaseDistribuicaoExterno((QuantidadeBiocombustivel * DistanciaFabricaPorto * FerroviarioPorto * EmissaoProcessoFerroviario)
            + (QuantidadeBiocombustivel * DistanciaFabricaPorto * HidroviarioPorto * EmissaoProcessoBalsa)
            + (QuantidadeBiocombustivel * DistanciaFabricaPorto * RodoviarioPorto * EmissaoProcessoRodoviarioPorto))


    }, [QuantidadeBiocombustivel, DistanciaFabricaPorto, FerroviarioPorto, HidroviarioPorto, RodoviarioPorto, EmissaoProcessoFerroviario, EmissaoProcessoBalsa, EmissaoProcessoRodoviarioPorto])


    useEffect( () => {


        setImpactoFaseDistribuicaoExternoPorto(QuantidadeBiocombustivel * DistanciaPortoHidroviarioMercado * EmissaoProcessoNavio)



    }, [QuantidadeBiocombustivel, DistanciaPortoHidroviarioMercado, EmissaoProcessoNavio])

    useEffect( () => {

        if(poderCalorificoInsumo !== 0){

            setMJExportadoAnual(QuantidadeBiocombustivel * 1000 * (1 / poderCalorificoInsumo))
        }


    }, [QuantidadeBiocombustivel, poderCalorificoInsumo])


    useEffect( () => {

        if(MJExportadoAnual !== 0) {
            setImpactoExportacao((ImpactoFaseDistribuicaoExterno + ImpactoFaseDistribuicaoExternoPorto) / MJExportadoAnual)
        }


    }, [ImpactoFaseDistribuicaoExterno, ImpactoFaseDistribuicaoExternoPorto, MJExportadoAnual])


    useEffect( () => {

        funcaoResultadoDistribuicao(ImpactoDistribuicaoMercado + ImpactoExportacao)

    }, [ImpactoDistribuicaoMercado, ImpactoExportacao])


    return (

        <>
            <div className="container mt-4">
                <div className="col-md-8">
                    <div className="mb-5" id="mercadoDomestico">
                        <h2 className="mb-3">Mercado doméstico</h2>

                        <label>Quantidade de biomassa transportada no mercado doméstico</label>
                        <input className="form-control" type="number" onChange={mudaQuantidadeBiomassaTransportada}/>

                        <label>Distância de transporte do produto final até o mercado consumidor doméstico</label>
                        <input className="form-control" type="number" onChange={mudaDistanciaTransporteProdutoFinal}/>

                        <label>Ferroviário - Refere-se ao percentual da distância mensal do biocombustível
                            comercializado que é distribuido exclusivamente por via ferroviária</label>
                        <input className="form-control" type="number" onChange={mudaFerroviario}/>

                        <label>Hidroviário - Refere-se ao percentual da distância mensal do biocombustível
                            comercializado que é distribuido exclusivamente por via hidroviária</label>
                        <input className="form-control" type="number" onChange={mudaHidroviario}/>

                        <label>Rodoviário -Refere-se ao percentual da distância mensal do biocombustível comercializado
                            que é distribuido exclusivamente por via rodoviária</label>
                        <input className="form-control mb-3" type="text" value={(1 - (Ferroviario + Hidroviario)) * 100}
                               readOnly/>

                        <label>Tipo de veículo usado no transporte rodoviário</label>
                        <select className="form-select mb-3" id="tipoVeiculoRodoviario"
                                onChange={mudaTipoVeiculoRodoviario}>
                            <option value="">Selecione...</option>
                            {ListaCaminhoes.map((tipo, index) => (
                                <option key={index} value={tipo}>
                                    {tipo}
                                </option>
                            ))}
                        </select>

                        <label>Impacto da fase de distribuição no mercado doméstico (preenchimento automático)</label>
                        <input className="form-control mb-3" type="text" value={ImpactoFaseDistribuicao} readOnly/>

                        <label>MJ transportado anualmente (preenchimento automático)</label>
                        <input className="form-control mb-3" type="text" value={MJTransportadoAnual} readOnly/>


                        <label>Impacto da distribuição no mercado doméstico (preenchimento automático)</label>
                        <input className="form-control mb-3" type="text" value={ImpactoDistribuicaoMercado} readOnly/>


                    </div>
                </div>

                <div className="mb-5" id="mercadoDomestico">
                    <h2 className="mb-3">Exportação - via container marítimo</h2>

                    <label>Quantidade de biocombustível sólido exportado via container marítimo</label>
                    <input className="form-control" type="number" onChange={mudaQuantidadeBiocombustivel}/>

                    <label>Distância da fabrica ao porto hidroviário mais próximo</label>
                    <input className="form-control" type="number" onChange={mudaDistanciaFabricaPorto}/>

                    <label>Ferroviário - Refere-se ao percentual da distância até o porto hidroviário distribuido
                        exclusivamente por via ferroviária</label>
                    <input className="form-control" type="number" onChange={mudaFerroviarioPorto}/>

                    <label>Hidroviário - Refere-se ao percentual da distância até o porto hidroviário distribuido
                        exclusivamente por via hidroviária</label>
                    <input className="form-control" type="number" onChange={mudaHidroviarioPorto}/>

                    <label>Rodoviário - Refere-se ao percentual da distância até o porto hidroviário distribuido
                        exclusivamente por via rodoviária</label>
                    <input className="form-control mb-3" type="text"
                           value={(1 - (FerroviarioPorto + HidroviarioPorto)) * 100} readOnly/>

                    <label>Tipo de veículo usado no transporte rodoviário até o porto</label>
                    <select className="form-select mb-3" id="tipoVeiculoRodoviarioPorto"
                            onChange={mudaTipoVeiculoRodoviarioPorto}>
                        <option value="">Selecione...</option>
                        {ListaCaminhoes.map((tipo, index) => (
                            <option key={index} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </select>


                    <label>Distância do porto hidroviário ao mercado consumidor final - Consulta pode ser efetuada no
                        site: searates.com</label>
                    <input className="form-control" type="number" onChange={mudaDistanciaPortoHidroviarioMercado}/>


                    <label>Impacto da fase de distribuição no mercado externo (trecho fabrica-porto)</label>
                    <input className="form-control mb-3" type="text" value={ImpactoFaseDistribuicaoExterno} readOnly/>

                    <label>Impacto da fase de distribuição no mercado externo (trecho porto - mercado consumidor
                        final)</label>
                    <input className="form-control mb-3" type="text" value={ImpactoFaseDistribuicaoExternoPorto} readOnly/>

                    <label>MJ exportado por ano (preenchimento automático)</label>
                    <input className="form-control mb-3" type="text" value={MJExportadoAnual} readOnly/>

                    <label>Impacto da exportação (preenchimento automático)</label>
                    <input className="form-control mb-3" type="text" value={ImpactoExportacao} readOnly/>


                </div>

            </div>
        </>

    )

}

export default FaseDistribuicao