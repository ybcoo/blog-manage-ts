<template>
  <div class="userPage">
    <div class="tableContainer">
      <TableA :columns="columns" :list="list" @updateUser="handleUpdate">
        <template #url="{ row }">
          <img
            :src="row.url ?? userAvatar"
            alt="avatar"
            style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover"
          />
        </template>
        <template #operation="{ row }">
            <button class="pageBtn" @click.stop="handleDelete(row.id)">Delete</button>
        </template>
      </TableA>
    </div>
    <div class="bottom">
      <button class="pageBtn" :disabled="pageNum === 1" @click="lastPage">last</button>
      <span>{{ pageNum }}/{{ totalPage }}</span>
      <button class="pageBtn" :disabled="pageNum === totalPage" @click="nextPage">next</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import TableA from "@/components/TableA.vue";
import { getUser,deleteUser,updateUser } from "@/api/api";
import { onMounted, ref } from "vue";
import icon from "@/assets/icon/svg";
import { useUserStore } from "@/stores/UserStore";
import { Message } from "@arco-design/web-vue";
const userStore=useUserStore()
const { userAvatar } = icon;
const columns: Record<string, any>[] = [
  { label: "ID", key: "id" },
  { label: "Account", key: "account" },
  { label: "Avatar", key: "url" },
  { label: "Role", key: "role" },
  { label: "IP", key: "location" },
  { label: "CreateTime", key: "createTime" },
];
if (userStore.role === "admin") {
  columns.push({ label: "Operation", key: "operation" });
}
const pageNum = ref(1);
const totalPage = ref(1);
const pageSize = ref(10);
const list = ref<any>([]);
const getUserList = async () => {
  try {
    const res = await getUser({ pageNum: pageNum.value, pageSize: pageSize.value });
    const { code, data } = res.data;
    const { list: resList, total } = data ?? {};
    if (code === 0) {
      list.value = resList;
      totalPage.value = Math.ceil(total / pageSize.value);
    }
  } catch (e) {
    console.error(e);
  }
};
const handleDelete=async(id:number)=>{
    try{
        const res=await deleteUser({id,isDelete:1,userId:userStore.userId})
        const {code,data}=res.data
        if(code===0){
        pageNum.value=1
          await getUserList()
        }
    }catch(e){
        console.error(e)
    }
}
const handleUpdate=async({id,account,role}:any={})=>{
    try{
        const res=await updateUser({id,userId:userStore.userId,account,role})
        const {code,data}=res.data
        if(code===0){
        pageNum.value=1
          await getUserList()
        }else if(data?.message){
            Message.error(data.message)
        }
    }catch(e){
        console.error(e)
    }
}
const lastPage = () => {
  if (pageNum.value > 1) {
    pageNum.value -= 1;
    getUserList();
  }
};
const nextPage = () => {
  if (pageNum.value < totalPage.value) {
    pageNum.value += 1;
    getUserList();
  }
};
onMounted(async () => {
  await getUserList();
});
</script>
<style lang="scss" scoped>
.userPage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tableContainer {
    flex: 1;
    width: 100%;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .bottom {
    padding: 15px 0px;
    display: flex;
    gap: 10px;
    align-items: center;
    
  }
  .pageBtn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      padding: 8px 20px;
      border-radius: 8px; // 圆角胶囊按钮
      border: 1px solid rgba(0, 0, 0, 0.08);

      background-color: #fff;
      color: #000; // 保持你现在的字体颜色
      font-size: 14px;
      font-weight: 500;

      cursor: pointer;
      user-select: none;

      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);
      transition: all 0.18s ease-out;

      &:hover {
        box-shadow: 0 4px 10px rgba(15, 23, 42, 0.14);
        transform: translateY(-1px);
      }

      &:active:not(:disabled) {
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.16);
        transform: translateY(0);
        background-color: #000;
        color: #fff;
      }
    }
}
</style>