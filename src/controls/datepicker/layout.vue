<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-date-picker
      v-model="value2"
      type="date"
      placeholder="Pick a day"
      :shortcuts="shortcuts"
      :disabledDate="disabledDate"
    ></el-date-picker>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 为什么要单独引入 不是全局引入了吗
import { ElDatePicker } from 'element-plus'
const value2 = ref('')
const size = 'default'
const shortcuts = ref([
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
])

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}
</script>
