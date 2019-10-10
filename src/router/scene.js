export default {
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
    },
    {
      name: 'SceneTable',
      path: 'table',
      component: () => import('../views/scene/table.vue')
    },
    {
      name: 'SceneCards',
      path: 'card',
      component: () => import('../views/scene/cards.vue')
    }
  ]
}
