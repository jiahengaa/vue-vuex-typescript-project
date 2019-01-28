<template>
  <div class="login" id="login">
    <a href="javascript:;" class="log-close">
      <i class="icons close"></i>
    </a>
    <div class="log-bg">
      <div class="log-cloud cloud1"></div>
      <div class="log-cloud cloud2"></div>
      <div class="log-cloud cloud3"></div>
      <div class="log-cloud cloud4"></div>

      <div class="log-logo">欢迎学习!</div>
      <div class="log-text">主人</div>
    </div>
    <div class="log-email">
      <input
        type="text"
        placeholder="邮箱"
        :class="'log-input' + (loginState.account==''?' log-input-empty':'')"
        v-model="loginState.account"
      >
      <input
        type="password"
        placeholder="密码"
        :class="'log-input' + (loginState.password==''?' log-input-empty':'')"
        v-model="loginState.password"
      >
      <a href="javascript:;" class="log-btn" @click="login">登录</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { AxiosResponse } from 'axios'
import LoginState from '../model/LoginState'
import { setTimeout } from 'timers'
import * as $ from '../store/mutation-login-types'

@Component({})
export default class Login extends Vue {
  @Provide() public loginState: LoginState = new LoginState()

  @Getter('getToken') public getToken?: any
  @Action($.setToken) public setToken?: any

  public login() {
    if (this.loginState.account !== '' && this.loginState.password !== '') {
      this.doLogin()
    }
  }

  public doLogin() {
    this.loginState.isLoading = true
    const loginParam = {
      name: this.loginState.account,
      password: this.loginState.password
    }

    Vue.axios
      .post('/token/login', loginParam)
      .then((response: AxiosResponse<any>) => {
        console.log(response)
        this.setToken(response.data.token)
        console.log(this.$router.currentRoute)
        if (this.$router.currentRoute.query === {}) {
          this.$router.replace('/')
        } else {
          this.$router.replace(this.$router.currentRoute.query.redirect.toString())
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}
</script>


<style lang="scss" scoped>
@-webkit-keyframes cloud1 {
  0% {
    left: 200px;
  }
  100% {
    left: -130px;
  }
}
@keyframes cloud1 {
  0% {
    left: 200px;
  }
  100% {
    left: -130px;
  }
}

@-webkit-keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}
@keyframes cloud2 {
  0% {
    left: 500px;
  }
  100% {
    left: -90px;
  }
}

@-webkit-keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}
@keyframes cloud3 {
  0% {
    left: 620px;
  }
  100% {
    left: -70px;
  }
}
@-webkit-keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}
@keyframes cloud4 {
  0% {
    left: 100px;
  }
  100% {
    left: -70px;
  }
}

.login {
  position: fixed;
  overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -350px;
  width: 500px;
  min-height: 555px;
  z-index: 10;
  right: 140px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 3px 16px -5px #070707;
  .log-close {
    display: block;
    position: absolute;
    top: 12px;
    right: 12px;
    opacity: 1;
    .icons {
      opacity: 1;
      transition: all 0.3s;
    }
    &:hover {
      .icons {
        transform: rotate(180deg);
      }
    }
  }
  .log-bg {
    background: url(../assets/images/login-bg.jpg);
    width: 100%;
    height: 312px;
    overflow: hidden;

    .log-cloud {
      background: url(../assets/images/login-cloud.png);
      width: 63px;
      height: 40px;
      position: absolute;
      z-index: 1;
    }

    .cloud1 {
      top: 21px;
      left: -30px;
      transform: scale(0.6);
      animation: cloud1 20s linear infinite;
    }
    .cloud2 {
      top: 87px;
      right: 20px;
      animation: cloud2 19s linear infinite;
    }
    .cloud3 {
      top: 160px;
      left: 5px;
      transform: scale(0.8);
      animation: cloud3 21s linear infinite;
    }
    .cloud4 {
      top: 150px;
      left: -40px;
      transform: scale(0.4);
      animation: cloud4 19s linear infinite;
    }

    .log-logo {
      height: 80px;
      margin: 120px auto 25px;
      text-align: center;
      color: #1fcab3;
      font-weight: bold;
      font-size: 40px;
    }
    .log-text {
      color: #57d4c3;
      font-size: 16px;
      text-align: center;
      margin: 0 auto;
      z-index: 2;
    }
  }
  .log-email {
    text-align: center;
    margin-top: 20px;

    .log-input {
      width: 370px;
      overflow: hidden;
      padding: 0 15px;
      font-size: 13px;
      border: 1px solid #ebebeb;
      margin: 0 auto 15px;
      height: 48px;
      line-height: 48px;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      -ms-border-radius: 5px;
      -o-border-radius: 5px;
      border-radius: 5px;
    }

    .log-input-empty {
      border: 1px solid #f37474 !important;
    }

    .log-input.warn {
      border: 1px solid #f88787;
    }

    .log-btn {
      width: 402px;
      display: block;
      line-height: 50px;
      margin: 0 auto 15px;
      height: 50px;
      color: #fff;
      font-size: 18px;
      border-radius: 5px;
      background-color: #50e3ce;
      text-align: center;
      &:hover,
      :focus {
        color: #fff;
        opacity: 0.8;
      }
    }
  }
}
</style>
