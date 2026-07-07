export const formatarNumero = (valor, casas = 2) => {
    const numero = Number(valor);

    if (numero === 0) return "0";


    // verifica se o arredondamento iria zerar o número
    if (Math.abs(numero) < 1 && Number(numero.toFixed(casas)) === 0) {

        const decimal = numero.toString().split(".")[1];

        if (decimal) {
            const primeiraCasa = decimal.search(/[1-9]/);

            return numero.toFixed(primeiraCasa + 1);
        }
    }


    return numero
        .toFixed(casas)
        .replace(/\.?0+$/, '');
};

export const formatarPorcentagem = (valor, casas = 2) => {
    const numero = Number(valor);

    if (numero === 0) return "0%";

    // porcentagens pequenas
    if (Math.abs(numero) < 1) {

        const texto = numero.toString();
        const decimal = texto.split(".")[1];

        if (decimal) {
            const primeiraCasaSignificativa = decimal.search(/[1-9]/);

            if (primeiraCasaSignificativa >= casas) {
                return numero.toFixed(primeiraCasaSignificativa + 1) + "%";
            }
        }
    }

    const fator = Math.pow(10, casas);

    const truncado = Math.trunc(numero * fator) / fator;

    return truncado
        .toFixed(casas)
        .replace(/\.?0+$/, '') + "%";
};