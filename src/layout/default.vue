<template>
  <BaseLayout  v-if="userInfoStore.isLogin" />
  <Login v-else />
</template>

<script setup>
import { useUserInfoStore } from '@/store/userInfo'
import BaseLayout from '@/layout/baseLayout.vue'
import Login from '@/components/Login'
import { onMounted } from 'vue'

const userInfoStore = useUserInfoStore()

onMounted(()=> {
  userInfoStore.isLoginNow()
})
</script>

<style lang="less" scoped>

</style>
