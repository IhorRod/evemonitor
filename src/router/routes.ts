import { RouteRecordRaw } from 'vue-router'
import { useAuth } from 'src/composables/useAuth'

const { isAuthenticated } = useAuth()

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/drills',
    children: [
      {
        name: 'drills',
        path: 'drills',
        component: () => import('pages/DrillsPage.vue'),
        beforeEnter: (to, from, next) => {
          if (isAuthenticated.value) {
            next()
          } else {
            next('/login')
          }
        }
      },
      { path: 'structures', component: () => import('pages/StructuresPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
