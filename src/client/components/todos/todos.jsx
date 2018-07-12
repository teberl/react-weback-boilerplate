
import React from 'react';
import classnames from 'classnames';
import { todoPropType, TodoContext } from '../../todo-context';

// import './todos.css';


export default function TodoList() {
  return (
    <TodoContext.Consumer>
      {({ todos }) => (
        <ul className="ba b--blue w-third">
          {todos.map(todo => (<TodoListItem key={todo.id} todo={todo} />))}
        </ul>
      )}
    </TodoContext.Consumer>
  );
}

function TodoListItem(todo) {
  return ((
    <li className={classnames('f4 pa3', { 'todo--important': todo.id === 2 })}>
      {todo.text}
    </li>
  ));
}

TodoListItem.prototype = {
  todo: todoPropType,
};
