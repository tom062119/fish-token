<template>
  <div class="history">
    <div class="container">
      <h1>📊 交易历史</h1>
      
      <el-card>
        <template #header>
          <div class="card-header">
            <span>我的交易记录</span>
            <el-button @click="refreshHistory" :loading="loading">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </template>
        
        <div class="history-content">
          <el-empty 
            description="暂无交易记录" 
            :image-size="200"
          >
            <el-button type="primary" @click="$router.push('/transfer')">
              发起第一笔转账
            </el-button>
          </el-empty>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

const loading = ref(false)

const refreshHistory = async () => {
  loading.value = true
  // 模拟刷新
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
  ElMessage.success('已刷新')
}
</script>

<style scoped>
.history {
  padding: 2rem 0;
}

.history h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.history-content {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
