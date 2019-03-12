/**
 * Created by Administrator on 2019/3/5.
 */
let mongoose = require('mongoose');
let todosSchema = require('../schemas/todos');
// 用户表进行操作
module.exports = mongoose.model('Todos', todosSchema);