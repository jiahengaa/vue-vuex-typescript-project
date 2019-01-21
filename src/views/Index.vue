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

@Component({
  name: 'index',
  components: {
    'tab-control': TabControl
  }
})
export default class Index extends Vue {
  menus: MenuItem[] = [
    {
      title: 'first one',
      name: 'firstone',
      index: '0',
      active: false,
      selected: false,
      enable: true,
      visiable: true
    },
    {
      title: 'second one',
      name: 'secondone',
      index: '1',
      active: true,
      selected: false,
      enable: true,
      visiable: true
    },
    {
      title: 'three',
      name: 'three',
      index: '2',
      active: false,
      selected: false,
      enable: true,
      visiable: true
    }
  ]

  get curMenus(): MenuItem[] {
    return this.menus
  }
}
</script>

<style lang="scss" scoped>
.app {
  width: 100vw;
  height: 100vh;
  position: fixed;
}
</style>
