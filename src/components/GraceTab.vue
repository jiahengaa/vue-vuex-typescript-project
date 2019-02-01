<template>
  <div class="grace-tab">
    <ul class="tab-header">
      <li
        class="tab-header-item"
        v-for="item in menus"
        :key="item.index"
        :class="{active:item.active}"
        @click="selectMenu(item)"
      >
        <a href="#">{{item.name}}</a>
      </li>
    </ul>
    <keep-alive>
      <component v-if="curMenu.keepAlive" :is="curMenu.path"/>
    </keep-alive>
    <component v-if="!curMenu.keepAlive" :is="curMenu.path"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { MenuRoute } from '../model/interface/IMenuRoute'

import SelfTabPage from '@/views/SelfTabPage.vue'
import NavMenu from '@/views/NavMenu.vue'
import PrintData from '@/views/PrintData.vue'
import LoadingPage from '@/views/LoadingPage.vue'
import NavSample from '@/components/NavSample.vue'
import LeftNavSample from '@/components/LeftNavSample.vue'
import BeautifulPage from '@/components/BeautifulPage.vue'
import TableOfElement from '@/components/TableOfElement.vue'
import StarShooting from '@/components/StarShooting.vue'
import SoftLock from '@/components/SoftLock.vue'

@Component({
  name: 'gracetab',
  components: {
    SelfTabPage,
    NavMenu,
    PrintData,
    LoadingPage,
    NavSample,
    BeautifulPage,
    LeftNavSample,
    TableOfElement,
    StarShooting,
    SoftLock
  }
})
export default class GraceTab extends Vue {
  public menus: MenuRoute[] = [
    {
      title: 'first one',
      name: 'firstone',
      index: '0',
      active: false,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'SelfTabPage'
    },
    {
      title: 'second one',
      name: 'secondone',
      index: '1',
      active: true,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'NavMenu'
    },
    {
      title: 'three',
      name: 'three',
      index: '2',
      active: false,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'PrintData'
    },
    {
      title: 'LoadingPage',
      name: 'LoadingPage',
      index: '3',
      active: false,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'LoadingPage'
    },
    {
      title: 'NavSample',
      name: 'NavSample',
      index: '4',
      active: false,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'NavSample'
    },
    {
      title: 'BeautifulPage',
      name: 'BeautifulPage',
      index: '5',
      active: false,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'BeautifulPage'
    },
    {
      title: 'LeftNavSample',
      name: 'LeftNavSample',
      index: '6',
      active: false,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'LeftNavSample'
    },
    {
      title: 'TableOfElement',
      name: 'TableOfElement',
      index: '7',
      active: false,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'TableOfElement'
    },
    {
      title: 'StarShooting',
      name: 'StarShooting',
      index: '8',
      active: false,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'StarShooting'
    },
    {
      title: 'SoftLock',
      name: 'SoftLock',
      index: '9',
      active: false,
      selected: false,
      enable: true,
      visiable: true,
      keepAlive: true,
      path: 'SoftLock'
    }
  ]

  public curMenu: MenuRoute = {
    title: 'LoadingPage',
    name: 'LoadingPage',
    index: '1',
    active: true,
    selected: false,
    enable: true,
    visiable: true,
    keepAlive: true,
    path: 'LoadingPage'
  }

  public selectMenu(menu: MenuRoute) {
    this.curMenu = menu
  }
}
</script>

<style lang="scss" scoped>
.grace-tab {
  .tab-header {
    height: 50px;
    width: 100%;
    padding: 0;
    margin: 0;
    //bottom: 0;
    list-style: none; /*在一个声明中设置所有的列表属性*/
    background: lightcoral;
    display: inline-flex;

    .tab-header-item {
      float: left;
      line-height: 40px;
      text-align: center;
      position: relative;
      width: 12.5%;
      a {
        background: lightseagreen;
        text-decoration: none;
        color: #ffffff;
        padding: 5px 10px;
        display: block;

        &:hover {
          color: lightgreen;
          background: darkcyan;
        }
      }
    }
  }
}
</style>

