<template>
  <div
    class="tab-item"
    :class="{active:(menuInfo.index ==getSelectedMenu.index )}"
    @click="menuSelected"
  >
    <svg class="icon svg-icon" aria-hidden="true">
      <use xlink:href="#icon-fuzifutie"></use>
    </svg>
    <div>{{menuItem.title}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import MenuItem from '../model/MenuItem'
import * as $ from '../store/mutation-nav-menu-types'

@Component({
  name: 'tabItem'
})
export default class TabItem extends Vue {
  @Prop({
    type: Object,
    default: MenuItem
  })
  public menuItem!: {}
  @Provide()
  public menuInfo: MenuItem = new MenuItem()

  @Action($.selectedMenu) public selectedMenu?: any
  @Getter('getSelectedMenu') public getSelectedMenu?: any

  public created() {
    this.menuInfo = this.$props.menuItem
  }

  public menuSelected() {
    this.selectedMenu(this.menuInfo)
  }
}
</script>

<style lang="scss" scoped>
.tab-item {
  background: pink;
  color: black;
  height: 100%;
  width: 100%;
  box-shadow: darkcyan 3px 0px 11px 1px;
  &.active {
    background: lightcoral;
  }

  svg {
    margin-top: 10px;
  }
}
</style>
