# 📚 Fish Token API 文档

## 🔗 智能合约接口

### 基本信息

- **合约名称**: FishToken
- **标准**: ERC-20
- **网络**: Polygon (Chain ID: 137)
- **测试网**: Mumbai (Chain ID: 80001)

## 📖 合约方法

### 1. ERC-20 标准方法

#### `name() → string`
返回代币名称
```solidity
function name() public view returns (string memory)
```
**返回值**: "Fish Token"

#### `symbol() → string`
返回代币符号
```solidity
function symbol() public view returns (string memory)
```
**返回值**: "FISH"

#### `decimals() → uint8`
返回代币精度
```solidity
function decimals() public view returns (uint8)
```
**返回值**: 18

#### `totalSupply() → uint256`
返回总供应量
```solidity
function totalSupply() public view returns (uint256)
```

#### `balanceOf(address account) → uint256`
查询账户余额
```solidity
function balanceOf(address account) public view returns (uint256)
```
**参数**:
- `account`: 要查询的账户地址

#### `transfer(address to, uint256 amount) → bool`
转账代币
```solidity
function transfer(address to, uint256 amount) public returns (bool)
```
**参数**:
- `to`: 接收地址
- `amount`: 转账数量

#### `allowance(address owner, address spender) → uint256`
查询授权额度
```solidity
function allowance(address owner, address spender) public view returns (uint256)
```

#### `approve(address spender, uint256 amount) → bool`
授权代币
```solidity
function approve(address spender, uint256 amount) public returns (bool)
```

#### `transferFrom(address from, address to, uint256 amount) → bool`
从授权地址转账
```solidity
function transferFrom(address from, address to, uint256 amount) public returns (bool)
```

### 2. 扩展功能

#### `getTokenInfo() → (string, string, uint8, uint256, uint256)`
获取代币详细信息
```solidity
function getTokenInfo() external view returns (
    string memory name_,
    string memory symbol_,
    uint8 decimals_,
    uint256 totalSupply_,
    uint256 maxSupply_
)
```

#### `mint(address to, uint256 amount)`
铸造代币 (仅所有者)
```solidity
function mint(address to, uint256 amount) public onlyOwner
```
**参数**:
- `to`: 接收地址
- `amount`: 铸造数量

**事件**: `TokensMinted(address indexed to, uint256 amount)`

#### `batchMint(address[] recipients, uint256[] amounts)`
批量铸造代币 (仅所有者)
```solidity
function batchMint(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner
```

#### `burn(uint256 amount)`
销毁代币
```solidity
function burn(uint256 amount) public override
```
**事件**: `TokensBurned(address indexed from, uint256 amount)`

#### `burnFrom(address account, uint256 amount)`
销毁授权的代币
```solidity
function burnFrom(address account, uint256 amount) public override
```

### 3. 管理功能

#### `pause()`
暂停合约 (仅所有者)
```solidity
function pause() public onlyOwner
```
**事件**: `ContractPaused(address indexed account)`

#### `unpause()`
恢复合约 (仅所有者)
```solidity
function unpause() public onlyOwner
```
**事件**: `ContractUnpaused(address indexed account)`

#### `paused() → bool`
检查合约是否暂停
```solidity
function paused() public view returns (bool)
```

#### `owner() → address`
获取合约所有者
```solidity
function owner() public view returns (address)
```

#### `transferOwnership(address newOwner)`
转移所有权 (仅所有者)
```solidity
function transferOwnership(address newOwner) public onlyOwner
```

#### `emergencyWithdraw(address token, address to, uint256 amount)`
紧急提取误发送的代币 (仅所有者)
```solidity
function emergencyWithdraw(address token, address to, uint256 amount) external onlyOwner
```

### 4. 工具方法

#### `isContract(address account) → bool`
检查地址是否为合约
```solidity
function isContract(address account) public view returns (bool)
```

#### `supportsInterface(bytes4 interfaceId) → bool`
检查接口支持
```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

## 📡 事件

### ERC-20 标准事件

#### `Transfer(address indexed from, address indexed to, uint256 value)`
代币转账事件

#### `Approval(address indexed owner, address indexed spender, uint256 value)`
代币授权事件

### 扩展事件

#### `TokensMinted(address indexed to, uint256 amount)`
代币铸造事件

#### `TokensBurned(address indexed from, uint256 amount)`
代币销毁事件

#### `ContractPaused(address indexed account)`
合约暂停事件

#### `ContractUnpaused(address indexed account)`
合约恢复事件

## 🌐 前端 JavaScript API

### 1. 连接钱包

```javascript
import { ethers } from 'ethers'

