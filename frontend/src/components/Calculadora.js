import {useState, useEffect} from "react";


function Calculadora({dadosIntensidadeCarbono}) {

    const [IntensidadeCarbonoResultado, setIntensidadeCarbonoResultado] = useState(0)
    const [NotaEficienciaEnergetica, setNotaEficienciaEnergetica] = useState(0)
    const [FossilSubstituto, setFossilSubstituto] = useState(0)
    const [VolumeProducaoElegivel, setVolumeProducaoElegivel] = useState(0)
    const [CreditosElegiveis, setCreditosElegiveis] = useState(0)
    const [ReducaoEmissoes, setReducaoEmissoes] = useState(0)
    const [ValorMercadoCBIOB3, setValorMercadoCBIOB3] = useState(0)
    
    useEffect(() => {

        let ne = Number(dadosIntensidadeCarbono[0]) + Number(dadosIntensidadeCarbono[1]) +
            Number(dadosIntensidadeCarbono[2]) + Number(dadosIntensidadeCarbono[3])

        setIntensidadeCarbonoResultado(ne)


    }, [dadosIntensidadeCarbono]);

    useEffect(() => {

        setNotaEficienciaEnergetica(FossilSubstituto - IntensidadeCarbonoResultado)

    }, [IntensidadeCarbonoResultado, FossilSubstituto]);

    function mudaFossilSubstituto(e) {

        setFossilSubstituto(e.target.value)

    }

    function mudaVolumeProducaoElegivel(e){

        setVolumeProducaoElegivel(e.target.value)

    }

    useEffect(() => {

        if(FossilSubstituto != 0){

            setReducaoEmissoes((NotaEficienciaEnergetica / FossilSubstituto)*100)

        } else {
            setReducaoEmissoes(0)
        }

    }, [NotaEficienciaEnergetica, FossilSubstituto]);

    useEffect(() => {

        if(NotaEficienciaEnergetica > 0) {
            setCreditosElegiveis(Math.floor(dadosIntensidadeCarbono[4] * VolumeProducaoElegivel * NotaEficienciaEnergetica))

        } else {
            setCreditosElegiveis(0)
        }



    }, [dadosIntensidadeCarbono[4], VolumeProducaoElegivel, NotaEficienciaEnergetica]);

    function mudaValorMercadoCBIOB3(e) {

        setValorMercadoCBIOB3(e.target.value)

    }

    return (

        <>
            <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
                <div className="py-2 px-3 w-100 text-center text-white fw-bold mb-2"
                     style={{backgroundColor: "#939393", fontSize: "1.2rem", borderRadius: "4px"}}>
                    Calculadora para contabilização de Eficiência Energético-Ambiental para biocombustíveis sólidos (Pellets ou Briquetes)
                </div>
                <div className="col-md-11">
                    <div className="row g-4">
                        <div className="col-md-6 ">
                            <h2>Biocombustível Sólido (Pellet ou Briquette)</h2>

                            <div className="mb-3">
                                <label className="form-label">Intensidade de Carbono (kg CO₂eq/MJ):</label>
                                <input type="number" className="form-control col-md-4"
                                       value={IntensidadeCarbonoResultado} readOnly/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Agrícola:</label>
                                <input type="number" className="form-control col-md-4"
                                       value={dadosIntensidadeCarbono[0]} readOnly/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Industrial:</label>
                                <input type="number" className="form-control col-md-4"
                                       value={dadosIntensidadeCarbono[1]} readOnly/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Transporte:</label>
                                <input type="number" className="form-control col-md-4"
                                       value={dadosIntensidadeCarbono[2]} readOnly/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Uso:</label>
                                <input type="number" className="form-control col-md-4"
                                       value={dadosIntensidadeCarbono[3]} readOnly/>
                            </div>
                            <div className="mb-3">
                                <label>Nota de Eficiência Energético-Ambiental<br/>(kg CO₂eq/MJ):</label>
                                <div className="row align-items-center mb-3">
                                    <div className="col-md-8">
                                        <input type="number" className="form-control col-md-4"
                                               value={NotaEficienciaEnergetica}
                                               readOnly/>
                                    </div>
                                    <div className="col-md-4">
                                        <span style={{color: "#ff0000"}}>Resultado negativo representa impacto superior ao fóssil substituto</span>
                                    </div>

                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Redução de emissões:</label>
                                <div className="row align-items-center mb-3">
                                    <div className="col-md-8">
                                        <input type="text" className="form-control col-md-4"
                                               value={ReducaoEmissoes + '%'}
                                               readOnly/>
                                    </div>
                                    <div className="col-md-4">
                                        <span style={{color: "#ff0000"}}>Resultado negativo representa impacto superior ao fóssil substituto</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h2>Geração de CBIOs</h2>

                            <div className="mb-3">
                                <label className="form-label">Volume de produção elegível (em Toneladas de
                                    biocombustível)</label>
                                <input type="number" className="form-control col-md-4"
                                       onChange={mudaVolumeProducaoElegivel}/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Possíveis créditos elegíveis (CBIOs)</label>
                                <input type="number" className="form-control col-md-4" value={CreditosElegiveis}
                                       readOnly/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Valor de mercado do CBIO:B3 hoje:
                                    Consultar em: cbio.datagro.com/cbio/</label>
                                <input type="number" className="form-control col-md-4"
                                       onChange={mudaValorMercadoCBIOB3}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Remuneração aproximada R$</label>
                                <input type="text" className="form-control col-md-4"
                                       value={'R$ ' + (CreditosElegiveis * ValorMercadoCBIOB3)} readOnly/>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Fóssil substituto: Diesel A, Gasolina A e GNV (Média
                                    ponderada)</label>
                                <input type="number" className="form-control col-md-4" onChange={mudaFossilSubstituto}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Calculadora