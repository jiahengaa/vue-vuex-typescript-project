<template>
  <div class="home">
    <v-toast v-show="showToast"></v-toast>
    <v-alert v-show="showAlert"></v-alert>
    <v-loading v-show="loading"></v-loading>
    <v-header :title="title" :menu-disPlay="menuDisplay" :back-display="backDisplay"></v-header>
    <div class="content" :class="{tabar: tabar}">
      <transition name="slide-left">
        <router-view></router-view>
      </transition>
    </div>
    <v-tabar></v-tabar>
    <v-sidebar></v-sidebar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Component, Watch } from 'vue-property-decorator'
import toast from '@/components/Toast.vue'
import alert from '@/components/Alert.vue'
import loading from '@/components/Loading.vue'
import header from '@/components/Header.vue'
import tabar from '@/components/Tabar.vue'
import sidebar from '@/components/Sidebar.vue'

import { Action, Getter } from 'vuex-class'

@Component({
  name: 'home',
  components: {
    'v-tabar': tabar,
    'v-toast': toast,
    'v-alert': alert,
    'v-loading': loading,
    'v-header': header,
    'v-sidebar': sidebar,
  },
})
export default class Home extends Vue {
  get title(): string {
    switch (this.$route.path.split('/')[1]) {
      case '':
        return 'Qu约'
      case 'home':
        return 'Qu约'
      case 'sport':
        return '约跑'
      case 'travel':
        return '约行'
      case 'user':
        return '我的'
      default:
        return ''
    }
  }

  get tabar(): boolean {
    return this.$route.path.split('/').length > 2 ? false : true
  }

  get menuDisplay(): boolean {
    if (this.$route.path.split('/')[1] === 'home') {
      return false
    }
    return this.$route.path.split('/').length > 2 ? false : true
  }

  get backDisplay(): boolean {
    return this.$route.path.split('/').length > 2 ? true : false
  }

  get mapDisplay(): boolean {
    if (this.$route.path.split('/')[1] === 'home') {
      return true
    }
    return false
  }
  @Action('setNavState') public setNavState?: any
  @Getter('loading') public loading?: boolean
  @Getter('showToast') public showToast?: string
  @Getter('showAlert') public showAlert?: string
  @Watch('$route')
  public onRouteChange() {
    this.setNavState(false)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/function';
@font-face {
  font-family: 'icon'; /* project id 172436 */
  src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot');
  src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_w71lovnj7adobt9.woff') format('woff'),
    url('//at.alicdn.com/t/font_w71lovnj7adobt9.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_w71lovnj7adobt9.svg#iconfont') format('svg');
}

.icon {
  font-family: 'icon' !important;
  font-size: 18px;
  font-style: normal;
  color: #ffffff;
}

html,
body {
  height: 100%;
}

a.active {
  text-decoration: none;
}

#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background: #f5f5f5;
  .content {
    padding-top: px2rem(100px);
    background: #f5f5f5;
  }
  .tabar {
    margin-bottom: px2rem(120px);
  }
  //渐变动效
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 0.1s ease-in;
    opacity: 1;
  }
  .slide-left-enter,
  .slide-left-leave-active {
    opacity: 0;
  }

  //左滑动效
  // .slide-left-enter-active {
  //   animation: slideLeft .3s;
  // }
}

@keyframes slideLeft {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
