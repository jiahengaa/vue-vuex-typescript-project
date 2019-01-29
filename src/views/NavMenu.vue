<template>
  <div class="nav-menu">
    <ul class="nav">
      <li>
        <a href>首页</a>
      </li>
      <li>
        <a href>查询中心</a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.nav-menu {
  width: 100vw;
  height: 100vh;
  .nav {
    height: 50px;
    width: 100%;
    position: absolute;
    padding: 0;
    margin: 0;
    //bottom: 0;
    list-style: none; /*在一个声明中设置所有的列表属性*/
    background: lightcoral;

    li {
      float: left;
      line-height: 40px;
      text-align: center;
      position: relative;
      width: 12.5%;
      a {
        background: lightseagreen;
        text-decoration: none;
        color: #ffffff;
        padding: 5px 10px;
        display: block;

        &:hover {
          color: lightgreen;
          background: darkcyan;
        }
      }
    }
  }
}
</style>

