<template>
  <div class="tab-content" :class="{active:menuInfo.active}">{{menuInfo.title}}</div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import MenuItem from '../model/MenuItem'
import { create } from 'domain'

@Component({
  name: 'tabContent'
})
export default class TabContent extends Vue {
  @Prop({
    type: Object,
    default: () => {}
  })
  public menuItem!: {}

  @Provide()
  menuInfo: MenuItem = new MenuItem()

  @Getter('getSelectedMenu') public getSelectedMenu?: any

  get isActive() {
    if ((this.menuInfo.index = this.getSelectedMenu.index)) {
      this.menuInfo = this.getSelectedMenu
      return true
    } else {
      return false
    }
  }

  created() {
    this.menuInfo = this.$props.menuItem
  }
}
</script>

<style lang="scss" scoped>
.tab-content {
  text-align: center;
  background: lightpink;
}
</style>


