<template>
  <div id="setting">
    <div class="r8 pd10 header bgColor">
      <div class="left">
        <a-upload
          action="/"
          :fileList="infoForm.file ? [infoForm.file] : []"
          :show-file-list="false"
          :auto-upload="false"
          @change="onChange"
        >
          <template #upload-button>
            <a-avatar class="flexCenter" trigger-type="mask" :size="80">
              <IconUser v-if="!userStore.avatar"/>
              <img v-else :src="userStore.avatar" alt="">
              <template #trigger-icon>
                <IconEdit />
              </template>
            </a-avatar>
          </template>
        </a-upload>
      </div>
      <div class="right">
        switch to invisible<a-switch type="line" checked-color="black" unchecked-color="grey" />
      </div>
    </div>
    <div class="r8 pd10 info bgColor">
      <div class="title">
        <h2>Basic Info</h2>
      </div>
      <div class="row">
        <div class="left">
          <span class="label">First Name</span>
          <input type="text" class="border-none input" placeholder="Your name" />
        </div>
        <div class="right">
          <span class="label">Last Name</span>
          <input type="text" class="border-none input" placeholder="Your name" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <span class="label">Email</span>
          <input type="text" class="border-none input" placeholder="example@email.com" />
        </div>
        <div class="right">
          <span class="label">Gender</span>
          <input type="text" class="border-none input" placeholder="select" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <span class="label">Location</span>
          <input type="text" class="border-none input" placeholder="China,Hang Zhou" />
        </div>
        <div class="right">
          <span class="label">Phone Number</span>
          <input type="text" class="border-none input" placeholder="+86 16666666666" />
        </div>
      </div>
      <div class="row">
        <div class="left">
          <span class="label">Role</span>
          <input type="text" class="border-none input" placeholder="CEO" />
        </div>
        <div class="right">
          <div class="btnContainer">
            <button class="btn defaultBtn" v-ripple>Save Info</button>
          </div>
        </div>
      </div>
    </div>
    <div class="r8 pd10 password bgColor">
      <div class="title">
        <h2>Change Password</h2>
      </div>
      <div class="row">
        <div class="input-container">
          <input
            type="text"
            class="floating-input"
            v-model="infoForm.currentPassword"
            placeholder=""
          />
          <label class="floating-label">Current Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-container">
          <input
            type="text"
            class="floating-input"
            v-model="infoForm.newPassword"
            placeholder=""
          />
          <label class="floating-label">New Password</label>
        </div>
      </div>
      <div class="row">
        <div class="input-container">
          <input
            type="text"
            class="floating-input"
            v-model="infoForm.confirmPassword"
            placeholder=""
          />
          <label class="floating-label">Cofirm New Password</label>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div class="title m-t10-b10">
            <h2>Password Requirements</h2>
          </div>
          <ul>
            <li class="tip">One special characters</li>
            <li class="tip">Min 6 characters</li>
            <li class="tip">One number</li>
            <li class="tip">Change it often</li>
          </ul>
        </div>
        <div class="right">
          <div class="btnContainer">
            <button class="btn defaultBtn" v-ripple>Save Password</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IconEdit, IconUser } from "@arco-design/web-vue/es/icon";
import { reactive,ref } from "vue";
import { useUserStore } from "@/stores/UserStore";
const userStore=useUserStore()
const vRipple = {
  mounted(el: any) {
    const cs = getComputedStyle(el);
    if (cs.position === "static") {
      el.style.position = "relative";
    }
    if (cs.overflow !== "hidden") {
      el.style.overflow = "hidden";
    }

    function createRipple(e: any) {
      const isTouch = e && e.touches && e.touches.length > 0;
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = clientX - rect.left - size / 2;
      const y = clientY - rect.top - size / 2;

      // 只保留一个波纹：先清除已有的
      const existingRipple = el.querySelector(".ripple");
      if (existingRipple) {
        existingRipple.remove();
      }

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      el.appendChild(ripple);

      // 动画结束后移除当前这次的波纹
      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });
    }

    // 简单绑定事件（不保存引用，不做卸载）
    el.addEventListener("click", createRipple);
    el.addEventListener("touchstart", createRipple, { passive: true });
  },
};
const infoForm:any = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  file:null
});
const onChange=(_:any,fileItem:any)=>{
  infoForm.file=fileItem?.file
  userStore.avatar = URL.createObjectURL(fileItem?.file)
  
}
</script>
<style lang="scss" scoped>
ul {
  margin: 0;

  /* 明确左缩进：如果希望紧贴父容器左内边距，设为 0；否则给一个你需要的值 */
  padding-inline-start: 0; /* 或 0，根据设计 */

  /* 选择 marker 的位置策略 */
  list-style-position: inside;
}
#setting {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .password {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    width: 100%;
    padding: 10px;
    .left,
    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .label {
        padding-top: 5px;
        padding-bottom: 5px;
        color: #909090;
      }
      &:has(input:focus) .label {
        color: #000;
      }
      .btnContainer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
      }
    }
    .right {
      margin-left: 10px;
    }
    .input {
      width: 100%;
      &:focus {
        border-bottom-color: #000;
        transition: border-color 0.2s ease;
      }
    }
  }
}
.input-container {
  position: relative;
  width: 100%;
  padding-top: 6px;
  padding-bottom: 6px;
  .floating-input {
    width: 100%;
    padding: 12px 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: border-width 0.2s ease-in-out, border-color 0.2s ease-in-out;
    box-sizing: border-box;
    &:focus {
      border: 1px solid black;
      transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
    }
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
    transition: top 0.2s ease-in-out, font-size 0.2s ease-in-out, color 0.2s ease-in-out,
      transform 0.2s ease-in-out;
  }
  /* 选择器之间逗号后加空格，:not() 内部无多余空格 */
  .floating-input:focus + .floating-label,
  .floating-input:not(:placeholder-shown) + .floating-label {
    top: 6px;
    transform: translateY(-50%);
    font-size: 12px;
    color: black;
  }
}
.tip {
  color: rgb(115, 115, 115);
  font-size: 0.875rem;
  line-height: 1.5;
}
.defaultBtn {
  padding: 10px 20px;
  font-size: 12px;
}
.f1-r8 {
  flex: 1;
  border-radius: 8px;
}
.r8 {
  border-radius: 8px;
}
.pd10 {
  padding: 10px;
}
span {
  display: inline-block;
}
::v-deep .arco-avatar-image {
  display: flex;
  justify-content: center;
  align-items: center;
}
.arco-switch-type-line::after {
  height: 14px;
  border-radius: 8px;
}
.m-t10-b10 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.border-none {
  border: none;
  outline: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  padding-bottom: 5px;
}
.bgColor {
  background-color: white;
}
</style>
