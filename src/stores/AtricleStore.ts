import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => ({
    articleForm:null as any,
    selectedItem:null as any,
    deleteIdList:[] as number[],
    total:null as any,
    currentPage:null as any
  }),
  actions: {
    initState(){
      this.currentPage=1
      this.selectedItem=null
    }
  },
  persist:true
})