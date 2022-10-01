import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

type Person = {
  name: string
  age: number
}
const person: Person = {
  name: 'jack',
  age: 19,
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
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
      ],
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
