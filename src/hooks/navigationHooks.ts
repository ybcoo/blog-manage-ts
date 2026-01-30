import { useRoute, useRouter } from "vue-router";
import { useArticleStore } from "@/stores/AtricleStore";
import { createArticle,deleteArticle } from "@/api/api";
export const navigationHooks = (emit?:any) => {
  const atricleStore = useArticleStore();
  const route = useRoute();
  const router = useRouter();
  //保存home表单
  const saveForm = async () => {
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
