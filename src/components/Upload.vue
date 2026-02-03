<!-- src/components/CoverUpload.vue -->
<template>
  <div class="cover-container" :class="{ hasImage: !!previewUrl, disabled }" @mouseenter="hover = true" @mouseleave="hover = false">
    <!-- 有图则展示预览 -->
    <img v-if="previewUrl" class="cover-preview" :src="previewUrl" alt="封面预览" />

    <!-- 悬停居中出现“编辑”白色按钮 -->
    <button
      v-if="previewUrl"
      class="edit-btn"
      :class="{ show: hover }"
      @click="triggerSelect"
      aria-label="更换封面"
    >
      E
    </button>

    <!-- 右上角删除图标 -->
    <button
      v-if="previewUrl && !disabled"
      class="delete-btn"
      @click="clear"
      aria-label="删除封面"
    >
      ✕
    </button>

    <!-- 无图时的占位 -->
    <div v-if="!previewUrl" class="cover-placeholder">
      <div class="placeholder-text">Click to upload cover</div>
      <button class="btn" :disabled="disabled" @click="triggerSelect">选择图片</button>
    </div>

    <!-- 隐藏的文件选择 -->
    <input
      ref="fileInputRef"
      type="file"
      class="hidden-input"
      :accept="accept || 'image/*'"
      @change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue?: File | string | null
  accept?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: File | string | null): void
  (e: 'change', v: File | string | null,y?:any): void
}>()

const disabled = props.disabled ?? false
const fileInputRef = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const hover = ref(false)

function triggerSelect() {
  if (disabled) return
  fileInputRef.value?.click()
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0] || null
  if (!file) return
  setValue(file)
  input.value = '' // 允许选择同名文件再次触发 change
}

function setValue(v: File | string | null) {
  emit('update:modelValue', v)
  emit('change', v,previewUrl.value)
  updatePreviewUrl(v)
}

function clear() {
  setValue(null)
}

function updatePreviewUrl(v: File | string | null) {
  // File -> blob URL；string -> 直接用；null -> 清空
  revokePreview()
  if (!v) {
    previewUrl.value = null
    return
  }
  if (typeof v === 'string') {
    previewUrl.value = v
  } else {
    previewUrl.value = URL.createObjectURL(v)
  }
}

function revokePreview() {
  if (previewUrl.value?.startsWith('blob:')) {
    URL.revokeObjectURL(previewUrl.value)
  }
}

watch(
  () => props.modelValue,
  (v) => updatePreviewUrl(v ?? null),
  { immediate: true }
)

onUnmounted(() => {
  revokePreview()
})
</script>

<style scoped>
.cover-container {
  position: relative;
  width: 30%;           /* 与输入框/下拉保持一致 */
  aspect-ratio: 1;
  font-size: 14px;
  border-radius: 8px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease-in-out;
  padding: 12px 16px;     /* 与 Input 的内边距一致 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
   min-width: 120px;
   min-height: 120px;
}

.cover-container:hover {
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}

.cover-container.hasImage {
  padding: 0;             /* 有图时去掉内边距，图片满框 */
}

.cover-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* 悬停居中编辑按钮 */
.edit-btn {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #f5f5f5;                  /* 白色圆形按钮 */
  color: #000;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-container:hover .edit-btn {
  opacity: 0.6;
  visibility: visible;
}
.edit-btn.show:hover {
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

/* 右上角删除图标 */
.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: #f5f5f5;
  color: #000;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  transition: all 0.2s ease-in-out;
}
.delete-btn:hover {
  box-shadow: 0 3px 8px rgba(0,0,0,0.2);
}

/* 无图占位 */
.cover-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #444;
}
.placeholder-text {
  font-size: 13px;
  font-weight: 600;
}
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background: #f5f5f5;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 2px rgba(0,0,0,0.08);
}
.btn:hover {
  background: #eee;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}

/* 禁用态 */
.cover-container.disabled {
  cursor: not-allowed;
  background: #fafafa;
  box-shadow: none;
}
.cover-container.disabled .btn,
.cover-container.disabled .edit-btn,
.cover-container.disabled .delete-btn {
  cursor: not-allowed;
  opacity: 0.6;
}
.hidden-input {
  display: none;
}
</style>
