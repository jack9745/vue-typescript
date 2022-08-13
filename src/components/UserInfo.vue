<template>
  <div style="border: 1px solid green">
    <header>我是userInfo组件的内容</header>
    <el-button @click="emitFormData" type="danger">emitFormData</el-button>

    <!--  -->
    <el-button @click="emitDataByVue" type="danger">emitDataByVue</el-button>
    <ul>
      <li v-for="(item, index) in props.friendList" :key="index">
        {{ item }}
      </li>
    </ul>

    <div>{{ props.userAge }}</div>
    <div>{{ props.userName }}</div>

    <!--  -->
    <div style="margin: 0 30px">使用解构之后的变量</div>

    <ul>
      <li v-for="(item, index) in friendList" :key="index">
        {{ item }}
      </li>
    </ul>

    <div>{{ userAge }}</div>
    <div>{{ userName }}</div>
  </div>
  <el-form :model="addressInfo">
    <el-form-item label="所在市区">
      <el-input v-model="addressInfo.city"></el-input>
    </el-form-item>
    <el-form-item label="所在省份">
      <el-input v-model="addressInfo.province"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
const ab = 'sdff' // 这里报错了
const a = 'sdf'
import { toRefs, inject } from 'vue'
import type { Transition, TransitionProps } from 'vue'
import emitter from '@/utils/event'
const foo = inject<string>('foo')
console.log('sss', foo)
type Props = {
  userName?: string
  userAge?: number
  friendList?: string[]
  height: number
  addressInfo: {
    [key: string]: any
  }
}

const props = defineProps<Props>()
const {
  userAge,
  userName,
  friendList = [],
  addressInfo,
  height,
} = toRefs(props)
console.log('用户的年龄是', userAge)

// userAge 可能是undefined 所以 会报编译检查错误，对象可能未定义
if (userAge) {
  userAge.value = 80
}

// 或者非空断言
// userAge!.value = 90

addressInfo.value.city = 'sfsdfsf'
console.log('friendList', friendList)
console.log(props)
const emitFormData = () => {
  emitter.emit('emitFormData', props.addressInfo)
}
const emit = defineEmits<{
  (event: 'changeData', value: any): void
}>()
const emitDataByVue = () => {
  emit('changeData', props.addressInfo)
}

console.log('用户的身高是height', props.height)
console.log('用户的身高是', height)
</script>

<style></style>
