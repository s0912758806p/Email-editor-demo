import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', {
    state: ()=> ({
        isLogin: false
    }),
    // getters: ()=> {

    // },
    // actions: ()=> {

    // }
})