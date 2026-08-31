<template>
  <div class="review">
    <div class="header">
      <h1 style="margin: 0">{{ form?.title || "Your title" }}</h1>
      <div class="typeCnt">
        <h3 v-if="!form?.type" style="color: #444444">
        For Travel Moments, Daily Life Snippets, Precious Memories and Personal Diary
      </h3>
      <h3 v-else style="color: #444444">{{ typeMap[(form?.type?.value||form?.type) as any] }}</h3>
    <img class="musicIcon" v-if="form?.musicUrl" :src="isPlaying?pauseIcon:playIcon" alt="" @click="changePlaying">
    <audio v-if="form?.musicUrl" ref="audioRef" :src="form?.musicUrl"></audio>
    </div>
      
    </div>
    <div class="content">
      <div v-if="form && form?.content !== '<p><br></p>'" v-html="form?.content"></div>
      <div v-else v-html="defaultHtml"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defaultHtml } from "@/util/tools";
import { ref } from "vue";
import icon from "@/assets/icon/svg";
import type{formType} from '@/assets/interface/FormInterface'
const {playIcon,pauseIcon}=icon
defineProps<{
  form?: formType|null;
}>();
const typeMap: any = {
  travel: "For Travel Moments",
  daily: "For Daily Life Snippets",
  memory: "For Precious Memories",
  diary: "For Personal Diary",
  experience:"For My Experience"
};
const isPlaying=ref(false)
const audioRef=ref<HTMLAudioElement | null>(null)
const changePlaying = async() => {
  const audio=audioRef.value
  if(!audio)return
  if(audio?.paused){
    await audio.play()
    isPlaying.value=true
  }else{
    //pause() 是同步方法,不是 Promise
    audio.pause()
    isPlaying.value=false
  }
}
</script>
<style lang="scss" scoped>
.review {
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; // Firefox 专属：隐藏滚动条
  -ms-overflow-style: none; // IE/Edge 旧版：隐藏滚动条
  &::-webkit-scrollbar {
    display: none; // Chrome/Safari/Edge 新版：隐藏滚动条
  }
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  gap: 40px;
  .header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .typeCnt{
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
  .content {
    font-size: 16px;
    font-weight: 500;
    :deep(img) {
      max-width: 100% !important;
      height: auto !important;
      display: block !important;
      margin: 10px 0 !important;
      /* 额外：清空图片内联的宽高样式（优先级拉满） */
      width: auto !important;
    }
  }
}
.content :deep(img),
.content :deep(video) {
  max-width: 100% !important; /* 不超过预览容器宽度 */
  width: 100% !important; /* 占满容器宽度 */
  height: auto !important; /* 按比例缩放，避免被拉伸 */
  display: block !important; /* 防止行内导致溢出 */
  border-radius: 8px; /* 可选视觉优化 */
}
.musicIcon{
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
}
</style>
