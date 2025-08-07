<template>
  <div class="docs">
    <div class="container">
      <div class="docs-header">
        <h1>📚 Fish Token API 文档</h1>
        <p>完整的智能合约接口和前端集成指南</p>
      </div>

      <div class="docs-nav">
        <el-menu 
          :default-active="activeSection" 
          mode="horizontal" 
          @select="scrollToSection"
          class="docs-menu"
        >
          <el-menu-item index="overview">概览</el-menu-item>
          <el-menu-item index="contract">合约接口</el-menu-item>
          <el-menu-item index="frontend">前端集成</el-menu-item>
          <el-menu-item index="examples">代码示例</el-menu-item>
          <el-menu-item index="networks">网络配置</el-menu-item>
        </el-menu>
      </div>

      <div class="docs-content">
        <!-- 概览 -->
        <section id="overview" class="doc-section">
          <h2>🎯 概览</h2>
          <el-card>
            <div class="overview-content">
              <div class="contract-info">
                <h3>合约信息</h3>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="label">合约名称:</span>
                    <span class="value">FishToken</span>
                  </div>
                  <div class="info-item">
                    <span class="label">代币标准:</span>
                    <span class="value">ERC-20</span>
                  </div>
                  <div class="info-item">
                    <span class="label">代币符号:</span>
                    <span class="value">FISH</span>
                  </div>
                  <div class="info-item">
                    <span class="label">精度:</span>
                    <span class="value">18</span>
                  </div>
                  <div class="info-item">
                    <span class="label">总供应量:</span>
                    <span class="value">1,000,000,000 FISH</span>
                  </div>
                  <div class="info-item">
                    <span class="label">最大供应量:</span>
                    <span class="value">10,000,000,000 FISH</span>
                  </div>
                </div>
              </div>
              
              <div class="features-list">
                <h3>功能特性</h3>
                <ul>
                  <li>✅ 标准ERC-20功能 (转账、授权、余额查询)</li>
                  <li>✅ 铸造功能 (仅合约所有者)</li>
                  <li>✅ 销毁功能 (持有者可销毁)</li>
                  <li>✅ 暂停/恢复功能 (紧急情况)</li>
                  <li>✅ 所有权管理</li>
                  <li>✅ 批量操作</li>
                  <li>✅ 紧急提取功能</li>
                  <li>✅ 重入攻击防护</li>
                </ul>
              </div>
            </div>
          </el-card>
        </section>

        <!-- 合约接口 -->
        <section id="contract" class="doc-section">
          <h2>📋 合约接口</h2>
          
          <div class="api-groups">
            <!-- ERC-20标准方法 -->
            <el-card class="api-group">
              <template #header>
                <span>ERC-20 标准方法</span>
              </template>
              
              <div class="api-methods">
                <div class="api-method">
                  <h4>balanceOf(address account) → uint256</h4>
                  <p>查询指定地址的代币余额</p>
                  <div class="code-block">
                    <pre><code>const balance = await contract.balanceOf("0x...")
console.log(ethers.formatEther(balance)) // 格式化为可读数字</code></pre>
                  </div>
                </div>

                <div class="api-method">
                  <h4>transfer(address to, uint256 amount) → bool</h4>
                  <p>转账代币到指定地址</p>
                  <div class="code-block">
                    <pre><code>const amount = ethers.parseEther("100") // 100 FISH
const tx = await contract.transfer("0x...", amount)
await tx.wait() // 等待交易确认</code></pre>
                  </div>
                </div>

                <div class="api-method">
                  <h4>approve(address spender, uint256 amount) → bool</h4>
                  <p>授权指定地址使用您的代币</p>
                  <div class="code-block">
                    <pre><code>const amount = ethers.parseEther("1000")
const tx = await contract.approve("0x...", amount)
await tx.wait()</code></pre>
                  </div>
                </div>
              </div>
            </el-card>

            <!-- 扩展功能 -->
            <el-card class="api-group">
              <template #header>
                <span>扩展功能</span>
              </template>
              
              <div class="api-methods">
                <div class="api-method">
                  <h4>mint(address to, uint256 amount) [仅所有者]</h4>
                  <p>铸造新的代币</p>
                  <div class="code-block">
                    <pre><code>const amount = ethers.parseEther("1000")
