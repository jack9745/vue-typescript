<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
type Person = {
  name: string
  age: number
  friends: string[]
}
export default defineComponent({
  setup(props, context) {
    const title = ref('title')
    const userInfo = reactive({
      name: 'huangtao',
      age: 15,
    })
    const count = ref(1)
    const friends = ref(['jack', 'rose'])

    return {
      title,
      userInfo,
      count,
    }
  },
})
</script>

<template>
  <div>{{ title }}</div>
  <div>{{ userInfo.age }}</div>
  <div>{{ userInfo.name }}</div>
  <div>{{ count.toFixed(2) }}</div>
</template>
