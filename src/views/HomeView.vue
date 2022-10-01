<template>
  <main>
    huangtao
    <el-button type="primary" @click="changeFriendButton"
      >changeFriendButton</el-button
    >

    <el-button type="primary" @click="resetFriend">resetFriend</el-button>
    <el-button type="primary" @click="changeName">changeName</el-button>
    <HeaderTitle />
    <UserInfo
      :userName="userName"
      :userAge="userAge"
      :friendList="friendList"
      :addressInfo="addressInfo"
      @change-data="changeData"
      :height="height"
    />
    <div>{{ height }}</div>
  </main>

  <div>
    <el-button type="primary" @click="changeTableButton"
      >changeTableButton</el-button
    >

    <el-button type="primary" @click="resetTableButton"
      >resetTableButton</el-button
    >
    <el-table :data="formData.tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import HeaderTitle from '@/components/HeaderTitle.vue'
import UserInfo from '@/components/UserInfo.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ref, reactive, watch, watchEffect, provide } from 'vue'
import type { InjectionKey } from 'vue'
import emitter from '@/utils/event'
const key = Symbol() as InjectionKey<string>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const foo = ref('something is foo')
provide(key, 'foo')

const friendList = ref(['jack', 'rose'])
const userName = ref('huangtao')
const userAge = ref(18)
// 原生数据也可以渲染
let height = 180
height = 90
emitter.on('emitFormData', (data) => {
  console.log(data)
})
const addressInfo = reactive({
  city: '',
  province: '',
})
const formData = reactive({
  tableData: [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ],
})
watch(
  friendList,
  () => {
    console.log('friendList发生变化了')
  },
  { deep: true }
)
const changeFriendButton = () => {
  friendList.value.push('abc' + Math.random())
}

const resetFriend = () => {
  friendList.value = []
}

const changeTableButton = () => {
  formData.tableData.push({
    date: '2016-05-01',
    name: 'Tom' + Math.random(),
    address: 'No. 189, Grove St, Los Angeles',
  })
}

const resetTableButton = () => {
  formData.tableData = []
}
const changeName = () => {
  userName.value = 'rose' + Math.random()
}
const changeData = (data: any) => {
  console.log(data)
}
// 数据重置了之后就不触发回调了
watch(
  // 监听响应式属性要这么监听 不知道为何要这么监听
  () => formData.tableData,
  () => {
    console.log('表格数据发生变化了')
  },
  {
    deep: true,
  }
)
</script>
