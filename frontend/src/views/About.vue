<template>
  <div class="about">
    <div class="container">
      <h1>🐟 关于 Fish Token</h1>
      
      <div class="about-content">
        <el-card class="intro-card">
          <template #header>
            <span>项目介绍</span>
          </template>
          
          <div class="intro-content">
            <p>
              Fish Token 是一个部署在 Polygon 网络上的 ERC-20 代币项目。
              我们致力于提供安全、快速、低成本的代币转账和管理服务。
            </p>
            
            <h3>🎯 项目特色</h3>
            <ul>
              <li>✅ 基于 Polygon 网络，交易费用极低</li>
              <li>✅ 完全符合 ERC-20 标准</li>
              <li>✅ 具备铸造、销毁等高级功能</li>
              <li>✅ 安全的智能合约，经过全面测试</li>
              <li>✅ 现代化的 Web3 用户界面</li>
            </ul>
            
            <h3>🔧 技术栈</h3>
            <ul>
              <li><strong>智能合约:</strong> Solidity + OpenZeppelin</li>
              <li><strong>开发框架:</strong> Hardhat</li>
              <li><strong>前端:</strong> Vue 3 + Vite</li>
              <li><strong>Web3:</strong> ethers.js</li>
              <li><strong>区块链:</strong> Polygon (MATIC)</li>
            </ul>
          </div>
        </el-card>
        
        <el-card class="stats-card">
          <template #header>
            <span>代币统计</span>
          </template>
          
          <div class="stats-content">
            <div class="stat-item">
              <div class="stat-label">代币名称</div>
              <div class="stat-value">Fish Token</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">代币符号</div>
              <div class="stat-value">FISH</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">精度</div>
              <div class="stat-value">18</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">总供应量</div>
              <div class="stat-value">{{ web3Store.formattedTotalSupply || '1,000,000,000' }} FISH</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">网络</div>
              <div class="stat-value">Polygon</div>
            </div>
          </div>
        </el-card>
        
        <el-card class="links-card">
          <template #header>
            <span>相关链接</span>
          </template>
          
          <div class="links-content">
            <a href="https://github.com/tom062119/fish-token" target="_blank" class="link-item">
              <el-icon><Link /></el-icon>
              <span>GitHub 仓库</span>
            </a>
            <a href="https://polygonscan.com" target="_blank" class="link-item">
              <el-icon><View /></el-icon>
              <span>区块浏览器</span>
            </a>
            <a href="https://polygon.technology" target="_blank" class="link-item">
              <el-icon><Connection /></el-icon>
              <span>Polygon 官网</span>
            </a>
            <a href="/docs/API.md" target="_blank" class="link-item">
              <el-icon><Document /></el-icon>
              <span>API 文档</span>
            </a>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeb3Store } from '@/stores/web3'
import { Link, View, Connection, Document } from '@element-plus/icons-vue'

const web3Store = useWeb3Store()
</script>

<style scoped>
.about {
  padding: 2rem 0;
}

.about h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.intro-card {
  grid-row: span 2;
}

.intro-content h3 {
  margin: 1.5rem 0 1rem;
  color: var(--text-primary);
}

.intro-content ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.intro-content li {
  margin: 0.5rem 0;
  color: var(--text-regular);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-light);
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  color: var(--text-regular);
  font-weight: 500;
}

.stat-value {
  color: var(--text-primary);
  font-weight: 600;
}

.links-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.link-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-base);
  text-decoration: none;
  color: var(--text-regular);
  transition: var(--transition-fast);
}

.link-item:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  background: var(--bg-secondary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .intro-card {
    grid-row: auto;
  }
}
</style>
