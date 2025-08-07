<template>
  <div id="app">
    <!-- 导航栏 -->
    <Header />
    
    <!-- 主要内容区域 -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- 页脚 -->
    <Footer />
    
    <!-- 全局通知 -->
    <Notifications />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'
import Notifications from './components/Common/Notifications.vue'
import { useWeb3Store } from './stores/web3'
import { useThemeStore } from './stores/theme'

const web3Store = useWeb3Store()
const themeStore = useThemeStore()

onMounted(async () => {
  // 初始化主题
  themeStore.initTheme()
  
  // 检查是否已连接钱包
  await web3Store.checkConnection()
  
  // 监听账户变化
  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        web3Store.disconnect()
      } else {
        web3Store.setAccount(accounts[0])
      }
    })
    
    // 监听网络变化
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })
  }
})
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  min-height: calc(100vh - 140px);
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
