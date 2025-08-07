import { defineStore } from 'pinia'
import { ethers } from 'ethers'
import { ElMessage, ElNotification } from 'element-plus'

// 导入合约配置
import contractConfig from '@/config/contract.json'

export const useWeb3Store = defineStore('web3', {
  state: () => ({
    // 连接状态
    isConnected: false,
    account: null,
    chainId: null,
    balance: '0',
    
    // Web3实例
    provider: null,
    signer: null,
    contract: null,
    
    // 代币信息
    tokenInfo: {
      name: '',
      symbol: '',
      decimals: 18,
      totalSupply: '0',
      maxSupply: '0'
    },
    
    // 用户代币余额
    tokenBalance: '0',
    
    // 合约所有者
    contractOwner: null,
    isOwner: false,
    
    // 加载状态
    loading: {
      connecting: false,
      tokenInfo: false,
      balance: false,
      transaction: false
    },
    
    // 错误状态
    error: null
  }),
  
  getters: {
    // 格式化余额显示
    formattedBalance: (state) => {
      return parseFloat(ethers.formatEther(state.balance)).toFixed(4)
    },
    
    // 格式化代币余额
    formattedTokenBalance: (state) => {
      return parseFloat(ethers.formatEther(state.tokenBalance)).toFixed(2)
    },
    
    // 格式化总供应量
    formattedTotalSupply: (state) => {
      return parseFloat(ethers.formatEther(state.tokenInfo.totalSupply)).toLocaleString()
    },
    
    // 网络信息
    networkInfo: (state) => {
      const networks = {
        137: { name: 'Polygon', currency: 'MATIC', explorer: 'https://polygonscan.com' },
        80001: { name: 'Mumbai', currency: 'MATIC', explorer: 'https://mumbai.polygonscan.com' },
        31337: { name: 'Localhost', currency: 'ETH', explorer: 'http://localhost:8545' }
      }
      return networks[state.chainId] || { name: 'Unknown', currency: 'ETH', explorer: '' }
    },
    
    // 是否为支持的网络
    isSupportedNetwork: (state) => {
      const supportedChains = [137, 80001, 31337] // Polygon, Mumbai, Localhost
      return supportedChains.includes(state.chainId)
    }
  },
  
  actions: {
    // 连接钱包
    async connectWallet() {
      if (!window.ethereum) {
        ElMessage.error('请安装MetaMask钱包')
        return false
      }
      
      try {
        this.loading.connecting = true
        this.error = null
        
        // 请求账户访问权限
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        
        if (accounts.length === 0) {
          throw new Error('未获取到账户权限')
        }
        
        // 创建provider和signer
        this.provider = new ethers.BrowserProvider(window.ethereum)
        this.signer = await this.provider.getSigner()
        
        // 获取账户信息
        this.account = accounts[0]
        const network = await this.provider.getNetwork()
        this.chainId = Number(network.chainId)
        
        // 检查网络
        if (!this.isSupportedNetwork) {
          ElMessage.warning('当前网络不受支持，请切换到Polygon或Mumbai网络')
        }
        
        // 初始化合约
        await this.initContract()
        
        // 获取余额和代币信息
        await Promise.all([
          this.updateBalance(),
          this.updateTokenInfo(),
          this.updateTokenBalance(),
          this.checkOwnership()
        ])
        
        this.isConnected = true
        
        ElNotification({
          title: '连接成功',
          message: `已连接到 ${this.account.slice(0, 6)}...${this.account.slice(-4)}`,
          type: 'success'
        })
        
        return true
        
      } catch (error) {
        console.error('连接钱包失败:', error)
        this.error = error.message
        ElMessage.error(`连接失败: ${error.message}`)
        return false
      } finally {
        this.loading.connecting = false
      }
    },
    
    // 断开连接
    disconnect() {
      this.isConnected = false
      this.account = null
      this.chainId = null
      this.balance = '0'
      this.tokenBalance = '0'
      this.provider = null
      this.signer = null
      this.contract = null
      this.isOwner = false
      this.error = null
      
      ElMessage.success('已断开钱包连接')
    },
    
    // 检查连接状态
    async checkConnection() {
      if (!window.ethereum) return false
      
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts'
        })
        
        if (accounts.length > 0) {
          await this.connectWallet()
          return true
        }
      } catch (error) {
        console.error('检查连接状态失败:', error)
      }
      
      return false
    },
    
    // 初始化合约
    async initContract() {
      if (!this.provider || !contractConfig.contractAddress) {
        throw new Error('Provider或合约地址未配置')
      }
      
      try {
        this.contract = new ethers.Contract(
          contractConfig.contractAddress,
          JSON.parse(contractConfig.contractABI),
          this.signer
        )
      } catch (error) {
        throw new Error(`初始化合约失败: ${error.message}`)
      }
    },
    
    // 更新ETH余额
    async updateBalance() {
      if (!this.provider || !this.account) return
      
      try {
        this.loading.balance = true
        const balance = await this.provider.getBalance(this.account)
        this.balance = balance.toString()
      } catch (error) {
        console.error('获取余额失败:', error)
      } finally {
        this.loading.balance = false
      }
    },
    
    // 更新代币信息
    async updateTokenInfo() {
      if (!this.contract) return
      
      try {
        this.loading.tokenInfo = true
        const tokenInfo = await this.contract.getTokenInfo()
        
        this.tokenInfo = {
          name: tokenInfo.name_,
          symbol: tokenInfo.symbol_,
          decimals: Number(tokenInfo.decimals_),
          totalSupply: tokenInfo.totalSupply_.toString(),
          maxSupply: tokenInfo.maxSupply_.toString()
        }
      } catch (error) {
        console.error('获取代币信息失败:', error)
      } finally {
        this.loading.tokenInfo = false
      }
    },
    
    // 更新代币余额
    async updateTokenBalance() {
      if (!this.contract || !this.account) return
      
      try {
        const balance = await this.contract.balanceOf(this.account)
        this.tokenBalance = balance.toString()
      } catch (error) {
        console.error('获取代币余额失败:', error)
      }
    },
    
    // 检查是否为合约所有者
    async checkOwnership() {
      if (!this.contract || !this.account) return
      
      try {
        this.contractOwner = await this.contract.owner()
        this.isOwner = this.contractOwner.toLowerCase() === this.account.toLowerCase()
      } catch (error) {
        console.error('检查所有权失败:', error)
      }
    },
    
    // 设置账户
    setAccount(account) {
      this.account = account
      if (account) {
        this.updateBalance()
        this.updateTokenBalance()
        this.checkOwnership()
      }
    },
    
    // 切换网络
    async switchNetwork(chainId) {
      if (!window.ethereum) return false
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }]
        })
        return true
      } catch (error) {
        console.error('切换网络失败:', error)
        return false
      }
    }
  }
})
