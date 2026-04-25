<template>
    <div class="home">
        <TimeLine :list="articleList"></TimeLine>
        <Loading v-show="showLoading"/>
    </div>
</template>
<script setup lang="ts">
import TimeLine from '@/components/TimeLine.vue';
import { onMounted, ref } from 'vue';
import type{formType} from '@/assets/interface/FormInterface'
import { getArticle } from '@/api/api';
import { useArticleStore } from '@/stores/AtricleStore';
import Loading from '@/components/Loading.vue';
const showLoading=ref(false)
const atricleStore=useArticleStore()
const articleList = ref<formType[]>([]);
const getArticleList=async()=>{
    try{
        showLoading.value=true
        const res=await getArticle({pageNum:atricleStore.currentPage,pageSize:10}) 
        if(res?.data?.success){
            const {result}=res?.data
            const {list,total}=result
            atricleStore.total=Math.ceil(total/10)
            articleList.value=list
        }
    }catch(e){
        console.error(e)
    }finally{
        showLoading.value=false
    }
}
onMounted(async()=>{
    atricleStore.initState()
    await getArticleList()
})
defineExpose({
    getArticleList
})
</script>
<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
}
</style>