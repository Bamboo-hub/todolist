var fs = require('fs')


var todoFilePath = 'db/todo.json'

var log = function() {
    console.log.apply(console, arguments)
}

const loadTodos = function() {
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    // 注意, 一般都是这样不处理的
    var content = fs.readFileSync(todoFilePath, 'utf8')
    var todos = JSON.parse(content)
    log('todos', todos)
    return todos
}

/*
 b 这个对象是我们要导出给别的代码用的对象
 它有一个 data 属性用来存储所有的 todos 对象
 它有 all 方法返回一个包含所有 todo 的数组
 它有 new 方法来在数据中插入一个新的 todo 并且返回
 他有 save 方法来保存更改到文件中
 */
var b = {
    data: loadTodos()
}


b.all = function() {
    var todos = this.data
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
    }
    return todos
}

b.new = function(form) {
    form.id = Math.floor(new Date() / 1000)
    // 把 数据 加入 this.data 数组
    this.data.push(form)
    // 把 最新数据 保存到文件中
    this.save()
    // 返回新建的数据
    return form
    log('新todo', form)
}

/*
 它能够删除指定 id 的数据
 删除后保存修改到文件中
 */
b.delete = function(id) {
    var todos = this.data
    id = Number(id)
    var found = false
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        if (todo.id == id) {
            found = true
            break
        }
    }
    // 用 splice 函数删除数组中的一个元素
    // 如果没找到, i 的值就是无用值, 删除也不会报错
    // 所以不用判断也可以
    todos.splice(i, 1)
    // 把 最新数据 保存到文件中
    this.save()
    // 不返回数据也行, 但是还是返回一下好了
    return found
}

b.save = function() {
    var s = JSON.stringify(this.data, null, 2)
    fs.writeFile(todoFilePath, s, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('保存成功')
        }
    })
}

// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了(具体看使用方法)
module.exports = b
