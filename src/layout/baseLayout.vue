<template>
  <a-layout>
    <a-layout-sider 
      v-model:collapsed="collapsed" 
      :trigger="null" 
      collapsible
    >
      <div class="logo" v-text="'GR CMS'" />
      <a-menu v-model:selectedKeys="state.selectedKeys" mode="inline" :theme="'dark'">
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
      <a-layout-header class="layout-header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />

        <a-dropdown :trigger="['click']" :placement="'bottomRight'">
          <setting-outlined class="trigger setting-outlined" @click.prevent />

          <template #overlay>
            <a-menu>
              <a-menu-item :key="0" @click="logout()">
                <logout-outlined class="icon-box" />
                <span v-text="'登出'" />
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>

      <router-view />
    </a-layout>
  </a-layout>
</template>

<script setup>
import { Html5Outlined, MenuUnfoldOutlined, MenuFoldOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { ref, reactive } from 'vue';
import { useUserInfoStore } from '@/store/userInfo'
import Cookie from 'js-cookie'

const userInfoStore = useUserInfoStore()

const collapsed = ref(false)

const state = reactive({
  selectedKeys: ['1']
})

const logout = () => {
  Object.keys(userInfoStore).forEach((key)=> {
    if(Cookie.get(key) === userInfoStore[key]) {
      Cookie.remove(key)
    }
  })

  userInfoStore.isLoginNow()
}

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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 32px;
    margin: 16px 0;
    font-size: 32px;
    font-style: italic;
    color: #fff;
}

.site-layout {
  .site-layout-background {
      background: #fff;
  }
}

.layout-header {
  position: relative;
  display: flex;
  align-items: center;
  background: #fff; 
  padding: 0
}

.icon-box {
  margin-right: 5px;
}

.setting-outlined {
  position: absolute;
  right: 20px;
}

</style>