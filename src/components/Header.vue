<template>
  <div class="header">
    <div class="header-icon" v-show="backDisplay" @click="goBack">
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-hou"></use>
      </svg>
    </div>
    <div class="header-cont" :class="{ 'pad-l': !backDisplay }">
      <p>{{title}}</p>
    </div>
    <div class="header-icon" v-show="menuDisplay" @click="showBar">
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-niu"></use>
      </svg>
    </div>
    <div class="header-icon" v-show="mapDisplay" @click="getMap">
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-baozhu"></use>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export default class Header extends Vue {
  @Prop()
  public title: string = ''
  @Prop()
  public menuDisplay: boolean = false
  @Prop()
  public backDisplay: boolean = true
  @Prop()
  public mapDisplay: boolean = true

  public goBack(): void {
    window.history.back()
  }

  public getMap(): void {
    alert('研发中')
  }

  public showBar() {
    this.$store.dispatch('setNavState', true)
  }
}
</script>


<style lang="scss" scoped>
@import '../assets/scss/function';

.header {
  position: fixed;
  transform: translateZ(0);
  top: 0;
  z-index: 4;
  height: px2rem(500px);
  width: 100%;
  background: #76d49b;
  display: flex;
  flex-direction: row;
  .header-icon {
    flex: 1;
    text-align: center;
    > i {
      line-height: px2rem(500px);
    }
    .map-icon {
      font-size: 22px;
    }
  }

  .header-cont {
    flex: 6;
    > p {
      line-height: px2rem(500px);
      color: #ffffff;
      font-size: 17px;
    }
  }
  .pad-l {
    padding-left: px2rem(400px);
  }
}
</style>