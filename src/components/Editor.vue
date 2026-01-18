<template>
  <div style="border: 1px solid #ccc; border-radius: 20px; overflow: hidden; width: 100%">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted, watch, computed } from "vue";
import { uploadImage,uploadVideo } from "@/api/api";
// @ts-ignore 忽略 WangEditor 模块的类型声明报错
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
const props = defineProps<{
  modelValue?: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", v: any): any;
}>();
const editorRef = shallowRef();
const mode = "default";
// 内容 HTML
const valueHtml = ref<string>(props.modelValue || "");
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    valueHtml.value = newVal as string;
  }
);

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容...",
  MENU_CONF:{
    // 图片上传
    uploadImage: {
      async customUpload(file: File, insertFn: (url: string, alt?: string, href?: string) => void) {
        const fd = new FormData()
        fd.append('file', file)
        try {
          const res = await uploadImage(fd)
          const url=res?.data?.url
          // 插入图片（可选 alt 与跳转链接 href）
          insertFn(url, file.name)
        } catch (err: any) {
          console.error('image upload error:', err)
          alert('图片上传失败：' + (err?.message || '未知错误'))
        }
      },
    },
    // 视频上传
    uploadVideo: {
      async customUpload(file: File, insertFn: (url: string, poster?: string) => void) {
        const fd = new FormData()
        fd.append('file', file)
        try {
          const res = await uploadVideo(fd)
          const url=res?.data?.url
          // 插入视频（可选 poster 封面）
          insertFn(url, '')
        } catch (err: any) {
          console.error('video upload error:', err)
          alert('视频上传失败：' + (err?.message || '未知错误'))
        }
      },
    },
  }
 };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = () => {
  emit("update:modelValue", valueHtml.value);
};
</script>
<style lang="scss" scoped>
:deep(.w-e-text-container) p {
  margin: 0 !important; // 清空 p 标签的默认上下边距
  line-height: 1.5; // 调整行高，控制换行紧凑度（可按需改1.4/1.6）
}
:deep(.w-e-text-placeholder) {
  top: 3px !important;
}
:deep(.w-e-scroll) {
  scrollbar-width: none; // Firefox 专属：隐藏滚动条
  -ms-overflow-style: none; // IE/Edge 旧版：隐藏滚动条
  &::-webkit-scrollbar {
    display: none; // Chrome/Safari/Edge 新版：隐藏滚动条
  }
}
:deep(.w-e-text-container img),
:deep(.w-e-text-container video) {
  max-width: 100% !important;  /* 不超过内容容器宽度 */
  width: 100% !important;       /* 让媒体占满容器宽度 */
  height: auto !important;      /* 按比例缩放，避免被拉伸 */
  display: block !important;    /* 挤掉行内布局造成的溢出 */
  border-radius: 8px;           /* 可选 */
}
:deep(.w-e-textarea-video-container){
  padding: 0;
  margin: 0;
}
</style>
