<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="form-wrapper">
    <!-- 头部 -->
    <header class="header-handler"></header>
    <section class="main">
      <aside class="controls">
        <ul class="control-layout">
          <li
            class="control-item"
            v-for="(item, index) in localControlList"
            :index="index"
            :key="item.type"
          >
            <!-- <el-button type="default" plain>{{ item.name }}</el-button> -->
            <div
              class="item"
              draggable="true"
              @drag="drag"
              @dragstart="dragstart"
              @dragend="dragend"
              :control-type="item.type"
              :id="'control' + item.type"
            >
              {{ item.name }}
            </div>
          </li>
        </ul>
      </aside>
      <main class="canvas-container" @drop="containerDrop" @dragover="dragover">
        <!-- 画布区域 或者叫做 绘制区域 -->
        <!-- 组件和组件之间怎么拖动 交换顺序 -->

        <!--   @drop="controlDrop"    @dragenter="controlDragEnter" -->

        <!-- 先简单一点  一行只能放置一个控件 -->

        <!-- dragenter 为什么最新触发的不是这个元素，而是它的子元素 -->
        <div
          class="render-item"
          v-for="(form, index) in formList"
          @click="selectFormItem(index)"
          :key="index"
          draggable="true"
          @dragenter="controlDragEnter"
          @dragleave="controlDragLeave"
          :class="{ 'selected-control': selectedIndex == index }"
        >
          <component :is="controlTypeMap[form.type]['value']"> </component>
        </div>
      </main>

      <!--  -->
      <aside class="property-config"></aside>
    </section>
  </div>
</template>

<script setup lang="ts">
//
import inputLayout from '@/controls/input'

import datePickerLayout from '@/controls/datepicker/index'
import controlList from '@/control-description/index'
import type { ControlType } from '@/control-description/index'
import type { DefineComponent } from 'vue'
// console.log('inputLayout', inputLayout) // 不是 DefineComponent类型
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  render,
  markRaw,
  shallowReactive,
  shallowRef,
  getCurrentInstance,
} from 'vue'
const instance = getCurrentInstance()

// 什么都没有
console.log(instance)
// 怎么在setup中获取组件实例对象 ？？？
const domList: any[] = []

// 不同的控件类型映射不同的控件
type RenderType = {
  // 这样的写法是对的
  [key in keyof ControlType]: DefineComponent
}

// 选中控件索引
const selectedIndex = ref(0)

// 某个元正在被拖动
const dragIndex = ref(-1)
// 改变背景
const selectFormItem = (index: number) => {
  selectedIndex.value = index
}
// type ControlType =
//   | 'radio-select'
//   | 'multiple-select'
//   | 'input'
//   | 'number'
//   | 'attachment'
//   | 'timepicker'
//   | 'textarea'
//   | 'datepicker'

//  要全部枚举完成 不然会报类型错误
//  不然模板中的这里会报错误   :is="controlTypeMap[form.type]['value']"
const controlTypeMap = {
  input: shallowRef(inputLayout),
  datepicker: shallowRef(datePickerLayout),
  'radio-select': shallowReactive(inputLayout),
  'multiple-select': shallowReactive(inputLayout),
  textarea: shallowReactive(inputLayout),
  timepicker: shallowReactive(inputLayout),
  attachment: shallowReactive(inputLayout),
  number: shallowReactive(inputLayout),
}

const localControlList = ref(controlList)
// 绘制表单 list
type FormItem = {
  id: string
  name: string
  sort: number
  type: ControlType
}
// 一共有多少个表单项
// eslint-disable-next-line prefer-const
let formItemNum = 0
// 这里不能是null 不然会报类型错误

// 成员的类型是 FormItem
const formList = ref<FormItem[]>([])

watch(
  formList,
  (value) => {
    // console.log(instance?.refs.items)
    // console.log(domList[0] && domList[0].$el)
  },

  // 数组需要深度监听
  {
    deep: true,
  }
)
// 被拖动的元素开始被拖动

// // 扩展DragEvent 中的 target类型
interface CustomDragEvent extends DragEvent {
  target: EventTarget & {
    controlType: string | number
    controlSort: number
  }
}

// 拖动元素触发的事件 只会触发一次，
const dragstart = (event: DragEvent) => {
  // 暂时不知道target是什么类型的

  // 注意 event.target是一个 HTMLElement类型的元素
  const type = (event.target as HTMLElement).getAttribute('control-type')
  console.log(event.target)
  // dropEffect 这个属性有什么作用呢
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }
  // dataTransfer用于中转数据，用于保存拖动并且放下过程中的数据

  // void dataTransfer.setData(format, data);  // 没 有返回值

  // 数据类型有：text/plain，text/uri-list。 这两个之间有什么区别呢？？
  event.dataTransfer?.setData('setType', type as string)

  console.log('开始拖动了')
}

