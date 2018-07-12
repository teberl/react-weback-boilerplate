import React from 'react';
import PropTypes from 'prop-types';

function createId() {
  return Math.random().toString(16).substring(2);
}

export const addTodo = (newTodo, todos) => [
  { id: createId, createdOn: (new Date()).toISOString(), text: newTodo },
].concat(todos);


export const TodoContext = React.createContext({
  todos: [],
  addTodo: () => { },
});

export const todoPropType = {
  id: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
