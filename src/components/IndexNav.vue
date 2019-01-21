<template>
  <nav></nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { setMenu, setMenuActive, getIndexNav } from '../store/ChatType'
import { hint } from '@/store'

@Component({
  filters: {
    getPromot(hint: hint) {
      return hint.count
    }
  }
})
export default class IndexNav extends Vue {
  @Getter(setMenu) public setMenu?: string
  @Getter(setMenuActive) public setMenuActive?: string
  @Action(getIndexNav) public getIndexNav?: any

  public created() {
    this.getIndexNav()
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 50px;
  padding-top: 8px;
  background-color: #f9f9f9;
  font-size: 12px;
  dl {
    user-select: none;
    -webkit-user-select: none;
    flex-grow: 1;
    text-align: center;
    line-height: 1;
    dt {
      position: relative;
      width: 28px;
      height: 28px;
      margin: 0 auto;
      font-size: 28px;
      color: #797979;
      margin-bottom: 2px;
      dd {
        color: #929292;
        transform-origin: 50% 0;
        transform: scale(0.9);
      }
      ._news-dot {
        right: -2px;
        top: -3px;
        width: 11px;
        height: 11px;
      }
    }
  }
}
</style>
