<template>
  <div id="hello">
    <h1>RW DISPATCHER</h1>
    <p>表单是用来实现编辑的，如果要把表单详情显示出来，我们还需重新写一遍吗？</p>
    <div class="banner">
      <img src="../assets/images/animation.gif" />
    </div>
    <h3>支持多个组件库</h3>
    <p>同时支持 ElementUI、iView 的 form 组件的扩展</p>
    <h3>使用简单</h3>
    <p>使用基本与ElementUI、iView 的 form 组件保持一致</p>
    <h3>完全定制化</h3>
    <p>提供多种配置，根据项目的实际需要自由定制渲染函数</p>
  </div>
</template>

<script>
export default {
  name: 'Hello'
}
</script>

<style lang="scss" scoped>
#hello {
  padding: 40px;
  text-align: center;
  &::after {
    content: "";
    clear: both;
  }
  h1 {
    line-height: 60px;
  }
  h3 {
    line-height: 40px;
  }
  p {
    color: #666;
    font-size: 16px;
    line-height: 30px;
  }
  .banner {
    margin: 40px 0;
    > img {
      width: 640px;
      height: auto;
      border-radius: 5px;
      box-shadow: 0 0 8px 5px #00000010;
    }
  }
}
@media (max-width: 768px) {
  .banner {
    > img {
      display: none;
    }
  }
}
</style>
