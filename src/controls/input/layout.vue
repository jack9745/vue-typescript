<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- 表单构建状态不可编辑 -->
  <!-- 参考其他低代码平台 -->

  <div class="build-status">
    <dl class="wrapper">
      <dt class="form-title">单行文本</dt>
      <dd class="form-content">请填写邮箱地址</dd>
    </dl>

    <div class="tool-btn">
      <!-- 已经全局注册了，为什么不能在文件中使用呢 -->
      <div class="radius">
        <el-icon class="delete" :size="16"><Delete /></el-icon>
      </div>
      <div class="radius">
        <el-icon class="copy" :size="16"><CopyDocument /></el-icon>
      </div>
    </div>
  </div>

  <!-- <el-input placeholder="请输入" clearable v-model="localInput"></el-input> -->

  <!-- 表单运行态可以编辑 -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 这样引入之后也不可以？
import { Delete, CopyDocument } from '@element-plus/icons-vue'

const localInput = ref('')

const show = ref(true)
</script>

<style lang="less" scoped>
.build-status {
  // css 样式继承 指的是 特定的css属性可以向下传递给后代元素，后代元素可以不用设置，
  // 可以继承父元素或者祖先元素的css样式

  // 哪些属性可以继承
  // 字体系列属性可以继承，
  // font font-size font-family font-style font-weight

  // 文本系列属性
  // text-indent text-align color 等等

  // 没有继承性的css属性主要有哪些
  // 1、display  这个不能继承

  // 3、盒子模型的属性:宽度、高度、内外边距、边框等

  // 4、背景属性：背景图片、颜色、位置等 background-color也没有继承性

  // 5、定位属性：浮动、清除浮动、定位position等
  position: relative;
  padding: 12px;
  font-size: 14px;
  cursor: grab; //手指形状
  .tool-btn {
    position: absolute;
    right: 10px;
    top: -6px;
    z-index: 100;
    .radius {
      display: inline-flex;
      width: 30px;
      height: 30px;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 50%;
      &:first-child {
        margin-right: 10px;
      }
    }
    .delete {
      // margin-right: 10px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
    .copy {
      cursor: pointer;
    }
  }
  .wrapper {
    .form-title {
      margin-bottom: 4px;
    }
    .form-content {
      color: #a8abb2;
      height: 32px;
      line-height: 32px;
      border: 1px solid #ccc;
      font-size: 14px;
      padding-left: 12px;
      background-color: #fff;
      // padding-top: 6px;
      // padding-bottom: 6px;
    }
  }
}
</style>
