import { defineStore } from 'pinia'

export const useArticleStore = defineStore('user', {
  state: () => ({
    articleForm:null as any,
    selectedItem:null as any,
    deleteIdList:[] as number[]
  }),
  actions: {
    
  }
})