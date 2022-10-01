<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header-wrapper">
    <header class="header"></header>
  </div>
  <div class="main">
    <!-- 左边菜单栏是固定的 -->
    <div class="left-aside">
      <div class="left-container">
        <ul class="menu-list">
          <li
            class="menu-item"
            @click="handlerRouter(item.path, index)"
            v-for="(item, index) in routeList"
            :class="{ active: activeIndex === index }"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 这部分是可以滑动的，出现滚动条的 -->
    <div class="content">
      <div class="layout-main-content">
        <!-- 添加过渡动画 -->
        <!-- 过渡 动效不能写在scoped局部作用域样式中 -->
        <!-- 这里设置的动效 会匹配所用的home中的子路由 -->
        <!-- mode out-in 先出后进 -->

        <!-- 这种写法在vue3中被警告 -->
        <!--  <router-view> can no longer be used directly inside <transition> or <keep-alive>. -->
        <!-- <transition name="router-transition" mode="out-in">
          <RouterView />
        </transition> -->

        <router-view v-slot="{ Component }">
          <transition name="router-transition" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()
    // 为什么渲染不出来呢？？是home组件的子路由，没有在home.vue写出口
    // 1 加载子路由对应的组件时，不会 重新加载上一级路由对应的组件 ，就是父路由
    // 如果路由中路径或者路由的名字相同，会先加载根级的路由
    const handlerRouter = (path: string, index: number) => {
      activeIndex.value = index
      router.push({
        path,
      })
    }
    const activeIndex = ref(0)
    const routeList = ref([
      {
        name: '代办中心',
        path: '/todo',
      },
      {
        name: '家庭成员管理',
        path: '/member',
      },
    ])
    // 匹配路由 激活菜单
    const matchRoute = () => {
      const path = route.path
      for (let i = 0; i < routeList.value.length; i++) {
        const item = routeList.value[i]
        if (item.path === path) {
          activeIndex.value = i
          break
        }
      }
    }
    matchRoute()
    return {
      handlerRouter,
      routeList,
      activeIndex,
    }
  },
  mounted() {
    console.log('我是home组件的出口，我看会不会被重新加载')
  },
})
</script>
<style>
.router-transition-leave-to {
  /* opacity: 0; */
  transform: translateX(40px);
}
.router-transition-enter-from {
  /* opacity: 0; */
  /* transform: translateX(-40px); */
}
.router-transition-enter-active,
.router-transition-leave-active {
  transition: transform 400ms linear;
}
</style>
<style lang="less" scoped>
.header-wrapper {
  height: 54px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #ccc;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  background-color: white;
}

.main {
  margin-top: 74px;

  .left-aside {
    position: fixed;
    left: 20px;
    top: 74px;
    width: 300px;
    height: calc(100vh - 94px);
    background-color: white;
    flex: none;
    border-radius: 6px;
    .left-container {
      width: 100%;
      height: 100%;
      padding: 16px;
      .menu-list {
        .menu-item {
          height: 36px;
          line-height: 36px;
          padding-left: 8px;
          transition: background-color 400ms ease;
          margin-bottom: 8px;
          cursor: pointer;
          border-radius: 6px;
          &:hover {
            background-color: #ecf5ff;

            // color: white;
          }
          &.active {
            background-color: #409eff;
            color: white;
          }
        }
      }
    }
  }
  .content {
    margin-left: 340px;
    // border-radius: 6px;
    min-height: 100vh;
    margin-right: 20px;
    // border: 1px solid #ccc;
    // background-color: white;

    &.layout-main-content {
    }
  }
}
</style>
