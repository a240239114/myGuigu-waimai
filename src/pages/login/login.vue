<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="[loginWay?'on':'']" @click.prevent="changeLoginWay">短信登录</a>
          <a href="javascript:;" :class="[loginWay?'':'on']" @click.prevent="changeLoginWay">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="[loginWay?'on':'']">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <button
                class="get_verification"
                ref="btn"
                :disabled="!phoneTrue"
                :class="[phoneTrue?'right_phone':'']"
                @click.prevent="getCode"
              >{{showTime > 0? `剩余${showTime}s`:"获取验证码"}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>

          <div :class="[loginWay?'':'on']">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
              </section>

              <section class="login_verification" v-if="showPwdFlag">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" />
                <div class="switch_button off" @click="showPwd">
                  <div class="switch_circle"></div>
                  <span class="switch_text">...</span>
                </div>
              </section>

              <section class="login_verification" v-else>
                <input type="tel" maxlength="8" placeholder="密码" v-model="pwd" />
                <div class="switch_button on" @click="showPwd">
                  <div class="switch_circle button_right"></div>
                  <span class="switch_text">abc</span>
                </div>
              </section>

              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img
                  class="get_verification"
                  ref="captcha"
                  src="http://guigu_zhipinjiekou.gjxbewater.cn:8080/captcha"
                  alt="captcha"
                  @click="changeCaptcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="gotoLogin">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>

      <alertTip v-show="showTip" :alertText="alertText" @closeTip="closeTip"></alertTip>
    </div>
  </section>
</template>

<script>
// import { Toast } from "mint-ui";
import alertTip from "../../components/AlertTip/alertTip";
import { reqPwdLogin, reqSendCode, reqSmsLogin } from "../../api";

// import ajax from '../../api/ajax'

export default {
  data: function() {
    return {
      loginWay: true,
      phone: "", //手机号码
      code: "", //验证码
      pwd: '', //手机密码
      captcha: '', //验证码
      name: '',
      showTime: 0,
      showPwdFlag: true,
      showTip: false, //显示和隐藏alert
      alertText: ""
    };
  },


  mounted(){},

  components: {
    alertTip
  },

  methods: {
    changeLoginWay() {
      //改变登录方式
      this.loginWay = !this.loginWay;
    },

    getCode() {
      // this.refs.btn;

      //获取验证码
      if (this.showTime == 0) {
        //获取验证码
        reqSendCode(this.phone);

        //避免重复点击出现BUG
        this.showTime = 30;
        var that = this;

        //启动定时器
        var timeId = setInterval(function() {
          //this的指向改变了
          that.showTime--;

          if (that.showTime == 0) {
            //清除定时器
            clearInterval(timeId);
          }
        }, 1000);
      }
    },

    alertTipMethod(alertText) {
      this.showTip = true;
      this.alertText = alertText;
    },

    async gotoLogin() {
      //前台检查
      if (this.loginWay) {
        //短信登录检查
        if (this.phone == "") {
          // alert("请输入手机号");
          // Toast("请输入手机号");

          this.alertTipMethod("请输入手机号");
        } else if (this.code == "") {
          this.alertTipMethod("请输入验证码");
        } else {
          //短信登录
          const { phone, code } = this;
          const res = await reqSmsLogin({ phone, code });
          console.log(res);
          if (res.code == 1) {
            this.alertTipMethod("验证码错误");
          } else {
            this.alertTipMethod("登录成功");

            //保存用户信息
            this.$store.dispatch("recordUser", res.data);

            //页面跳转
            this.$router.push("/profile");
          }
        }
      } else {
        //密码登录检查
        if (this.name == "") {
          this.alertTipMethod("请输入用户名");
        } else if (this.pwd == "") {
          this.alertTipMethod("请输入密码");
        } else if (this.captcha == "") {
          this.alertTipMethod("请输入图形验证码");
        } else {
          // var that = this;
          //密码登录
          const { name, pwd, captcha } = this;
          console.log(name, pwd, captcha); 
          
          
          const res = await reqPwdLogin({name, pwd, captcha});
          console.log(res);

          if (res.code == 1) {
            this.alertTipMethod("验证码错误");
            this.changeCaptcha();

          } else {
            this.alertTipMethod("登录成功");

            //保存用户信息
            this.$store.dispatch("recordUser", res.data);

            //页面跳转
            this.$router.push("/profile");
          }



        }
      }
    },

    showPwd() {
      //显示密码
      this.showPwdFlag = !this.showPwdFlag;
    },

    closeTip() {
      this.showTip = false;
      this.alertText = "";
    },

    changeCaptcha() {
      //点击验证码级自动重新获取
      this.$refs.captcha.src =
        "http://guigu_zhipinjiekou.gjxbewater.cn:8080/captcha?" + new Date();
    }
  },

  computed: {
    phoneTrue() {
      //监听phone当是以1开头的11位数组就返回true
      return /^1\d{10}$/.test(this.phone);
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.button_right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>