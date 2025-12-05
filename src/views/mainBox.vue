<template>
  <div class="main">
    <div
      class="left"
      :style="{ maxWidth: userStore.isCollapse ? '72px' : '220px' }"
    >
      <sideMenu />
    </div>
    <div class="scrollContainer">
      <div class="right" ref="rightContainer">
        <div
          class="top"
          style="border-radius: 8px; opacity: 0.5"
          :class="{ fixed: isMove }"
        >
          <div class="topBar-left" style="flex: 1">
            <div
              class="flexCenter flash"
              @click="userStore.isCollapse = !userStore.isCollapse"
            >
              <img
                :src="
                  userStore?.isCollapse
                    ? icon.collapseSelect
                    : icon.collapseDefault
                "
                alt="collapse"
              />
            </div>
          </div>
          <div class="topBar-right" style="flex: 1"></div>
        </div>
        <div
          class="occupy"
          :style="{
            height: isMove ? '60px' : '0',
            width: '100%',
            flexShrink: 0,
          }"
        ></div>
        <div class="bottom">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import sideMenu from "@/components/sideMenu.vue";
import { onMounted, ref, onUnmounted, nextTick } from "vue";
import icon from "@/assets/icon/svg";
import { useUserStore } from "@/stores/UserStore";
const userStore = useUserStore();
const isMove = ref(false);
let initialOffsetTop = 0;
const rightContainer:any = ref(null);
const handleScroll = () => {
  if (rightContainer.value) {
    const scrollTop = rightContainer.value.scrollTop;
    isMove.value = scrollTop > initialOffsetTop;
  }
};
onMounted(() => {
  nextTick(() => {
    if (rightContainer.value) {
      const topEl:any = document.querySelector(".top");
      if (topEl) {
        initialOffsetTop = topEl.offsetTop;
      }
      rightContainer.value.addEventListener("scroll", handleScroll);
    }
  });
});
onUnmounted(() => {
  if (rightContainer.value) {
    rightContainer.value.removeEventListener("scroll", handleScroll);
  }
});
</script>
<style lang="scss" scoped>
.scrollContainer {
  position: relative;
  width: calc(100% - 20px);
  height: 100%;
  display: flex;
  margin-left: 10px;
  margin-right: 10px;

  flex: 1;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f5f5f5;

  .left {
    flex: 1;
    transition: max-width 0.3s ease;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    .top {
      height: 60px;
      padding-top: 8px;
      padding-bottom: 8px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-shrink: 0;
    }

    .bottom {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
    }

    &::-webkit-scrollbar {
      width: 0;
      /* 滚动条宽度设为0，视觉上隐藏 */
      height: 0;
    }

    /* Firefox */
    scrollbar-width: none;
  }
}

.fixed {
  position: absolute;
  width: 100%;
  background-color: #ffffff;
  z-index: 10;
}
.flash {
  width: 32px;
  height: 32px;
  transition: transform 0.2s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.1); /* 鼠标悬停时轻微放大 */
  }
}
</style>
