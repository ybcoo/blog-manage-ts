import { useRoute, useRouter } from "vue-router";
import { useArticleStore } from "@/stores/AtricleStore";
import { createArticle,deleteArticle } from "@/api/api";
import { useUserStore } from "@/stores/UserStore";
import { Message } from "@arco-design/web-vue";
export const navigationHooks = (emit?:any) => {
  const atricleStore = useArticleStore();
  const route = useRoute();
  const router = useRouter();
  const userStore=useUserStore()
  //保存home表单
  const saveForm = async () => {
    if(userStore.role!=='admin'){
      Message.error('访客暂无权限～')
      return
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
  const handleArticleDelete=async()=>{
    if(userStore.role!=='admin'){
      Message.error('访客暂无权限～')
      return
    }
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
  return { saveForm,handleArticleDelete };
};
