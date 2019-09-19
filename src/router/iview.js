import changeCase from 'change-case'
import navConf from '../config/iview.json'

const addRoute = (path, title) => {
  let _path = path.slice(1)
  return {
    path: _path,
    name: `Iview${changeCase.pascal(_path)}`,
    meta: {
      title
    },
    component: () => import(`../docs/iview/${_path}.md`)
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
  path: '/iview',
  name: 'Iview',
  redirect: '/iview/quickstart',
  component: () => import('../views/component.vue'),
  children: routes
}
