<template>
    <div class="userPage">
        <TableA :columns="columns" :list="list"></TableA>
    </div>
</template>
<script setup lang="ts">
import TableA from '@/components/TableA.vue';
const columns=[
    {label:"姓名",key:'name'},
    {label:'年龄',key:'age'},
    {label:'性别',key:'gender'}
]
const list=[
    {
        name:'a',
        age:10,
        gender:'male'
    },
    {
        name:'b',
        age:11,
        gender:'female'
    },
    {
        name:'c',
        age:12,
        gender:'male'
    },
]
</script>
<style lang="scss" scoped>
.userPage{
    width: 100%;
    height: 100%;
}
</style>