// 连接MetaMask
const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()

// 创建合约实例
const contract = new ethers.Contract(contractAddress, contractABI, signer)
```

### 2. 读取数据

```javascript
// 获取代币信息
const tokenInfo = await contract.getTokenInfo()
console.log('代币名称:', tokenInfo.name_)
console.log('代币符号:', tokenInfo.symbol_)
console.log('总供应量:', ethers.formatEther(tokenInfo.totalSupply_))

// 获取余额
const balance = await contract.balanceOf(userAddress)
console.log('余额:', ethers.formatEther(balance), 'FISH')

// 检查授权
const allowance = await contract.allowance(ownerAddress, spenderAddress)
console.log('授权额度:', ethers.formatEther(allowance), 'FISH')
```

### 3. 发送交易

```javascript
// 转账
const transferTx = await contract.transfer(toAddress, ethers.parseEther("100"))
await transferTx.wait()

// 授权
const approveTx = await contract.approve(spenderAddress, ethers.parseEther("1000"))
await approveTx.wait()

// 铸造 (仅所有者)
const mintTx = await contract.mint(toAddress, ethers.parseEther("500"))
await mintTx.wait()

// 销毁
const burnTx = await contract.burn(ethers.parseEther("100"))
await burnTx.wait()
```

### 4. 监听事件

```javascript
// 监听转账事件
contract.on("Transfer", (from, to, value) => {
  console.log(`转账: ${from} → ${to}, 数量: ${ethers.formatEther(value)} FISH`)
})

// 监听铸造事件
contract.on("TokensMinted", (to, amount) => {
  console.log(`铸造: ${to}, 数量: ${ethers.formatEther(amount)} FISH`)
})

// 监听销毁事件
contract.on("TokensBurned", (from, amount) => {
  console.log(`销毁: ${from}, 数量: ${ethers.formatEther(amount)} FISH`)
})
```

## 🔧 错误处理

### 常见错误

#### `ERC20: transfer amount exceeds balance`
转账金额超过余额

#### `ERC20: transfer amount exceeds allowance`
转账金额超过授权额度

#### `Ownable: caller is not the owner`
非所有者调用仅所有者方法

#### `Pausable: paused`
合约已暂停

#### `FishToken: mint amount exceeds max supply`
铸造数量超过最大供应量

### 错误处理示例

```javascript
try {
  const tx = await contract.transfer(toAddress, amount)
  await tx.wait()
  console.log('转账成功')
} catch (error) {
  if (error.message.includes('exceeds balance')) {
    console.error('余额不足')
  } else if (error.message.includes('paused')) {
    console.error('合约已暂停')
  } else {
    console.error('转账失败:', error.message)
  }
}
```

## 📊 Gas 费用估算

### 典型操作的Gas消耗

| 操作 | 估算Gas | 备注 |
|------|---------|------|
| transfer | ~21,000 | 标准转账 |
| approve | ~46,000 | 授权操作 |
| mint | ~51,000 | 铸造代币 |
| burn | ~29,000 | 销毁代币 |
| pause/unpause | ~28,000 | 暂停/恢复 |

### Gas费用计算

```javascript
// 估算Gas
const gasEstimate = await contract.transfer.estimateGas(toAddress, amount)
console.log('预估Gas:', gasEstimate.toString())

// 获取Gas价格
const gasPrice = await provider.getGasPrice()
console.log('Gas价格:', ethers.formatUnits(gasPrice, 'gwei'), 'gwei')

// 计算费用
const cost = gasEstimate * gasPrice
console.log('预估费用:', ethers.formatEther(cost), 'MATIC')
```

## 🔗 有用的链接

- [Polygon文档](https://docs.polygon.technology/)
- [Ethers.js文档](https://docs.ethers.org/)
- [OpenZeppelin文档](https://docs.openzeppelin.com/)
- [ERC-20标准](https://eips.ethereum.org/EIPS/eip-20)
