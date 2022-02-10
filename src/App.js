import React from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

export default function App(props) {
  function addTask(name) {
    alert(name);
  }

  const taskList = props.tasks?.map(task => (
    <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id} // Você deve sempre passar uma chave exclusiva para qualquer coisa que renderizar com iteração (mais informações sobre key no final do arquivo)
  />
  )); // Retornando um Todo component do map()
  return (
    <div className="todoapp stack-large"> {/* Invés de class, com em html, usa-se className (para não ter conflito com a palavra class) */}
      <h1>TodoMatic</h1>
        <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
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