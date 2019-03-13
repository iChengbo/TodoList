
let mongoose = require('mongoose');
let todoSchema = require('../schemas/todoSchema');
// 用户表进行操作
module.exports = mongoose.model('Todos', todoSchema);