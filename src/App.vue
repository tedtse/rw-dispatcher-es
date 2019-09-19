<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <div class="header">
      <main-header
        :class="[
          'main-header'
        ]"
      />
    </div>
    <div :class="['main-cnt']">
      <router-view />
    </div>
    <main-footer v-if="!isComponent" />
  </div>
</template>

<script>
import MainHeader from './components/header'
import MainFooter from './components/footer'
export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  },
  computed: {
    isComponent () {
      return /^ElementUI|^Iview/.test(this.$route.name || '')
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  .menu-icon {
    font-size: 20px;
    color: #409EFF;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 109;
    cursor: pointer;
  }
  .header {
    .main-header{
      box-shadow: 2px 0px 8px rgb(238, 238, 238);
      &.classsic-pages {
        overflow: hidden;
        height: 0px;
        transition: all .5s cubic-bezier(.65,.05,.36,1);
        &.show-menu {
          height: 80px;
        }
      }
    }
  }
  .main-cnt.classsic-pages {
    flex: 1;
    padding: 81px 0px 0px 0px;
  }
}
</style>
