<template>
  <div id="main">
    <!-- header 头部 -->
    <div class="g-header">
      <h1>Todos</h1>
      <div class="f-add">
        <span class="switch" v-show="todoList.length>0" @click="selectAllTodos"></span>
        <input type="text"
              class="f-add-task"
              placeholder="What needs to be down?"
              autofocus
              @keyup.enter="addTodo($event.target)"
        >
        <!-- <button type="button" class="f-add-button">添加</button> -->
      </div>
    </div>
    <!-- /header 头部 -->
    <!-- content 内容区-->
    <section class="g-content">
      <!-- 列表区 -->
      <ul class="g-tasklist">
        <li class="m-tasks" v-for="(todo,index) in todoList" :key=index v-show="isShowFilted(todo)">
          <input type="checkbox" class="u-check"  @click="toChecked(todo,index)" v-model="todo.isChecked">
          <div class="u-message" v-show="!todo.status" @dblclick="toEdit(todo)" :class="{f_delete:todo.isChecked}">
            {{todo.message}}
          </div>
          <input type="text" class="u-message u-update"
              v-model="todo.message"
              v-show="todo.status"
              v-todo-focus="todo.message"
              @blur="unEdit(todo)"
          >
          <span class="u-close-icon u-close"
                @click="deleteTodo(todo)"
                title="删除"
          ></span>
        </li>
      </ul>
      <!-- 底部按钮 -->
      <div class="g-footer-btn" v-show="todoList.length>0">
        <span class="g-data-num">{{countCompletedNum}} item left</span>
        <ul class="g-filter">
          <li>
            <a href="#" @click="visibility='isAll'">All</a>
          </li>
          <li>
            <a href="#" @click="visibility='isActiving'">Activing</a>
           </li>
          <li>
            <a href="#" @click="visibility='isChecked'">Completed</a>
          </li>
        </ul>
        <div v-show="countCompletedNum>0">
          <a href="#" class="clear-completed" @click="deleteAllCompleted">清空已完成</a>
        </div>
      </div>
    </section>
    <!-- /content 内容区-->
  </div>
</template>

<script>

import {getAllTask, addTask, deleteTask, updateTask, updateManyTask, deleteCompletedTask} from '../../api/api.js'

let filters = {
  isAll: function (todos) {
    return todos
  },
  isActiving: function (todos) {
    return todos.filter(function (todo) {
      return !todo.isChecked
    })
  },
  isChecked: function (todos) {
    return todos.filter(function (todo) {
      return todo.isChecked
    })
  }
}

export default {
  name: 'Todo',
  data: function () {
    return {
      todoList: [],
      isChecked: false,
      visibility: 'isAll'
    }
  },
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
    // 设置todo的状态
    toChecked (todo, index) {
      // console.log('已完成？' + index)
      updateTask({id: todo._id, message: todo.message, isChecked: !todo.isChecked}).then(data => {
        if (data.code === 0) {
          console.log(data.msg)
        }
      })
    },
    // 获取任务列表
    getAll: function () {
      let _this = this
      getAllTask().then(res => {
        if (res.status === 200) {
          _this.todoList = res.data.todos
        } else {
          alert('信息获取失败，请查看服务器是否开启')
        }
      })
    },
    // 全选功能
    selectAllTodos: function () {
      let _this = this
      let isChecked = !_this.todoList.every((todo) => todo.isChecked)
      updateManyTask({isChecked: isChecked}).then(data => {
        if (data.code === 0) {
          _this.getAll()
        }
      })
    },
    // 添加任务
    addTodo: function (target) {
      let _this = this
      let newTodo = {
        status: false,
        message: target.value,
        isChecked: false
      }
      target.value = ''
      addTask(newTodo).then(data => {
        if (data.code === 0) {
          _this.todoList.push(data.todos)
          console.log('添加成功')
        } else if (data.code === 4) {
          console.log('任务已存在')
          alert('任务已存在')
        } else {
          console.log('任务添加失败')
        }
      })
    },
    deleteTodo (item) {
      let _this = this
      let deleteid = item.id || item._id
      deleteTask({id: deleteid}).then(data => {
        if (data.code === 0) {
          if (data.todos.id) {
            _this.todoList.splice(_this.todoList.findIndex(temp => temp.id === data.todos.id), 1)
          } else {
            _this.todoList.splice(_this.todoList.findIndex(temp => temp._id === data.todos._id), 1)
          }
        }
      })
    },
    /**
     *批量删除已完成任务
     * @param item
     */
    deleteAllCompleted () {
      let _this = this
      let idString = _this.todoList.map(todo => {
        let id = todo.id || todo._id
        return id
      }).join(',')
      deleteCompletedTask({ids: idString}).then(data => {
        _this.getAll()
      })
    },
    toEdit (item) {
      item.status = true
    },
    /**
     *修改任务
     * @param item
     */
    unEdit (item) {
      item.status = false
      this.toChecked(item, false)
    }
  },
  // 自定义focus指令
  directives: {
    'todo-focus': function (el, binding) {
      // console.log('数据' + binding.value)
      if (binding.value) {
        el.focus()
      }
    }
  },
  created () {
    this.getAll()
  }
}
</script>

