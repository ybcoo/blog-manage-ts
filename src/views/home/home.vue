<template>
    <div class="home">
        <TimeLine :list="articleList"></TimeLine>
    </div>
</template>
<script setup lang="ts">
import TimeLine from '@/components/TimeLine.vue';
import { onMounted, ref } from 'vue';
import type{formType} from '@/assets/interface/FormInterface'
import { getArticle } from '@/api/api';
const articleList = ref<formType[]>([]);
const getArticleList=async()=>{
    try{
        const res=await getArticle() 
        if(res?.data?.success){
            const {result}=res?.data
            articleList.value=result
        }
    }catch(e){
        console.error(e)
    }
}
onMounted(async()=>{
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