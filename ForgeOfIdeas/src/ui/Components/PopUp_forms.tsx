import "../Styles/Components.css";

interface IModal{
    isOpen: boolean;
}

export function PopUp_forms({isOpen}:IModal){
    if(isOpen){
    return (
    <div className="popBackground">
        <form className="forms">
            <h2 className="formsH2">Nome:</h2>
            <input type="text" name="nome" placeholder="Digite o nome" />
            <h2 className="formsH2">Prioridade:</h2>
            <div>
                <label><input type="radio" name="prioridade" value="1" /> 1</label>
                <label><input type="radio" name="prioridade" value="2" /> 2</label>
                <label><input type="radio" name="prioridade" value="3" /> 3</label>
            </div>
            <h2 className="formsH2">Color:</h2>
            <input type="color" name="cor" />
            <h2 className="formsH2">Descrição:</h2>
            <textarea name="descricao" placeholder="Digite a descrição"></textarea>
            <br/>
            <button>Salvar</button><br/>
            <button>Cancelar</button>
        </form>
    </div>
    );
    }
    else{
        return<></>
    }
}
