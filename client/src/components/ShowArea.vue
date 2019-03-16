<template>
  <div id="showArea">
    <section class="g-content">
      <ul class="g-tasklist">
        <li class="m-tasks" v-for="(todo,index) in todoList" :key=index v-show="isShowFilted(todo)">
          <input type="checkbox" class="u-check" @click="toChecked(todo,index)" v-model="todo.isCompleted">
          <div class="u-message" v-show="!todo.status" @dblclick="toEdit(todo)">
            {{todo.message}} {{todo.isCompleted}}
          </div>
          <input type="text" class="u-message u-update" v-model="todo.message" v-show="todo.status" @blur="unEdit(todo)">
          <span class="u-close-icon u-close"
            @click="deleteTodo(todo)"
            title="删除"
          ></span>
        </li>
      </ul>
    </section>

    <div v-show="todoList.length>0">
      <span>{{countActivingNum}}&nbsp;未完成</span>
      <ul class="filters">
        <li>
          <a href="#" @click="visibility='isAll'">全部</a>
        </li>
        <li>
          <a href="#" @click="visibility='isActiving'">未完成</a>
        </li>
        <li>
          <a href="#" @click="visibility='isCompleted'">已完成</a>
        </li>
        <li v-show="countCompletedNum>0">
          <a href="#" @click="deleteAllCompleted">清空已完成</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

let filters = {
  isAll: function (todos) {
    return todos
  },
  isActiving: function (todos) {
    return todos.filter(function (todo) {
      return !todo.isCompleted
    })
  },
  isCompleted: function (todos) {
    return todos.filter(function (todo) {
      return todo.isCompleted
    })
  }
}

let ADDR = '148.70.150.147'
let PORT = '8080'
let ADDR_PORT = ADDR + ':' + PORT

export default {
  name: 'ShowArea',
  data () {
    return {
      isCompleted: false,
      visibility: 'isAll'
    }
  },
  props: [
    'todoList'
  ],
  computed: {
    // 使用计算属性计算所有未完成todos的次数
    countActivingNum () {
      return filters.isActiving(this.todoList).length
    },
    // 计算已完成的个数
    countCompletedNum () {
      return this.todoList.length - this.countActivingNum
    }
  },
  methods: {
    // 过滤任务列表
    filteredTodoList () {
      return filters[this.visibility](this.todoList)
    },
    // 判断当前的todo是否属于filteredTodoList
    isShowFilted (todo) {
      return this.filteredTodoList().some(function (item) {
        return item._id === todo._id
      })
    },
    // 设置所有todo为已完成
    toChecked (todo, index) {
      // console.log('已完成？' + index)
      axios.get('http://' + ADDR_PORT + '/api/update', {params: {id: todo._id, message: todo.message, isCompleted: !todo.isCompleted}}).then(function (res) {
        console.log(res, todo.isCompleted)
      })
    },
    toEdit (todo) {
      todo.status = true
      console.log('进入编辑模式')
    },
    unEdit (todo) {
      todo.status = false
      axios.get('http://' + ADDR_PORT + '/api/update', {params: {id: todo._id, message: todo.message, isCompleted: false}}).then(function (res) {
        // console.log('编辑完成: 此时应该变为未完成' + res)
        todo.isCompleted = false
      })
    },
    deleteTodo (item) {
      let _this = this
      axios.get('http://' + ADDR_PORT + '/api/delete', {params: {id: item._id}}).then(function (res) {
        if (res.status === 200) {
          _this.todoList.splice(_this.todoList.findIndex(temp => temp._id === item._id), 1)
          console.log('清空后：' + _this.todoList)
        }
      })
    },
    deleteAllCompleted () {
      let _this = this
      let len = _this.todoList.length
      axios.get('http://' + ADDR_PORT + '/api/deleteAllCompleted').then(function (res) {
        if (res.status === 200) {
          for (let i = 0; i < len; i++) {
            if (_this.todoList[i] && _this.todoList[i].isCompleted) {
              _this.todoList.splice(i--, 1)
            }
          }
        }
      })
    }
  },
  // 自定义focus指令
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
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

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

/*  content */
#main .g-content{
  position: relative;
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 3px 3px 2px rgba(0, 0, 0, 0.25);
}
#main .g-content .g-tasklist{
  position: relative;
  z-index: 6;
}
.g-content .g-tasklist .m-tasks{
  display: flex;
  flex-direction: row;
  font-size:24px;
  padding:8px;
  background: #fff;
  align-items: center;
}

.u-check{
  width:24px;
  height:24px;
  margin-left:10px;
}

.u-message{
  flex:1;
  text-align: left;
  margin-left: 16px;
  font-size: 20px;
  padding: 6px 0;
  word-break: break-all;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.u-update{
  position: relative;
  z-index:1;
}

.u-close{
  position: absolute;
  right: 16px;
  cursor: pointer;
  width: 24px;
  height: 24px;
}
.u-close-icon{
  background:url('../assets/delete.png') no-repeat;
}
</style>
