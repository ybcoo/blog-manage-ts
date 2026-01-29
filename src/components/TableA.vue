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
      <tr v-for="(row, rowIndex) in list" :key="rowIndex">
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
  </table>
</template>

<script setup lang="ts">
defineProps<{
    columns:any,
    list:any
}>()
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: #fff;
  border-radius: 10px;
  th,
  td {
    border: 1px solid #f5f5f5;
    text-align: left;
    font-size: 14px;
    padding: 12px;
    white-space: nowrap;
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
