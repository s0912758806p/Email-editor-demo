import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useUserInfoStore = defineStore('userInfo', {
    state: ()=> ({
        isLogin: true, // 目前為範例模式: 無需登錄
        token: undefined,
        userId: undefined,
        name: undefined,
        accountId: undefined,
    }),
    // getters: ()=> {

    // },
    actions: {
        isLoginNow() {
            this.isLogin = !!Cookies.get('token')
            this.token = Cookies.get('token')
            this.userId = Cookies.get('userId')
            this.name = Cookies.get('name')
            this.accountId = Cookies.get('accountId')
        }
    }
})