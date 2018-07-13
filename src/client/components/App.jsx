import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import urls from '../../routes/urls';
import { TodoContext, addTodo, todoPropType } from '../todo-context';
import Headline from './Headline';
import TodoList from './todos/Todos';

class App extends React.Component {
  constructor(props) {
    super(props);
    const initialTodos = (props.initialState.todos && props.initialState.todos.length > 0)
      ? props.initialState.todos
      : [];
    this.state = {
      todos: initialTodos,
    };

    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleAddTodo(newTodo) {
    const { todos } = this.state;
    this.setState({
      todos: addTodo(newTodo, todos),
    });
  }

  render() {
    const { todos } = this.state;
    const routes = [
      {
        path: urls.root,
        render: () => (
          <div className="bg-near-black tc pa4">
            <Headline />
          </div>
        ),
      }, {
        path: urls.todos,
        render: props => (
          <TodoContext.Provider
            value={{ todos, addTodo: this.handleAddTodo }}
          >
            <TodoList
              todos={todos}
              {...props}
            />
          </TodoContext.Provider>
        ),
      },
    ];

    return (
      <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            exact
            path={route.path}
            render={route.render}
          />
        ))}
      </Switch>
    );
  }
}

App.propTypes = {
  initialState: PropTypes.shape({
    todos: PropTypes.arrayOf(PropTypes.shape(todoPropType)),
  }).isRequired,
};

export default App;
