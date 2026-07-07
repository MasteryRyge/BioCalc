import React from "react";

function Instrucoes({ fechar }) {
    return (

        <div className="overlay">

            <div className="modal-instrucoes" style={{textAlign: "justify"}}>

                <button
                    className="btn btn-danger fechar"
                    onClick={fechar}
                >
                    X
                </button>

                <h2>BioCalc - Instruções</h2>

                <p>
                    Bem-vindo à ferramenta de cálculo de intensidade de carbono para biocombustíveis sólidos (pellets e briquetes) e geração de nota de Eficiência Energético-Ambiental. Esta calculadora foi desenvolvida de acordo com o referencial metodológico estabelecido no RenovaBio e na Renovacalc, fundamentado na Avaliação do Ciclo de Vida (ACV) conforme as normas ISO 14040/14044. O delineamento dos sistemas de produção e transporte dos biocombustíveis sólidos foi baseado nas publicações de Silva et al. (2022), Farrapo Jr et al. (2023), Matheus et al. (2024).
                </p>

                <b>Assim, caso existam insumos (fontes de biomassa ou eletricidade, matérias-primas adicionais nos biocombustíveis, etc.) que não estão disponíveis nesta versão da calculadora, favor entrar em contato para inclusão: engs@ufscar.br</b>
                <hr/>
                <h4 className="mt-4">Orientações Gerais para o preenchimento</h4>

                <ul>
                    <li>A entrada de dados deve ser realizada na calculadora BioCalc.</li>

                    <li>Os desenvolvedores não se responsabilizam por modificações na planilha e nas equações por parte dos usuarios</li>
                    <li>Certifique-se de preencher todos os campos com precisão e veracidade, prestando atenção as unidades pré-definidas na planilha</li>
                    <li>Utilize fontes confiáveis para obter os dados requisitados</li>
                    <li>Verifique e valide todas as informações antes de submeter os dados na calculadora</li>

                </ul>

                <hr/>

                <p>Para garantir a precisão e a conformidade dos dados, o preenchimento deve ser realizado com base nas etapas do processo de produção do biocombustível. <br/>
                    Abaixo estão as instruções detalhadas para cada fase:</p>

                <h4 className="mt-4">1. Fase Agrícola e Transporte da Biomassa</h4>

                <p>
                    Nesta etapa são calculados os impactos relacionados a produção da biomassa, a Mudança de Uso da Terra (MUT) e ao transporte da biomassa da área de produção até a fabrica. As informações requisitadas incluem:
                </p>

                <ul>
                    <li>Tipo de biomassa (selecionar da lista suspensa)</li>
                    <li>Aproveitamento da biomassa (em kg de biomassa / kg de biocombustível)</li>
                    <li>Entrada de amido de milho como insumo adicional na produção da biomassa (em kg / kg de biomassa)</li>
                    <li>Origem da biomassa (local de cultivo)</li>
                    <li>Estado de produção da biomassa (selecionar da lista suspensa)</li>
                    <li>Detalhes do transporte da produção de biomassa até a fabrica (tipo de veículo, distância percorrida em km)</li>
                </ul>


                <h4 className="mt-5">2. Fase Industrial</h4>

                <p>
                    Para a fase industrial, deve-se incluir os dados referentes à manufatura do biocombustível. As informações solicitadas abrangem:
                </p>

                <ul>
                    <li>Fontes de energia e seu respectivo consumo em kWh/ano (eletricidade e combustíveis)</li>
                    <li>Insumos utilizados no processo de fabricação em kg/ano</li>
                    <li>Consumo de água em L/ano</li>
                    <li>Outros recursos e materiais empregados</li>
                </ul>


                <h4 className="mt-5">3. Fase de Distribuição</h4>

                <p>
                    Na fase de distribuição, são necessários os dados sobre o transporte do biocombustível até o mercado consumidor. <br/>Nesse contexto, o impacto pode ser calculado para o mercado doméstico (Brasil) e também pode-se considerar a exportação do produto. <br/>As informações necessárias para o cálculo são:
                </p>

                <b>Mercado doméstico (Brasil)</b>
                <ul>
                    <li>Quantidade de biomassa transportada (em kg/ano)</li>
                    <li>Distância percorrida até o mercado consumidor doméstico (em km)</li>
                    <li>Percentual do modal de transporte, sendo: rodoviário, hidroviário ou ferroviário</li>
                    <li>Tipo de veículo utilizado no transporte rodoviário</li>
                </ul>

                <b>Mercado externo</b>
                <ul>
                    <li>Distância da fabrica ao porto hidroviário mais próximo em km (consulta pode ser efetuada no site: gov.br)</li>
                    <li>Percentual do modal de transporte até o porto</li>
                    <li>Distância do porto hidroviário ao mercado consumidor final (consulta pode ser efetuada no site: searates.com)</li>
                </ul>


            </div>

        </div>
    );
}

export default Instrucoes;