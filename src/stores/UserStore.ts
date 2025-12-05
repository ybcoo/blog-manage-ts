import { Avatar } from '@arco-design/web-vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    account:"",
    isGetRouter:false,
    isCollapse:false,
    avatar:null as null | string
  }),
  actions: {
    
  },
  persist: {
    key:'user',
    storage:localStorage,
    pick:['account','isCollapse','avatar']
  }
})