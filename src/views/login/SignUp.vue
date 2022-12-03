<!-- 登录页面 -->

<template>
  <div class="dialog-wrapper">
    <div class="dialog">
      <header class="header">
        <span>账号注册</span>
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
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              type="password"
              v-model="formData.confirmPassword"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- footer -->
      <div class="login-footer">
        <div class="btn-wrapper">
          <el-button type="primary" @click="register" style="width: 200px"
            >注册</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { getCookie } from '@/utils'
const showDialog = ref(true)
const formData = reactive({
  account: '',
  password: '',
  confirmPassword: '',
})
const router = useRouter()
const route = useRoute()

/**
 *  @remarks form Ref
 */
const formRef = ref<FormInstance>()

/**
 *  @remarks form rules
 *
 * */
const rules = reactive<FormRules>({
  password: [{ required: true, message: '请输入密码' }],
  confirmPassword: [{ required: true, message: '请输入密码' }],
  account: [{ required: true, message: '请输入账号' }],
})

/**
 * @remarks  validate forms
 * */
const validate = async () => {
  const result = await formRef.value?.validate().catch(() => false)
  if (!result) {
    return false
  }
  // 校验密码
  if (formData.confirmPassword !== formData.password) {
    //
    ElMessage({
      type: 'error',
      message: '密码填写不一致，请重新填写',
    })
    return false
  }
  return true
}

/**
 * @remarks login event
 * */
const register = async () => {
  const result = await validate()
  if (!result) {
    return false
  }
  try {
    const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-csrf-token': getCookie('csrfToken') as string,
      },
      body: JSON.stringify(toRaw(formData)),
    })
    const result = await response.json()
    if (result.code === 0) {
      ElMessage({
        type: 'success',
        message: '注册成功！',
      })
      setTimeout(() => {
        router.push({
          path: '/login',
        })
      }, 1000)
    } else {
      ElMessage({
        type: 'error',
        message: '当前账号已经被注册',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="less" scoped>
.dialog-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('../../assets/pic/4.jpeg');
  background-repeat: no-repeat;
  background-size: cover;
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
