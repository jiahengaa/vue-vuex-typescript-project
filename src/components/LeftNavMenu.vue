<template>
  <div class="header" role="banner">
    <h1 class="logo">
      <a href="#">
        中台
        <span>客户端</span>
      </a>
    </h1>
    <div class="nav-wrap">
      <nav class="main-nav" role="navigation">
        <ul class="unstyled list-hover-slide">
          <li>
            <a href="#/home">插件库</a>
          </li>
          <li>
            <a href="#">预览项目</a>
          </li>
          <li>
            <a href="#">指定路径</a>
          </li>
          <li>
            <a href="#">生成项目</a>
          </li>
          <li>
            <a href="#">Git管理</a>
          </li>
        </ul>
      </nav>
      <ul class="social-links list-inline unstyled list-hover-slide">
        <li>
          <a href="#/uploadPage">上传</a>
        </li>
        <li>
          <a href="#">点赞</a>
        </li>
        <li>
          <a href="#">需求</a>
        </li>
        <li>
          <a href="#" @click="handleQuit">退出</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component({
  name: 'leftNavMenu'
})
export default class LeftNavMenu extends Vue {
  private handleQuit(e: any) {
    console.log('quit')
  }
}
</script>

<style lang="scss" scoped>
*,
:before,
:after {
  box-sizing: border-box;
}
// FONTS
$sans: 'Source Sans Pro', Helvetica, Arial, sans-serif;

// COLORS
$orange: #df4500;
$gray: #35302d;
$gray-shine: #7c6e67;
$white-off: #dfdbd9;

// REUSABLE STYLES
.unstyled {
  list-style: none;
  padding: 0;
  margin: 0;
  a {
    text-decoration: none;
  }
}
.list-inline {
  overflow: hidden;
  li {
    float: left;
  }
}

// HEADER STYLES
.header {
  // position: relative;
  // left: 0;
  // top: 0;
  // bottom: 0;
  margin: 0;
  padding: 0;
  height: 100vh;
  background: $gray;

  display: flex;
  flex-direction: column;
}

.logo {
  font: 300 2em $sans;
  text-align: center;
  padding: 0;
  margin: 0;
  -webkit-app-region:drag;

  a {
    display: block;
    padding: 1em 0;
    color: $white-off;
    text-decoration: none;
    transition: 0.15s linear color;

    &:hover {
      color: #fff;
      span {
        color: $orange;
      }
    }
  }

  span {
    font-weight: 700;
    transition: 0.15s linear color;
  }
}

.nav-wrap{
  width: 300px;
  // MAIN NAV
  .main-nav {
    ul {
      border-top: solid 1px $gray-shine;
    }

    li {
      border-bottom: solid 1px $gray-shine;
    }

    a {
      padding: 1.1em 0;
      color: $white-off;

      font: 400 1.125em $sans;
      text: {
        align: center;
        transform: lowercase;
      }

      &:hover {
        color: #fff;
      }
    }
  }

  // SOCIAL LINKS
  .social-links {
    border-bottom: solid 1px $gray-shine;

    li {
      width: 25%;
      border-left: solid 1px $gray-shine;
      &:first-child {
        border: none;
      }
    }

    a {
      display: block;
      height: 5.5em;
      text-align: center;
      color: $gray-shine;
      font: 0.75em/5.5em $sans;
      &:hover {
        color: $white-off;
      }
    }
  }

  // HOVER SLIDE EFFECT
  .list-hover-slide {
    li {
      position: relative;
      overflow: hidden;
    }

    a {
      display: block;
      position: relative;
      z-index: 1;

      transition: 0.35s ease color;

      &:before {
        content: '';
        display: block;
        z-index: -1;
        position: absolute;
        left: -100%;
        top: 0;
        width: 100%;
        height: 100%;
        border-right: solid 5px $orange;
        background: $gray-shine;
        transition: 0.35s ease left;
      }

      &.is-current,
      &:hover {
        &:before {
          left: 0;
        }
      }
    }
  }
}

</style>

