<template>
  <div class="admin">
    <div class="container">
      <h1>⚙️ 管理面板</h1>
      
      <div class="admin-grid">
        <!-- 铸造代币 -->
        <el-card class="admin-card">
          <template #header>
            <span>铸造代币</span>
          </template>
          
          <el-form :model="mintForm" label-width="100px">
            <el-form-item label="接收地址">
              <el-input v-model="mintForm.to" placeholder="接收地址" />
            </el-form-item>
            <el-form-item label="铸造数量">
              <el-input v-model="mintForm.amount" placeholder="数量" type="number">
                <template #suffix>FISH</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleMint" :loading="loading.mint">
                铸造代币
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 合约控制 -->
        <el-card class="admin-card">
          <template #header>
            <span>合约控制</span>
          </template>
          
          <div class="control-actions">
            <el-button 
              type="warning" 
              @click="handlePause" 
              :loading="loading.pause"
              style="width: 100%; margin-bottom: 1rem;"
            >
              暂停合约
            </el-button>
            <el-button 
              type="success" 
              @click="handleUnpause" 
              :loading="loading.unpause"
              style="width: 100%;"
            >
              恢复合约
            </el-button>
          </div>
        </el-card>

        <!-- 合约信息 -->
        <el-card class="admin-card">
          <template #header>
            <span>合约信息</span>
          </template>
          
          <div class="contract-info">
            <div class="info-item">
              <span class="label">合约所有者:</span>
              <span class="value">{{ web3Store.contractOwner }}</span>
            </div>
            <div class="info-item">
              <span class="label">当前状态:</span>
              <el-tag type="success">正常运行</el-tag>
            </div>
            <div class="info-item">
              <span class="label">总供应量:</span>
              <span class="value">{{ web3Store.formattedTotalSupply }} FISH</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useWeb3Store } from '@/stores/web3'

const web3Store = useWeb3Store()

const loading = reactive({
  mint: false,
  pause: false,
  unpause: false
})

const mintForm = reactive({
  to: '',
  amount: ''
})

const handleMint = async () => {
  loading.mint = true
  try {
    // 模拟铸造
    await new Promise(resolve => setTimeout(resolve, 2000))
    ElMessage.success('铸造成功！')
    mintForm.to = ''
    mintForm.amount = ''
  } catch (error) {
    ElMessage.error('铸造失败')
  } finally {
    loading.mint = false
  }
}

const handlePause = async () => {
  loading.pause = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('合约已暂停')
  } catch (error) {
    ElMessage.error('暂停失败')
  } finally {
    loading.pause = false
  }
}

const handleUnpause = async () => {
  loading.unpause = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('合约已恢复')
  } catch (error) {
    ElMessage.error('恢复失败')
  } finally {
    loading.unpause = false
  }
}
</script>

<style scoped>
.admin {
  padding: 2rem 0;
}

.admin h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
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
</style>