// 被拖动的元素正在被拖动呢
const drag = () => {
  // console.log('正在拖动')
}

// 被拖动的元素结束事件，不管有没有到达目的地
const dragend = () => {
  // console.log('被拖动的元素结束事件')
}
// 被拖动元素放置在容器内，移动发生的事件  事件会发生多次
// 默认情况下。无法将拖拽元素放在其他元素当中，如果需要放置，必须阻止元素的默认行为
const dragover = (event: DragEvent) => {
  // event.target这里指的都是容器元素 而不是被拖拽的元素
  // console.log(event.target)

  // 位置 计算
  // console.log(event.clientX)
  // console.log(event.clientY)
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'copy'
  }

  // 阻止默认行为
  event.preventDefault()
  // console.log('被拖动元素在容器内发生移动')
}

// 放置拖动元素  被拖动的元素放置在了容器里 事件只会被触发一次
// DataTransfer.clearData()
const containerDrop = (event: DragEvent) => {
  // 目标元素 不一定是容器元素 怎么将拖拽元素放入到指定的位置 ？？
  // console.log((event.target as HTMLElement).classList)

  // 怎么判断拖入元素在容器中的位置
  // console.log(event.dataTransfer)
  // console.log(event)
  // console.log(event.clientX)
  // console.log(event.clientY)
  // console.log('被拖动元素被放置了')

  // 是否可以拿到数据
  // DOMString dataTransfer.getData(format);
  const type = event.dataTransfer?.getData('setType')
  if (type == 'input' || type === 'datepicker') {
    /**
     * [Vue warn]: Vue received a Component which was made a reactive object.
     *  This can lead to unnecessary performance overhead,
     *  and should be avoided by marking the component with `markRaw`
     *  or using `shallowRef` instead of `ref`. */

    //  这里有点问题需要修复

    //  加上markRaw就没有上面的警告错误了 避免性能损耗
    // renderControl.value = shallowRef(inputLayout)
    formList.value.push({
      name: '',
      id: '',
      type: type,
      sort: formItemNum,
    })
    formItemNum++
  }
}

// 容器内的组件拖动位置 放置在容器内
const controlDrop = (event: DragEvent) => {
  // 有其他元素进入到
}

// 目标容器元素 事件
const controlDragEnter = (event: DragEvent) => {
  // const drag = (event.target as HTMLElement).hasAttribute('draggable')
  //  enter事件和leave事件中的event.target
  console.log('进入容器了', event.target)
  const target = event.target as HTMLElement
  //  console.log('开始进入控件容器了')
  if (target.classList.contains('render-item')) {
    target.classList.add('pointer')
  }

  // 怎么从一个值中获取类型？
}

//  目标容器 事件
//  this 必须是第一个参数
const controlDragLeave = function (this: HTMLElement, event: DragEvent) {
  // 为什么是undefined undefined 怎么获取当前的dom元素呢
  // if ((event.target as HTMLElement).hasAttribute('draggable')) {
  // console.log('正在拖拉的控价离开容器了')
  // }
  console.log('离开容器了', event.target)
}
</script>
<style>
.pointer * {
  pointer-events: none;
}
</style>
<style lang="less" scoped>
// 没有默认安装 less处理器吗
.header-handler {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 54px;
  border: 1px solid #ccc;
  z-index: 100;
  background-color: #fff;
}

.main {
  margin-top: 74px;
  display: flex;
  min-height: calc(100vh - 74px);
  justify-content: space-between;
  .controls {
    width: 250px;
    border: 1px solid #ccc;
    flex: none;
    overflow: auto;
    background-color: #ccc;
    .control-layout {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      padding: 0 12px;
      padding-top: 12px;
      .control-item {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        .item {
          display: flex;
          align-items: center;
          padding-left: 8px;
          // justify-content: center;
          width: 100px;
          height: 36px;
          background-color: #fff;
          border-radius: 3px;
          &:hover {
            cursor: pointer;
            // background-color: aquamarine;
            // color: #fff;
            background-color: #ecf5ff;
            color: #409eff;
          }
        }
      }
    }
  }
  .canvas-container {
    margin: 0 20px;
    border: 1px solid #ccc;
    flex: auto;
    padding: 12px;
    overflow: auto;
    .render-item {
      background-color: #fff;
      transition: background-color linear 0.3s;
      &.selected-control {
        background-color: #d1edc4;
      }
      // margin-bottom: 16px;
    }
  }
  .property-config {
    width: 250px;
    border: 1px solid #ccc;
    flex: none;
    overflow: auto;
  }
}
</style>
