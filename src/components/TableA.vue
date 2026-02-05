<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="item in columns" :key="item.key">
          {{ item.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- 每个 row 渲染一行 -->
      <tr v-for="(row, rowIndex) in list" :key="rowIndex" @click="clickItem(row)">
        <!-- 每一列 -->
        <td v-for="item in columns" :key="item.key">
          <!-- 优先使用对应列的插槽：cell-列key -->
          <slot
            :name="item.key"
            :row="row"
            :value="row[item.key]"
            :rowIndex="rowIndex"
            :col="item"
          >
            <!-- 没有提供插槽时的默认渲染 -->
            {{ row[item.key] }}
            
          </slot>
        </td>
      </tr>
    </tbody>
    <PopUp v-model="showPop" v-model:popItem="tempItem" @updateUser="emit('updateUser',tempItem);showPop=false"></PopUp>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PopUp from './PopUp.vue';
import { useUserStore } from '@/stores/UserStore';
const userStore=useUserStore()
defineProps<{
    columns:any,
    list:any
}>()
const emit = defineEmits<{
  (e:'updateUser',value:any):void
}>()
const tempItem=ref<any>(null)
const showPop=ref(false)
const clickItem=(row:any)=>{
  if(userStore.role!=='admin'){
    return
  }
  tempItem.value=row
  showPop.value=!showPop.value
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: #fff;
  border-radius: 10px;
  min-width: 530px;
  position: relative;
  th,
  td {
    border: 1px solid #f5f5f5;
    text-align: left;
    font-size: 14px;
    padding: 12px;
    white-space: nowrap;
    overflow: auto;
    -ms-overflow-style: none;
    /* IE、旧版 Edge 隐藏滚动条 */
    scrollbar-width: none;
    /* Firefox 隐藏滚动条 */

    ::-webkit-scrollbar {
      display: none;
      /* Chrome、Safari、Edge 隐藏滚动条 */
    }
  }

  th {
    font-weight: 600;
  }
  tr{
    &:hover{
      background-color: rgba(249, 249, 249, 0.6);
    }
  }
}
</style>