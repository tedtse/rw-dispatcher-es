import Vue from 'vue'
import VueRouter from 'vue-router'
import elementUIRoutes from './element-ui'
import iviewRoutes from './iview'

Vue.use(VueRouter)

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Hello',
      path: '/',
      component: () => import('../views/hello.vue')
    },
    {
      name: 'Scene',
      path: '/scene',
      component: () => import('../views/scene/index.vue'),
      children: [
        {
          path: '',
          redirect: 'edit'
        },
        {
          name: 'SceneEdit',
          path: 'edit',
          component: () => import('../views/scene/form.vue'),
          meta: { state: 'write' }
        },
        {
          name: 'SceneDetail',
          path: 'detail',
          component: () => import('../views/scene/form.vue'),
          meta: { state: 'read' }
        }
      ]
    },
    elementUIRoutes,
    iviewRoutes
  ]
})