const tx = await contract.mint("0x...", amount)
await tx.wait()</code></pre>
                  </div>
                </div>

                <div class="api-method">
                  <h4>burn(uint256 amount)</h4>
                  <p>销毁自己的代币</p>
                  <div class="code-block">
                    <pre><code>const amount = ethers.parseEther("100")
const tx = await contract.burn(amount)
await tx.wait()</code></pre>
                  </div>
                </div>

                <div class="api-method">
                  <h4>getTokenInfo() → (string, string, uint8, uint256, uint256)</h4>
                  <p>获取代币详细信息</p>
                  <div class="code-block">
                    <pre><code>const info = await contract.getTokenInfo()
console.log({
  name: info.name_,
  symbol: info.symbol_,
  decimals: info.decimals_,
  totalSupply: ethers.formatEther(info.totalSupply_),
  maxSupply: ethers.formatEther(info.maxSupply_)
})</code></pre>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </section>

        <!-- 前端集成 -->
        <section id="frontend" class="doc-section">
          <h2>🎨 前端集成</h2>
          
          <el-card>
            <div class="integration-guide">
              <h3>1. 安装依赖</h3>
              <div class="code-block">
                <pre><code>npm install ethers</code></pre>
              </div>

              <h3>2. 连接钱包</h3>
              <div class="code-block">
                <pre><code>import { ethers } from 'ethers'

// 连接MetaMask
const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()

// 创建合约实例
const contractAddress = "0x..." // Fish Token合约地址
const contractABI = [...] // 合约ABI
const contract = new ethers.Contract(contractAddress, contractABI, signer)</code></pre>
              </div>

              <h3>3. 读取数据</h3>
              <div class="code-block">
                <pre><code>// 获取用户余额
const balance = await contract.balanceOf(userAddress)
console.log(`余额: ${ethers.formatEther(balance)} FISH`)

// 获取代币信息
const tokenInfo = await contract.getTokenInfo()
console.log(`总供应量: ${ethers.formatEther(tokenInfo.totalSupply_)} FISH`)</code></pre>
              </div>

              <h3>4. 发送交易</h3>
              <div class="code-block">
                <pre><code>// 转账示例
async function transferTokens(to, amount) {
  try {
    const tx = await contract.transfer(to, ethers.parseEther(amount))
    console.log('交易哈希:', tx.hash)
    
    const receipt = await tx.wait()
    console.log('交易确认:', receipt.status === 1 ? '成功' : '失败')
  } catch (error) {
    console.error('转账失败:', error.message)
  }
}</code></pre>
              </div>
            </div>
          </el-card>
        </section>

        <!-- 代码示例 -->
        <section id="examples" class="doc-section">
          <h2>💻 代码示例</h2>
          
          <div class="examples-grid">
            <el-card class="example-card">
              <template #header>
                <span>Vue.js 集成示例</span>
              </template>
              <div class="code-block">
                <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;余额: {{ balance }} FISH&lt;/p&gt;
    &lt;el-button @click="transfer"&gt;转账&lt;/el-button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref, onMounted } from 'vue'
import { ethers } from 'ethers'

const balance = ref('0')

onMounted(async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const contract = new ethers.Contract(contractAddress, abi, signer)
  
  const bal = await contract.balanceOf(await signer.getAddress())
  balance.value = ethers.formatEther(bal)
})
&lt;/script&gt;</code></pre>
              </div>
            </el-card>

            <el-card class="example-card">
              <template #header>
                <span>React 集成示例</span>
              </template>
              <div class="code-block">
                <pre><code>import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

