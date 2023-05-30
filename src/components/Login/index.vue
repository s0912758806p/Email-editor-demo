<template>
    <div class="login">
       <div class="login-box">
            <div class="login-title" v-text="'LOGIN'"></div>
            <div class="login-account">
                <div class="account-text" v-text="'Account:'"></div>
                <a-input v-model="state.form.account"></a-input>
            </div>
            <div class="login-password">
                <div class="password-text" v-text="'Password:'"></div>
                <a-input v-model="state.form.password"></a-input>
            </div>
            <div class="login-button">
                <a-button v-text="'LOGIN'" @click="login()"></a-button>
            </div>
       </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({
    form: {
        account: undefined,
        password: undefined,
    }
})

const login = () => {
    // event

    ;[state.form.account, state.form.password] = [undefined, undefined]
}
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
        background: #fff;
        border-radius: 8px;
    }
}
</style>