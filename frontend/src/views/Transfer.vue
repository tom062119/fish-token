<template>
  <div class="transfer">
    <div class="container">
      <h1>💸 转账 Fish Token</h1>
      
      <div class="transfer-content">
        <el-card class="transfer-card">
          <template #header>
            <span>发送 FISH 代币</span>
          </template>
          
          <el-form :model="transferForm" :rules="rules" ref="transferFormRef" label-width="120px">
            <el-form-item label="接收地址" prop="to">
              <el-input 
                v-model="transferForm.to" 
                placeholder="请输入接收方钱包地址"
                clearable
              />
            </el-form-item>
            
            <el-form-item label="转账数量" prop="amount">
              <el-input 
                v-model="transferForm.amount" 
                placeholder="请输入转账数量"
                type="number"
                clearable
              >
                <template #suffix>FISH</template>
              </el-input>
            </el-form-item>
            
            <el-form-item label="备注" prop="memo">
              <el-input 
                v-model="transferForm.memo" 
                placeholder="转账备注（可选）"
                type="textarea"
                :rows="3"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                @click="handleTransfer"
                :loading="loading"
                size="large"
                style="width: 100%"
              >
                确认转账
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
        
        <!-- 余额信息 -->
        <el-card class="balance-card">
          <template #header>
            <span>余额信息</span>
          </template>
          
          <div class="balance-info">
            <div class="balance-item">
              <span class="label">FISH 余额:</span>
              <span class="value">{{ web3Store.formattedTokenBalance }} FISH</span>
            </div>
            <div class="balance-item">
              <span class="label">{{ web3Store.networkInfo.currency }} 余额:</span>
              <span class="value">{{ web3Store.formattedBalance }} {{ web3Store.networkInfo.currency }}</span>
            </div>
            <div class="balance-item">
              <span class="label">预估Gas费:</span>
              <span class="value">~0.001 {{ web3Store.networkInfo.currency }}</span>
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
import { ethers } from 'ethers'

const web3Store = useWeb3Store()
const transferFormRef = ref()
const loading = ref(false)

// 转账表单
const transferForm = reactive({
  to: '',
  amount: '',
  memo: ''
})

// 表单验证规则
const rules = {
  to: [
    { required: true, message: '请输入接收地址', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (!ethers.isAddress(value)) {
          callback(new Error('请输入有效的以太坊地址'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ],
  amount: [
    { required: true, message: '请输入转账数量', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (isNaN(value) || parseFloat(value) <= 0) {
          callback(new Error('请输入有效的转账数量'))
        } else if (parseFloat(value) > parseFloat(web3Store.formattedTokenBalance)) {
          callback(new Error('转账数量不能超过余额'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ]
}

// 处理转账
const handleTransfer = async () => {
  if (!transferFormRef.value) return
  
  try {
    const valid = await transferFormRef.value.validate()
    if (!valid) return
    
    loading.value = true
    
    // 这里应该调用智能合约的转账方法
    // const amount = ethers.parseEther(transferForm.amount)
    // const tx = await web3Store.contract.transfer(transferForm.to, amount)
    // await tx.wait()
    
    // 模拟转账
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    ElMessage.success('转账成功！')
    
    // 重置表单
    transferFormRef.value.resetFields()
    
    // 更新余额
    await web3Store.updateTokenBalance()
    
  } catch (error) {
    console.error('转账失败:', error)
    ElMessage.error(`转账失败: ${error.message}`)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.transfer {
  padding: 2rem 0;
}

.transfer h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.transfer-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.transfer-card {
  height: fit-content;
}

.balance-card {
  height: fit-content;
}

.balance-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.balance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-light);
}

.balance-item:last-child {
  border-bottom: none;
}

.balance-item .label {
  color: var(--text-regular);
  font-weight: 500;
}

.balance-item .value {
  color: var(--text-primary);
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .transfer-content {
    grid-template-columns: 1fr;
  }
}
</style>
