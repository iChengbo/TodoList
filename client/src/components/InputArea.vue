<template>
  <div id="inputArea">
    <div class="f-add">
      <span class="u-icon-down" v-show="todoNum>0"  @click="selectAllTodos"></span>
      <input class="f-add-task" type="text" placeholder="What needs to be done?" @keyup.enter="addTodo($event.target)"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InputArea',
  data () {
    return {
      newTodo: Object
    }
  },
  props: [
    'todoNum'
  ],
  methods: {
    addTodo: function (target) {
      this.newTodo.message = target.value
      this.newTodo.isCompleted = false
      this.$emit('addTodo', this.newTodo)
    },
    selectAllTodos: function () {
      this.$emit('selectAllTodos')
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

.f-add{
  margin: 10px 0 0 0;
  position:relative;
  border: 2px solid #000;
}

.f-add .u-icon-down{
  width:26px;
  height:26px;
  background: url('../assets/icon-down-eee.png') center center no-repeat;
  position: absolute;
  top:18px;
  left:22px;
  cursor: pointer;
}
.f-add .f-add-task{
  padding: 16px 16px 16px 60px;
  border: none;
  box-sizing: border-box;
  background: #fff;
  box-shadow: inset 0 -2px 1px rgba(222,222,222,0.03);
  width: 100%;
  font-size: 24px;
  color: #000;
  font-weight: inherit;
}
</style>
