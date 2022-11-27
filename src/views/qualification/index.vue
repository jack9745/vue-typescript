<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-card shadow="hover" style="min-height: 50vh">
      <header class="header">资格证书</header>
      <ul class="cert-list">
        <li v-for="(item, index) in certList" :key="index"></li>
      </ul>
      <el-button type="primary" @click="edit">编辑</el-button>
      <el-button type="primary" @click="insert">新增</el-button>

      <!-- 对话框 -->
      <CertDialog
        v-model:visible="visible"
        v-model:certList="certList"
      ></CertDialog>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CertDialog from './CertDialog'
const certList = ref([])
const visible = ref(false)
const insert = () => {
  visible.value = true
}
const edit = () => {
  visible.value = true
}
</script>