<style>
#main{
  padding:10px 0;
  margin:0 auto;
  width:600px;
  height:100%;
  text-align: center;
  /* border: 1px black solid; */
}

#main .g-header{
  width: 100%;
  color: rgba(175,47,47,.15);
  text-rendering: optimizeLegibility; /*浏览器强调了渲染速度和几何精度的可读性。这样可以进行字距调整和可选的连字。*/
  /* border: 2px green solid; */
}

#main .g-header h1{
  font-size: 100px;
  font-weight: 100;
}

#main .g-header .f-add{
  position: relative;
  margin: 10px 0 0;
  /* border: 1px red solid; */
}

#main .g-header .f-add .switch{
  width: 26px;
  height: 26px;
  background:url('../assets/icon-down-eee.png') center center no-repeat;
  position: absolute;
  top: 18px;
  left: 22px;
  cursor: pointer;
}

#main .g-header .f-add .f-add-task{
  padding: 16px 16px 16px 60px;
  border: none;
  box-sizing: border-box;
  box-shadow: inset 0 -2px 1px rgba(222, 222, 222, 0.03);
  width: 100%;
  font-size: 24px;
  color: #000;
  font-weight: inherit;
}

#main .g-header .f-add .f-add-button{
  position: absolute;
  width: 80px;
  height: 60px;
  line-height: 20px;
  top: 0px;
  right: 0px;
  cursor: pointer;
}

/* content */
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

#main .g-content .g-tasklist .m-tasks{
  display: flex;
  flex-direction: row;
  font-size:24px;
  padding:8px;
  background: #fff;
  align-items: center;
  /* border: 1px red solid; */
}

#main .g-content .g-tasklist .m-tasks:hover{
  background-color: #ccc;
}

#main .g-content .g-tasklist .m-tasks .u-check{
  width: 24px;
  height: 24px;
  margin-left: 12px;
  /* border: 1px red solid; */
}

.u-close-icon{
  background:url('../assets/delete.png') no-repeat;
  background-size: 100%;
}

#main .g-content .g-tasklist .m-tasks:hover .u-close{
  position: absolute;
  right: 1rem;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  display: block;
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

.g-footer-btn{
  display: flex;
  justify-content: space-between;
  padding: .1rem;
  font-size: 16px;
  font-weight: 300;
  color: rgb(145, 145, 145);
}

.g-footer-btn .g-data-num{
  margin-left: 10px;
  /* background-color: red; */
}

.g-footer-btn .g-filter li{
  /* border: 1px red solid; */
  float: left;
  margin: auto 10px;
  line-height: 100%;
}

.g-footer-btn .g-filter li a:hover {
  background-color: aqua;
  border-color: rgba(34, 26, 26, 0.1);
}

.g-footer-btn .g-filter li a.selected {
  border-color: rgba(240, 10, 10, 0);
}

.f_delete{
  text-decoration: line-through;
  color: #bbb;
}
.clear-completed{
  cursor: pointer;
}
</style>
