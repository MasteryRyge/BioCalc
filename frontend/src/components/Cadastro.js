function Cadastro() {

    return (

        <>

        <form className="m-4">
            <div className="col-md-6">

                <div className="mb-3">
                    <label htmlFor="empresa" className="form-label">Nome da Empresa / Instituição:</label>
                    <input type="text" className="form-control col-md-4" id="empresa" name="empresa" required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="estado" className="form-label">Estado:</label>
                    <input type="text" className="form-control col-md-4" id="estado" name="estado" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cidade" className="form-label">Cidade:</label>
                    <input type="text" className="form-control col-md-4" id="cidade" name="cidade" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="responsavel" className="form-label">Responsável pelo
                        preenchimento:</label>
                    <input type="text" className="form-control col-md-4" id="responsavel" name="responsavel"
                           required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail:</label>
                    <input type="email" className="form-control col-md-4" id="email" name="email"
                           required/>
                </div>

            </div>
        </form>

    </>
)

}

export default Cadastro