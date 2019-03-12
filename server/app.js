/**
 * Created by Administrator on 2019/3/5.
 */
// 加载express 模块
let express = require('express');
// 加载模板模块
let swig = require('swig');
// 加载数据库模块
let mongoose = require('mongoose');
// 加载body-parser, 用来处理post提交过来的数据
let bodyParser = require('body-parser');
// 加载cookies模板
let Cookies = require('cookies');
// 创建app应用 => Nodeis. http.createServer();
let app = express();

// 引入数据表结构
let Todos = require('./models/todos');
// 设置静态托管
app.use('/public',express.static(__dirname + '/public'));

//配置模板模块定义当前应用使用的模板引擎
app.engine('html',swig.renderFile);
app.set('views', './view');
app.set('view engine', 'html');

// 在开发过程中，需要取消模板缓存
swig.setDefaults(({cache:false}));
// body-parser 设置
app.use( bodyParser.urlencoded({extended: true}));


//跨域

app.all("*",function (req,res,next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() === 'options'){
        res.sendStatus(200);  //让options尝试请求快速结束
    }else{
        next()
    }
})
app.use('/api', require('./router/index'));
// 数据库连接 mongoose.connect
mongoose.connect('mongodb://localhost:27017/todos',{useNewUrlParser: true },function (err) {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        // 监听app请求
        app.listen(8082,'192.168.135.8');
    }
})