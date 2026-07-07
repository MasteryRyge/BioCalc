import { useState } from "react";

function Cadastro({ onChangeCadastro }) {

    const [formulario, setFormulario] = useState({
        empresa: "",
        estado: "",
        cidade: "",
        responsavel: "",
        email: ""
    });


    const alterarCampo = (e) => {

        const novoFormulario = {
            ...formulario,
            [e.target.name]: e.target.value
        };

        setFormulario(novoFormulario);

        onChangeCadastro(novoFormulario);
    };


    return (
        <div className="container mt-4 d-flex justify-content-center">

            <form className="w-75">

                <div className="mb-3">
                    <label className="form-label">
                        Nome da Empresa / Instituição:
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="empresa"
                        value={formulario.empresa}
                        onChange={alterarCampo}
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">
                        Estado:
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="estado"
                        value={formulario.estado}
                        onChange={alterarCampo}
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">
                        Cidade:
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="cidade"
                        value={formulario.cidade}
                        onChange={alterarCampo}
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">
                        Responsável pelo preenchimento:
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        name="responsavel"
                        value={formulario.responsavel}
                        onChange={alterarCampo}
                    />
                </div>


                <div className="mb-3">
                    <label className="form-label">
                        E-mail:
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formulario.email}
                        onChange={alterarCampo}
                    />
                </div>

            </form>

        </div>
    );
}

export default Cadastro;