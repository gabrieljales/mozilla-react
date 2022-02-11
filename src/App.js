import { nanoid } from "nanoid";
import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

// OBS: as duas contantes abaixo foram definidas fora da App() para evitar que elas fossem re-calculadas cada vez que o
// componente <App /> re-renderizase
const FILTER_MAP = {
  All: () => true, // Mostra todas as tasks, retornamos true para todas as tasks
  Active: task => !task.completed, // Mostra tasks cuja prop 'completed' tenha valor false
  Completed: task => task.completed // Mostra tasks cuja prop 'completed' tenha valor true
};

const FILTER_NAMES = Object.keys(FILTER_MAP); // Object.keys retornará um array dos nomes dos filtros ["All", "Active", "Completed"]

export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks); // isso preservará seu estado inicial
  const [filter, setFilter] = useState('All'); // Hook q lê e define um filtro, o padrão é 'all'

  function addTask(name) {
    const newTask = {
      id: 'todo-' + nanoid(), // Gerando id's únicos
      name: name,
      completed: false,
    };
    setTasks([...tasks, newTask]); // Copiando o array atual com o spread operator e adicionando o objeto no final
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
        // Se o id da tarefa corresponder com o id passado para a função,
        // usamos o spread para criar um novo objeto e alterar a propriedade 'checked' (se não, retorna o obj original)
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // Se a tarefa tiver o mesmo ID que a tarefa editada
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter]) // Mapeando tasks de acordo com os filtros
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id} // Você deve sempre passar uma chave exclusiva para qualquer coisa que renderizar com iteração (mais informações sobre key no final do arquivo)
      toggleTaskCompleted={toggleTaskCompleted} // Callback prop
      deleteTask={deleteTask}
      editTask={editTask}
    />
  )); // Retornando um Todo component do map()

  // Usada para mapear nosso array de nomes e retornar um componente <FilterButton />
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'; // Substantivo no plural ou singular
  const headingText = `${taskList.length} ${tasksNoun} remaining`; // Contar tasks que restam

  return (
    <div className="todoapp stack-large"> {/* Invés de class, com em html, usa-se className (para não ter conflito com a palavra class) */}
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list" // O atributo role ajuda a tecnologia assistiva a explicar que tipo de elemento uma tag representa
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"  // aria-labelledby informa às tecnologias assistivas que estamos tratando nosso cabeçalho de lista como o rótulo que descreve a finalidade da lista abaixo dele.
      >
        {taskList}
      </ul>

    </div>
  );
}

// key é um prop especial que é gerenciado pelo React. Serve para identificar de forma única cada elemento/componente que vai ser criado, alterado, excluído e/ou selecionado a partir de uma lista de valores *array), ou seja, está vinculado a criação de elementos dinâmicos de uma lista qualquer que necessitam ter unicidade.