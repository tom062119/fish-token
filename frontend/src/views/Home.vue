<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              🐟 Fish Token
              <span class="gradient-text">Polygon生态代币</span>
            </h1>
            <p class="hero-description">
              安全、快速、低成本的ERC-20代币，构建在Polygon网络上。
              体验下一代去中心化金融的无限可能。
            </p>
            <div class="hero-actions">
              <el-button 
                v-if="!web3Store.isConnected"
                type="primary" 
                size="large" 
                @click="connectWallet"
                :loading="web3Store.loading.connecting"
              >
                <Wallet class="mr-2" />
                连接钱包
              </el-button>
              <el-button
                v-else
                type="primary"
                size="large"
                @click="$router.push('/dashboard')"
              >
                <Monitor class="mr-2" />
                进入仪表板
              </el-button>
              <el-button 
                size="large" 
                @click="$router.push('/about')"
              >
                了解更多
              </el-button>
            </div>
          </div>
          <div class="hero-visual">
            <div class="token-card">
              <div class="token-icon">🐟</div>
              <h3>Fish Token</h3>
              <p>FISH</p>
              <div class="token-stats">
                <div class="stat">
                  <span class="label">总供应量</span>
                  <span class="value">{{ web3Store.formattedTotalSupply || '1,000,000,000' }}</span>
                </div>
                <div class="stat">
                  <span class="label">网络</span>
                  <span class="value">Polygon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性介绍 -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">为什么选择 Fish Token？</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.title">
            <div class="feature-icon">
              <component :is="feature.icon" />
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 代币信息 -->
    <section class="token-info">
      <div class="container">
        <h2 class="section-title">代币信息</h2>
        <div class="info-grid">
          <el-card class="info-card">
            <template #header>
              <div class="card-header">
                <span>基本信息</span>
                <el-tag type="success">ERC-20</el-tag>
              </div>
            </template>
            <div class="info-list">
              <div class="info-item">
                <span class="label">代币名称:</span>
                <span class="value">{{ web3Store.tokenInfo.name || 'Fish Token' }}</span>
              </div>
              <div class="info-item">
                <span class="label">代币符号:</span>
                <span class="value">{{ web3Store.tokenInfo.symbol || 'FISH' }}</span>
              </div>
              <div class="info-item">
                <span class="label">精度:</span>
                <span class="value">{{ web3Store.tokenInfo.decimals || 18 }}</span>
              </div>
              <div class="info-item">
                <span class="label">总供应量:</span>
                <span class="value">{{ web3Store.formattedTotalSupply || '1,000,000,000' }} FISH</span>
              </div>
            </div>
          </el-card>

          <el-card class="info-card">
            <template #header>
              <div class="card-header">
                <span>网络信息</span>
                <el-tag type="primary">Polygon</el-tag>
              </div>
            </template>
            <div class="info-list">
              <div class="info-item">
                <span class="label">区块链:</span>
                <span class="value">Polygon (MATIC)</span>
              </div>
              <div class="info-item">
                <span class="label">网络ID:</span>
                <span class="value">137</span>
              </div>
              <div class="info-item">
                <span class="label">交易费用:</span>
                <span class="value">极低 (~$0.01)</span>
              </div>
              <div class="info-item">
                <span class="label">确认时间:</span>
                <span class="value">~2秒</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="quick-start">
      <div class="container">
        <h2 class="section-title">快速开始</h2>
        <div class="steps">
          <div class="step" v-for="(step, index) in steps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWeb3Store } from '@/stores/web3'
import {
  Wallet,
  Monitor,
  Lightning,
  Lock,
  Coin,
  Connection
} from '@element-plus/icons-vue'

const web3Store = useWeb3Store()

// 特性列表
const features = ref([
  {
    icon: Lightning,
    title: '极速交易',
    description: 'Polygon网络提供2秒确认时间，让您的交易快如闪电'
  },
  {
    icon: Coin,
    title: '低成本',
    description: '交易费用低至$0.01，让每一笔转账都经济实惠'
  },
  {
    icon: Lock,
    title: '安全可靠',
    description: '基于以太坊安全性，经过严格审计的智能合约'
  },
  {
    icon: Connection,
    title: '全球通用',
    description: '24/7全球可用，支持跨境转账和DeFi应用'
  }
])

// 使用步骤
const steps = ref([
  {
    title: '安装MetaMask',
    description: '下载并安装MetaMask钱包扩展程序'
  },
  {
    title: '添加Polygon网络',
    description: '在MetaMask中添加Polygon网络配置'
  },
  {
    title: '连接钱包',
    description: '点击"连接钱包"按钮授权访问'
  },
  {
    title: '开始使用',
    description: '查看余额、转账代币、参与DeFi'
  }
])

// 连接钱包
const connectWallet = async () => {
  await web3Store.connectWallet()
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* 英雄区域 */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.token-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.token-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.token-stats {
  margin-top: 1.5rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.stat .label {
  opacity: 0.8;
}

.stat .value {
  font-weight: 600;
}

/* 特性区域 */
.features {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
  color: var(--text-primary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: var(--border-radius-large);
  text-align: center;
  box-shadow: var(--shadow-light);
  transition: var(--transition-base);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-dark);
}

.feature-icon {
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.feature-card p {
  color: var(--text-regular);
  line-height: 1.6;
}

/* 代币信息区域 */
.token-info {
  padding: 4rem 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.info-list {
  space-y: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-light);
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: var(--text-regular);
}

.info-item .value {
  font-weight: 600;
  color: var(--text-primary);
}

/* 快速开始区域 */
.quick-start {
  padding: 4rem 0;
  background: var(--bg-secondary);
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  width: 3rem;
  height: 3rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.step-content p {
  color: var(--text-regular);
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .steps {
    grid-template-columns: 1fr;
  }
}
</style>
