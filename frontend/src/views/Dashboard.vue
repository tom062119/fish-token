<template>
  <div class="dashboard">
    <div class="container">
      <h1>🐟 Fish Token 仪表板</h1>
      
      <!-- 账户信息卡片 -->
      <div class="dashboard-grid">
        <el-card class="info-card">
          <template #header>
            <div class="card-header">
              <span>账户信息</span>
              <el-tag type="success">已连接</el-tag>
            </div>
          </template>
          <div class="account-info">
            <div class="info-item">
              <span class="label">钱包地址:</span>
              <span class="value">{{ web3Store.account }}</span>
              <el-button size="small" @click="copyAddress">复制</el-button>
            </div>
            <div class="info-item">
              <span class="label">网络:</span>
              <span class="value">{{ web3Store.networkInfo.name }}</span>
            </div>
            <div class="info-item">
              <span class="label">余额:</span>
              <span class="value">{{ web3Store.formattedBalance }} {{ web3Store.networkInfo.currency }}</span>
            </div>
          </div>
        </el-card>

        <!-- 代币信息卡片 -->
        <el-card class="info-card">
          <template #header>
            <div class="card-header">
              <span>Fish Token</span>
              <el-tag type="primary">FISH</el-tag>
            </div>
          </template>
          <div class="token-info">
            <div class="info-item">
              <span class="label">我的余额:</span>
              <span class="value">{{ web3Store.formattedTokenBalance }} FISH</span>
            </div>
            <div class="info-item">
              <span class="label">总供应量:</span>
              <span class="value">{{ web3Store.formattedTotalSupply }} FISH</span>
            </div>
            <div class="info-item">
              <span class="label">合约地址:</span>
              <span class="value contract-address">{{ contractAddress }}</span>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 快速操作 -->
      <el-card class="actions-card">
        <template #header>
          <span>快速操作</span>
        </template>
        <div class="quick-actions">
          <el-button type="primary" size="large" @click="$router.push('/transfer')">
            <el-icon><Promotion /></el-icon>
            转账代币
          </el-button>
          <el-button size="large" @click="$router.push('/history')">
            <el-icon><Clock /></el-icon>
            交易历史
          </el-button>
          <el-button v-if="web3Store.isOwner" type="warning" size="large" @click="$router.push('/admin')">
            <el-icon><Setting /></el-icon>
            管理面板
          </el-button>
        </div>
      </el-card>

      <!-- 最近交易 -->
      <el-card class="transactions-card">
        <template #header>
          <span>最近交易</span>
        </template>
        <div class="transactions">
          <el-empty description="暂无交易记录" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useWeb3Store } from '@/stores/web3'
import { Promotion, Clock, Setting } from '@element-plus/icons-vue'

const web3Store = useWeb3Store()

// 获取合约地址
const contractAddress = computed(() => {
  // 这里应该从配置文件或store中获取
  return '0x5FbDB2315678afecb367f032d93F642f64180aa3'
})

// 复制地址
const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(web3Store.account)
    ElMessage.success('地址已复制到剪贴板')
  } catch (error) {
    ElMessage.error('复制失败')
  }
}
</script>

<style scoped>
.dashboard {
  padding: 2rem 0;
}

.dashboard h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
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

.contract-address {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.actions-card {
  margin-bottom: 2rem;
}

.quick-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.quick-actions .el-button {
  flex: 1;
  min-width: 150px;
}

.transactions-card {
  margin-bottom: 2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    flex-direction: column;
  }
  
  .quick-actions .el-button {
    width: 100%;
  }
}
</style>
