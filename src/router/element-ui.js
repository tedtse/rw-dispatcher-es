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

export default {
  path: '/element-ui',
  name: 'ElementUI',
  redirect: '/element-ui/quickstart',
  component: () => import('../views/component.vue'),
  children: routes
}
