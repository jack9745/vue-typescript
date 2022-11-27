<!-- 登录页面 -->

<template>
  <div class="dialog-wrapper">
    <div class="dialog">
      <header class="header">
        <span>账号登录</span>
        <el-button type="text" class="register" @click="register"
          >免费注册</el-button
        >
      </header>
      <div class="login-form">
        <el-form
          :model="formData"
          label-width="80px"
          ref="formRef"
          :rules="rules"
        >
          <el-form-item label="账号" prop="account">
            <el-input
              placeholder="请输入账号"
              v-model="formData.account"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="formData.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- footer -->
      <div class="login-footer">
        <div class="btn-wrapper">
          <el-button type="primary" @click="login" style="width: 200px"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { getCookie } from '@/utils'
const showDialog = ref(true)
const formData = reactive({
  account: '',
  password: '',
})
const router = useRouter()
const route = useRoute()

// @remarks form Ref
const formRef = ref<FormInstance>()

// @remarks form rules
const rules = reactive<FormRules>({
  password: [{ required: true, message: '请输入密码' }],
  account: [{ required: true, message: '请输入账号' }],
})

// @remarks  validate forms
const validate = async () => {
  const result = await formRef.value?.validate().catch(() => false)
  return result
}

// remarks register event
const register = () => {
  router.push({
    path: '/register',
  })
}

/**
 * @remarks
 * 这里要存储token 设置token,当页面一直在操作是，这一次的token就不会过期
   token可以存储在本地管理
   这里要考虑一个问题，当页面刷新的时候，
 *
 */

/**
 * @remarks login event
 */
const login = async () => {
  const result = await validate()
  if (!result) {
    return false
  }

  try {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': getCookie('csrfToken') as string, // 自定义头部
      },
      body: JSON.stringify(toRaw(formData)),
    })
    const result = await response.json()
    if (result.code === 0) {
      ElMessage({
        type: 'success',
        message: '登录成功',
      })
      setTimeout(() => {
        router.push({
          path: '/todo',
        })
      }, 1000)
    } else {
      ElMessage({
        type: 'error',
        message: result.message,
      })
    }
  } catch (error) {}
}
</script>

<style lang="less" scoped>
.dialog-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .dialog {
    width: 500px;
    height: 300px;
    padding: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    position: relative;
    .header {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
      position: relative;
      .register {
        position: absolute;
        right: 0;
        z-index: 100;
      }
    }

    .login-footer {
      position: absolute;
      bottom: 10px;
      z-index: 10;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
