<template>
  <div class="SampleSome-wrap">
    {{state.componentName}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { SampleSomeState } from '@/types/components/SampleSome.interface'
// import {  } from "@/components" // 组件

@Component({})
export default class About extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  }) name!: string

  // state
  state: SampleSomeState = {
    componentName: 'SampleSome'
  }

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }

}
</script>

<style lang="scss">
  @import "@/assets/scss/variables.scss";

  .SampleSome-wrap {
    width: 100%;
    display: flex;
  }
</style>

