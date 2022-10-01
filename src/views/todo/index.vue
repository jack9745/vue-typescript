<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>我是代办中心的内容</div>

  <!-- 按钮 -->
  <div class="btn-wrapper">
    <el-button type="primary" @click="insert">新增</el-button>
  </div>

  <el-table border>
    <el-table-column type="index" label="标题" width="60"></el-table-column>
    <el-table-column prop="createTime" label="创建时间"></el-table-column>
    <el-table-column prop="user" label="代办人"></el-table-column>
    <el-table-column prop="" label="代办事项"></el-table-column>
  </el-table>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const insert = () => {
      console.log(13)
    }
    return { insert }
  },
})
</script>
<style lang="less" scoped>
.btn-wrapper {
  margin: 12px 0;
}
</style>
