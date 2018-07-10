import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import { urls } from '../../routes/urls';
import { TodoContext, addTodo } from '../todo-context';
import TodoList from './todos/todo-list';


class App extends React.Component {
  constructor(props) {
    super(props);

    const initialTodos = (props.initialState.todos && props.initialState.todos.length > 0) ? props.initialState.todos : [];

    this.state = {
      todos: initialTodos
    };

    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleAddTodo(newTodo) {
    this.setState({
      todos: addTodo(newTodo, this.state.todos)
    });
  }

  render() {
    const routes = [
      {
        path: urls.home,
        render: () => ("Hello World !!!")
      }, {
        path: urls.todoById,
        render: props => (<TodoContext.Provider
          value={{ todos: this.state.todos, addTodo: this.handleAddTodo }}>
          <TodoList
            todos={this.state.todos}
            {...props}
          />
        </TodoContext.Provider>)
      }
    ];

    return (
      <Switch>
        {routes.map(route =>
          <Route key={route.path} exact path={route.path} render={route.render} />
        )}
      </Switch>
    );
  }
}

App.propTypes = {
  initialState: PropTypes.object.isRequired
};

export default App;
