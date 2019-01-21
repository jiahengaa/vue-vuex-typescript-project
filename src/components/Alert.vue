<template>
  <dir class="alert">
    <div class="alert-wrap">
      <div class="text">{{alertMsg}}</div>
    </div>
  </dir>
</template>

<script lang="ts">
import Vue from 'vue';
import { Getter } from 'vuex-class';
import Component from 'vue-class-component';
import { mapGetters, mapState } from 'vuex';

@Component
export default class Alert extends Vue {
  @Getter('alertMsg') public alertMsg!: string;
}
</script>


<style lang="scss" scoped>
@import "../assets/scss/function";
.alert {
  z-index: 1000;
  .alert-wrap {
    position: fixed;
    width: px2rem(250px);
    height: px2rem(90px);
    line-height: px2rem(90px);
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: px2rem(45px);
    background: rgba($color: #000000, $alpha: 0);
    .text {
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
