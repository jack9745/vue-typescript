// 定义用户类型
type User = {
  name: string
  age: string | number
  phoneNumber: string
  height: string | number
  birth: string
  id?: number
}

// 对话框类型
type DialogType = 'add' | 'update' | 'detail'

export type { User, DialogType }
