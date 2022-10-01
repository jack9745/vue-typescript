<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="dialog-wrapper"
    v-if="visible"
    :class="visibleClass ? 'left-in-transition' : 'left-out-transition'"
  >
    <ul class="dialog">
      <li class="header"></li>
      <li class="body"></li>
      <li class="footer"></li>
    </ul>
  </div>

  <div style="position: fixed; z-index: 0; left: 0; bottom: 0">
    <el-button @click="showDialog" type="primary">show</el-button>
    <el-button @click="hideDialog" type="primary">hide</el-button>
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, defineComponent, watch } from 'vue'
export default defineComponent({
  setup() {
    const visible = ref(false)
    const visibleClass = ref(false)

    const showDialog = () => {
      visible.value = true
      // 让容器有起始状态 和终止状态
      setTimeout(() => {
        visibleClass.value = true
      }, 10)
      //
    }
    // watch(visible, (value) => {
    //   visibleClass.value = value
    // })
    const hideDialog = () => {
      visibleClass.value = false
      setTimeout(() => {
        visible.value = false
      }, 510)
    }
    return { showDialog, visible, hideDialog, visibleClass }
  },
})
</script>

<style lang="less" scoped>
.dialog-wrapper {
  width: 500px;
  margin: 0 auto;
  transition: transform 500ms ease-in-out, opacity 500ms linear;
  transform: translateX(-500px);
  opacity: 0;

  // 不能这样，没有效果，要换个方法
  &.left-in-transition {
    // animation-direction: normal;
    // 当visible 为 true时 这个css属性会覆盖上面的属性，
    // 也就是说起始状态就是 translateX(0); 但是没有终点状态 不会产生过度行为
    transform: translateX(0);
    opacity: 1;
  }
  &.left-out-transition {
    transform: translateX(-500px);
    opacity: 0;
  }
  .dialog {
    // width:100%;
    height: 300px;
    border: 1px solid #ccc;
    background-color: #187ffc;
  }
}

@keyframes left-transition {
  0% {
    opacity: 0;
    transform: translateX(-500px);
  }

  50% {
    opacity: 0.5;
    transform: translateX(-250px);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
