<!-- src/components/Input.vue -->
<template>
  <div class="input-container" :class="{ focused: isFocused, disabled }">
    <input
      class="input-field"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue?: string | number | null
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number | null): void
  (e: 'focus'): void
  (e: 'blur'): void
}>()

const isFocused = ref(false)

const placeholder = props.placeholder ?? '请输入'
const disabled = props.disabled ?? false

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  // 这里直接回传字符串；如果需要 number，可加一个 prop 控制并转型
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.input-container {
  position: relative;   
  font-size: 14px;
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  border: none;            /* 保持“无黑色边框”风格 */
  border-radius: 8px;      /* 与 dropdown-trigger 一致的圆角 */
  outline: none;
  color: #000;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* 轻微阴影替代边框 */
  transition: all 0.3s ease-in-out;         /* 与下拉一致的过渡动画 */
}

/* hover 效果与 dropdown-trigger 对齐 */
.input-field:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

/* focus 高亮：容器加类，field 展示更强阴影 */
.input-container.focused .input-field {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 禁用态 */
.input-container.disabled .input-field {
  cursor: not-allowed;
  color: #999;
  background: #fafafa;
  box-shadow: none;
}
</style>
