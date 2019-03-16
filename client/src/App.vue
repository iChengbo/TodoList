<template>
  <div id="app">
    <Todo/>
  </div>
</template>

<script>
import Todo from './components/Todo'

export default {
  name: 'App',
  components: {
    Todo
  }
}
</script>

<style>
#app {
  padding:10px 0;
  margin:0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height:100%;
}
/* 重置 */
html,body,div,p,ul,ol,li,h1,h2,h3,h4,h5,h6{
  margin:0;
  padding:0;
}
html,body{
  width: 100%;
  height: 100%;
}
body {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: #f5f5f5;
}
input {
  outline: none;
}

ul,li,ol {
  list-style: none;
}
a {
  text-decoration: none;
  color: rgb(145, 145, 145);
}
div{
  box-sizing: border-box;
}
/* 默认 */
strong,em{font-style:normal;font-weight:bold;}
</style>
