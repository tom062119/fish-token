<template>
  <div class="home">
    <!-- 英雄区域 -->
    <section class="hero">
      <div class="hero-background">
        <div class="hero-particles"></div>
        <div class="hero-gradient"></div>
      </div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="hero-badge">
              <span class="badge-icon">🚀</span>
              <span class="badge-text">Polygon生态系统</span>
            </div>
            <h1 class="hero-title">
              <span class="title-main">Fish Token</span>
              <span class="title-sub">下一代DeFi代币</span>
            </h1>
            <p class="hero-description">
              基于Polygon网络的高性能ERC-20代币，提供安全、快速、低成本的去中心化金融解决方案。
              加入全球数千名用户，体验Web3金融的未来。
            </p>

            <!-- 核心数据展示 -->
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">1B+</div>
                <div class="stat-label">总供应量</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">$0.01</div>
                <div class="stat-label">交易费用</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">2s</div>
                <div class="stat-label">确认时间</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">全天候运行</div>
              </div>
            </div>

            <div class="hero-actions">
              <el-button
                v-if="!web3Store.isConnected"
                type="primary"
                size="large"
                class="cta-button primary"
                @click="connectWallet"
                :loading="web3Store.loading.connecting"
              >
                <Wallet class="mr-2" />
                立即开始
              </el-button>
              <el-button
                v-else
                type="primary"
                size="large"
                class="cta-button primary"
                @click="$router.push('/dashboard')"
              >
                <Monitor class="mr-2" />
                进入应用
              </el-button>
              <el-button
                size="large"
                class="cta-button secondary"
                @click="$router.push('/docs')"
              >
                查看文档
              </el-button>
            </div>

            <!-- 信任指标 -->
            <div class="trust-indicators">
              <div class="trust-item">
                <span class="trust-icon">🔒</span>
                <span class="trust-text">智能合约已审计</span>
              </div>
              <div class="trust-item">
                <span class="trust-icon">🌐</span>
                <span class="trust-text">开源透明</span>
              </div>
              <div class="trust-item">
                <span class="trust-icon">⚡</span>
                <span class="trust-text">Polygon网络</span>
              </div>
            </div>
          </div>

          <div class="hero-visual">
            <div class="visual-container">
              <div class="token-showcase">
                <div class="token-card-main">
                  <div class="card-header">
                    <div class="token-logo">
                      <span class="logo-icon">🐟</span>
                      <div class="logo-text">
                        <h3>Fish Token</h3>
                        <p>FISH</p>
                      </div>
                    </div>
                    <div class="network-badge">
                      <span class="network-icon">⬟</span>
                      <span>Polygon</span>
                    </div>
                  </div>

                  <div class="card-stats">
                    <div class="stat-row">
                      <span class="stat-label">当前价格</span>
                      <span class="stat-value">$0.001</span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">市值</span>
                      <span class="stat-value">$1,000,000</span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">持有者</span>
                      <span class="stat-value">1,800+</span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">流动性</span>
                      <span class="stat-value">$250,000</span>
                    </div>
                  </div>

                  <div class="card-actions">
                    <div class="action-button buy">
                      <span class="action-icon">📈</span>
                      <span>购买 FISH</span>
                    </div>
                    <div class="action-button trade">
                      <span class="action-icon">🔄</span>
                      <span>交易</span>
                    </div>
                  </div>
                </div>

                <!-- 浮动元素 -->
                <div class="floating-elements">
                  <div class="floating-card card-1">
                    <span class="card-icon">⚡</span>
                    <span class="card-text">极速交易</span>
                  </div>
                  <div class="floating-card card-2">
                    <span class="card-icon">🔒</span>
                    <span class="card-text">安全可靠</span>
                  </div>
                  <div class="floating-card card-3">
                    <span class="card-icon">💰</span>
                    <span class="card-text">低成本</span>
                  </div>
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

    <!-- 钱包引导 -->
    <section class="wallet-guide-section">
      <div class="container">
        <h2 class="section-title">开始使用</h2>
        <WalletGuide />
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
import WalletGuide from '@/components/Wallet/WalletGuide.vue'
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
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: white;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
  animation: float 20s ease-in-out infinite;
}

