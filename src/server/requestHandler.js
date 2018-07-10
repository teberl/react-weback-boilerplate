import render from './render';

const todo = {
  id: 1,
  createdOn: (new Date()).toISOString(),
  text: 'Buy some candy!'
};
const initialServerState = { todos: [todo] }

function handleDefault(req, res) {

  return render(req, res, initialServerState);
}

function handleTodoById(req, res) {
  if (!req.params.id) {
    return res.status(400).send('\'id\' is required');
  }

  if (initialServerState.todos && !initialServerState.todos.some(todo => todo.id.toString() === req.params.id)) {
    return res.status(404).send();
  }

  return render(req, res, initialServerState);
}

function handleTodos(req, res) {
  return res.status(501).send();
}

export { handleDefault, handleTodoById, handleTodos };
