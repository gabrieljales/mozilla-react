import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
const DATA = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
];


ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} /> {/* Uma prop é qualquer dado passado para um componente React. São escritas dentro das invocações dos componentes */}
  </React.StrictMode>,
  document.getElementById('root')
);
