<template>
    <div class="userPage">
        <TableA :columns="columns" :list="list">
            <template #url="{ row }">
                <img :src="row.url" alt="avatar" style="width:50px;height:50px;border-radius:50%;object-fit:cover;"/>
            </template>
        </TableA>
    </div>
</template>
<script setup lang="ts">
import TableA from '@/components/TableA.vue';
const columns:Record<string,any>[]=[
    {label:"ID",key:'id'},
    {label:'User',key:'user'},
    {label:'Avatar',key:'url'},
    {label:'Role',key:'role'},
    {label:'CreateTime',key:'createTime'},
]
const list=[
    {id:1,user:'Alice',url:'https://i.pravatar.cc/150?img=1',createTime:'2024-01-01 10:00:00',role:'Admin'},
    {id:2,user:'Bob',url:'https://i.pravatar.cc/150?img=2',createTime:'2024-01-02 11:00:00',role:'User'},
    {id:3,user:'Charlie',url:'https://i.pravatar.cc/150?img=3',createTime:'2024-01-03 12:00:00',role:'User'}
]
</script>
<style lang="scss" scoped>
.userPage{
    width: 100%;
    height: 100%;
}
</style>