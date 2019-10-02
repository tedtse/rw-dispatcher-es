import changeCase from 'change-case'
import navConf from '../config/element-ui.json'

const addRoute = (path, title) => {
  let _path = path.slice(1)
  return {
    path: _path,
    name: `ElementUI${changeCase.pascal(_path)}`,
    meta: {
      title
    },
    component: () => import(`../docs/element-ui/${_path}.md`)
  }
}

const routes = []
navConf.forEach(conf => {
  if (conf.children) {
    conf.children.forEach(item => {
      routes.push(addRoute(item.path, item.title))
    })
  } else if (conf.groups) {
    conf.groups.forEach(group => {
      group.list.forEach(item => {
        routes.push(addRoute(item.path, item.title))
      })
    })
  }
})

// router.afterEach(route => {
//   // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
//   Vue.nextTick(() => {
//     const blocks = document.querySelectorAll('pre code:not(.hljs)')
//     Array.prototype.forEach.call(blocks, hljs.highlightBlock)
//   })
// })

export default {
  path: '/element-ui',
  name: 'ElementUI',
  redirect: '/element-ui/quickstart',
  component: () => import('../views/component.vue'),
  children: routes
}
