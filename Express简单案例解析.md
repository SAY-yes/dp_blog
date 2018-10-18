# Express 案例
    var express    = require('express');
    var app        = express();  

生成一个web应用实例

    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));

body-parser模块的作用，是对POST、PUT、DELETE等 HTTP 方法的数据体进行解析。app.use用来将这个模块加载到当前应用。有了这两句，就可以处理POST、PUT、DELETE等请求了。

    var port = process.env.PORT || 8080;
上面代码指定了外部访问的端口，如果环境变量没有指定，则端口默认为8080。改变端口的命令：set PORT=7070

    var router = express.Router();

    router.use(function(req, res, next) {
        console.log('There is a requesting:'+req.url);
        next();
    });
    router.use(function(req, res, next) {
        let time = new Date().toLocaleString()
        console.log(time);
        next();
    });

router.use() 的作用是加载一个函数。这个函数被称为中间件，作用是在请求被路由匹配之前，先进行一些处理。上述两个中间件，一个是服务器每次收到用户请求，就在命令行输出一条记录。一个是服务器每次收到用户请求，会在服务器的控制台打印出收到请求的时间。   
>请特别注意，这个函数内部的next()，它代表下一个中间件，表示将处理过的请求传递给下一个中间件。实际上，bodyparser、router本质都是中间件，整个 Express 的设计哲学就是不断对 HTTP 请求加工，然后返回一个 HTTP 回应

    router.get('/', function(req, res) {
        res.send('<h1>Hello World</h1>');
    });

    router.get('/:name', function(req, res) {
        res.send('<h1>Hello ' + req.params.name + '</h1>');
    });

    // localhost:8080/home/Jack =>  req.params={name:Jack}
    // localhost:8080/home/Jack?age=18 =>  req.query={age:18}

    router.post('/', function (req, res) {
        var name = req.body.name;
        res.json({message: 'Hello ' + name});
    });

    app.use('/home', router);

上面代码新建了一个路由对象，该对象指定访问根路由（/）时，返回Hello World。然后，将该路由加载在/home路径，也就是说，访问/home会返回Hello World。

在  Postman 里面，向http://127.0.0.1:8080/home发出一个POST请求。数据体的编码方法设为x-www-form-urlencoded，里面设置一个name字段，值可以随便取，假定设为Alice。也就是说，发出这样一个请求。   

POST /home HTTP/1.1   
Host: 127.0.0.1:8080   
Content-Type: application/x-www-form-urlencoded   
name=Alice   
如果一切正常，服务器会返回一段 JSON 信息。   
{   
  "message": "Hello Alice"   
}
    
    app.listen(port);
    console.log('Magic happens on port ' + port);
为应用添加监听端口