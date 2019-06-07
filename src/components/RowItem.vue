<template>
  <div class="w5 h-vertical">
    <cell-header class="w3">
      <div>{{htitle}}</div>
    </cell-header>
    <cell class="w7">
      <slot></slot>
    </cell>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import CellHeader from '../components/CellHeader.vue'
import Cell from '../components/Cell.vue'

@Component({
  components: {
    'cell-header': CellHeader,
    Cell
  }
})
export default class RowItem extends Vue {
  @Prop(String) public title!: ''

  public htitle: string = ''

  public created() {
    this.htitle = this.title
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';
</style>
