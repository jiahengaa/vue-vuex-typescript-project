/*
 * @Description: 页面快速生成脚本
 * @Date: 2018-12-06 10:28:08
 * @LastEditTime: 2018-12-12 17:02:36
 */
const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const vues = require('./vues.conf.json')

vues.views.forEach(ele => {
  const dirName = ele.name
  const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)
  if (!dirName) {
    console.log('文件夹名称不能为空！')
    console.log('示例：npm run tep ${capPirName}')
    process.exit(0)
  }

  /**
   * @msg: vue页面模版
   */
  const VueTep = `<template>
  <div class="${dirName}-wrap">
    {{data.pageName}}
  </div>
</template>

<script lang="ts" src="./${dirName}.ts"></script>

<style lang="scss">
  @import './${dirName}.scss'
</style>

`

  // ts 模版
  const tsTep = `import { Component, Vue } from "vue-property-decorator"
import { Getter, Action } from "vuex-class"
import { ${capPirName}State } from '@/types/views/${dirName}.interface'
// import {  } from "@/components" // 组件

@Component({})
export default class ${dirName} extends Vue {

  // state
  state: ${capPirName}State = {
    pageName: '${dirName}'
  }

  // 创建
  created() {
    //
  }
  
  activated() {
    //
  }

  // 挂载
  mounted() {
    //
  }

  // 初始化函数
  init() {
    //
  }
    
}
`

  // scss 模版
  const scssTep = `@import "@/assets/scss/variables.scss";

.${dirName}-wrap {
  width: 100%;
  display: flex;
}
`

  // interface 模版
  const interfaceTep = `// ${dirName}.State 参数类型
export interface ${capPirName}State {
  pageName: string
}

`

  modulePath = [
    {
      name: 'views',
      path: `${basePath}/views`
    },
    {
      name: 'types',
      path: `${basePath}/types`
    },
    {
      name: 'types-views',
      path: `${basePath}/types/views`
    }
  ]

  modulePath.forEach(element => {
    if (!fs.existsSync(element.path)) {
      fs.mkdirSync(element.path) // mkdir
      console.log('%c+ ' + element.path, 'color:green')
    }

    if (element.name === 'views') {
      const viewsRoot = element.path + `/${dirName}`
      if (!fs.existsSync(viewsRoot)) {
        fs.mkdirSync(viewsRoot) // mkdir
        console.log('%c + view ', 'color:green')
        console.log('%c ' + viewsRoot, 'color:yellow')
      }
      process.chdir(viewsRoot) // cd views

      if (!fs.existsSync(`${dirName}.vue`)) {
        fs.writeFileSync(`${dirName}.vue`, VueTep) // vue
        console.log('%c +      vue ', 'color:green')
        console.log(`%c ${viewsRoot}/${dirName}.vue`, 'color:yellow')
      } else {
        if (!ele.exsitNotPrint) console.log('%c exsit ' + `${dirName}.vue`, 'color:yellow')
      }

      if (!fs.existsSync(`${dirName}.ts`)) {
        fs.writeFileSync(`${dirName}.ts`, tsTep) // ts
        console.log('%c +      ts ', 'color:green')
        console.log(`%c ${viewsRoot}/${dirName}.ts`, 'color:yellow')
      } else {
        if (!ele.exsitNotPrint) console.log('%c exsit ' + `${dirName}.ts`, 'color:yellow')
      }

      if (!fs.existsSync(`${dirName}.scss`)) {
        fs.writeFileSync(`${dirName}.scss`, scssTep) // scss
        console.log('%c +      scss ', 'color:green')
        console.log(`%c ${viewsRoot}/${dirName}.scss`, 'color:yellow')
      } else {
        if (!ele.exsitNotPrint) console.log('%c exsit ' + `${dirName}.scss`, 'color:yellow')
      }
    }

    if (element.name === 'types-views') {
      process.chdir(element.path) // cd types
      if (!fs.existsSync(`${dirName}.interface.ts`)) {
        fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep) // interface
        console.log('%c + interface ', 'color:green')
        console.log(`%c ${element.path}/${dirName}.interface.ts`, 'color:yellow')
      } else {
        if (!ele.exsitNotPrint) console.log('%c exsit ' + `${dirName}.interface.ts`, 'color:yellow')
      }
    }
  })
})

console.log('%c Done!', 'color:green')
process.exit(0)
