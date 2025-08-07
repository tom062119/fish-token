<template>
  <div class="wallet-guide">
    <!-- 检测钱包状态 -->
    <div v-if="!hasWallet" class="no-wallet">
      <el-card class="wallet-install-card">
        <template #header>
          <div class="card-header">
            <span>🦊 需要安装MetaMask钱包</span>
          </div>
        </template>
        
        <div class="install-content">
          <div class="wallet-info">
            <img src="/metamask-logo.png" alt="MetaMask" class="wallet-logo" />
            <h3>MetaMask - 最受欢迎的Web3钱包</h3>
            <p>MetaMask是一个安全的数字钱包，让您可以存储、发送和接收加密货币，以及与去中心化应用交互。</p>
          </div>
          
          <div class="install-buttons">
            <el-button 
              type="primary" 
              size="large" 
              @click="installMetaMask"
              style="width: 100%; margin-bottom: 1rem;"
            >
              <el-icon><Download /></el-icon>
              一键安装 MetaMask
            </el-button>
            
            <div class="manual-links">
              <p>或手动下载：</p>
              <div class="browser-links">
                <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank" class="browser-link">
                  <el-icon><ChromeFilled /></el-icon>
                  Chrome
                </a>
                <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" target="_blank" class="browser-link">
                  <el-icon><FirefoxFilled /></el-icon>
                  Firefox
                </a>
                <a href="https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm" target="_blank" class="browser-link">
                  <el-icon><EdgeFilled /></el-icon>
                  Edge
                </a>
              </div>
            </div>
          </div>
          
          <div class="install-steps">
            <h4>安装步骤：</h4>
            <ol>
              <li>点击上方"一键安装"按钮</li>
              <li>在浏览器扩展商店中点击"添加到浏览器"</li>
              <li>创建新钱包或导入现有钱包</li>
              <li>返回此页面并连接钱包</li>
            </ol>
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 钱包已安装但未连接 -->
    <div v-else-if="!isConnected" class="wallet-connect">
      <el-card class="connect-card">
        <template #header>
          <div class="card-header">
            <span>🔗 连接您的钱包</span>
          </div>
        </template>
        
        <div class="connect-content">
          <div class="connect-info">
            <el-icon class="connect-icon"><Wallet /></el-icon>
            <h3>检测到MetaMask钱包</h3>
            <p>请连接您的钱包以开始使用Fish Token</p>
          </div>
          
          <el-button 
            type="primary" 
            size="large" 
            @click="connectWallet"
            :loading="connecting"
            style="width: 100%;"
          >
            <el-icon><Link /></el-icon>
            连接MetaMask钱包
          </el-button>
          
          <div class="network-guide">
            <h4>网络配置：</h4>
            <p>确保您的MetaMask已添加Polygon网络</p>
            <el-button @click="addPolygonNetwork" size="small">
              <el-icon><Plus /></el-icon>
              添加Polygon网络
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
    
    <!-- 钱包已连接 -->
    <div v-else class="wallet-connected">
      <el-alert
        title="钱包已连接"
        type="success"
        :description="`地址: ${formatAddress(account)}`"
        show-icon
        :closable="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useWeb3Store } from '@/stores/web3'
import { 
  Download, 
  ChromeFilled, 
  FirefoxFilled, 
  EdgeFilled,
  Wallet,
  Link,
  Plus
} from '@element-plus/icons-vue'

const web3Store = useWeb3Store()
const connecting = ref(false)

// 计算属性
const hasWallet = computed(() => typeof window.ethereum !== 'undefined')
const isConnected = computed(() => web3Store.isConnected)
const account = computed(() => web3Store.account)

// 检测浏览器类型
const getBrowserType = () => {
  const userAgent = navigator.userAgent
  if (userAgent.includes('Chrome')) return 'chrome'
  if (userAgent.includes('Firefox')) return 'firefox'
  if (userAgent.includes('Edge')) return 'edge'
  return 'chrome' // 默认
}

// 一键安装MetaMask
const installMetaMask = () => {
  const browser = getBrowserType()
  const urls = {
    chrome: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
    edge: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm'
  }
  
  window.open(urls[browser] || urls.chrome, '_blank')
  
  ElMessage.info('请在新打开的页面中安装MetaMask，安装完成后刷新此页面')
}

// 连接钱包
const connectWallet = async () => {
  connecting.value = true
  try {
    await web3Store.connectWallet()
  } catch (error) {
    ElMessage.error('连接钱包失败')
  } finally {
    connecting.value = false
  }
}

// 添加Polygon网络
const addPolygonNetwork = async () => {
  if (!window.ethereum) return
  
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x89', // 137 in hex
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
      }]
    })
    ElMessage.success('Polygon网络添加成功')
  } catch (error) {
    ElMessage.error('添加网络失败')
  }
}

// 格式化地址
const formatAddress = (address) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

onMounted(() => {
  // 检查钱包状态
  web3Store.checkConnection()
})
</script>

<style scoped>
.wallet-guide {
  max-width: 600px;
  margin: 0 auto;
}

.card-header {
  font-weight: 600;
  font-size: 1.1rem;
}

.wallet-install-card,
.connect-card {
  text-align: center;
}

.wallet-info {
  margin-bottom: 2rem;
}

.wallet-logo {
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
}

.wallet-info h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.wallet-info p {
  color: var(--text-regular);
  line-height: 1.6;
}

.install-buttons {
  margin-bottom: 2rem;
}

.manual-links {
  margin-top: 1rem;
}

.manual-links p {
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.browser-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.browser-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-base);
  border-radius: var(--border-radius-base);
  text-decoration: none;
  color: var(--text-regular);
  transition: var(--transition-fast);
}

.browser-link:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.install-steps {
  text-align: left;
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: var(--border-radius-base);
}

.install-steps h4 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.install-steps ol {
  padding-left: 1.5rem;
}

.install-steps li {
  margin-bottom: 0.5rem;
  color: var(--text-regular);
}

.connect-content {
  text-align: center;
}

.connect-info {
  margin-bottom: 2rem;
}

.connect-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.connect-info h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.network-guide {
  margin-top: 2rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: var(--border-radius-base);
}

.network-guide h4 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.network-guide p {
  margin-bottom: 1rem;
  color: var(--text-regular);
}

.wallet-connected {
  margin: 2rem 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .browser-links {
    flex-direction: column;
    align-items: center;
  }
  
  .browser-link {
    width: 200px;
    justify-content: center;
  }
}
</style>
