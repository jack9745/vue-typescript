import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

type Person = {
  name: string
  age: number
}
const person: Person = {
  name: 'jack',
  age: 19,
}
console.log(person)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ],
})

export default router
