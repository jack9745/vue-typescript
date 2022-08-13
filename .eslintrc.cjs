/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    // 后面的配置会重写前面的配置

    // Add "@vue/eslint-config-prettier" to the "extends" array in your .eslintrc.cjs file. Make sure to put it last,
    // so it gets the chance to override other configs.
  ],
  rules: {
    // 解决delete cr
    endOfLine: 0,
  },
}
