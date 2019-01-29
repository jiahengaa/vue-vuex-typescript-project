<template>
  <div class="home">
    <grace-tab></grace-tab>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import GraceTab from '@/components/GraceTab.vue'

@Component({
  name: 'selfTabPage',
  components: {
    'grace-tab': GraceTab
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  // overflow: hidden;
}
</style>
