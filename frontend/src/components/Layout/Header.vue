<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/" class="logo-link">
            <span class="logo-icon">🐟</span>
            <span class="logo-text">Fish Token</span>
          </router-link>
        </div>

        <!-- 导航菜单 -->
        <nav class="nav">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/tokenomics" class="nav-link">代币经济学</router-link>
          <router-link to="/community" class="nav-link">社区</router-link>
          <router-link to="/docs" class="nav-link">文档</router-link>
          <router-link v-if="web3Store.isConnected" to="/dashboard" class="nav-link">仪表板</router-link>
          <router-link v-if="web3Store.isConnected" to="/transfer" class="nav-link">转账</router-link>
          <router-link v-if="web3Store.isConnected" to="/history" class="nav-link">历史</router-link>
          <router-link v-if="web3Store.isOwner" to="/admin" class="nav-link">管理</router-link>
          <router-link to="/about" class="nav-link">关于</router-link>
        </nav>

        <!-- 移动端菜单按钮 -->
        <el-button
          class="mobile-menu-btn"
          @click="showMobileMenu = !showMobileMenu"
          :icon="showMobileMenu ? 'Close' : 'Menu'"
          circle
        />

        <!-- 移动端菜单 -->
        <div v-if="showMobileMenu" class="mobile-menu">
          <router-link to="/" class="mobile-nav-link" @click="showMobileMenu = false">首页</router-link>
          <router-link to="/tokenomics" class="mobile-nav-link" @click="showMobileMenu = false">代币经济学</router-link>
          <router-link to="/community" class="mobile-nav-link" @click="showMobileMenu = false">社区</router-link>
          <router-link to="/docs" class="mobile-nav-link" @click="showMobileMenu = false">文档</router-link>
          <router-link v-if="web3Store.isConnected" to="/dashboard" class="mobile-nav-link" @click="showMobileMenu = false">仪表板</router-link>
          <router-link v-if="web3Store.isConnected" to="/transfer" class="mobile-nav-link" @click="showMobileMenu = false">转账</router-link>
          <router-link v-if="web3Store.isConnected" to="/history" class="mobile-nav-link" @click="showMobileMenu = false">历史</router-link>
          <router-link v-if="web3Store.isOwner" to="/admin" class="mobile-nav-link" @click="showMobileMenu = false">管理</router-link>
          <router-link to="/about" class="mobile-nav-link" @click="showMobileMenu = false">关于</router-link>
        </div>

        <!-- 右侧操作区 -->
        <div class="header-actions">
          <!-- 主题切换 -->
          <el-button 
            circle 
            @click="themeStore.toggleTheme()"
            :icon="themeStore.isDark ? 'Sunny' : 'Moon'"
            class="theme-toggle"
          />

          <!-- 网络状态 -->
          <div v-if="web3Store.isConnected" class="network-info">
            <el-tag 
              :type="web3Store.isSupportedNetwork ? 'success' : 'warning'"
              size="small"
            >
              {{ web3Store.networkInfo.name }}
            </el-tag>
          </div>

          <!-- 钱包连接 -->
          <div v-if="!web3Store.isConnected">
            <el-button 
              type="primary" 
              @click="connectWallet"
              :loading="web3Store.loading.connecting"
            >
              <Wallet class="mr-1" />
              连接钱包
            </el-button>
          </div>

          <!-- 已连接状态 -->
          <div v-else class="wallet-info">
            <el-dropdown @command="handleWalletAction">
              <el-button type="primary">
                <span class="wallet-address">
                  {{ formatAddress(web3Store.account) }}
                </span>
                <el-icon class="ml-1"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="copy">
                    <DocumentCopy class="mr-1" />
                    复制地址
                  </el-dropdown-item>
                  <el-dropdown-item command="balance">
                    <Coin class="mr-1" />
                    余额: {{ web3Store.formattedBalance }} {{ web3Store.networkInfo.currency }}
                  </el-dropdown-item>
                  <el-dropdown-item command="tokens">
                    <Money class="mr-1" />
                    代币: {{ web3Store.formattedTokenBalance }} FISH
                  </el-dropdown-item>
                  <el-dropdown-item divided command="disconnect">
                    <SwitchButton class="mr-1" />
                    断开连接
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useWeb3Store } from '@/stores/web3'
import { useThemeStore } from '@/stores/theme'
import {
  Wallet,
  ArrowDown,
  DocumentCopy,
  Coin,
  Money,
  SwitchButton
} from '@element-plus/icons-vue'

const web3Store = useWeb3Store()
const themeStore = useThemeStore()
const showMobileMenu = ref(false)

// 连接钱包
const connectWallet = async () => {
  await web3Store.connectWallet()
}

// 格式化地址显示
const formatAddress = (address) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// 处理钱包操作
const handleWalletAction = async (command) => {
  switch (command) {
    case 'copy':
      await navigator.clipboard.writeText(web3Store.account)
      ElMessage.success('地址已复制到剪贴板')
      break
    case 'disconnect':
      web3Store.disconnect()
      break
  }
}
</script>

<style scoped>
.header {
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.25rem;
}

.logo-icon {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: var(--text-regular);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition-fast);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius-base);
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
  background: var(--bg-secondary);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: var(--bg-secondary);
  border: 1px solid var(--border-base);
}

.network-info {
  display: flex;
  align-items: center;
}

.wallet-info {
  display: flex;
  align-items: center;
}

.wallet-address {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.nav-dropdown {
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dropdown-link {
  color: var(--text-regular);
  text-decoration: none;
  display: block;
  width: 100%;
  padding: 0.5rem 0;
}

.dropdown-link:hover {
  color: var(--primary-color);
}

/* 移动端菜单 */
.mobile-menu-btn {
  display: none;
  background: var(--bg-secondary);
  border: 1px solid var(--border-base);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-light);
  box-shadow: var(--shadow-dark);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.mobile-nav-link {
  color: var(--text-regular);
  text-decoration: none;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-light);
  transition: var(--transition-fast);
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: var(--primary-color);
  background: var(--bg-secondary);
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .header-content {
    padding: 0 1rem;
  }

  .logo-text {
    display: none;
  }

  .header-actions {
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .theme-toggle {
    display: none;
  }

  .network-info {
    display: none;
  }
}
</style>
