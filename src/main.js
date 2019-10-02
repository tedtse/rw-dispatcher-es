import Vue from 'vue'
import App from './App'
import router from './router'

import MainHeader from './components/header.vue'
import SideNav from './components/side-nav.vue'
import DemoBlock from './components/demo-block.vue'

import ElementDispatcherQuickstart from './components/element-dispatcher-quickstart'
import ElementAttributes from './components/element-attributes'
import ElementScopeSlot from './components/element-scope-slot'

import iViewDispatcherQuickstart from './components/iview-dispatcher-quickstart'
import iViewAttributes from './components/iview-attributes'
import iViewScopeSlot from './components/iview-scope-slot'

import 'normalize.css/normalize.css'
import 'highlight.js/styles/color-brewer.css'
import './assets/style/common.scss'
import './assets/style/component.scss'
import './assets/style/demo/element-ui/index.scss'
import './assets/style/demo/iview/index.less'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element-ui'
import ElementUIRWDispatcher from 'element-ui-rw-dispatcher'
import 'element-ui-rw-dispatcher/styles/index.scss'

// import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './plugins/iview'
import iViewRWDispatcher from 'iview-rw-dispatcher'
import 'iview-rw-dispatcher/styles/index.less'

import hljs from 'highlight.js/lib/highlight'

// Vue.use(ElementUI)
Vue.use(ElementUIRWDispatcher)
// Vue.use(iView)
Vue.use(iViewRWDispatcher)

Vue.component('DemoBlock', DemoBlock)
Vue.component('MainHeader', MainHeader)
Vue.component('SideNav', SideNav)
Vue.component('ElementDispatcherQuickstart', ElementDispatcherQuickstart)
Vue.component('ElementAttributes', ElementAttributes)
Vue.component('ElementScopeSlot', ElementScopeSlot)
Vue.component('iviewDispatcherQuickstart', iViewDispatcherQuickstart)
Vue.component('iviewAttributes', iViewAttributes)
Vue.component('iviewScopeSlot', iViewScopeSlot)

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'))
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
