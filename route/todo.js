const todo = require('../model/todo')

var log = function() {
    console.log.apply(console, arguments)
}

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data){
        // console.log(`读取的html文件 ${path} 内容是`, data)
        // 替换参数
        response.send(data)
    })
}

var index = {
    path: '/',
    method: 'get',
    func: function(request, response) {
        var path = 'todo.html'
        sendHtml(path, response)
    }
}

var all = {
    path: '/api/todo/all',
    method: 'get',
    func: function(request, response) {
        var todos = todo.all()
        var r = JSON.stringify(todos, null, 2)
        response.send(r)
    }
}

var add = {
    path: '/api/todo/add',
    method: 'post',
    func: function(request, response) {
        // 浏览器发过来的数据我们一般称之为 form (表单)
        var form = request.body
        // 插入新数据并返回
        var t = todo.new(form)
        var r = JSON.stringify(t)
        response.send(r)
    }
}

/*
 请求 POST /api/blog/delete 来删除一个博客
 ajax 传的参数是下面这个对象的 JSON 字符串
 {
 id: 1
 }
 */

var deleteTodo = {
    path: '/api/todo/delete/:id',
    method: 'get',
    func: function(request, response) {
        var id = request.params.id
        var t = todo.delete(id)
        var data = JSON.stringify(t)
        response.send(data)
    }
}

var routes = [
    index,
    all,
    add,
    deleteTodo,
]

// for(var i = 0; i < n; i++)
// for(var i in computers)
// for(var i of computers)

module.exports.routes = routes
