'use strict';

const TodoController = require('../app/controllers/todoController');

module.exports = function(app) {
    app.get('/api/all', TodoController.getAll);
    app.post('/api/add', TodoController.newTodo);
    app.post('/api/deletes', TodoController.deleteOne);
    app.post('/api/deletemany', TodoController.deleteAllCompleted);
    app.post('/api/update', TodoController.updateOne);
    app.post('/api/updateMany', TodoController.updateMany);
}
