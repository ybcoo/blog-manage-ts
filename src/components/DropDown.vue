<template>
  <div class="dropdown-container" :class="{ open: isOpen }">
    <!-- 下拉框触发按钮 -->
    <div 
      class="dropdown-trigger" 
      @click="isOpen = !isOpen"
      :style="{ 
        backgroundColor:  '#fff' ,
        color:'#000'
      }"
    >
      {{ selectedOption?.label || '请选择类型' }}
      <span class="arrow-icon">▼</span>
    </div>

    <!-- 下拉选项列表 -->
    <ul class="dropdown-options" v-show="isOpen">
      <li
        v-for="option in options"
        :key="option.value"
        class="dropdown-option"
        @click="handleSelect(option)"
        :style="{
          backgroundColor: option.value === selectedOption?.value ? '#f5f5f5' : '#fff',
        }"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref,onUnmounted, onMounted } from 'vue'
const props=defineProps<{
    modelValue?:any
}>()
const emit=defineEmits<{
    (e:'update:modelValue',value:any):any
}>()

// 定义下拉选项类型
interface DropdownOption {
  label: string
  value: string | number
}
// 下拉框状态
const isOpen = ref(false)
// 选中的选项
const selectedOption = ref<DropdownOption | null>(null)

// 下拉选项列表（可自定义）
const options = ref<DropdownOption[]>([
  { label: '旅行', value: 'travel' },
  { label: '日常', value: 'daily' },
  { label: '回忆', value: 'memory' },
  { label: '日记', value: 'diary' },
  {label:'经历',value:'experience'}
])

// 选择选项逻辑
const handleSelect = (option: DropdownOption) => {
  selectedOption.value = option
  isOpen.value = false
  emit('update:modelValue',option)
  // 可选：抛出选择事件供父组件使用
  // emit('change', option)
}

// 点击外部关闭下拉框（可选优化）
const clickOutside = (e: MouseEvent) => {
  const container = document.querySelector('.dropdown-container')
  if (container && !container.contains(e.target as Node)) {
    isOpen.value = false
  }
}

// 监听点击事件
document.addEventListener('click', clickOutside)
// 组件卸载时移除监听
onUnmounted(() => {
  document.removeEventListener('click', clickOutside)
})
onMounted(()=>{
    selectedOption.value=props.modelValue 
})
</script>

<style scoped>
.dropdown-container {
  position: relative;
  width: 100%;
  font-size: 14px;
}

/* 触发按钮样式 */
.dropdown-trigger {
  width: 100%;
  padding: 12px 16px;
  border: none; /* 移除黑色边框 */
  border-radius: 8px; /* 按钮圆角 */
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out; /* 按钮过渡动画 */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* 轻微阴影替代边框 */
}

.dropdown-trigger:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15); /* hover 增强阴影 */
}

.arrow-icon {
  font-size: 10px;
  margin-left: 8px;
  transition: transform 0.3s ease-in-out; /* 箭头旋转动画 */
}

/* 下拉框展开时箭头旋转 */
.dropdown-container.open .arrow-icon {
  transform: rotate(180deg);
}

/* 选项列表样式 */
.dropdown-options {
  position: absolute;
  top: calc(100% + 8px); /* 按钮和下拉框间距 */
  left: 0;
  width: 100%;
  list-style: none;
  padding: 8px 0; /* 上下内边距 */
  margin: 0;
  border: none; /* 移除黑色边框 */
  border-radius: 8px; /* 下拉框圆角 */
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 柔和阴影 */
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transform: translateY(5px);
  transition: all 0.3s ease-in-out; /* 下拉框展开/收起动画 */
}

/* 下拉框展开时的样式 */
.dropdown-container.open .dropdown-options {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

/* 单个选项样式 */
.dropdown-option {
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out; /* 选项过渡动画 */
  box-sizing: border-box;
  border-radius: 6px; /* 选项圆角 */
  margin: 0 8px; /* 选项左右间距 */
}

.dropdown-option:hover {
  background-color: #f5f5f5 !important; /* 浅灰色 hover 背景 */
  color: #000 !important;
}

/* 禁用选中样式（可选） */
.dropdown-option[disabled] {
  cursor: not-allowed;
  color: #999 !important;
  background: #fafafa !important;
}
</style>