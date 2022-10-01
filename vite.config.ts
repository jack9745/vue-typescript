// 用pnpm包管理器 会出现 不知道原因的报错，比如安装了一个包 项目就跑不起来了
// 换成yarn 没有问题

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
// 这个插件的作用是什么
import vue from '@vitejs/plugin-vue'
// 这个插件的作用是什么 ？
import vueJsx from '@vitejs/plugin-vue-jsx'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 这个插件的作用是什么呢 ？ 当语法检查失败是否允许编译成功等配置
import vitePluginEslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vitePluginEslint({
      // 控制是否打印错误
      emitError: true,
      // 这个字段是控制当有语法错误时，是否允许编译成功 default 为true
      // 可以看到当我们有语法错误时，不会编译成功，页面上也会错误
      failOnError: true,
      emitWarning: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
