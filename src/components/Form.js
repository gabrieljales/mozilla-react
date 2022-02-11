import React, { useState } from "react"; 
/*useState é um hook que cria um "pedaço de estado" para um componente e seu único parâmetro determina o valor inicial 
  desse estado. Ele retorna duas coisas: o estado e uma função que pode ser usada para atualizar o estado posteriormente
  (ler final do arquivo) */

export default function Form(props) {
    // Setando o valor inicial e definindo uma função quer irá modificar name
    const [name, setName] = useState(''); // useState() retorna essas duas coisas mencionadas, por isso usamos desestruturação de array

    function handleChange(e) {
        setName(e.target.value); // Armazenando o estado atualizado do nome conforme o valor de entrada muda
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name !== '') { // Evitar que uma task com nome em branco seja submetida
            props.addTask(name); // Função definida no componente app. É uma callback prop
            setName(''); // Limpando o campo de input depois da submição do form
        }
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
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
}

// Sobre State:
/* Dados como esse, que um componente possui, são chamados de estado. O estado é outra ferramenta poderosa para o React porque os componentes não apenas possuem o estado, mas podem atualizá-lo posteriormente. Não é possível atualizar as props que um componente recebe; apenas para lê-los. 
O React fornece uma variedade de funções especiais que nos permitem fornecer novos recursos aos componentes, como state. Essas funções são chamadas de hooks (ganchos)
*/