<template>
  <el-dialog v-model="localVisible" :title="title" append-to-body draggable>
    <el-form
      :size="formSize"
      ref="form"
      :rules="rules"
      :model="formData"
      label-width="100px"
    >
      <el-form-item prop="name" label="姓名">
        <el-input v-model="formData.name" clearable></el-input>
      </el-form-item>

      <el-form-item prop="age" label="年龄">
        <el-input v-model="formData.age" clearable></el-input>
      </el-form-item>

      <el-form-item prop="birth" label="出生日期">
        <el-date-picker
          v-model="formData.birth"
          clearable
          type="date"
          value-format="YYYY-MM-DD"
        ></el-date-picker>
      </el-form-item>

      <el-form-item prop="height" label="身高">
        <el-input v-model="formData.height" clearable></el-input>
      </el-form-item>

      <!--  -->
      <el-form-item prop="phoneNumber" label="手机号码">
        <el-input v-model="formData.phoneNumber" clearable></el-input>
      </el-form-item>
    </el-form>

    <template v-slot:footer v-if="dialogType !== 'detail'">
      <div class="bottom-btn">
        <el-button type="default" @click="cancel">取消</el-button>
        <el-button type="primary" @click="insert">{{
          type === 'update' ? '更新' : '新增'
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  reactive,
  computed,
  toRaw,
  toRef,
  watch,
  watchEffect,
} from 'vue'
import type { ToRef } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { User, DialogType } from '../index'
import { ElMessage } from 'element-plus'
import { addMember } from '@/local-service/member'
// 为什么要用 defineComponent 为了类型推导
export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    memberData: {
      type: Object,
      default() {
        return {}
      },
    },
    // 可以直接在模板中使用，和vue2一样
    type: {
      type: String,
    },
  },

  // 引用官网的文档说明
  // setup函数的第一个参数就是props，和标准组件一致，一个setup函数的props是响应式的，
  // 并且会在传入新的props的时候同步更新

  // 注意事项
  // props是不是响应式的？应该是响应式的，如果解构了就失去了响应式

  /**
   * 如果你确实需要解构 props 对象，或者需要将某个 prop 传到一个外部函数中并保持响应性
   * 那么你可以使用 toRefs() 和 toRef() 这两个工具函数：
   */

  emits: ['update:visible', 'change'],
  setup(props, context) {
    const { emit, expose } = context
    console.log(props)
    const title = ref('')
    const formData = reactive<User>({
      age: '',
      name: '',
      birth: '',
      height: '',
      phoneNumber: '',
    })
    // const dialogType = ref<DialogType>()
    const dialogType = toRef(props, 'type')
    if (dialogType.value === 'detail' || dialogType.value === 'update') {
      // 如果数据多了， 这样不是很优雅
      const data = toRef(props, 'memberData').value
      formData.age = data.age
      formData.phoneNumber = data.phoneNumber
      formData.birth = data.birth
      formData.height = data.height
      formData.name = data.name
    }
    if (dialogType.value === 'add') {
      title.value = '新增'
    } else if (dialogType.value === 'update') {
      title.value = '编辑'
    } else {
      title.value = '详情'
    }
    // const memberData = toRef(props, 'memberData')
    // watch(memberData, (value) => {
    //   console.log('监测memberData的变化', value)
    // })
    watchEffect(() => {
      console.log('监测memberData的变化')
    })
    // 计算属性
    const localVisible = computed({
      get: () => {
        return props.visible
      },
      set: (value) => {
        //
        emit('update:visible', value)
      },
    })
    const cancel = () => {
      //
      localVisible.value = false
    }

    // 表单的引用
    const form = ref<FormInstance>()
    const formSize = ref('large')
    // 新增数据
    const insert = async () => {
      // const result = await validateForm()
      const result = await submitForm(form.value as FormInstance)
      console.log(result)

      if (result) {
        addMember(toRaw(formData), ({ status }) => {
          if (status === 'success') {
            ElMessage({
              type: 'success',
              message: dialogType.value === 'add' ? '新增成功' : '更新成功',
            })
            emit('change')
            localVisible.value = false
          }
        })
      } else {
        ElMessage({
          type: 'error',
          message: '请检查必填项',
        })
      }
    }
    const rules = reactive<FormRules>({
      name: [
        {
          required: true,
          message: '姓名是必填项',
        },
      ],
      age: [
        {
          required: true,
          message: '年龄是必填项',
        },
      ],
      birth: [
        {
          required: true,
          message: '出生日期是必填项',
        },
      ],
      phoneNumber: [
        {
          required: true,
          message: '手机号码是必填项',
        },
      ],
      height: [
        {
          required: true,
          message: '身高是必填项',
        },
      ],
    })

    // 第一种校验方式
    const validateForm = async () => {
      if (!form.value) {
        return false
      }
      const result = await form.value.validate().catch((e) => {
        console.log(e)
        return false
      })
      console.log(result)
      return result
    }

    // 第二种验证方式
    // 注意这里不能漏了undefined 类型
    const submitForm = async (form: FormInstance | undefined) => {
      //
      if (!form) {
        return false
      }
      const result = await form.validate().catch((e) => {
        console.log(e)
        return false
      })
      console.log(result)
      return result
    }

    // form.value 可能不存在 也就是说值是undefied,类型也是undefined
    // 所以在定义 submitForm 时候参数的类型要定义是 FormInstance | undefined
    // 不然就会报错，报undefined 不能赋值给 FormInstance类型的值
    submitForm(form.value)
    return {
      formData,
      localVisible,
      cancel,
      insert,
      form,
      rules,
      formSize,
      dialogType,
      title,
    }
  },
})
</script>
