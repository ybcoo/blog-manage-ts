<template>
  <div>
    <div class="top" style="border-radius: 8px; opacity: 0.5" :class="{ fixed: isFixed }">
      <div class="topBar-left" style="flex: 1">
        <div class="flexCenter flash" @click="handleToggleCollapse">
          <img :src="isCollapse ? icon.collapseSelect : icon.collapseDefault" alt="collapse" />
        </div>
        <div v-if="route.name=='home'" class="listButton">
            <button class="btnPage">last</button>
            <span>{{'1/1'}}</span>
            <button class="btnPage">next</button>
          </div>
      </div>
      <div class="topBar-right" style="flex: 1">
        <div class="save-btn" v-if="route.name == 'article'" @click="saveForm">Save Info</div>
        <div class="listConfig" v-if="route.name=='home'&& atricleStore?.selectedItem">
          <div class="tipMode">{{ atricleStore?.deleteIdList?.length?'Multiple Pick':'Single Pick' }}</div>
          <div class="option">
            <button class="btnPage">编辑</button>
          <button class="btnPage red" @click="handleArticleDelete">删除</button>
          </div>
          
        </div>
      </div>
    </div>
    <div
      class="occupy"
      :style="{
        height: isFixed ? '60px' : '0',
        width: '100%',
        flexShrink: 0,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import icon from "@/assets/icon/svg";
import { useRoute } from "vue-router";
import { useArticleStore } from "@/stores/AtricleStore";
import { navigationHooks } from "@/hooks/navigationHooks";
// 定义 props
const props = defineProps<{
  isFixed: boolean;
  isCollapse: boolean;
}>();
// 定义 emits
const emit = defineEmits<{
  (e: "toggleCollapse"): void;
  (e:'refreshHome'):void
}>();
const {saveForm,handleArticleDelete}=navigationHooks(emit)
const atricleStore = useArticleStore();
const route = useRoute();

// 处理切换侧边栏
const handleToggleCollapse = () => {
  emit("toggleCollapse");
};
</script>

<style lang="scss" scoped>
.top {
  height: 60px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;
  .topBar-left{
    display: flex;
    align-items: center;
    gap: 20px;
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
    transform: scale(1.1);
  }
}
.topBar-right {
  display: flex;
  justify-content: flex-end;
  .save-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 8px 20px;
    border-radius: 8px; // 圆角胶囊按钮
    border: 1px solid rgba(0, 0, 0, 0.08);

    background-color: #fff;
    color: #000; // 保持你现在的字体颜色
    font-size: 14px;
    font-weight: 500;

    cursor: pointer;
    user-select: none;

    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
    transition: all 0.18s ease-out;

    &:hover {
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.14);
      transform: translateY(-1px);
    }

    &:active {
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.16);
      transform: translateY(0);
      background-color: #000;
      color: #fff;
    }
  }
}
.listButton{
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  
}
.listConfig{
  width: 100%;
  display: flex;
  .tipMode{
    display: flex;
    flex: 1;
    font-weight: 600;
  }
  .option{
    display: flex;
    flex: 1;
    justify-content: flex-end;
    gap: 10px;
    padding-right: 20px;
  }
}
.btnPage{
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding:2px 5px;
    border-radius: 8px; // 圆角胶囊按钮
    border: 1px solid rgba(0, 0, 0, 0.08);

    background-color: #fff;
    color: #000; // 保持你现在的字体颜色
    font-size: 14px;
    font-weight: 500;

    cursor: pointer;
    user-select: none;

    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
    transition: all 0.18s ease-out;

    &:hover {
      box-shadow: 0 4px 10px rgba(15, 23, 42, 0.14);
      transform: translateY(-1px);
    }

    &:active {
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.16);
      transform: translateY(0);
      background-color: #000;
      &.red{
        background-color: red;
      }
      color: #fff;
    }
  }
</style>
