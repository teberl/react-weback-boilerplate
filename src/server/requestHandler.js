import render from './render';

const todos = [{
  id: '1',
  createdOn: (new Date()).toISOString(),
  text: 'Use flow',
}, {
  id: '2',
  createdOn: (new Date()).toISOString(),
  text: 'Improve webpack config',
}, {
  id: '3',
  createdOn: (new Date()).toISOString(),
  text: 'Use proper bundles and chunks',
}];

const initialServerState = { todos };

function handleDefault(req, res) {
  return render(req, res, initialServerState);
}

function handleTodoById(req, res) {
  if (!req.params.id) {
    return res.status(400).send('\'id\' is required');
  }

  return res.status(501).send();
}

function handleTodos(req, res) {
  return render(req, res, initialServerState);
}

export { handleDefault, handleTodoById, handleTodos };
