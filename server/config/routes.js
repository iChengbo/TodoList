'use strict';

const TodoController = require('../app/controllers/todoController');

module.exports = function(app) {
    // todolist 接口
    app.get('/todolist/api/all', TodoController.getAll);
    app.post('/todolist/api/add', TodoController.newTodo);
    app.post('/todolist/api/deletes', TodoController.deleteOne);
    app.post('/todolist/api/deletemany', TodoController.deleteAllCompleted);
    app.post('/todolist/api/update', TodoController.updateOne);
    app.post('/todolist/api/updateMany', TodoController.updateMany);
}
