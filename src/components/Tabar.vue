<template>
  <div class="tabar" v-show="isShowTabbar">
    <div class="tab">
      <div class="tab-item">
        <div class="tab-icon">
          <svg class="icon svg-icon" aria-hidden="true">
            <use xlink:href="#icon-fuzifutie"></use>
          </svg>
        </div>
        <div class="title active">恭喜发财</div>
      </div>
      <div class="tab-item">
        <router-link to="/sport">
          <div class="tab-icon">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-tangguohe"></use>
            </svg>
          </div>
          <div class="title">年货</div>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/travel">
          <div class="tab-icon">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-jinliyu"></use>
            </svg>
          </div>
          <div class="title">后有余庆</div>
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/user">
          <div class="tab-icon">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-zhu"></use>
            </svg>
          </div>
          <div class="title">猪猪Fat</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class Tabar extends Vue {
  get isShowTabbar(): boolean {
    const routeLength = this.$route.path.split('/').length
    return routeLength > 2 ? false : true
  }
}
</script>


<style scoped lang="scss">
@import '../assets/scss/function';

.tabar {
  .tab {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: px2rem(500px);
    line-height: px2rem(120px);
    background: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);

    .tab-item {
      flex: 1;
      text-align: center;
      .tab-icon {
        margin-top: 10px;
      }
      .title {
        color: hotpink;
        &.active {
          color: palegreen;
        }
      }
      a {
        text-decoration: none;
        .tab-icon {
          margin-top: 10px;
        }
        .title {
          color: hotpink;
        }
      }
    }
  }
}
</style>
