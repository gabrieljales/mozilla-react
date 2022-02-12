import React, { useEffect, useRef, useState } from "react"; // useRef: útil para se referir a elementos DOM (qual elemtno da DOM focar e como encontrá-lo)

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }  

export default function Todo(props) {
    // Estado para saber se o usuário está editando ou não. O padrão é isEditing=false
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState(''); // hook que guarda o novo nome da tarefa
    
    // Esses refs têm um valor padrão de null porque eles não terão valor até que os anexemos aos seus respectivos elementos 
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);


    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }


    // Template que será exibido para quando o usuário estiver editando uma task
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    New name for {props.name}
                </label>
                <input
                    id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">
                {/* Quando o usuário clicar no botão cancelar, trocamos para o template de visualização */}
                <button
                    type="button"
                    className="btn todo-cancel"
                    onClick={() => setEditing(false)}
                    ref={editButtonRef}
                >
                    Cancel
                    <span className="visually-hidden">renaming {props.name}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span className="visually-hidden">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    // Template para ser exibido quando o usuário estiver somente vendo a task
    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                {/* Quando o usuário clicar no botão editar, trocamos para o template de edição */}
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                >
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.deleteTask(props.id)}
                >
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </div>
    );

    // useEffect() recebe uma função como argumento; esta função é executada após a renderização do componente
    useEffect(() => {
        if (isEditing) {
          editFieldRef.current.focus();
        }
      }, [isEditing]);      

    // Componentes devem SEMPRE retornar algo
    return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>; // Usando operador ternário para verificar se está no estado de edição ou somente visualização

}

// Componentes em forma de função/classe são nomeados com PascalCase
// Mas o que são componentes? Geralmente são como funções/classes JS. Aceitam entradas como propriedades (as props) e retornam novos elementos React (chamados de JSX)

// Dicas para definir componentes:
//  Se representar um "pedaço" óbvio do seu aplicativo, provavelmente é um componente
//  Se for reutilizado com frequência, provavelmente é um componente.