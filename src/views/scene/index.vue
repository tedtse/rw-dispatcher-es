<template>
  <div>
    <div id="nav">
      <router-link to="/scene/edit">编辑</router-link> |
      <router-link to="/scene/detail">详情</router-link> |
      <router-link to="/scene/table">表格</router-link> |
      <router-link to="/scene/card">卡片</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
  #nav {
    padding: 30px 0 10px;
    text-align: center;
    font-size: 18px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
