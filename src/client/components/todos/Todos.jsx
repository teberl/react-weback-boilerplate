
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { todoPropType, TodoContext } from '../../todo-context';

import Headline from '../Headline';

export default function TodoList() {
  return (
    <div className="bg-near-black tc pa4">
      <Headline />
      <TodoContext.Consumer>
        {({ todos }) => (
          <ul className="list">
            {todos.map(todo => (todo.id === '2'
              ? <ImportantTodo key={todo.id} todo={todo} />
              : <TodoListItem key={todo.id} todo={todo} />))}
          </ul>
        )}
      </TodoContext.Consumer>
    </div>
  );
}

function TodoListItem({ className, todo }) {
  return (
    <li className={['f4', 'pa3', 'shiny-yellow', className].join(' ')}>
      {todo.text}
    </li>
  );
}

const ImportantTodo = styled(TodoListItem)`
  color: #FF725C !important;
`;

TodoListItem.defaultProps = {
  className: '',
};

TodoListItem.propTypes = {
  className: PropTypes.string,
  todo: PropTypes.shape(todoPropType).isRequired,
};
