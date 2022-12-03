import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import { getCookie } from '@/utils/index'

import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      // 重定向到
      redirect: '/todo',
      // 刚开始疑惑这里的路由为什么没有渲染出来，因为 views/home/index.vue 没有视图出口
      // 现在有了
      children: [
        {
          path: 'todo',
          name: 'todo',
          component: () => import('@/views/todo/index.vue'),
        },

        {
          path: 'member',
          name: 'member',
          component: () => import('@/views/member/index.vue'),
        },
        {
          path: '/qualification',
          name: 'qualification',
          component: () => import('@/views/qualification/index.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/SignIn.vue'),
      beforeEnter: (to, from) => {
        console.log(to, from)

        if (sessionStorage.getItem('loginFlag') === 'true') {
          return from
        }
      },
    },

    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/login/SignUp.vue'),
    },
    // 这里可以渲染出来 这里是渲染在根路由中
    // {
    //   path: '/todo',
    //   name: 'todo',
    //   component: () => import('@/views/todo/test.vue'),
    // },
    {
      path: '/form',
      name: 'createForm',
      component: () => import('@/views/form-engine/index.vue'),
    },
  ],
})

export default router
