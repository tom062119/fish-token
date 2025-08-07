# 🚀 Fish Token 部署指南

## 📋 部署前准备

### 1. 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0
- Git
- MetaMask钱包

### 2. 获取必要的API密钥

#### PolygonScan API密钥
1. 访问 [PolygonScan](https://polygonscan.com/apis)
2. 注册账户并创建API密钥
3. 复制API密钥备用

#### Alchemy API密钥 (可选)
1. 访问 [Alchemy](https://www.alchemy.com/)
2. 创建应用并获取API密钥
3. 选择Polygon网络

### 3. 钱包准备
- 创建专用的部署钱包
- 确保钱包有足够的MATIC支付gas费用
- 测试网: 从 [Mumbai Faucet](https://faucet.polygon.technology/) 获取测试MATIC
- 主网: 准备至少0.1 MATIC

## 🔧 项目设置

### 1. 克隆项目
```bash
git clone https://github.com/tom062119/fish-token.git
cd fish-token
```

### 2. 安装依赖
```bash
# 安装后端依赖
npm install

# 安装前端依赖
cd frontend
npm install
cd ..
```

### 3. 环境配置
```bash
# 复制环境配置文件
cp .env.example .env
```

编辑 `.env` 文件：
```env
# 🔑 钱包私钥 (必填)
PRIVATE_KEY=你的钱包私钥

# 🔍 PolygonScan API密钥 (必填)
POLYGONSCAN_API_KEY=你的PolygonScan_API密钥

# 🌐 RPC配置 (可选)
POLYGON_RPC_URL=https://polygon-rpc.com/
MUMBAI_RPC_URL=https://rpc-mumbai.maticvigil.com/
```

## 🧪 测试网部署

### 1. 编译合约
```bash
npx hardhat compile
```

### 2. 运行测试
```bash
npx hardhat test
```

### 3. 部署到Mumbai测试网
```bash
npm run deploy:mumbai
```

### 4. 验证合约
```bash
npm run verify:mumbai
```

### 5. 测试前端
```bash
npm run dev
```

## 🌐 主网部署

### ⚠️ 重要提醒
- 主网部署前请在测试网充分测试
- 确保钱包有足够的MATIC支付gas费用
- 仔细检查所有配置参数

### 1. 最终测试
```bash
# 运行完整测试套件
npm test

# 检查代码覆盖率
npm run test:coverage
```

### 2. 部署到Polygon主网
```bash
npm run deploy:polygon
```

### 3. 验证合约
```bash
npm run verify:polygon
```

### 4. 构建前端
```bash
npm run build
```

## 📊 部署后验证

### 1. 检查合约状态
```bash
# 在区块浏览器查看合约
# Mumbai: https://mumbai.polygonscan.com/address/[合约地址]
# Polygon: https://polygonscan.com/address/[合约地址]
```

### 2. 验证代币信息
- 代币名称: Fish Token
- 代币符号: FISH
- 精度: 18
- 总供应量: 1,000,000,000 FISH

### 3. 测试基本功能
- 连接钱包
- 查看余额
- 转账测试
- 管理功能 (仅所有者)

## 🔐 安全检查清单

### 部署前
- [ ] 私钥安全存储
- [ ] 测试网充分测试
- [ ] 代码审计完成
- [ ] 环境变量正确配置

### 部署后
- [ ] 合约验证成功
- [ ] 所有权正确设置
- [ ] 功能测试通过
- [ ] 前端正常工作

## 🚨 故障排除

### 常见问题

#### 1. 部署失败
```bash
# 检查网络连接
ping polygon-rpc.com

# 检查余额
npx hardhat run scripts/check-balance.js --network mumbai

# 清理缓存重试
npx hardhat clean
npm run compile
```

#### 2. 验证失败
```bash
# 等待几分钟后重试
npm run verify:mumbai

# 手动验证
npx hardhat verify --network mumbai [合约地址] [构造函数参数]
```

#### 3. 前端连接问题
- 检查MetaMask网络配置
- 确认合约地址正确
- 清除浏览器缓存

### Gas费用优化
```javascript
// 在hardhat.config.js中调整gas设置
networks: {
  polygon: {
    gasPrice: 30000000000, // 30 gwei
    gas: 6000000
  }
}
```

## 📞 技术支持

### 获取帮助
1. 查看项目文档
2. 检查GitHub Issues
3. 联系开发团队

### 有用的链接
- [Hardhat文档](https://hardhat.org/docs)
- [Polygon文档](https://docs.polygon.technology/)
- [OpenZeppelin文档](https://docs.openzeppelin.com/)
- [MetaMask文档](https://docs.metamask.io/)

## 📝 部署记录

### 测试网部署
- 网络: Mumbai
- 合约地址: [待填写]
- 部署时间: [待填写]
- 交易哈希: [待填写]

### 主网部署
- 网络: Polygon
- 合约地址: [待填写]
- 部署时间: [待填写]
- 交易哈希: [待填写]

---

## 🎉 恭喜！

如果您已经完成了所有步骤，那么您的Fish Token已经成功部署到Polygon网络上了！

接下来您可以：
1. 在社交媒体上宣布您的代币
2. 添加到代币列表网站
3. 开发更多DeFi功能
4. 建立社区

祝您的Fish Token项目成功！🐟
