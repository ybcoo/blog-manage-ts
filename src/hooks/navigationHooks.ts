import { useRoute, useRouter } from "vue-router";
import { useArticleStore } from "@/stores/AtricleStore";
import { createArticle,deleteArticle,updateArticle } from "@/api/api";
import { useUserStore } from "@/stores/UserStore";
import { Message } from "@arco-design/web-vue";
export const navigationHooks = (emit?:any) => {
  const atricleStore = useArticleStore();
  const route = useRoute();
  const router = useRouter();
  const userStore=useUserStore()
  //保存article表单
  const saveForm = async () => {
    if(userStore.role!=='admin'){
      Message.error('访客暂无权限～')
      return
    }else if(!atricleStore?.articleForm?.title){
      Message.error('请输入标题')
    }else if(!atricleStore?.articleForm?.url){
      Message.error('请上传图片')
    }else if(!atricleStore?.articleForm?.type){
      Message.error('请选择类型')
    }
    // console.log("拿到表单信息", atricleStore.articleForm);
    try {
      const res = await createArticle(atricleStore?.articleForm);
      if (res?.data?.success) {
        router.push("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };
  //更新article表单
  const updateForm=async()=>{
    if(userStore.role!=='admin'){
      Message.error('访客暂无权限～')
      return
    }
    try{
       const res = await updateArticle(atricleStore?.articleForm)
       if (res?.data?.success) {
        router.push("/home");
      }
    }catch(e){
      console.error(e)
    }
  }
  const handleArticleDelete=async()=>{
    if(userStore.role!=='admin'){
      Message.error('访客暂无权限～')
      return
    }
    atricleStore.currentPage=1;
    try{
      let data:any=null
      if(atricleStore?.deleteIdList?.length>0){
        data=atricleStore.deleteIdList
      }else{
        data=atricleStore.selectedItem
      }
      const res=await deleteArticle(data)
      if(res?.data?.success){
        atricleStore.deleteIdList=[]
        atricleStore.selectedItem=null
        emit('refreshHome')
      }
    }catch(e){
      console.error(e)
    }
  }
  const lastArticlePage=()=>{
    if(atricleStore.currentPage==1){
      return
    }
    atricleStore.currentPage--;
    emit('refreshHome')
  }
  const nextArticlePage=()=>{
    if(atricleStore.currentPage==atricleStore.total){
      return
    }
    atricleStore.currentPage++;
    emit('refreshHome')
  }
  return { saveForm,handleArticleDelete,updateForm,lastArticlePage,nextArticlePage };
};
