//componente que vai gerenciar somente o formulário de envio da tarefa
//formulário para adicionar tarefas


import { useState } from "react"

const TodoForm = ({addTask}) => {
    // Estado local para armazenamento temporario do texto digitado no campo de input
    const [task, setTask] = useState("");

    //Cria um Manipulador de Evento ao enviar o formaulário
    const handleSubmit = (e) =>{
        e.preventDefault();
        const cleanTask = task.trim(); // não recarrega a página ao enviar o formulário
        
        //validação do campo de entrada para verificar se otexto não é vazio
        if(cleanTask !== ""){
            addTask(cleanTask); //adiciona a tarefa na função do prop() 
            setTask(""); //Reset o campo de entrada  para o valor inicial
        }
    }
    //REACT DOM
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="" id="" value={task} onChange={(e)=>setTask(e.target.value)}/> 
            {/* onChange atualiza o estado a cada letra digitada no teclado */}
            <button type="submit">Adicionar</button>
        </form>
    );
}

export default TodoForm;