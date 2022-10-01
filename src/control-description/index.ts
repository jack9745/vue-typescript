type Control = {
  name: string
  type: string
}

export type { Control }

const controlList: Control[] = [
  {
    name: '单行文本',
    type: 'input',
  },
  {
    name: '多行文本',
    type: 'textarea',
  },
  {
    name: '多选',
    type: 'multiple-select',
  },
  {
    name: '单选',
    type: 'radio-select',
  },
  {
    name: '日期',
    type: 'datepicker',
  },
  {
    name: '时间',
    type: 'timepicker',
  },
  {
    name: '附件',
    type: 'attachment',
  },
  {
    name: '数值',

    type: 'number',
  },
]

// 怎么从一个值中提取出类型来？？

type ControlType =
  | 'radio-select'
  | 'multiple-select'
  | 'input'
  | 'number'
  | 'attachment'
  | 'timepicker'
  | 'textarea'
  | 'datepicker'
export type { ControlType }

export default controlList
