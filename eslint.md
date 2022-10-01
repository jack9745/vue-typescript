# eslint 学习笔记

# 有哪几种可以配置 eslint 的方式

可以在 package.json 中配置 指定字段为 eslintConfig
也可以在根目录中单独使用一个文件配置

# 有哪些配置项 可以配置

Environments - 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量。
Globals - 脚本在执行期间访问的额外的全局变量。
Rules - 启用的规则及其各自的错误级别。

# 指定全局变量

globals :{
"var1": "writable",
"var2": "readonly",
"Promise": "off"
}

# 如何配置插件

eslint 支持使用第三方插件，在使用之前要安装它，
插件使用 plugins 字段来配置 插件名称可以省略前缀 eslint-plugin-

{
"plugins": [
"plugin1",
"eslint-plugin-plugin2"
]
}

# eslint 支持多种格式的配置文件 已经文件的优先级如下

.eslintrc.js
.eslintrc.yaml
.eslintrc.yml
.eslintrc.json
.eslintrc
package.json

# 选项 root 设置为 true 表示啥意思

在你项目根目录下的 package.json 文件或者 .eslintrc.\* 文件里的 eslintConfig 字段下设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，
它就会停止在父级目录中寻找。
重点是
