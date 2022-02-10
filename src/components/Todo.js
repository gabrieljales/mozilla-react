import React from "react";

export default function Todo(props) {
    return (
        // Componentes devem SEMPRE retornar algo
        <li className="todo stack-small">
            <div className="c-cb">
                <input id={props.id} type="checkbox" defaultChecked={props.completed} /> {/* Maneira como lemos variáveis em react {} */}
                <label className="todo-label" htmlFor={props.id}>
                    {props.name}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn">
                    Edit <span className="visually-hidden">{props.name}</span>
                </button>
                <button type="button" className="btn btn__danger">
                    Delete <span className="visually-hidden">{props.name}</span>
                </button>
            </div>
        </li>
    );
}

// Componentes em forma de função/classe são nomeados com PascalCase
// Mas o que são componentes? Geralmente são como funções/classes JS. Aceitam entradas como propriedades (as props) e retornam novos elementos React (chamados de JSX)

// Dicas para definir componentes:
//  Se representar um "pedaço" óbvio do seu aplicativo, provavelmente é um componente
//  Se for reutilizado com frequência, provavelmente é um componente.