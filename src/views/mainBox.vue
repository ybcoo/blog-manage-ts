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
        <Navigation
          :is-fixed="isMove"
          :is-collapse="userStore.isCollapse"
          @toggle-collapse="userStore.isCollapse = !userStore.isCollapse"
        />
        <div class="bottom">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import sideMenu from "@/components/sideMenu.vue";
import Navigation from "@/components/Navigation.vue";
import { onMounted, ref, onUnmounted, nextTick } from "vue";
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

    .bottom {
      width: 100%;
      height: 100%;
      flex-shrink: 0;
    }

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    /* Firefox */
    scrollbar-width: none;
  }
}
</style>