<template>
  <div class="articleContainer">
    <div class="left">
      <FishInput v-model="form.title" placeholder="请输入标题"></FishInput>
      <Upload @change="getFile"></Upload>
      <DropDown v-model="form.type"></DropDown>
      <Editor v-model="form.content"></Editor>
    </div>
    <div class="right">
      <Preview :form="form"></Preview>
      <!-- <div class="review">
        <div class="header">
          <h1 style="margin: 0">{{ form.title || "Your title" }}</h1>
          <h3 v-if="!form.option" style="color: #444444">
            For Travel Moments, Daily Life Snippets, Precious Memories and Personal Diary
          </h3>
          <h3 v-else style="color: #444444">{{ optionMap[form?.option?.value] }}</h3>
        </div>
        <div class="content">
          <div v-if="form?.content !== '<p><br></p>'" v-html="form.content"></div>
          <div v-else v-html="defaultHtml"></div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import Editor from "@/components/Editor.vue";
import DropDown from "@/components/DropDown.vue";
import FishInput from "@/components/FishInput.vue";
import Upload from "@/components/Upload.vue";
import { computed, reactive, watch } from "vue";
import { defaultHtml } from "@/util/tools";
import Preview from "@/components/Preview.vue";
import { uploadImage } from "@/api/api";
import { useArticleStore  } from "@/stores/AtricleStore";
import type{formType} from '@/assets/interface/FormInterface'
const atricleStore=useArticleStore()
const form = reactive<formType>({
  type: null,
  title: "",
  file: null,
  url: "",
  content: "",
});

watch(
  () => form,
  (newVal, oldVal) => {
    atricleStore.articleForm=newVal
    // console.log('监听form',newVal)
  },{deep:true}
);
const getFile = async (file: any, url: any) => {
  form.file = file;
  const fd = new FormData();
  fd.append("file", file);
  try {
    const res = await uploadImage(fd);
    const urlRes = res?.data?.url;
    form.url = urlRes;
    console.log("正确上传url", form.url);
  } catch (e) {
    console.error(e);
  }
};
</script>
<style lang="scss" scoped>
.articleContainer {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 20px;
  .left {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    gap: 10px;
  }
  .right {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    padding: 0 0 40px 0;

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
</style>
