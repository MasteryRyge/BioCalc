import React, {useState, useEffect} from 'react';


function CalculoCFF({dadosIntensidadeCarbono, ImpactoTransporteBiomassa, ImpactoTotal, funcaoTotalCFF}) {


    const [Valores, setValores] = useState([])
    const [Material, setMaterial] = useState(0)
    const [Energy, setEnergy] = useState(0)
    const [Disposal, setDisposal] = useState(0)
    const [Total, setTotal] = useState(0)

    const obterValor = (nome) => {
        const item = Valores.find(v => v.Nome === nome);
        return item ? item.Valor : null;
    };

    useEffect(() => {

        fetch('http://localhost:5000/CFF/todos')
            .then(res => res.json())
            .then(data => {
                setValores(data.dados)
                console.log(data.dados)
            })
            .catch(err => console.error('Erro ao buscar dados:', err));
        
    }, []);

    useEffect(() => {

        setMaterial(((1 - obterValor("R1")) * obterValor("Ev")) + obterValor("R1") * ((obterValor("Factor A") * (dadosIntensidadeCarbono[0] + dadosIntensidadeCarbono[1]) + ((1 - obterValor("Factor A")) * obterValor("Ev")) * (dadosIntensidadeCarbono[4] /
            dadosIntensidadeCarbono[5])) + ((1 - obterValor("Factor A")) * obterValor("R2") * (obterValor("Erout") - ((dadosIntensidadeCarbono[0] + dadosIntensidadeCarbono[1]) * (obterValor("Qsout") / dadosIntensidadeCarbono[4]))))))

        setEnergy(((1 - obterValor("B")) * obterValor("R3")) * (((dadosIntensidadeCarbono[0] + dadosIntensidadeCarbono[1] + dadosIntensidadeCarbono[2] + dadosIntensidadeCarbono[3]) - dadosIntensidadeCarbono[5] * obterValor("Xerheat")) * (ImpactoTransporteBiomassa + ImpactoTotal + dadosIntensidadeCarbono[1])))

        setDisposal((1 - obterValor("R2") - obterValor("R3")) * (obterValor("Ed") * dadosIntensidadeCarbono[5]))

    }, [dadosIntensidadeCarbono, ImpactoTransporteBiomassa, ImpactoTotal]);

    useEffect(() => {

        setTotal(Material + Energy + Disposal + (dadosIntensidadeCarbono[0] + dadosIntensidadeCarbono[1] + dadosIntensidadeCarbono[2] + dadosIntensidadeCarbono[3]))

        funcaoTotalCFF(Material + Energy + Disposal + (dadosIntensidadeCarbono[0] + dadosIntensidadeCarbono[1] + dadosIntensidadeCarbono[2] + dadosIntensidadeCarbono[3]))

    }, [Material, Energy, Disposal]);
    

    //usa tabela1 0, 1, 4, 5 (adicionar no tabela1 MJ/kg Biocombustivel)
    //const CFF_Material = (((1 - R1) * Ev_kg) + R1 * ((A * (ItensidadeCarbonoAgricola + IntensidadeCarbonoIndustrial) + ((1 - A) * Ev_kg) * ("MJKgInsumo" /
    //    "MJ/kg Biocombustivel")) + ((1 - A) * R2 * (Erout - ((ItensidadeCarbonoAgricola + IntensidadeCarbonoIndustrial) * (Qsout / "MJKgInsumo"))))))


    //somar 0 - 3 da tabela1, 5 (adicionar no tabela1 MJ/kg Biocombustivel), ImpactoTransporteBiomassa de FaseAgricola, ImpactoTotal de FaseAgricola, 1 da Tabela1
    //const CFF_Energy = ((1 - B) * R3) * (("IntensidadeCarbonoTotal" - "MJ/kg Biocombustivel" * Xerheat) * ("Impacto do transporte da biomassa" + "Impacto da produção de biomassa" + "industrial"))

    // 5 da tabela1 (adicionar no tabela1 MJ/kg Biocombustivel)
    //const CFF_Disposal = (1 - R2 - R3) * (Ed * "MJ/kg Biocombustivel")



    return (
        <>
        </>
    );
}

export default CalculoCFF;