function FishTokenBalance() {
  const [balance, setBalance] = useState('0')
  
  useEffect(() => {
    async function loadBalance() {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      
      const bal = await contract.balanceOf(await signer.getAddress())
      setBalance(ethers.formatEther(bal))
    }
    
    loadBalance()
  }, [])
  
  return &lt;div&gt;余额: {balance} FISH&lt;/div&gt;
}</code></pre>
              </div>
            </el-card>
          </div>
        </section>

        <!-- 网络配置 -->
        <section id="networks" class="doc-section">
          <h2>🌐 网络配置</h2>
          
          <div class="networks-grid">
            <el-card class="network-card">
              <template #header>
                <span>Polygon 主网</span>
              </template>
              <div class="network-info">
                <div class="info-item">
                  <span class="label">网络名称:</span>
                  <span class="value">Polygon Mainnet</span>
                </div>
                <div class="info-item">
                  <span class="label">RPC URL:</span>
                  <span class="value">https://polygon-rpc.com/</span>
                </div>
                <div class="info-item">
                  <span class="label">链ID:</span>
                  <span class="value">137</span>
                </div>
                <div class="info-item">
                  <span class="label">货币符号:</span>
                  <span class="value">MATIC</span>
                </div>
                <div class="info-item">
                  <span class="label">区块浏览器:</span>
                  <span class="value">https://polygonscan.com/</span>
                </div>
              </div>
            </el-card>

            <el-card class="network-card">
              <template #header>
                <span>Amoy 测试网</span>
              </template>
              <div class="network-info">
                <div class="info-item">
                  <span class="label">网络名称:</span>
                  <span class="value">Polygon Amoy Testnet</span>
                </div>
                <div class="info-item">
                  <span class="label">RPC URL:</span>
                  <span class="value">https://rpc-amoy.polygon.technology</span>
                </div>
                <div class="info-item">
                  <span class="label">链ID:</span>
                  <span class="value">80002</span>
                </div>
                <div class="info-item">
                  <span class="label">货币符号:</span>
                  <span class="value">MATIC</span>
                </div>
                <div class="info-item">
                  <span class="label">区块浏览器:</span>
                  <span class="value">https://amoy.polygonscan.com/</span>
                </div>
              </div>
            </el-card>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('overview')

const scrollToSection = (section) => {
  const element = document.getElementById(section)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 监听滚动事件，更新活动菜单项
const handleScroll = () => {
  const sections = ['overview', 'contract', 'frontend', 'examples', 'networks']
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const offsetTop = element.offsetTop - 100
      const offsetBottom = offsetTop + element.offsetHeight
      
      if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
        activeSection.value = section
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.docs {
  padding: 2rem 0;
}

.docs-header {
  text-align: center;
  margin-bottom: 2rem;
}

.docs-header h1 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.docs-header p {
  color: var(--text-regular);
  font-size: 1.1rem;
}

.docs-nav {
  margin-bottom: 2rem;
  position: sticky;
  top: 70px;
  z-index: 10;
  background: var(--bg-primary);
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-light);
}

.docs-menu {
  justify-content: center;
}

.doc-section {
  margin-bottom: 3rem;
  scroll-margin-top: 150px;
}

.doc-section h2 {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.overview-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.info-grid {
  display: grid;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-light);
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: var(--text-regular);
  font-weight: 500;
}

.info-item .value {
  color: var(--text-primary);
  font-weight: 600;
}

.features-list ul {
  list-style: none;
  padding: 0;
}

.features-list li {
  margin-bottom: 0.5rem;
  color: var(--text-regular);
}

.api-groups {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.api-method {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-light);
}

.api-method:last-child {
  border-bottom: none;
}

.api-method h4 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}

.api-method p {
  color: var(--text-regular);
  margin-bottom: 1rem;
}

.code-block {
  background: var(--bg-secondary);
  border: 1px solid var(--border-base);
  border-radius: var(--border-radius-base);
  padding: 1rem;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.integration-guide h3 {
  margin: 2rem 0 1rem;
  color: var(--text-primary);
}

.integration-guide h3:first-child {
  margin-top: 0;
}

.examples-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.networks-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .overview-content,
  .examples-grid,
  .networks-grid {
    grid-template-columns: 1fr;
  }
  
  .docs-nav {
    position: static;
  }
  
  .docs-menu {
    flex-direction: column;
  }
}
</style>
