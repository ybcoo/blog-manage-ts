<template>
  <div v-if="modelValue" class="popContainer">
    <div class="header">
      <span>Edit Info</span>
    </div>
    <div class="middle">
      <FishInput v-model="account" placeholder="请输入用户名"></FishInput>
      <DropDown :options="options" v-model="role"></DropDown>
    </div>

    <div class="bottom">
      <button class="editBtn" @click="emit('update:modelValue',false)">Cancel</button>
      <button class="editBtn" @click="emit('updateUser')">Save</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import FishInput from "./FishInput.vue";
import DropDown from "./DropDown.vue";
import { ref, computed, watch } from "vue";
const props = defineProps<{
  modelValue: boolean;
  popItem: Record<string, any>;
}>();

//父传子再传子问题 通过v-model语法糖简化emit操作 但是再传子遇到props只读问题不可通过update修改
//用computed 问：computed也是只读，怎么可能可以 ai答：带 setter 的计算属性是可以写的
const role = computed({
  get: () => props.popItem?.role, // 读的时候调用
  set: (val) => emit("update:popItem", { ...props.popItem, role: val }), // 写的时候调用
});
const account = computed({
  get: () => props.popItem?.account, // 读的时候调用
  set: (val) => emit("update:popItem", { ...props.popItem, account: val }), // 写的时候调用
});
const options = ref([
  {
    label: "admin",
    value: "admin",
  },
  { label: "user", value: "user" },
]);
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "update:popItem", value: any): void;
  (e:'updateUser'):void
}>();
</script>
<style lang="scss" scoped>
.popContainer {
  position: fixed;
  width: 20%;
  min-width: 300px;
  aspect-ratio: 1;
  background-color: rgba(0, 0, 0, 0.4); 
  border-radius: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
  .header {
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    color: white;
    font-weight: 600;
  }
  .middle {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .bottom {
    width: 100%;
    padding: 20px 20px;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  .editBtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
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

    &:active:not(:disabled) {
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.16);
      transform: translateY(0);
      background-color: #000;
      color: #fff;
    }
  }
}
</style>