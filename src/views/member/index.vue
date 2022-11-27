<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-card shadow="hover" style="min-height: 50vh">
    <template v-slot:header>
      <header>家庭成员管理</header>
    </template>

    <div class="btn-wrapper">
      <el-button type="primary" @click="insert">新增</el-button>
      <el-button type="primary" plain @click="deleteSelected"
        >批量删除</el-button
      >
      <el-button type="primary" plain @click="updateSelected"
        >批量修改</el-button
      >
      <!-- <el-button type="primary" @click="getKeyValue">获取key</el-button> -->
    </div>
    <el-table
      :data="tableData"
      :border="true"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
      <el-table-column prop="height" label="身高"></el-table-column>
      <el-table-column prop="birth" label="出生日期"></el-table-column>
      <el-table-column label="操作" width="250">
        <template v-slot="{ row }">
          <el-button type="primary" @click="editData(row)">编辑</el-button>
          <el-button type="danger" @click="deleteTableData(row.id)"
            >删除</el-button
          >
          <el-button type="primary" plain @click="viewDetail(row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->

    <!-- '.sync' modifier on 'v-bind' directive is deprecated.
       Use 'v-model:propName' instead. -->
    <!-- 用 v-model试试  绑定visiblel作为参数-->
    <MemberDialog
      v-if="visible"
      v-model:visible="visible"
      :memberData="memberData.value"
      :type="dialogType"
      @change="getList"
    ></MemberDialog>

    <!-- 批量修改弹窗  可以渲染出来-->
    <BatchUpdate v-model:visible="updateVisible"></BatchUpdate>
  </el-card>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from 'vue'
import MemberDialog from './components/MemberDialog.vue'
// 导入时不需要扩展名称
import BatchUpdate from './components/BatchUpdate'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { User, DialogType } from './index'
import {
  readAll as getTableList,
  getKey,
  deleteData,
} from '@/local-service/member'

export default defineComponent({
  components: { MemberDialog, BatchUpdate },
  setup() {
    const memberData = reactive<{ value: Partial<User> }>({
      value: {},
    })
    const dialogType = ref<DialogType>()
    const visible = ref(false)
    const updateVisible = ref(false)
    const tableData = ref([])
    //  Unhandled error during execution of setup function
    // 这个问题要结局
    setTimeout(() => {
      getTableList({}, ({ status, data }) => {
        if (status === 'success') {
          tableData.value = data
        }
      })
    }, 100)

    // 新增数据
    const insert = () => {
      dialogType.value = 'add'
      visible.value = true
    }

    // 编辑数据
    const editData = (data: User) => {
      dialogType.value = 'update'
      memberData.value = data
      visible.value = true
    }

    // 批量修改数据
    const updateSelected = () => {
      updateVisible.value = true
    }

    const multipleSelection = ref<User[]>([])
    //
    const handleSelectionChange = (selection: User[]) => {
      multipleSelection.value = selection
    }
    // 批量删除数据
    const deleteSelected = () => {
      const idList: number[] = []
      if (multipleSelection.value.length) {
        multipleSelection.value.forEach((item) => {
          idList.push(item.id as number)
        })

        deleteTableData(idList)
      } else {
        ElMessage({
          type: 'warning',
          message: '请先选择数据',
        })
      }
    }
    /**
     * @params {data}
     */
    // 删除数据
    const deleteTableData = async (id: number | number[]) => {
      const confirmText = await ElMessageBox.confirm(
        '确认删除数据吗？',
        '提示',
        {
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          type: 'warning',
        }
      ).catch((e) => {})

      if (confirmText !== 'confirm') {
        return false
      }
      deleteData(id, ({ status }) => {
        if (status == 'success') {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          getList()
        }
      })
    }

    // 查看详情
    const viewDetail = (data: User) => {
      memberData.value = data
      dialogType.value = 'detail'
      visible.value = true
    }

    // 获取表格数据
    const getList = () => {
      getTableList({}, ({ status, data }) => {
        if (status === 'success') {
          tableData.value = data
        }
      })
    }

    const getKeyValue = () => {
      getKey()
    }

    return {
      tableData,
      insert,
      visible,
      editData,
      deleteTableData,
      viewDetail,
      memberData,
      getList,
      getKeyValue,
      dialogType,
      deleteSelected,
      handleSelectionChange,
      updateSelected,
      updateVisible,
    }
  },
})
</script>

<style lang="less" scoped>
.btn-wrapper {
  // margin: 16px 0;
  margin-bottom: 16px;
}
</style>
