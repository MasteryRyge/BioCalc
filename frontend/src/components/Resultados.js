import {useState, useEffect, useRef} from "react";
import { useMemo } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {Pie} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

//Salvar pdf




function Resultados({temp}) {



    const options = useMemo(() => ({
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "left",
            },
            title: {
                display: true,
                text: "Consumo por Tipo de Combustível",
                font: {
                    size: 20,
                },
            },
        },
    }), []);



    const [IntensidadeCarbonoSoma, setIntensidadeCarbonoSoma] = useState(0)
    const [dataContribuicaoEtapasCicloVida, setDataContribuicaoEtapasCicloVida] = useState({
        labels: ["Agrícola", "Industrial", "Transporte", "Uso"],
        datasets: [
            {
                label: "Contribuição das etapas do ciclo de vida",
                data: [0, 0, 0, 0],
                backgroundColor: [
                    "#236ab9",
                    "#c93b3b",
                    "#67dc3e",
                    "#833bb0",
                ],
            },
        ],
    });

    const [dataContribuicaoEtapasCicloVida2, setDataContribuicaoEtapasCicloVida2] = useState({
        labels: ["Agrícola", "Industrial", "Transporte", "Uso"],
        datasets: [
            {
                label: "Contribuição das etapas do ciclo de vida",
                data: [0, 0, 0],
                backgroundColor: [
                    "#236ab9",
                    "#c93b3b",
                    "#67dc3e",
                ],
            },
        ],
    });

    const [MediaPonderada, setMediaPonderada] = useState(0)
    const [OleoCombustivelPesado, setOleoCombustivelPesado] = useState(0)
    const [CoquePetroleo, setCoquePetroleo] = useState(0)

    useEffect(() => {

        fetch(`http://localhost:5000/combustivelFossilSubstituto/${encodeURIComponent("Média ponderada: Diesel A, Gasolina A e GNV")}`)
            .then(res => res.json())
            .then(data => {
                setMediaPonderada(data.dados[0]["Intensidade total de carbono do combustivel fossil substituto (Kg)"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/combustivelFossilSubstituto/${encodeURIComponent("Oléo Combustível")}`)
            .then(res => res.json())
            .then(data => {
                setOleoCombustivelPesado(data.dados[0]["Intensidade total de carbono do combustivel fossil substituto (Kg)"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));

        fetch(`http://localhost:5000/combustivelFossilSubstituto/${encodeURIComponent("Coque de Petróleo")}`)
            .then(res => res.json())
            .then(data => {
                setCoquePetroleo(data.dados[0]["Intensidade total de carbono do combustivel fossil substituto (Kg)"]);
            })
            .catch(err => console.error('Erro ao buscar dados:', err));


    }, []);

    useEffect(() => {

        setIntensidadeCarbonoSoma(Number(temp[0]) + Number(temp[1]) +
            Number(temp[2]) + Number(temp[3]))

        setIntensidadeCarbonoSoma2(Number(temp[1]) +
            Number(temp[2]) + Number(temp[3]))

        setIntensidadeCarbonoSoma3(temp[0] + temp[1] + temp[2] + temp[3] + temp[6])


        setDataContribuicaoEtapasCicloVida({
            labels: ["Agrícola", "Industrial", "Transporte", "Uso"],
            datasets: [
                {
                    label: "Contribuição das etapas do ciclo de vida",
                    data: [temp[0], temp[1], temp[2], temp[3]],
                    backgroundColor: [
                        "#236ab9",
                        "#c93b3b",
                        "#67dc3e",
                        "#833bb0",
                    ],
                },
            ],
        })

        setDataContribuicaoEtapasCicloVida2({
            labels: ["Industrial", "Transporte", "Uso"],
            datasets: [
                {
                    label: "Contribuição das etapas do ciclo de vida",
                    data: [temp[1], temp[2], temp[3]],
                    backgroundColor: [
                        "#236ab9",
                        "#c93b3b",
                        "#67dc3e",
                    ],
                },
            ],
        })


    }, [temp]);


    const [CreditosMediaPonderada, setCreditosMediaPonderada] = useState(0)
    const [CreditosOleoCombustivel, setCreditosOleoCombustivel] = useState(0)
    const [CreditosCoquePetroleo, setCreditosCoquePetroleo] = useState(0)

    useEffect(() => {

        if (MediaPonderada - IntensidadeCarbonoSoma > 0) {
            setCreditosMediaPonderada(Math.floor(temp[4] * 10000 * (MediaPonderada - IntensidadeCarbonoSoma)))

        } else {
            setCreditosMediaPonderada(0)
        }


    }, [MediaPonderada, IntensidadeCarbonoSoma]);

    useEffect(() => {

        if (OleoCombustivelPesado - IntensidadeCarbonoSoma > 0) {
            setCreditosOleoCombustivel(Math.floor(temp[4] * 10000 * (OleoCombustivelPesado - IntensidadeCarbonoSoma)))

        } else {
            setCreditosOleoCombustivel(0)
        }


    }, [OleoCombustivelPesado, IntensidadeCarbonoSoma]);

    useEffect(() => {

        if (CoquePetroleo - IntensidadeCarbonoSoma > 0) {
            setCreditosCoquePetroleo(Math.floor(temp[4] * 10000 * (CoquePetroleo - IntensidadeCarbonoSoma)))

        } else {
            setCreditosCoquePetroleo(0)
        }


    }, [CoquePetroleo, IntensidadeCarbonoSoma]);


    //Parte 2


    const [IntensidadeCarbonoSoma2, setIntensidadeCarbonoSoma2] = useState(0)

    const [CreditosMediaPonderada2, setCreditosMediaPonderada2] = useState(0)
    const [CreditosOleoCombustivel2, setCreditosOleoCombustivel2] = useState(0)
    const [CreditosCoquePetroleo2, setCreditosCoquePetroleo2] = useState(0)

    useEffect(() => {

        if (MediaPonderada - IntensidadeCarbonoSoma2 > 0) {
            setCreditosMediaPonderada2(Math.floor(temp[4] * 10000 * (MediaPonderada - IntensidadeCarbonoSoma2)))

        } else {
            setCreditosMediaPonderada2(0)
        }


    }, [MediaPonderada, IntensidadeCarbonoSoma2]);

    useEffect(() => {

        if (OleoCombustivelPesado - IntensidadeCarbonoSoma2 > 0) {
            setCreditosOleoCombustivel2(Math.floor(temp[4] * 10000 * (OleoCombustivelPesado - IntensidadeCarbonoSoma2)))

        } else {
            setCreditosOleoCombustivel2(0)
        }


    }, [OleoCombustivelPesado, IntensidadeCarbonoSoma2]);

    useEffect(() => {

        if (CoquePetroleo - IntensidadeCarbonoSoma2 > 0) {
            setCreditosCoquePetroleo2(Math.floor(temp[4] * 10000 * (CoquePetroleo - IntensidadeCarbonoSoma2)))

        } else {
            setCreditosCoquePetroleo2(0)
        }


    }, [CoquePetroleo, IntensidadeCarbonoSoma2]);


    const [IntensidadeCarbonoSoma3, setIntensidadeCarbonoSoma3] = useState(0)

    const [CreditosMediaPonderada3, setCreditosMediaPonderada3] = useState(0)
    const [CreditosOleoCombustivel3, setCreditosOleoCombustivel3] = useState(0)
    const [CreditosCoquePetroleo3, setCreditosCoquePetroleo3] = useState(0)

    useEffect(() => {

        if (MediaPonderada - IntensidadeCarbonoSoma3 > 0) {
            setCreditosMediaPonderada3(Math.floor(temp[4] * 10000 * (MediaPonderada - IntensidadeCarbonoSoma3)))

        } else {
            setCreditosMediaPonderada3(0)
        }


    }, [MediaPonderada, IntensidadeCarbonoSoma3]);

    useEffect(() => {

        if (OleoCombustivelPesado - IntensidadeCarbonoSoma3 > 0) {
            setCreditosOleoCombustivel3(Math.floor(temp[4] * 10000 * (OleoCombustivelPesado - IntensidadeCarbonoSoma3)))

        } else {
            setCreditosOleoCombustivel3(0)
        }


    }, [OleoCombustivelPesado, IntensidadeCarbonoSoma3]);

    useEffect(() => {

        if (CoquePetroleo - IntensidadeCarbonoSoma3 > 0) {
            setCreditosCoquePetroleo3(Math.floor(temp[4] * 10000 * (CoquePetroleo - IntensidadeCarbonoSoma3)))

        } else {
            setCreditosCoquePetroleo3(0)
        }


    }, [CoquePetroleo, IntensidadeCarbonoSoma3]);


    //salvar pdf

    const resultadosRef1 = useRef();
    const resultadosRef2 = useRef();
    const resultadosRef3 = useRef();

    const grafico1Ref = useRef(null);
    const grafico2Ref = useRef(null);


    const adicionarElementoAoPDF = async (
        elemento,
        pdf
    ) => {

        const canvas = await html2canvas(elemento, {
            scale: 2,
            useCORS: true
        });

        const imgData = canvas.toDataURL("image/png");

        const margem = 10;

        const pageWidth =
            pdf.internal.pageSize.getWidth();

        const usableWidth =
            pageWidth - (margem * 2);

        const imgHeight =
            (canvas.height * usableWidth) /
            canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            margem,   // X
            margem,   // Y
            usableWidth,
            imgHeight
        );
    };

    const gerarPDF = async () => {

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        // =========================
        // PÁGINA 1
        // =========================

        await adicionarElementoAoPDF(
            resultadosRef1.current,
            pdf
        );

        // gráfico 1 em alta qualidade
        const grafico1 =
            grafico1Ref.current.toBase64Image();

        pdf.addImage(
            grafico1,
            "PNG",
            55,   // X
            180,  // Y
            100,  // largura
            100   // altura
        );

        // =========================
        // PÁGINA 2
        // =========================

        pdf.addPage();

        await adicionarElementoAoPDF(
            resultadosRef2.current,
            pdf
        );

        // gráfico 2 em alta qualidade
        const grafico2 =
            grafico2Ref.current.toBase64Image();

        pdf.addImage(
            grafico2,
            "PNG",
            55,
            180,
            100,
            100
        );

        // =========================
        // PÁGINA 3
        // =========================

        pdf.addPage();

        await adicionarElementoAoPDF(
            resultadosRef3.current,
            pdf
        );

        pdf.save("resultado.pdf");
    };

    return (

        <>
            <div className="container mt-4 d-flex flex-column justify-content-center align-items-center">
                <div className="py-2 px-3 w-100 text-center text-white fw-bold mb-2"
                     style={{backgroundColor: "#9a9a9a", fontSize: "1.2rem", borderRadius: "4px"}}>
                    Resultados
                </div>
                <div ref={resultadosRef1} className="col-md-8 mb-5">
                    <table className="table table-bordered mb-5">
                        <thead>
                        <tr>
                            <th scope="col">Biomassa do biocombustível:</th>
                            <th colSpan="2">Casca de Amendoin</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="col">Intensidade de Carbono do<br/>Biocombustível (kg CO₂eq/MJ)</th>
                            <td style={{backgroundColor: '#63afff'}}>{IntensidadeCarbonoSoma}</td>
                            <td>% de contribuição</td>
                        </tr>
                        <tr>
                            <th scope="row">Agrícola</th>
                            <td>{temp[0]}</td>
                            <td>{(IntensidadeCarbonoSoma ? (temp[0] / IntensidadeCarbonoSoma) : 0) * 100 + '%'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Industrial</th>
                            <td>{temp[1]}</td>
                            <td>{(IntensidadeCarbonoSoma ? (temp[1] / IntensidadeCarbonoSoma) : 0) * 100 + '%'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Transporte</th>
                            <td>{temp[2]}</td>
                            <td>{(IntensidadeCarbonoSoma ? (temp[2] / IntensidadeCarbonoSoma) : 0) * 100 + '%'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Uso</th>
                            <td>{temp[3]}</td>
                            <td>{(IntensidadeCarbonoSoma ? (temp[3] / IntensidadeCarbonoSoma) : 0) * 100 + '%'}</td>
                        </tr>
                        </tbody>
                    </table>

                    <table className="table table-bordered mb-5">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th colSpan="3">Comparação entre combustíveis fósseis equivalentes</th>
                        </tr>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Diesel A, Gasolina<br/>A e GNV (Média<br/>ponderada)</th>
                            <th scope="col">Óleo combustível<br/>pesado</th>
                            <th scope="col">Coque de <br/>Petróleo</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="col">Intensidade de Carbono do<br/>combustível fóssil (kg CO₂eq/MJ)"</th>
                            <td>{MediaPonderada}</td>
                            <td>{OleoCombustivelPesado}</td>
                            <td>{CoquePetroleo}</td>
                        </tr>
                        <tr>
                            <th scope="row">Nota de Eficiência Energético-Ambiental</th>
                            <td>{MediaPonderada - IntensidadeCarbonoSoma}</td>
                            <td>{OleoCombustivelPesado - IntensidadeCarbonoSoma}</td>
                            <td>{CoquePetroleo - IntensidadeCarbonoSoma}</td>
                        </tr>
                        <tr>
                            <th scope="row">Redução de emissões</th>
                            <td>{(MediaPonderada ? (MediaPonderada - IntensidadeCarbonoSoma) / MediaPonderada : 0) * 100 + '%'}</td>
                            <td>{(OleoCombustivelPesado ? (OleoCombustivelPesado - IntensidadeCarbonoSoma) / OleoCombustivelPesado : 0) * 100 + '%'}</td>
                            <td>{(CoquePetroleo ? (CoquePetroleo - IntensidadeCarbonoSoma) / CoquePetroleo : 0) * 100 + '%'}</td>

                        </tr>
                        <tr>
                            <th scope="row">Possíveis créditos elegíveis (CBIOs) <br/>Considerando usina de médio
                                porte<br/>com produção anual de 10.000 Ton
                            </th>
                            <td>{CreditosMediaPonderada}</td>
                            <td>{CreditosOleoCombustivel}</td>
                            <td>{CreditosCoquePetroleo}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>

                <div style={{width: "400px", height: "400px"}}>
                    <Pie ref={grafico1Ref} data={dataContribuicaoEtapasCicloVida} options={options}/>
                </div>

                <div className="py-2 px-3 w-100 text-center text-white fw-bold mb-4"
                     style={{backgroundColor: "#9a9a9a", fontSize: "1.2rem", borderRadius: "4px"}}>
                </div>

                <div ref={resultadosRef2} className="col-md-8">

                    <h4 className="mb-3">Considerando carga nula na fase agricola, quando resíduo</h4>

                    <table className="table table-bordered mb-5">
                        <thead>
                        <tr>
                            <th scope="col">Biomassa do biocombustível:</th>
                            <th colSpan="2">Casca de Amendoin</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="col">Intensidade de Carbono do<br/>Biocombustível (kg CO₂eq/MJ)</th>
                            <td style={{backgroundColor: '#63afff'}}>{IntensidadeCarbonoSoma2}</td>
                            <td>% de contribuição</td>
                        </tr>
                        <tr>
                            <th scope="row">Industrial</th>
                            <td>{temp[1]}</td>
                            <td>{(IntensidadeCarbonoSoma2 ? (temp[1] / IntensidadeCarbonoSoma2) : 0) * 100 + '%'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Transporte</th>
                            <td>{temp[2]}</td>
                            <td>{(IntensidadeCarbonoSoma2 ? (temp[2] / IntensidadeCarbonoSoma2) : 0) * 100 + '%'}</td>
                        </tr>
                        <tr>
                            <th scope="row">Uso</th>
                            <td>{temp[3]}</td>
                            <td>{(IntensidadeCarbonoSoma2 ? (temp[3] / IntensidadeCarbonoSoma2) : 0) * 100 + '%'}</td>
                        </tr>
                        </tbody>
                    </table>

                    <table className="table table-bordered mb-5">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th colSpan="3">Comparação entre combustíveis fósseis equivalentes</th>
                        </tr>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Diesel A, Gasolina<br/>A e GNV (Média<br/>ponderada)</th>
                            <th scope="col">Óleo combustível<br/>pesado</th>
                            <th scope="col">Coque de <br/>Petróleo</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="col">Intensidade de Carbono do<br/>combustível fóssil (kg CO₂eq/MJ)"</th>
                            <td>{MediaPonderada}</td>
                            <td>{OleoCombustivelPesado}</td>
                            <td>{CoquePetroleo}</td>
                        </tr>
                        <tr>
                            <th scope="row">Nota de Eficiência Energético-Ambiental<br/>(kg CO₂eq/MJ)</th>
                            <td>{MediaPonderada - IntensidadeCarbonoSoma2}</td>
                            <td>{OleoCombustivelPesado - IntensidadeCarbonoSoma2}</td>
                            <td>{CoquePetroleo - IntensidadeCarbonoSoma2}</td>
                        </tr>
                        <tr>
                            <th scope="row">Redução de emissões</th>
                            <td>{(MediaPonderada ? (MediaPonderada - IntensidadeCarbonoSoma2) / MediaPonderada : 0) * 100 + '%'}</td>
                            <td>{(OleoCombustivelPesado ? (OleoCombustivelPesado - IntensidadeCarbonoSoma2) / OleoCombustivelPesado : 0) * 100 + '%'}</td>
                            <td>{(CoquePetroleo ? (CoquePetroleo - IntensidadeCarbonoSoma2) / CoquePetroleo : 0) * 100 + '%'}</td>

                        </tr>
                        <tr>
                            <th scope="row">Possíveis créditos elegíveis (CBIOs) <br/>Considerando usina de médio
                                porte<br/>com produção anual de 10.000 Ton
                            </th>
                            <td>{CreditosMediaPonderada2}</td>
                            <td>{CreditosOleoCombustivel2}</td>
                            <td>{CreditosCoquePetroleo2}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>

                <div style={{width: "400px", height: "400px"}}>
                    <Pie ref={grafico2Ref} data={dataContribuicaoEtapasCicloVida2} options={options}/>
                </div>

                <div className="py-2 px-3 w-100 text-center text-white fw-bold mb-4"
                     style={{backgroundColor: "#9a9a9a", fontSize: "1.2rem", borderRadius: "4px"}}>
                </div>
                <div ref={resultadosRef3} className="col-md-8">

                    <h4 className="mb-3">Considerando a aplicação da Circular Footprint Formula (CFF)</h4>

                    <table className="table table-bordered mb-5">
                        <tbody>
                        <tr>
                            <th scope="col">Intensidade de Carbono do<br/>Biocombustível (kg CO₂eq/MJ)</th>
                            <td style={{backgroundColor: '#63afff'}}>{temp[0] + temp[1] + temp[2] + temp[3] + temp[6]}</td>
                        </tr>
                        </tbody>
                    </table>

                    <table className="table table-bordered mb-5">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th colSpan="3">Comparação entre combustíveis fósseis equivalentes</th>
                        </tr>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Diesel A, Gasolina<br/>A e GNV (Média<br/>ponderada)</th>
                            <th scope="col">Óleo combustível<br/>pesado</th>
                            <th scope="col">Coque de <br/>Petróleo</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="col">Intensidade de Carbono do<br/>combustível fóssil (kg CO₂eq/MJ)"</th>
                            <td>{MediaPonderada}</td>
                            <td>{OleoCombustivelPesado}</td>
                            <td>{CoquePetroleo}</td>
                        </tr>
                        <tr>
                            <th scope="row">Nota de Eficiência Energético-Ambiental</th>
                            <td>{MediaPonderada - IntensidadeCarbonoSoma3}</td>
                            <td>{OleoCombustivelPesado - IntensidadeCarbonoSoma3}</td>
                            <td>{CoquePetroleo - IntensidadeCarbonoSoma3}</td>
                        </tr>
                        <tr>
                            <th scope="row">Redução de emissões</th>
                            <td>{(MediaPonderada ? (MediaPonderada - IntensidadeCarbonoSoma3) / MediaPonderada : 0) * 100 + '%'}</td>
                            <td>{(OleoCombustivelPesado ? (OleoCombustivelPesado - IntensidadeCarbonoSoma3) / OleoCombustivelPesado : 0) * 100 + '%'}</td>
                            <td>{(CoquePetroleo ? (CoquePetroleo - IntensidadeCarbonoSoma3) / CoquePetroleo : 0) * 100 + '%'}</td>

                        </tr>
                        <tr>
                            <th scope="row">Possíveis créditos elegíveis (CBIOs) <br/>Considerando usina de médio
                                porte<br/>com produção anual de 10.000 Ton
                            </th>
                            <td>{CreditosMediaPonderada3}</td>
                            <td>{CreditosOleoCombustivel3}</td>
                            <td>{CreditosCoquePetroleo3}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <div className="container mb-5 d-flex flex-column justify-content-center align-items-center">
                    <button className="btn btn-danger btn-lg" onClick={gerarPDF}>
                        Salvar resultados em PDF
                    </button>
                </div>
            </div>

        </>

    )

}

export default Resultados;