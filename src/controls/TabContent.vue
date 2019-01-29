<template>
  <div class="tab-content" :class="{active:menuInfo.active}">
    <keep-alive>
      <router-view v-if="menuInfo.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!menuInfo.keepAlive"></router-view>
  </div>
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
    type: MenuItem
  })
  public menuItem!: {}

  @Provide()
  public menuInfo: MenuItem = new MenuItem()

  @Getter('getSelectedMenu') public getSelectedMenu?: any

  get isActive() {
    if (this.menuInfo.index === this.getSelectedMenu.index) {
      this.menuInfo = this.getSelectedMenu
      return true
    } else {
      return false
    }
  }

  public created() {
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


