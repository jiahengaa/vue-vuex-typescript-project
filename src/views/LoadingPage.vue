<template>
  <div class="app">
    <v-loading></v-loading>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import Loading from '@/components/Loading.vue'

@Component({
  name: 'loadingPage',
  components: {
    'v-loading': Loading
  }
})
export default class LoadingPage extends Vue {}
</script>

<style lang="scss" scoped>
.app {
  margin-left: 100px;
  margin-top: 100px;
}
</style>

