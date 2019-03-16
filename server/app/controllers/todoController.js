'use strict';

const Todos = require('../models/todoModel');

let responseData = {};

exports.getAll = function(req, res) {
    Todos.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        responseData.code = 0
        responseData.msg = '成功获取所有任务'
        responseData.todos = todos
        res.json(responseData); // return all todos in JSON format
    });
}

exports.newTodo = function(req, res) {
    let message = req.body.message;
    if(message === ''){
        responseData.code=1;
        responseData.msg = '任务为空';
        res.json(responseData);
    }else{
        Todos.findOne({
            message: message
        }).then(function(mess){
            if(mess){
                responseData.code=4;
                responseData.msg = '任务已存在';
                res.json(responseData)
            }else{
                //创建
                Todos.create({
                    message:req.body.message,
                },function (err,todos) {
                    responseData.code=0;
                    responseData.msg = '添加成功';
                    responseData.todos = todos;
                    res.json(responseData);
                });
            }
        });
    }
}

exports.deleteOne = function(req, res) {
    //获取要删除的分类的id
    let id = req.body.id || '';
    if(id) {
        Todos.deleteOne({_id: id}, function(err, todo) {
            if(err) {
                console.log(err);
            } else {
                responseData.code=0;
                responseData.msg = '删除成功';
                responseData.todos = {_id: id}
                res.json(responseData);
            }
        })
    }
}

exports.deleteAllCompleted = function(req, res) {
    let ids = req.body.ids.split(',').slice(0,-1)
    Todos.deleteMany({_id: {$in:ids}}).then(function(result) {
        responseData.code=0;
        responseData.msg = '删除成功';
        res.json(responseData);
    });
}

exports.updateOne = function(req, res) {
    let id = req.body.id || '';
    let message = req.body.message || '';
    let isChecked = req.body.isChecked
    Todos.findById(id, function (error,todo) {
        Todos.updateOne({_id:id}, {message:message, isChecked: isChecked},function (err,newTodo) {
            if(err){
                console.log(err);
            }else{
                responseData.code=0;
                responseData.msg = '修改成功';
                res.json(responseData)
            }
        })
    })
}

exports.updateMany = function(req, res) {
    let isChecked = req.body.isChecked
    Todos.find({}, function (err, AllTodos) {
        let needChangeId = AllTodos.map(function(td, idx) {
            return td._id;
        })
        Todos.updateMany(
            {_id: {$in: needChangeId}},
            {$set: {isChecked: isChecked}}).then(function(result) {
                responseData.code=0;
                responseData.msg = '修改成功';
                res.json(responseData);
            })
    })
}
