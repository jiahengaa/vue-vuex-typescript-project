<template>
  <div>{{data.length}}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { AxiosResponse } from 'axios'

@Component({})
export default class Login extends Vue {
  @Provide() public data: any

  public mounted() {
    Vue.axios
      .get('/product/getList')
      .then((response: AxiosResponse<any>) => {
        console.log('success')
        console.log(response)
        this.data = response.data
      })
      .catch((error: any) => {
        console.log('error')
        console.log(error)
      })
  }
}
</script>

