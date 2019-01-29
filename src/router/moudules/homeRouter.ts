const homeRouter = {
  path: '/home',
  component: () => import('@/views/Home.vue'),
  name: 'home',
  children: [
    {
      path: '/selftabpage',
      name: 'selfTabPage',
      component: () => import('@/views/SelfTabPage.vue')
    },
    {
      path: '/navmenu',
      name: 'navmenu',
      component: () => import('@/views/NavMenu.vue')
    },
    {
      path: '/printdata',
      name: 'printdata',
      component: () => import('@/views/PrintData.vue'),
      meta: {
        requireAuth: true
      }
    }
  ]
}

export default homeRouter
