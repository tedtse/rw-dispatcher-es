<template>
  <el-scrollbar class="page-component__scroll" ref="componentScrollBar">
  <div class="page-container page-component">
    <el-scrollbar class="page-component__nav">
      <side-nav :data="navsData" :base="navBase"></side-nav>
    </el-scrollbar>
    <div class="page-component__content">
      <router-view class="content"></router-view>
    </div>
    <transition name="back-top-fade">
      <div
        class="page-component-up"
        :class="{ 'hover': hover }"
        v-show="showBackToTop"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        @click="toTop">
        <i class="el-icon-caret-top"></i>
      </div>
    </transition>
  </div>
  </el-scrollbar>
</template>
<script>
import bus from '../utils/bus.js'
import elementUiMenu from '../config/element-ui.json'
import iviewMenu from '../config/iview.json'
import throttle from 'throttle-debounce/throttle'

export default {
  data () {
    return {
      navsData: [],
      navBase: '',
      hover: false,
      showBackToTop: false,
      scrollTop: 0,
      showHeader: true,
      componentScrollBar: null,
      componentScrollBoxElement: null
    }
  },
  watch: {
    '$route.path' (val) {
      // 触发伪滚动条更新
      this.componentScrollBox.scrollTop = 0
      this.$nextTick(() => {
        this.componentScrollBar.update()
      })
      this.getNavsData()
    }
  },
  methods: {
    getNavsData  () {
      const path = this.$route.path
      if (/^\/element-ui/.test(path)) {
        this.navsData = elementUiMenu
        this.navBase = '/element-ui'
      } else if (/^\/iview/.test(path)) {
        this.navsData = iviewMenu
        this.navBase = '/iview'
      }
    },
    renderAnchorHref () {
      if (/changelog/g.test(location.href)) return
      const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')
      const basePath = location.href.split('#').splice(0, 2).join('#')
      anchors.forEach(a => {
        const href = a.getAttribute('href')
        a.href = basePath + href
      })
    },
    goAnchor () {
      if (location.href.match(/#/g).length > 1) {
        const anchor = location.href.match(/#[^#]+$/g)
        if (!anchor) return
        const elm = document.querySelector(anchor[0])
        if (!elm) return

        setTimeout(_ => {
          this.componentScrollBox.scrollTop = elm.offsetTop
        }, 50)
      }
    },
    toTop () {
      this.hover = false
      this.showBackToTop = false
      this.componentScrollBox.scrollTop = 0
    },
    handleScroll () {
      const scrollTop = this.componentScrollBox.scrollTop
      this.showBackToTop = scrollTop >= 0.5 * document.body.clientHeight
      if (this.showHeader !== (this.scrollTop > scrollTop)) {
        this.showHeader = this.scrollTop > scrollTop
      }
      if (scrollTop === 0) {
        this.showHeader = true
      }
      if (!this.navFaded) {
        bus.$emit('fadeNav')
      }
      this.scrollTop = scrollTop
    }
  },
  created () {
    bus.$on('navFade', val => {
      this.navFaded = val
    })
    window.addEventListener('hashchange', () => {
      if (location.href.match(/#/g).length < 2) {
        document.documentElement.scrollTop = document.body.scrollTop = 0
        this.renderAnchorHref()
      } else {
        this.goAnchor()
      }
    })
    this.getNavsData()
  },
  mounted () {
    this.componentScrollBar = this.$refs.componentScrollBar
    this.componentScrollBox = this.componentScrollBar.$el.querySelector('.el-scrollbar__wrap')
    this.throttledScrollHandler = throttle(300, this.handleScroll)
    this.componentScrollBox.addEventListener('scroll', this.throttledScrollHandler)
    this.renderAnchorHref()
    this.goAnchor()
    document.body.classList.add('is-component')
  },
  destroyed () {
    document.body.classList.remove('is-component')
  },
  beforeDestroy () {
    this.componentScrollBox.removeEventListener('scroll', this.throttledScrollHandler)
  }
}
</script>
