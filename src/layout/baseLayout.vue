<template>
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu v-model:selectedKeys="state.selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="1">
            <html5-outlined />
            <span>Email editor</span>
          </a-menu-item>
          <!-- <a-menu-item key="2">
            <video-camera-outlined />
            <span>nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <upload-outlined />
            <span>nav 3</span>
          </a-menu-item> -->
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </a-layout-header>

        <router-view />
      </a-layout>
    </a-layout>
  </template>

  <script setup>
  import { Html5Outlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { ref, reactive } from 'vue';

  const collapsed = ref(false)

  const state = reactive({
    selectedKeys: ['1']
  })
  
  </script>

<style lang="less" scoped>
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: #1890ff;
        }
    }

    .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.3);
        margin: 16px;
    }
  
  .site-layout {
    .site-layout-background {
        background: #fff;
    }
  }
</style>