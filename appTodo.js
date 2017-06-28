// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

// 配置静态文件目录
app.use(express.static('static'))


const registerRoutes = function(app, routes) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i]
        // 下面这段是重点
        // console.log('一routes', routes, '二route', route)
        app[route.method](route.path, route.func)
    }
}


// 导入 route/todo.js 的所有路由数据
const routeTodo = require('./route/todo')
registerRoutes(app, routeTodo.routes)
// console.log('路由数据', routeTodo, registerRoutes(app, routeTodo.routes), routeTodo.routes.func)


// listen 函数的第一个参数是我们要监听的端口
// 这个端口是要浏览器输入的
// 默认的端口是 80
// 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
// 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
