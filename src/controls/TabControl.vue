<template>
  <div class="tab-control">
    <div class="tab-content">
      <div
        class="tab-content-main"
        v-for="item in menus"
        :key="item.index"
        :class="{active:(item.index == curSelectedItem.index)}"
      >
        <tab-content :menu-item="item" :v-bind="item.index"></tab-content>
      </div>
    </div>

    <div class="tab-menu">
      <div class="tab-item-content" v-for="item in menus" :key="item.index">
        <tab-item :menu-item="item" :v-bind="item.index"></tab-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import MenuItem from '../model/MenuItem'
import MenuCollection from '../model/MenuCollection'
import TabItem from './TabItem.vue'
import TabContent from './TabContent.vue'

@Component({
  name: 'TabControl',
  components: {
    'tab-item': TabItem,
    'tab-content': TabContent
  }
})
export default class TabControl extends Vue {
  @Prop({
    type: Array,
    default: () => []
  })
  public menuList!: MenuItem[]

  @Provide() public menus: MenuItem[] = []

  @Getter('getSelectedMenu') public getSelectedMenu?: any
  @Getter('getMenuList') public getMenuList?: any

  get curSelectedItem() {
    this.menus = this.getMenuList
    return this.getSelectedMenu
  }

  public created() {
    this.menus = this.$props.menuList
  }
}
</script>

<style lang="scss" scoped>
.tab-control {
  width: 100%;
  height: 100%;

  .tab-menu {
    background: chocolate;
    color: wheat;
    display: flex;
    height: 100px;
    margin: 0px;
    .tab-item-content {
      flex: 1;
      text-align: center;
      margin: 0 0 0 0;
      &.active {
        background: lightgrey;
      }
    }
  }

  .tab-content {
    width: 100%;
    height: calc(100vh - 100px - 50px);
    .tab-content-main {
      width: 100%;
      height: 100%;
      display: none;
      &.active {
        display: block;
      }
    }
  }
}
</style>
