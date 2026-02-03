<template>
    <div class="userPage">
        <TableA :columns="columns" :list="list">
            <template #url="{ row }">
                <img :src="row.url??userAvatar" alt="avatar" style="width:50px;height:50px;border-radius:50%;object-fit:cover;"/>
            </template>
        </TableA>
    </div>
</template>
<script setup lang="ts">
import TableA from '@/components/TableA.vue';
import { getUser } from '@/api/api';
import { onMounted,ref } from 'vue';
import icon from '@/assets/icon/svg'
const {userAvatar}=icon
const columns:Record<string,any>[]=[
    {label:"ID",key:'id'},
    {label:'Account',key:'account'},
    {label:'Avatar',key:'url'},
    {label:'Role',key:'role'},
    {label:'CreateTime',key:'createTime'},
]
const list=ref<any>([])
const getUserList=async()=>{
    try{
        const res=await getUser()
        const {code,data}=res.data
        if(code===0){
            list.value=data
        }
    }catch(e){
        console.error(e)
    }
    
}
onMounted(async()=>{
    await getUserList()
})
</script>
<style lang="scss" scoped>
.userPage{
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>