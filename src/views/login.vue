<template>
  <div id="login" :style="{ backgroundImage: `url(${backImg})`, backgroundSize: 'cover' }">
    <!-- <video class="bg-video" src="https://pixabay.com/videos/download/video-141984_medium.mp4" autoplay loop muted playsinline></video> -->
    <div class="header"></div>
    <div class="main flexCenter">
        <Transition name="login">
            <div v-if="mode === 'login'" class="setting">
        <div class="top">
          <h4 style="font-size: 1.5rem; color: white; font-weight: 600">Sign in</h4>
          <h4 style="font-size: 1.5rem; color: white; font-weight: 600">欢迎回来</h4>
        </div>
        <div class="bottom">
          <div class="input">
            <div class="input-container">
              <input
                type="text"
                class="floating-input"
                v-model="loginForm.account"
                placeholder=""
              />
              <label class="floating-label">{{ accountLabel }}</label>
            </div>
            <div class="input-container">
              <input
                type="password"
                class="floating-input"
                v-model="loginForm.password"
                placeholder=""
              />
              <label class="floating-label">{{ passwordLabel }}</label>
            </div>
          </div>
          <button class="login-btn" @click="handleLogin">Sign in</button>
        </div>
        <div class="bottom-tip">
            <div class="tipContainer"></div>
            <div class="tipContainer"><span>Don't have account?</span></div>
          <div class="tipContainer flex-end"><span class="tip" @click="changeMode('register')">To Register</span></div>
        </div>
      </div>
        </Transition>
      <Transition name="register">
        <div v-if="mode==='register'" class="setting">
        <div class="top">
          <h4 style="font-size: 1.5rem; color: white; font-weight: 600">Sign Up</h4>
          <h4 style="font-size: 1.5rem; color: white; font-weight: 600">欢迎注册</h4>
        </div>
        <div class="bottom">
          <div class="input">
            <div class="input-container">
              <input
                type="text"
                class="floating-input"
                v-model="registerForm.account"
                placeholder=""
              />
              <label class="floating-label">{{ accountLabel }}</label>
            </div>
            <div class="input-container">
              <input
                type="password"
                class="floating-input"
                v-model="registerForm.password"
                placeholder=""
              />
              <label class="floating-label">{{ passwordLabel }}</label>
            </div>
            <div class="input-container">
              <input
                type="password"
                class="floating-input"
                v-model="registerForm.confirmPassword"
                placeholder=""
              />
              <label class="floating-label">{{ confirmPasswordLabel }}</label>
            </div>
          </div>
          <button class="login-btn" @click="handleRegister">Register</button>
        </div>
        <div class="bottom-tip">
            <div class="tipContainer"></div>
            <div class="tipContainer"><span>Already have account?</span></div>
          <div class="tipContainer flex-end"><span class="tip" @click="changeMode('login')">To Login</span></div>
        </div>
      </div>
      </Transition>
      
    </div>
    <div class="footer flexCenter" style="color: white; font-size: 15px">
      <div class="flexBetween" style="width: 80%">
        <span>Designed by Yu Bingcao in 2025</span>
        <span @click="handleToBlog" style="cursor: pointer">About Me</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import backImg from "@/assets/image.png";
import { reactive, ref } from "vue";

import { loginHooks } from "@/hooks/loginHooks.js";

const {mode,loginForm,registerForm,handleLogin,handleRegister}=loginHooks()

const accountLabel = ref("Account");
const passwordLabel = ref("Password");
const confirmPasswordLabel=ref('ConfirmPassword')
const changeMode=(value:string)=>{
    mode.value=value
}
const handleToBlog = () => {
  window.open("https://ybcoo.github.io/blog", "_blank");
};
</script>
<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .bg-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .header {
    flex: 1;
  }

  .footer {
    flex: 1;
  }
}

.main {
  flex: 8;
}

.setting {
  background-color: white;
  border-radius: 8px;
  height: 60%;
  max-width: 420px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .top {
    flex: 2;
    margin: 16px 16px 8px;
    padding: 16px;
    text-align: center;
    opacity: 1;
    background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
    color: rgb(23, 23, 23);
    border-radius: 0.5rem;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bottom {
    flex: 8;
    margin-top: 20px;
    padding-left: 16px;
    padding-right: 16px;
    /* display: flex;
        flex-direction: column;
        justify-content: space-between; */
  }
  .bottom-tip {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding:20px 16px;
    .tipContainer{
        flex: 1;
        display: flex;
        align-items: center;
        white-space: nowrap;
        &.flex-end{
            display: flex;
            justify-content: flex-end;
        }
    }
    .tip {
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      color: #000;
      &:hover {
        color: #999;
      }
    }
  }
}

.input-container {
  position: relative;
  width: 100%;
  padding-top: 6px;
  padding-bottom: 6px;
}

.floating-input {
  width: 100%;
  padding: 12px 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition:
    border-width 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  box-sizing: border-box;
}

.floating-label {
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 16px;
  pointer-events: none;
  padding: 0 6px;
  background: white;
  transition:
    top 0.2s ease-in-out,
    font-size 0.2s ease-in-out,
    color 0.2s ease-in-out,
    transform 0.2s ease-in-out;
}

/*确保 :not() 格式正确，逗号后加空格 */
.floating-input:focus {
  border: 1px solid black;
  transition:
    box-shadow 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
}

/* 选择器之间逗号后加空格，:not() 内部无多余空格 */
.floating-input:focus + .floating-label,
.floating-input:not(:placeholder-shown) + .floating-label {
  top: 6px;
  transform: translateY(-50%);
  font-size: 12px;
  color: black;
}

.login-btn {
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25));
  color: rgb(23, 23, 23);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 40px;
  position: relative;
  overflow: hidden;
}

.login-btn:hover {
  background-color: #333;
}
.login-leave-from {
  transform: translateX(-80); 
  opacity: 1;
}
.login-leave-active {
  transition: all 0.5s ease-in-out; // 过渡所有属性，流畅
}
.login-leave-to {
  transform: translateX(-100%); // 离场结束：左平移100%（完全移出视口）
  opacity: 0;
}
.login-enter-from {
  opacity: 0;
  transform: translateX(-20px); // 轻微左移，入场更自然
}
.login-enter-active {
  transition: all 0.5s ease-in-out;
}
.login-enter-to {
  opacity: 1;
  transform: translateX(0);
}
// 注册模块：可选入场动画（轻微淡入，无平移，避免突兀），离场无特殊动画
.register-enter-from {
  opacity: 0;
  transform: translateX(20px); // 轻微右移，入场更自然
}
.register-enter-active {
  transition: all 0.5s ease-in-out;
}
.register-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.register-leave-from {
  transform: translateX(80); 
  opacity: 1;
}
.register-leave-active {
  transition: all 0.5s ease-in-out; // 过渡所有属性，流畅
}
.register-leave-to {
  transform: translateX(100%); // 离场结束：右平移100%（完全移出视口）
  opacity: 0;
}
</style>

<style lang="css">
.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  /* 微调透明度，让效果更明显 */
  transform: scale(0);
  /* 初始状态：缩小到0（不可见） */
  animation: ripple 4s cubic-bezier(0.25, 0.8, 0.25, 1);
  /* 优化动画曲线，更流畅 */
  pointer-events: none;
  /* 避免阻挡按钮点击 */
}

/* 扩散动画 */
@keyframes ripple {
  to {
    transform: scale(6);
    /* 扩散到6倍大小（确保覆盖整个按钮） */
    opacity: 0;
    /* 动画结束时完全透明 */
  }
}
</style>
