//tela principal da aplicação , vou importa od dois componentes ( TodoForm e TodoList)

import { useState } from "react"
import TodoForm from "/components/TodoForm";
import TodoList from "/components/TodoList";

const App = () =>{
  //vetor de tarefas
  const[tasks, setTasks] = useState([]);

  //função para adicionar tarefas
  const addTask = (task) => {
    setTasks([...tasks,task]); //adicionandno todas que já estavam e mais a nova tarefa
  }

  //função para remover tarefas
  const removeTask = (index) =>{
    setTasks(tasks.filter((_,i) => i !== index));
  }

  return(
    <div>
      <h1>Lista de Tarefas Todo-Pro</h1>
      <TodoForm addTask={addTask}/>
      <TodoList tasks={tasks} removeTask={removeTask}/>
    </div>
  );

}

export default App;