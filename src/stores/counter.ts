import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  //   推荐使用 完整类型推断的箭头函数
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++
    },
  },
})
