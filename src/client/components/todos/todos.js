import React from 'react';
import PropTypes from 'prop-types';
import { todoPropType, TodoContext } from '../../todo-context';

export default function TodoList(props) {
  return (
    <TodoContext.Consumer>
    {({ todos }) => (
      <ul className='ba b--blue w-third'>
        {todos.map(todo => (<TodoListItem key={todo.id} todo={todo} />))}
      </ul>
    )}
    </TodoContext.Consumer>
  );
}

function TodoListItem({ todo }) {
  return ((<li className='f4 pa3'>{ todo.text }</li>))
}

TodoList.prototype = {
  todos: PropTypes.arrayOf(todoPropType)
};
