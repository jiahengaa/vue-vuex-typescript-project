<template>
  <div class="app">
    <div>{{data.length}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { AxiosResponse } from 'axios'
import { IProduct } from '../model/interface/IProduct'

@Component({})
export default class Login extends Vue {
  @Provide() public data: IProduct[] = []

  public mounted() {
    Vue.axios
      .get('/product/getList')
      .then((response: AxiosResponse<any>) => {
        console.log('success')
        console.log(response)
        this.data = response.data
        console.log(this.data)
      })
      .catch((error: any) => {
        console.log('error')
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
