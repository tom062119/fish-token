# 🐟 Fish Token - Polygon链代币发行项目

## 📋 项目简介
Fish Token是部署在Polygon链上的ERC-20代币，具备完整的代币管理功能和用户友好的交互界面。

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0
- MetaMask钱包
- Polygon网络配置

### 安装依赖
```bash
# 克隆项目
git clone <repository-url>
cd fish-token

# 安装依赖
npm install

# 安装Hardhat
npm install --save-dev hardhat
```

### 环境配置
```bash
# 复制环境配置文件
cp .env.example .env

# 编辑 .env 文件配置私钥和API密钥
# PRIVATE_KEY=你的钱包私钥
# POLYGONSCAN_API_KEY=你的PolygonScan API密钥
# ALCHEMY_API_KEY=你的Alchemy API密钥
```

### 启动开发
```bash
# 编译合约
npx hardhat compile

# 部署到测试网
npx hardhat run scripts/deploy.js --network mumbai

# 启动前端开发服务器
npm run dev
```

## 📖 功能说明

### 智能合约功能
- ✅ **标准ERC-20功能**: 转账、授权、余额查询
- ✅ **铸造功能**: 合约所有者可铸造新代币
- ✅ **销毁功能**: 持有者可销毁自己的代币
- ✅ **暂停功能**: 紧急情况下可暂停转账
- ✅ **所有权管理**: 安全的所有权转移机制

### 前端界面功能
- ✅ **钱包连接**: 支持MetaMask等主流钱包
- ✅ **代币信息**: 实时显示代币价格、总供应量等
- ✅ **转账功能**: 简单易用的代币转账界面
- ✅ **交易历史**: 查看个人交易记录
- ✅ **管理功能**: 合约所有者管理界面

## 🛠️ 技术栈
- **智能合约**: Solidity ^0.8.19
- **开发框架**: Hardhat
- **前端框架**: Vue 3 + Vite
- **Web3库**: ethers.js
- **UI组件**: Element Plus
- **区块链**: Polygon (MATIC)

## 📊 代币信息
- **名称**: Fish Token
- **符号**: FISH
- **精度**: 18位小数
- **总供应量**: 1,000,000,000 FISH
- **合约地址**: [部署后更新]

## 🌐 网络配置

### Polygon主网
- **网络名称**: Polygon Mainnet
- **RPC URL**: https://polygon-rpc.com/
- **链ID**: 137
- **货币符号**: MATIC
- **区块浏览器**: https://polygonscan.com/

### Mumbai测试网
- **网络名称**: Mumbai Testnet
- **RPC URL**: https://rpc-mumbai.maticvigil.com/
- **链ID**: 80001
- **货币符号**: MATIC
- **区块浏览器**: https://mumbai.polygonscan.com/

## 📁 项目结构
```
fish-token/
├── contracts/          # 智能合约
│   ├── FishToken.sol   # Fish代币合约
│   └── interfaces/     # 接口定义
├── scripts/            # 部署脚本
│   ├── deploy.js       # 部署脚本
│   └── verify.js       # 合约验证
├── test/               # 测试文件
│   └── FishToken.test.js
├── frontend/           # 前端应用
│   ├── src/
│   ├── public/
│   └── package.json
├── docs/               # 文档
│   ├── API.md          # API文档
│   └── DEPLOY.md       # 部署指南
├── hardhat.config.js   # Hardhat配置
├── package.json
└── README.md
```

## 🔧 开发命令

### 智能合约
```bash
# 编译合约
npx hardhat compile

# 运行测试
npx hardhat test

# 部署到本地网络
npx hardhat run scripts/deploy.js

# 部署到Mumbai测试网
npx hardhat run scripts/deploy.js --network mumbai

# 部署到Polygon主网
npx hardhat run scripts/deploy.js --network polygon

# 验证合约
npx hardhat verify --network polygon <合约地址>
```

### 前端开发
```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 🧪 测试指南

### 获取测试代币
1. 访问 [Mumbai Faucet](https://faucet.polygon.technology/)
2. 输入钱包地址获取测试MATIC
3. 用于支付gas费用

### 测试流程
1. 连接MetaMask到Mumbai测试网
2. 部署合约到测试网
3. 在前端界面测试所有功能
4. 验证交易在区块浏览器上的状态

## 🚀 部署指南

### 测试网部署
```bash
# 1. 配置环境变量
cp .env.example .env
# 编辑.env文件添加私钥

# 2. 部署到Mumbai
npx hardhat run scripts/deploy.js --network mumbai

# 3. 验证合约
npx hardhat verify --network mumbai <合约地址>
```

### 主网部署
```bash
# 1. 确保钱包有足够MATIC支付gas
# 2. 部署到Polygon主网
npx hardhat run scripts/deploy.js --network polygon

# 3. 验证合约
npx hardhat verify --network polygon <合约地址>
```

## 📚 API文档
详见 [API.md](./docs/API.md)

## 🔐 安全考虑
- 使用OpenZeppelin标准库确保安全性
- 实现访问控制和权限管理
- 合约暂停机制防范紧急情况
- 完整的测试覆盖

## 🤝 贡献指南
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证
MIT License

## 📞 技术支持
如有问题，请提交Issue或联系开发团队。

---

**🚨 重要提醒**: 
- 主网部署前请在测试网充分测试
- 妥善保管私钥，不要泄露
- 部署后及时验证合约代码
