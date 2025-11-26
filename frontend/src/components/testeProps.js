import {useState} from 'react'


function Teste() {

    const [Produto, setProduto] = useState()
    const [preco, setPreco] = useState();

    const precos = {
        banana: "3.50",
        maca: "4.20",
        laranja: "2.80",
    };

    function mudaProduto(e) {

        setProduto(e.target.value);
        setPreco(precos[e.target.value] || "");

    }


    return (
        <>
            <form>
                <label htmlFor="produto">Produto:</label>
                <select id="produto" onChange={mudaProduto}>
                    <option value="">Selecione...</option>
                    <option value="banana">Banana</option>
                    <option value="maca">Maca</option>
                    <option value="laranja">Laranja</option>
                </select>

                <br/><br/>

                <label>
                    Preço (R$):
                    <input type="text" value={preco} readOnly/>
                </label>
            </form>
        </>
    )

}


export default Teste