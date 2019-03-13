'use strict';

const TodoController = require('../app/controllers/todoController');

module.exports = function(app) {
    app.get('/api/all', TodoController.getAll);
    app.post('/api/add', TodoController.newTodo);
    app.get('/api/delete', TodoController.deleteOne);
    app.get('/api/deleteAllCompleted', TodoController.deleteAllCompleted);
    app.get('/api/update', TodoController.updateOne);
    app.get('/api/updateMany', TodoController.updateMany);
}
