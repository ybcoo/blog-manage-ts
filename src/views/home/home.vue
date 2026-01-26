<template>
    <div class="home">
        <TimeLine :list="articleList"></TimeLine>
    </div>
</template>
<script setup lang="ts">
import TimeLine from '@/components/TimeLine.vue';
import { ref } from 'vue';
import type{formType} from '@/assets/interface/FormInterface'

const articleList = ref<formType[]>([
  { id: 1, title: '文章标题1文章标题1文章标题1文章标题1文章标题1文章标题1文章标题1文章标题1文章标题1文章标题1文章标题1文章标题1文章标题1', time: '2024-01-01', content: '文章1的描述', url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop', type: {label:'旅行',value:'travel'} },
  { id: 2, title: '文章标题2', time: '2024-02-01', content: '这是文章2的描述', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=200&h=200&fit=crop', type: { label: '日常', value: 'daily' }},
  { id: 3, title: '文章标题3', time: '2024-03-01', content: '这是文章3的描述', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=200&fit=crop', type: { label: '回忆', value: 'memory' } },
]);

</script>
<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100%;
}
</style>