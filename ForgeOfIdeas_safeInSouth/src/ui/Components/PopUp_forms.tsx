import "../Styles/Components.css";
import { useState } from "react";

interface IModal {
  isOpen: boolean;
}

export function PopUp_forms({ isOpen }: IModal) {
  const [nome, setNome] = useState("");
  const [prioridade, setPrioridade] = useState<number | null>(null);
  const [cor, setCor] = useState("#000000");
  const [descricao, setDescricao] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nome.trim() || prioridade === null) {
      alert("Preencha o nome e selecione uma prioridade.");
      return;
    }

    const data = {
      nome,
      prioridade,
      cor,
      descricao,
    };

    // Envia para o backend (ponte IPC via preload)
    window.electronAPI.saveIdea(data);

    // Limpa o formulário após envio
    setNome("");
    setPrioridade(null);
    setCor("#000000");
    setDescricao("");
  }

  if (!isOpen) return <></>;

  return (
    <div className="popBackground">
      <form className="forms" onSubmit={handleSubmit}>
        <h2 className="formsH2">Nome:</h2>
        <input
          type="text"
          name="nome"
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <h2 className="formsH2">Prioridade:</h2>
        <div>
          {[1, 2, 3].map((value) => (
            <label key={value} style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="prioridade"
                value={value}
                checked={prioridade === value}
                onChange={() => setPrioridade(value)}
              />{" "}
              {value}
            </label>
          ))}
        </div>

        <h2 className="formsH2">Cor:</h2>
        <input
          type="color"
          name="cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
        />

        <h2 className="formsH2">Descrição:</h2>
        <textarea
          name="descricao"
          placeholder="Digite a descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <br />
        <button type="submit">Salvar</button>
        <br />
        <button type="button">Cancelar</button>
      </form>
    </div>
  );
}
// import "../Styles/Components.css";
//
// interface IModal{
//     isOpen: boolean;
// }
//
// export function PopUp_forms({isOpen}:IModal){
//     if(isOpen){
//     return (
//     <div className="popBackground">
//         <form className="forms">
//             <h2 className="formsH2">Nome:</h2>
//             <input type="text" name="nome" placeholder="Digite o nome" />
//             <h2 className="formsH2">Prioridade:</h2>
//             <div>
//                 <label><input type="radio" name="prioridade" value="1" /> 1</label>
//                 <label><input type="radio" name="prioridade" value="2" /> 2</label>
//                 <label><input type="radio" name="prioridade" value="3" /> 3</label>
//             </div>
//             <h2 className="formsH2">Color:</h2>
//             <input type="color" name="cor" />
//             <h2 className="formsH2">Descrição:</h2>
//             <textarea name="descricao" placeholder="Digite a descrição"></textarea>
//             <br/>
//             <button>Salvar</button><br/>
//             <button>Cancelar</button>
//         </form>
//     </div>
//     );
//     }
//     else{
//         return<></>
//     }
// }
