<template>
  <div class="app">
    <tab-control :menuList="menus"></tab-control>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import TabControl from '../controls/TabControl.vue'
import MenuItem from '../model/MenuItem'

import * as $ from '../store/mutation-nav-menu-types'

@Component({
  name: 'selfTabPage',
  components: {
    'tab-control': TabControl
  }
})
export default class SelfTabPage extends Vue {
  public menus: MenuItem[] = [
    new MenuItem('firstone', '0', 'first one', false),
    new MenuItem('secondone', '1', 'second one', true),
    new MenuItem('three', '2', 'three', false, false, true, true, true),
    new MenuItem('fddsfdsfs', '3', 'dsdssd', false, false, true, true, true)
  ]

  @Action($.initMenuList) public initMenuList?: any

  get curMenus(): MenuItem[] {
    return this.menus
  }

  public created() {
    this.initMenuList(this.menus)
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
