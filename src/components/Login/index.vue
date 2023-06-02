<template>
    <div class="login">
       <div class="login-box">
            <div class="login-title" v-text="'Viva CMS'"></div>
            <div class="login-account login-input-box">
                <div class="account-text" v-text="'Account:'"></div>
                <a-input v-model:value="state.form.account"></a-input>
            </div>
            <div class="login-password login-input-box">
                <div class="password-text" v-text="'Password:'"></div>
                <a-input v-model:value="state.form.password"></a-input>
            </div>
            <div class="login-button">
                <a-button v-text="'LOGIN'" @click="login()"></a-button>
            </div>
       </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { errorCode } from '@/util/errorCode.js'
import { encrypt } from '@/util/encrypt.js'
import { useUserInfoStore } from '@/store/userInfo'
import { message } from "ant-design-vue";
import settingApi from '@/assets/api/settingApi.js'
import Cookie from 'js-cookie'

const userInfoStore = useUserInfoStore()

const state = reactive({
    form: {
        account: undefined,
        password: undefined,
    }
})

const init = () => {
    ;[state.form.account, state.form.password] = [undefined, undefined]
}

const successLogin = (data) => {
    Object.keys(data).forEach((key)=> {
        if(Object.keys(userInfoStore).includes(key)) {
            userInfoStore[key] = data[key]
            
            if(typeof data[key] === 'string') {
                Cookie.set(key, JSON.stringify(data[key]), {
                    expires: 2
                })
            }
        }
    })
}

const login = async () => {
    const { retCode: code, retData: data } = await settingApi.login({
        user_id: state.form.account,
        password: encrypt(state.form.password) 
    })

    if(code === 200) {
        if(data.status === '1') {
            successLogin(data)
            message.success('Login success')
        } else if (data.status === '2') {
            message.error('Please update the password')
        }
    }else {
        message.error(errorCode[code])
    }
}

onMounted(()=> {
    init()
})
</script>

<style lang="less" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #001529;

    .login-box {
        width: 360px;
        height: 360px;
        padding: 16px;
        background: #fff;
        border-radius: 8px;

        .login-title {
            padding-bottom: 16px;
            font-size: 24px;
            text-align: center;
        }

        .login-input-box {
            margin-bottom: 16px;
        }

        .login-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
    }
}
</style>