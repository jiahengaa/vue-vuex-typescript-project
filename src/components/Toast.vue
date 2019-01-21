<template>
  <div class="toast">
    <div class="mask"></div>
    <div class="toast-wrap">
      <div>
        <i class="icon" v-show="success">&#xe848;</i>
        <i class="icon" v-show="fail">&#xe62d;</i>
      </div>
      <div class="text">{{toastMsg}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class Toast extends Vue {
  @Getter('showSuccess') public success!: boolean
  @Getter('showFail') public fail!: boolean
  @Getter('toastMsg') public toastMsg!: string
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/function';

.toast {
  z-index: 100;
  .toast-wrap {
    position: fixed;
    width: px2rem(280px);
    height: px2rem(280px);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: px2rem(15px);
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1002;
    .icon {
      font-size: px2rem(80px);
    }
    .text {
      font-size: 14px;
      color: #fff;
      margin-top: px2rem(20px);
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    margin: 0 auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    background: rgba(0, 0, 0, 0.6);
  }
}
</style>