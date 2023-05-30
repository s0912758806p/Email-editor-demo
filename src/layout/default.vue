<template>
  <Login v-if="store.isLogin"/>
  <BaseLayout v-else/>
</template>

<script setup>
import { useUserInfoStore } from '@/store/userInfo'
import BaseLayout from '@/layout/baseLayout.vue'
import Login from '@/components/Login'

const store = useUserInfoStore()

</script>

<style lang="less" scoped>

</style>
