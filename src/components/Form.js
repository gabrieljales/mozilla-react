import React from "react";

export default function Form(props) {
    function handleSubmit(e) {
        e.preventDefault();
        props.addTask('Say hello!');
    }
    return (
        <form onSubmit={handleSubmit} > 
        {/* Todos os eventos do navegador seguem este formato em JSX – on, seguido do nome do evento */}
            <h2 className="label-wrapper"> {/* Atributos com múltiplas palavras são escritos em camelCase */}
                <label htmlFor="new-todo-input" className="label__lg">
                    What needs to be done?
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}