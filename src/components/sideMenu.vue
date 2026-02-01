<template>
  <div class="mainMenu">
    <nav class="menu">
      <div class="menu-item gap_c5">
        <div
          class="menu-item-content menuStyle hoverBg"
          @click="showSetiings = !showSetiings"
        >
          <div class="spanFlash" style="flex: 1">
            <div class="pic">I</div>
            <span class="flash" v-show="!userStore.isCollapse">Blankness</span>
          </div>
          <div v-show="!userStore.isCollapse" class="arrow flash">
            <img :src="icon.arrow" alt="arrow" />
          </div>
        </div>
        <div class="subMenu gap_c5" v-show="showSetiings">
          <router-link
            class="linkStyle menuStyle"
            :class="{
              isSelect: route.name === 'article',
              hoverBg: route.name !== 'article',
            }"
            to="/article"
          >
            <div class="spanFlash">
              <div class="pic">M</div>
              <span class="flash" v-show="!userStore.isCollapse"
                >My article</span
              >
            </div>
          </router-link>
          <router-link
            class="linkStyle menuStyle"
            :class="{
              isSelect: route.name === 'settings',
              hoverBg: route.name !== 'settings',
            }"
            to="/settings"
          >
            <div class="spanFlash">
              <div class="pic">S</div>
              <span class="flash" v-show="!userStore.isCollapse">Settings</span>
            </div>
          </router-link>
          <div class="spanFlash menuStyle hoverBg">
            <div
              class="linkStyle  "
              @click="clickLogout"
            >
              <div class="pic">L</div>
              <span class="flash" v-show="!userStore.isCollapse">Logout</span>
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <router-link
        class="menu-item menu-item-content menuStyle"
        :class="{
          isSelect: route.name === 'home',
          hoverBg: route.name !== 'home',
        }"
        to="/home"
      >
        <div class="spanFlash">
          <div class="pic">H</div>
          <span class="flash" v-show="!userStore.isCollapse">Home</span>
        </div>
      </router-link>
      <router-link
        class="menu-item menu-item-content menuStyle"
        :class="{
          isSelect: route.name === 'about',
          hoverBg: route.name !== 'about',
        }"
        to="/about"
      >
        <div class="spanFlash">
          <div class="pic">A</div>
          <span class="flash" v-show="!userStore.isCollapse">About</span>
        </div>
      </router-link>
      <router-link
        class="menu-item menu-item-content menuStyle"
        :class="{
          isSelect: route.name === 'share',
          hoverBg: route.name !== 'share',
        }"
        to="/share"
      >
        <div class="spanFlash">
          <div class="pic">S</div>
          <span class="flash" v-show="!userStore.isCollapse">Share</span>
        </div>
      </router-link>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/UserStore";
import icon from "../assets/icon/svg";
const userStore = useUserStore();
const showSetiings = ref(false);
const router = useRouter();
const route = useRoute();
const clickLogout = () => {
  router.push("/login");
  localStorage.removeItem("token");
};
</script>
<style lang="scss" scoped>
.pic {
  width: 32px;
  height: 32px;
  // padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.subMenu {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .linkStyle {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
}

.arrow {
  width: 32px;
  height: 32px;
  // padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pd-tb {
  padding-top: 10px;
  padding-bottom: 10px;
}
.menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
}

.menuStyle {
  height: 36px;
  width: 100%;
  flex: 1;
}

.menu-item-content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.page {
  margin-top: 10px;
  font-family: Inter, Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  line-height: 1.25;
  display: block;
  padding-left: 36px;
  opacity: 1;
  text-transform: uppercase;
  text-decoration: none;
  color: rgb(23, 23, 23);
  font-weight: 700;
}
.gap_c5 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
}
.mainMenu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  border-radius: 10px;
  background-color: #fff;
}

.line {
  height: 1px;
  width: 100%;
  background-color: #ededed;
}
.hoverBg {
  &:hover {
    background-color: #ededed;
    border-radius: 8px;
  }
}
.isSelect {
  background-color: black;
  color: white;
  border-radius: 8px;
}
.flash {
  transition: opacity 0.3s ease, width 0.3s ease, margin 0.3s ease;
  white-space: nowrap; /* 文字不换行，宽度计算稳定 */
  overflow: hidden;
}
span {
  display: inline-block;
}
.spanFlash {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
}
</style>
