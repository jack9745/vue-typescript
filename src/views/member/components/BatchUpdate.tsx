import { ref, reactive, defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible'],
  // setup 函数也可以返回一个创建虚拟dom的函数，这个函数返回虚拟dom
  setup(props, { emit }) {
    // const localVisible = ref(false)
    const localVisible = computed({
      get() {
        return props.visible
      },
      set(value) {
        emit('update:visible', value)
      },
    })

    const update = () => {
      localVisible.value = false
    }
    const cancel = () => {
      localVisible.value = false
    }
    const formData = reactive({
      fieldType: '',
      modifiedValue: '',
    })
    const form = ref(null)
    const fieldList = ref([
      {
        label: '姓名',
        type: '',
        value: 'input',
      },
    ])
    return () => (
      <>
        {/* 指令在tsx 中怎么写  可以直接使用指令 并且不能自动解包 ？？？
        
        网上查询资料 可以在tsx中使用v-show 和v-model 指令*/}
        <el-dialog v-model={localVisible.value} title="更新数据">
          {/* 传递插槽 */}

          {{
            // 默认插槽
            default: () => (
              <el-form model={formData} ref="form" label-width="150px">
                <el-form-item prop="type" label="字段">
                  <el-select v-model={formData.fieldType} clearable>
                    {fieldList.value.map((item, index) => {
                      return (
                        <el-option
                          key={index}
                          label={item.label}
                          value={item.value}
                        ></el-option>
                      )
                    })}
                  </el-select>
                </el-form-item>
                <el-form-item prop="modifiedValue" label="修改后的值">
                  <el-input
                    v-model={formData.modifiedValue}
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>
            ),
            // 尾部插槽
            footer: () => (
              <div class="body">
                <el-button type="default" onClick={cancel}>
                  取消
                </el-button>
                <el-button type="primary" onClick={update}>
                  确认
                </el-button>
              </div>
            ),
          }}
        </el-dialog>
      </>
    )
  },
})
