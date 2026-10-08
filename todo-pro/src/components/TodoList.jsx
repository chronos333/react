//componente para gerneciar a lista de tarefas

const TodoList = ({tasks, removeTask}) => {
    return(
        <ul>
            {tasks.map((task, index)=>{
                return <li key={index}>
                    {task}
                    <button  type="button" onClick={()=>removeTask(index)}>Excluir</button>
                </li>
            })}
        </ul>
    );
}

export default TodoList;