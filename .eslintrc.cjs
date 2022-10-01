//  下面这句代码表示啥意思呢 使用注释来指定环境
/* eslint-env node */

require('@rushstack/eslint-patch/modern-module-resolution')
// eslint 中 各个字段的含义
// 0 表示关闭规则 如果不符合规则也不会报错  1 表示警告 2 表示开启规则，如果不符合规则就报错误
// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

//
// eslint-plugin-prettier  这个插件的作用是什么
// Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
// 将prettier中的格式化规则作为 eslint规则 然后可以显示规范错误
//
//
// 插件地址GitHub地址
// https://github.com/prettier/eslint-plugin-prettier

// eslint-config-prettier 这个插件的作用是什么
// Turns off all rules that are unnecessary or might conflict with Prettier.

// 查看源码 可以得知 关闭了一些eslint 规则 ，关闭了一些没用的规则，当我们用prettier时
//  The rest are rules that you never need to enable when using Prettier.

//eslint检查报错还可以跑起来 为什么报错了工程还可以运行
module.exports = {
  // 停止向父级查找
  root: true,
  // env配置项 可以指定我们代码运行的环境，然后预定义了一组全局变量
  env: {
    node: true,
  },
  // 配置全局变量
  globals: {
    // module: true,
  },

  // 使用eslint 和第三方的插件中配置的规则
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',

    // 这个插件的作用是什么  这个插件是依赖 eslint-plugin-prettier 和 eslint-config-prettier两个插件
    // 这个插件的作用 将 eslint-plugin-prettier 和 eslint-config-prettier 两个插件的作用
    // 我的理解 是关闭了一些无用规则，然后可以开启一些格式化 "prettier/prettier中可以配置一些格式化的规则，这些规则来自于prettier插件，在其中配置eslint 规则是无效的
    '@vue/eslint-config-prettier',
    // 后面的配置会重写前面的配置

    // Add "@vue/eslint-config-prettier" to the "extends" array in your .eslintrc.cjs file. Make sure to put it last,
    // so it gets the chance to override other configs.
  ],
  rules: {
    // 'no-var': 'off', // 生效的
    // 对于声明了变量，但是么有使用过的，要发出警号
    '@typescript-eslint/no-unused-vars': ['warn'],

    // 可以允许显示的any类型
    '@typescript-eslint/no-explicit-any': 'off',

    // 允许空函数
    '@typescript-eslint/no-empty-function': 'off',
    // '@vue/eslint-config-prettier
    // eslint 会读取prettier里面的配置

    // NB: This option will merge and override any config set with .prettierrc files

    // 注意这里的配置将会覆盖 prettierrc中的配置 怎么理解，
    // 保存的时候会格式化，格式化默认的插件是prettier,会读取.prettierrc中的配置，比如设置 "singleQuote": false,格式化的时候会将引号格式化双引号，但是会报eslint规则错误，因为我们下面的  "prettier/prettier" 中的配置会作为eslint 规则，所以可以理解这里的优先级高，
    // 规则  "prettier/prettier" 是 插件eslint-plugin-prettier提供的

    // GitHub上说不推荐，但是根据我测试之后的理解，如果想覆盖默认的prettier规则，还是要这样设置

    // 这个规则开启之后还可以格式化样式
    'prettier/prettier': [
      'error',
      // 表示 开启规则  经过测试 有效，这里也可以换成 off表示关闭规则，warn表示发出警告
      {
        // 怎么判断一个文件是用制表符来缩进还是空格来缩进，可以选中一段代码
        // 空白部分是点 . 号 的表示用的是空格缩进的，箭头表示用的 制表符缩进的

        // Indent lines with tabs instead of spaces.
        // 用空格缩进还是制表符来缩进
        useTabs: false,

        // vue文件中 script部分 和style部分 是否缩进
        // 编辑器里的设置要和这里的配置保持一致
        vueIndentScriptAndStyle: false,

        // 文件中字符串要是单引号
        singleQuote: true,

        // 每个语句后面不要加单引号
        semi: false,
        // 经过测试发现 下面的配置 在这里是无效的，所以 "prettier/prettier" 可以配置哪些规则 ？？？
        // 'no-var': 'off',
        // 解决delete CR 报错问题 回车和换行问题
        endOfLine: 'auto', // 表示啥意思
        //  Maintain existing line endings (mixed values within one file are normalised by looking at what’s used after the first line)
        //  保持现有的行尾（一个文件中的混合值通过查看第一行之后使用的内容进行归一化）
        // parser: 'json',
      },
    ],
  },

  // 我们可以通过 overrides和 files和 rules来重写一组文件的lint规则

  // 注意 overrides 是数组形式的,files也是数组形式的
  // 重写一组文件的校验规则
  overrides: [
    {
      // 练习通配符 * 的作用 匹配文件夹为什么要用两个星号？？ 用一个星号也匹配不到

      // 当用 {} 匹配一个扩展名时为什么不生效 ？？？
      // 可以看到 SearchForm.vue文件
      //  const a = '' 是警告，而不是错误，说明没有运用下面的规则

      // 我的理解是 {}适用于匹配多个字符模式，对单个无效

      // 这个是可以匹配views下面所有的vue,ts文件的，不管是直接下面的，还是在子文件夹下面的
      // files: ['src/views/**/*.{vue,ts}'],

      // 这种模式 是只能匹配到views文件夹下面的vue文件，直接在views下面的，不能再子文件夹下面的
      files: ['src/views/*.vue'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        // for test
        'no-debugger': 'off',
      },
    },
  ],
}
