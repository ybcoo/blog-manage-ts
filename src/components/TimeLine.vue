<template>
  <div class="main">
    <div class="timeline">
      <div v-for="(item, index) in list" :key="index" class="timeline-item">
        <!-- 连接线（放在圆圈之前） -->
        <div v-if="index > 0" class="timeline-line"></div>

        <!-- 节点圆圈 -->
        <div class="timeline-dot" @click="clickDot(item)" :class="{'selected':atricleStore?.deleteIdList?.includes(item?.id as number)}"></div>

        <!-- 内容卡片 -->
        <div class="timeline-content" :class="{'selected':currentItem?.id==item?.id}" @click="getClickItem(item)">
          <div class="left">
            <div class="timeline-time">{{ item.createTime }}</div>
            <div class="timeline-title">{{ item.title }}</div>
            <div v-if="item?.content" class="timeline-description" v-html="item?.content">
            </div>
          </div>
          <div class="middle">{{ typeMap[item?.type as any] }}</div>
          <div class="right" :class="{'selected':currentItem?.id==item?.id}">
            <img class="image" :src="currentItem?.id===item?.id?selectedIcon:item?.url" alt=""></img>
          </div>
        </div>
        <div v-show="currentItem?.id===item.id" class="selectRight">
          <img class="selectImage" :src="currentItem?.url" alt=""></img>
        </div>
      </div>
    </div>
    <div class="preview">
      <Preview :form="currentItem"></Preview>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Preview from "./Preview.vue";
import type{formType} from '@/assets/interface/FormInterface'
import icon from "@/assets/icon/svg";
import { useArticleStore } from "@/stores/AtricleStore";
const atricleStore = useArticleStore();
const {selectedIcon}=icon
const typeMap: any = {
  travel: "For Travel Moments",
  daily: "For Daily Life Snippets",
  memory: "For Precious Memories",
  diary: "For Personal Diary",
  experience:"For My Experience"
};
// 定义 props
const props=defineProps<{
  list: formType[];
}>();
const currentItem = ref<formType | null>(null);
const getClickItem=(item:formType)=>{
  currentItem.value=item
  atricleStore.selectedItem=item
}
const clickDot=(item:formType)=>{
  //选中就取消
  if(atricleStore.deleteIdList.includes(item.id as number)){
    atricleStore.deleteIdList=atricleStore.deleteIdList.filter((i:number)=>{
      return i!==item?.id
    })
  }else{
    // 没选中就添加
    atricleStore.deleteIdList.push(item.id as number)
  }
  
}
onMounted(()=>{
  atricleStore.deleteIdList=[]
  currentItem.value=props.list[0] as formType
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  gap: 20px;
  .timeline {
    position: relative;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
  }
  .preview {
    flex: 1;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
  }
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: center;
}

// 圆圈节点
.timeline-dot {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #7b809a;
  flex-shrink: 0;
  z-index: 2;
  margin-right: 16px;
  &.selected{
    background-color: red;
    opacity: 0.5;
  }
}

// 连接线（连接上一个节点到当前节点）
.timeline-line {
  position: absolute;
  left: 9px; // 圆圈中心
  top: -70px; // 向上延伸 gap 的距离
  width: 2px;
  height: 120px; // gap 的距离20
  background-color: #e5e7eb;
  z-index: 1;
}

// 内容区域
.timeline-content {
  flex: 1;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  overflow: hidden;
  height: 100px;
  gap: 12px;
  &.selected{
    .image{
      opacity: 1 !important;
    }
  }
  .left{
    flex: 1;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
  .middle{
    padding: 0 20px;
    flex: 1;
  }
  .right{
    width: 70px;
    height: 70px;
    &.selected{
      width: 20px;
      height: 20px;
    }
    .image{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
  }
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    .image {
      opacity: 1;
    }
  }
}

.timeline-time {
  font-size: 12px;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timeline-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timeline-description {
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow: hidden;
  :deep(*),
  :deep(p),
  :deep(div) {
    white-space: inherit !important; // 继承父元素的nowrap，强制单行
    overflow: inherit !important;    // 继承父元素的hidden
    text-overflow: inherit !important; // 继承父元素的ellipsis
    display: inline !important;      // 强制所有子标签为行内元素，避免换行
    margin: 0 !important;            // 清除wangEditor默认的p标签外边距
    padding: 0 !important;           // 清除默认内边距
    line-height: inherit !important; // 继承行高
    max-width: 100% !important;      // 不超过父容器宽度
  }
  // 保留你原有对图片的样式
  :deep(img),:deep(video) {
    max-width: 20px !important; // 图片适配单行，缩小显示（可根据需求调整）
    width: auto !important;
    height: 16px !important;
    display: inline-block !important;
    vertical-align: middle !important;
    margin: 0 2px !important;
  }
}
.selectRight{
  width: 100px;
  margin: 0 20px;
  // padding: 0 10px;
    height: 100px;
    .selectImage{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
      transition: opacity 0.3s ease;
    }
}
</style>