.hero-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    #667eea 0%,
    #764ba2 25%,
    #667eea 50%,
    #764ba2 75%,
    #667eea 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-30px) rotate(120deg); }
  66% { transform: translateY(-20px) rotate(240deg); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 2rem 0;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.badge-icon {
  font-size: 1.1rem;
}

.hero-title {
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.title-main {
  display: block;
  font-size: 4rem;
  font-weight: 800;
  background: linear-gradient(45deg, #ffffff, #ffd700, #ffffff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
}

.title-sub {
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  opacity: 0.9;
  margin-top: 0.5rem;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.7;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.cta-button {
  padding: 1rem 2rem !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  transition: all 0.3s ease !important;
  border: none !important;
}

.cta-button.primary {
  background: linear-gradient(45deg, #ffd700, #ffed4e) !important;
  color: #333 !important;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4) !important;
}

.cta-button.primary:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.6) !important;
}

.cta-button.secondary {
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(10px) !important;
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  transform: translateY(-2px) !important;
}

.trust-indicators {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.trust-icon {
  font-size: 1.1rem;
}

/* 视觉区域 */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.token-showcase {
  position: relative;
  z-index: 2;
}

.token-card-main {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  color: #333;
  transition: all 0.3s ease;
}

.token-card-main:hover {
  transform: translateY(-5px);
  box-shadow:
    0 30px 60px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.token-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.logo-text h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.logo-text p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.network-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(45deg, #8247e5, #3d5af1);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.network-icon {
  font-size: 1rem;
}

.card-stats {
  margin-bottom: 1.5rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-row .stat-label {
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-row .stat-value {
  color: #333;
  font-weight: 700;
  font-size: 1rem;
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-button.buy {
  background: linear-gradient(45deg, #00d4aa, #00b894);
  color: white;
}

.action-button.buy:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 212, 170, 0.4);
}

.action-button.trade {
  background: rgba(0, 0, 0, 0.05);
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.action-button.trade:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* 浮动元素 */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  animation: floatAround 6s ease-in-out infinite;
}

.floating-card.card-1 {
  top: 10%;
  right: -10%;
  animation-delay: 0s;
}

.floating-card.card-2 {
  bottom: 30%;
  left: -15%;
  animation-delay: 2s;
}

.floating-card.card-3 {
  top: 60%;
  right: -5%;
  animation-delay: 4s;
}

@keyframes floatAround {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
    opacity: 1;
  }
}

.card-icon {
  font-size: 1rem;
}

/* 特性区域 */
.features {
  padding: 6rem 0;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  position: relative;
}

.features::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a202c;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.08),
    0 1px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08);
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: block;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2d3748;
}

.feature-card p {
  color: #4a5568;
  line-height: 1.7;
  font-size: 1rem;
}

/* 代币信息区域 */
.token-info {
  padding: 6rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
}

.token-info::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
}

.token-info .container {
  position: relative;
  z-index: 1;
}

.token-info .section-title {
  color: white;
  margin-bottom: 3rem;
}

.token-info .section-title::after {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.token-info .el-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 20px !important;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2) !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: #2d3748;
  font-size: 1.2rem;
}

.info-list {
  margin-top: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item:hover {
  background: rgba(102, 126, 234, 0.05);
  margin: 0 -1rem;
  padding: 1rem;
  border-radius: 8px;
}

.info-item .label {
  color: #4a5568;
  font-weight: 500;
  font-size: 0.95rem;
}

.info-item .value {
  font-weight: 700;
  color: #2d3748;
  font-size: 1rem;
}

/* 钱包引导区域 */
.wallet-guide-section {
  padding: 6rem 0;
  background: #f7fafc;
}

.wallet-guide-section .section-title {
  color: #2d3748;
  margin-bottom: 3rem;
}

/* 快速开始区域 */
.quick-start {
  padding: 6rem 0;
  background: white;
  position: relative;
}

.quick-start::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
}

.quick-start .section-title {
  color: #2d3748;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.step:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.06);
  border-color: #667eea;
}

.step-number {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.step-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.step-content p {
  color: #4a5568;
  line-height: 1.7;
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .trust-indicators {
    justify-content: center;
    flex-wrap: wrap;
  }

  .floating-elements {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 90vh;
    padding: 2rem 0;
  }

  .title-main {
    font-size: 3rem;
  }

  .title-sub {
    font-size: 1.2rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .hero-stats {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .stat-number {
    font-size: 1.5rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
  }

  .trust-indicators {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .token-card-main {
    padding: 1.5rem;
  }

  .features-grid,
  .info-grid,
  .steps {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2.5rem;
  }

  .step {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero {
    min-height: 80vh;
  }

  .title-main {
    font-size: 2.5rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }

  .feature-card,
  .step {
    padding: 1.25rem;
  }

  .token-card-main {
    padding: 1.25rem;
  }
}
</style>
