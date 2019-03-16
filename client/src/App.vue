<template>
  <div id="app">
    <div class="content">
      <h1>Todos</h1>
      <inputArea v-on:addTodo="addTodo2DB" v-on:selectAllTodos="selectAllTodos" v-bind:todoNum="todoNum"></inputArea>
      <showArea v-bind:todoList="todoList"></showArea>
    </div>
  </div>
</template>

<script>

import InputArea from './components/InputArea'
import ShowArea from './components/ShowArea'
import axios from 'axios'
import Qs from 'qs'

let ADDR = '148.70.150.147'
let PORT = '8080'
let ADDR_PORT = ADDR + ':' + PORT

export default {
  name: 'App',
  data: function () {
    return {
      todoList: []
    }
  },
  computed: {
    todoNum () {
      return this.todoList.length
    }
  },
  // 注册组件
  components: {
    InputArea, ShowArea
  },
  methods: {
    addTodo2DB: function (newTodo) {
      let _this = this
      axios.post('http://' + ADDR_PORT + '/api/add',
        Qs.stringify({message: newTodo.message, isCompleted: newTodo.isCompleted}),
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (res) {
        let code = res.data.code
        console.log(res)
        if (code === 0) {
          let addTask = res.data.todos[0]
          _this.todoList.push(addTask)
          console.log('添加成功')
        } else if (code === 4) {
          console.log('任务已存在')
        } else {
          console.log('任务添加失败')
        }
      })
    },
    // 全选功能
    selectAllTodos: function () {
      let _this = this
      let len = _this.todoList.length
      let isCompleted = !_this.todoList.every((todo) => todo.isCompleted)
      axios.get('http://' + ADDR_PORT + '/api/updateMany', {params: {isCompleted: isCompleted}}).then(function (res) {
        if (res.status === 200) {
          for (let i = 0; i < len; i++) {
            if (_this.todoList[i]) {
              _this.todoList[i].isCompleted = isCompleted
            }
          }
        }
      })
    }
  },
  created () {
    let _this = this
    axios.get('http://' + ADDR_PORT + '/api/all').then(function (res) {
      if (res.status === 200) {
        _this.todoList = res.data.todos
      } else {
        alert('信息获取失败，请查看服务器是否开启')
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.content {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
</style>
