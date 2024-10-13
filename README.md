# cm-cli

    一个简单的自定义脚手架工具，用于快速创建项目

        支持 vite 搭建的 vue-js 、 vue-ts 模版项目

# dependencies

    这里不能用 devDependencies，因为 devDependencies 是在开发时使用的，而我们需要的是在项目中使用的,如果不将依赖包放在 dependencies 中，当我们全局安装的时候就会出现没有安装对应依赖包的情况

# 使用

    npm install -g cm-cli

    cm-cli create <project-name>