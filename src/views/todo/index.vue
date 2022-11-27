<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-card shadow="hover">
    <div>我是代办中心的内容</div>

    <!-- 按钮 -->
    <div class="btn-wrapper">
      <el-button type="primary" @clisck="test">测试引入本地的包</el-button>
      <el-button type="primary" @click="localAdd">测试add函数</el-button>
      <el-button type="primary" @click="filter">测试filter函数</el-button>
      <el-button type="primary" @click="insert">新增</el-button>
    </div>

    <el-table border>
      <el-table-column type="index" label="标题" width="60"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="user" label="代办人"></el-table-column>
      <el-table-column prop="" label="代办事项"></el-table-column>
    </el-table>

    <!-- 测试接口 -->
    <el-form :model="formData" style="margin-top: 20px">
      <el-form-item prop="user_name" label="姓名">
        <el-input v-model="formData.user_name"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="insertData">新增数据</el-button>
      </el-form-item>

      <!-- 测试获取接口 -->
      <el-button type="primary" @click="fetchData">fetchData</el-button>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, toRaw } from 'vue'

/**
 *测试引入本地的包，但是这个包是用js写的 没有声明文件，
  在根目录下新建一个 learn-webpack.d.ts文件，
  然后声明一个模块，导出两个函数的声明
 */
// 这个包是通过本地npm link learn-webpack导入的
//  add函数是默认导出的函数
// import add, { wordToNum, numToWord, filterListByNameField } from 'learn-webpack'
import { getCookie } from '@/utils/index'
export default defineComponent({
  setup() {
    const formData = reactive({
      password: '',
      user_name: '',
    })
    const insertData = async () => {
      console.log(toRaw(formData))
      // 调用接口
      try {
        const result = await fetch('/api/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 将 csrfToken 以x-csrf-token请求头的方式 发送给服务端，不然有 403
            'x-csrf-token': getCookie('csrfToken') as string,
          },
          body: JSON.stringify(toRaw(formData)),
        })
        console.log(result)
      } catch (error) {
        //
      }
    }
    const fetchData = async () => {
      try {
        const result = await fetch('/api/user')
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
    const insert = () => {
      console.log(13)
    }
    // 通过测试可以正常工作
    const test = () => {
      // const word = numToWord(3)
      // console.log(word)
    }

    // 可以正常的工作
    const localAdd = () => {
      // console.log(add(1, 67))
    }

    // 通过测试可以正常的工作
    const filter = () => {
      // const list = filterListByNameField('jack', [
      //   { name: 'jack' },
      //   { name: 'rose' },
      // ])
      // console.log(list)
    }
    return { insert, test, localAdd, filter, formData, insertData, fetchData }
  },
})
</script>
<style lang="less" scoped>
.btn-wrapper {
  margin: 12px 0;
}
</style>
