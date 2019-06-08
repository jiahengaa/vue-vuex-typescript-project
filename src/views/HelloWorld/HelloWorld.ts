import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { HelloWorldState } from '@/types/views/HelloWorld.interface'
// import {  } from "@/components" // 组件

@Component({})
export default class HelloWorld extends Vue {
  // state
  state: HelloWorldState = {
    pageName: 'HelloWorld'
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
