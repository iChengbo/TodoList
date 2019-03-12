/**
 * Created by Administrator on 2019/3/5.
 */
// 加载express 模块
let express = require('express');
let router = express.Router();
let Todos = require('../models/todos');
//统一返回格式
let responseData;

router.use( function(req, res, next) {
    responseData = {
        code: 0,
        message: '',
        todos: []
    }
    next();
} );

// 获取所有todos
router.get('/all', function (req, res, next) {
    Todos.find(function (err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        responseData.code = 0
        responseData.message = '成功获取所有任务'
        responseData.todos = todos
        res.json(responseData); // return all todos in JSON format
    });
});

// 添加
router.post('/add', function (req, res, next) {
    let message = req.body.message;
    console.log("添加：" + message);
    if(message === ''){
        responseData.code=1;
        responseData.message = '任务为空';
        res.json(responseData);
    }else{
        Todos.findOne({
            message: message
        }).then(function(mess){
            if(mess){
                responseData.code=4;
                responseData.message = '任务已存在';
                res.json(responseData)
            }else{
                //创建
                Todos.create({
                    message:req.body.message,
                },function (err,todos) {
                    responseData.code=0;
                    responseData.message = '添加成功';
                    responseData.todos = [todos];
                    res.json(responseData);
                });
            }
        });
    }

});

//删除
router.get('/delete', function (req, res, next) {
    //获取要删除的分类的id
    let id = req.query.id || '';
    if(id) {
        Todos.deleteOne({_id: id}, function(err, todo) {
            if(err) {
                console.log(err);
            } else {
                responseData.code=0;
                responseData.message = '删除成功';
                res.json(responseData);
            }
        })
    }
});

router.get('/deleteAllCompleted', function(req, res, next) {
    Todos.deleteMany({isCompleted: true}).then(function(result) {
        console.log(JSON.stringify(result) + '情况结果')
        responseData.code=0;
        responseData.message = '删除成功';
        res.json(responseData);
    });
});

// 修改部分
router.get('/updateMany', function(req, res ,next) {
    let isCompleted = req.query.isCompleted;
    console.log("全变为：" + isCompleted);
    Todos.find({}, function (err, AllTodos) {
        let needChangeId = AllTodos.map(function(td, idx) {
            return td._id;
        })
        Todos.updateMany(
            {_id: {$in: needChangeId}},
            {$set: {isCompleted: isCompleted}}).then(function(result) {
                console.log(result);
                responseData.code=0;
                responseData.message = '修改成功';
                res.json(responseData);
            })
    })
})

// 修改
router.get('/update', function (req, res, next) {
    console.log(JSON.stringify(req.query))
    let id = req.query.id || '';
    let message = req.query.message || '';
    let isCompleted = req.query.isCompleted
    console.log("isCompleted: " + isCompleted);
    Todos.findById(id, function (error,todo) {
        Todos.updateOne({_id:id}, {message:message, isCompleted: isCompleted},function (err,newTodo) {
            if(err){
                console.log(err);
            }else{
                responseData.code=0;
                responseData.message = '修改成功';
                res.json(responseData)
            }
        })
    })
});

module.exports = router;