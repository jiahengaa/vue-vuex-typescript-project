const homeRouter = {
  path: '/home',
  component: () => import('@/views/Home.vue'),
  name: 'home'
}

export default homeRouter
