<template>
  <div class="tab-item">
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
@Component({
  name: 'tabItem'
})
export default class TabItem extends Vue {
  @Prop({
    type: Object,
    default: () => {}
  })
  public menuItem!: {}
  @Provide()
  menuInfo: MenuItem = new MenuItem()

  created() {
    // console.log('打印：')
    // console.log(this.$props)
    this.menuInfo = this.$props.menuItem
  }
}
</script>

<style lang="scss" scoped>
.tab-item {
  background: pink;
  color: black;
  height: 100%;
  width: 100%;
  svg {
    margin-top: 10px;
  }
}
</style>
