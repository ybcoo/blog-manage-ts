import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article', {
  state: () => ({
    articleForm:null as any,
    selectedItem:null as any,
    deleteIdList:[] as number[]
  }),
  actions: {
    
  },
  persist:true
})