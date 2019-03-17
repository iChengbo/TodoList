<template>
  <div id="switch">
        <div class="switch" v-show="todoList.length>0" @click="selectAllTodos">
          <input id="on-off" type="checkbox" v-model="switchStatus"/>
          <label class="lable-switch" for="on-off">
            <span></span>
          </label>
        </div>
  </div>
</template>

<script>
// 未完成，等待后续
export default {
  name: 'Switch'
}
</script>

<style>
/* 隐藏原始Input样式 */
input#on-off{
  /* display: none; */
}
.lable-switch{
  display: inline-block;
  width:  40px;
  height:18px;
  border:1px solid black;
  border-radius: 18px;
  position:relative;
  transition:0.1s;
}
.lable-switch span{
  position: absolute;
  left:0;
  top:0;
  width: 18px;
  height: 18px;
  /* 设置50%则为圆形。也可以设置成30px，             也为圆形*/
  border-radius: 50%;
  /* 盒子阴影*/
  box-shadow:2px 0 3px #ccc;
  background: white;
  /* 执行过渡所需的时间*/
  transition:0.1s;
}
input:checked+label{
  background: green;
}
input:checked+label span{
  left:22px;
  box-shadow:none;
}
</style>
