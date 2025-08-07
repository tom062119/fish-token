const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

/**
 * Fish Token部署脚本
 * 支持部署到不同网络: localhost, mumbai, polygon
 */
async function main() {
  console.log("🐟 开始部署Fish Token...");
  
  // 获取网络信息
  const network = await ethers.provider.getNetwork();
  console.log(`📡 部署网络: ${network.name} (Chain ID: ${network.chainId})`);
  
  // 获取部署账户
  const [deployer] = await ethers.getSigners();
  console.log(`👤 部署账户: ${deployer.address}`);
  
  // 检查账户余额
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`💰 账户余额: ${ethers.formatEther(balance)} ${getNetworkCurrency(network.chainId)}`);
  
  // 检查余额是否足够
  const minBalance = ethers.parseEther("0.01"); // 最少需要0.01 MATIC
  if (balance < minBalance) {
    console.error("❌ 账户余额不足，请确保有足够的代币支付gas费用");
    process.exit(1);
  }
  
  try {
    // 获取合约工厂
    console.log("📦 获取FishToken合约工厂...");
    const FishToken = await ethers.getContractFactory("FishToken");
    
    // 估算部署gas费用
    const deploymentData = FishToken.interface.encodeDeploy([deployer.address]);
    const estimatedGas = await ethers.provider.estimateGas({
      data: deploymentData
    });
    console.log(`⛽ 预估gas费用: ${estimatedGas.toString()}`);
    
    // 部署合约
    console.log("🚀 正在部署FishToken合约...");
    const fishToken = await FishToken.deploy(deployer.address);
    
    // 等待部署完成
    console.log("⏳ 等待部署确认...");
    await fishToken.waitForDeployment();
    
    const contractAddress = await fishToken.getAddress();
    console.log(`✅ FishToken合约部署成功!`);
    console.log(`📍 合约地址: ${contractAddress}`);
    
    // 获取部署交易信息
    const deployTx = fishToken.deploymentTransaction();
    console.log(`🔗 部署交易哈希: ${deployTx.hash}`);
    console.log(`⛽ 实际gas使用: ${deployTx.gasLimit.toString()}`);
    
    // 验证合约部署
    console.log("🔍 验证合约部署...");
    const tokenInfo = await fishToken.getTokenInfo();
    console.log(`📊 代币信息:`);
    console.log(`   名称: ${tokenInfo.name_}`);
    console.log(`   符号: ${tokenInfo.symbol_}`);
    console.log(`   精度: ${tokenInfo.decimals_}`);
    console.log(`   总供应量: ${ethers.formatEther(tokenInfo.totalSupply_)} FISH`);
    console.log(`   最大供应量: ${ethers.formatEther(tokenInfo.maxSupply_)} FISH`);
    
    // 检查所有者余额
    const ownerBalance = await fishToken.balanceOf(deployer.address);
    console.log(`👑 所有者余额: ${ethers.formatEther(ownerBalance)} FISH`);
    
    // 保存部署信息
    const deploymentInfo = {
      network: network.name,
      chainId: network.chainId.toString(),
      contractAddress: contractAddress,
      deployerAddress: deployer.address,
      deploymentTxHash: deployTx.hash,
      blockNumber: deployTx.blockNumber,
      gasUsed: deployTx.gasLimit.toString(),
      timestamp: new Date().toISOString(),
      tokenInfo: {
        name: tokenInfo.name_,
        symbol: tokenInfo.symbol_,
        decimals: tokenInfo.decimals_.toString(),
        totalSupply: tokenInfo.totalSupply_.toString(),
        maxSupply: tokenInfo.maxSupply_.toString()
      }
    };
    
    // 创建部署记录文件
    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)) {
      fs.mkdirSync(deploymentsDir, { recursive: true });
    }
    
    const deploymentFile = path.join(deploymentsDir, `${network.name}-${network.chainId}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    console.log(`📄 部署信息已保存到: ${deploymentFile}`);
    
    // 生成前端配置文件
    const frontendConfig = {
      contractAddress: contractAddress,
      contractABI: FishToken.interface.formatJson(),
      network: {
        name: network.name,
        chainId: network.chainId.toString(),
        rpcUrl: getRpcUrl(network.chainId),
        blockExplorer: getBlockExplorer(network.chainId)
      }
    };
    
    const frontendConfigDir = path.join(__dirname, "../frontend/src/config");
    if (!fs.existsSync(frontendConfigDir)) {
      fs.mkdirSync(frontendConfigDir, { recursive: true });
    }
    
    const frontendConfigFile = path.join(frontendConfigDir, "contract.json");
    fs.writeFileSync(frontendConfigFile, JSON.stringify(frontendConfig, null, 2));
    console.log(`🎨 前端配置已保存到: ${frontendConfigFile}`);
    
    // 显示后续步骤
    console.log("\n🎉 部署完成! 后续步骤:");
    console.log("1. 验证合约代码 (推荐):");
    console.log(`   npx hardhat verify --network ${network.name} ${contractAddress}`);
    console.log("2. 在区块浏览器查看合约:");
    console.log(`   ${getBlockExplorer(network.chainId)}/address/${contractAddress}`);
    console.log("3. 启动前端应用:");
    console.log("   npm run dev");
    
    // 如果是测试网，提供测试代币获取信息
    if (network.chainId === 80001n) {
      console.log("\n🚰 获取测试代币:");
      console.log("   Mumbai Faucet: https://faucet.polygon.technology/");
    }
    
  } catch (error) {
    console.error("❌ 部署失败:", error.message);
    
    if (error.code === "INSUFFICIENT_FUNDS") {
      console.error("💸 余额不足，请确保账户有足够的代币支付gas费用");
    } else if (error.code === "NETWORK_ERROR") {
      console.error("🌐 网络错误，请检查网络连接和RPC配置");
    } else if (error.message.includes("nonce")) {
      console.error("🔢 Nonce错误，请等待几分钟后重试");
    }
    
    process.exit(1);
  }
}

/**
 * 获取网络货币符号
 */
function getNetworkCurrency(chainId) {
  switch (chainId) {
    case 137n:
    case 80001n:
      return "MATIC";
    case 1n:
      return "ETH";
    default:
      return "ETH";
  }
}

/**
 * 获取RPC URL
 */
function getRpcUrl(chainId) {
  switch (chainId) {
    case 137n:
      return "https://polygon-rpc.com/";
    case 80001n:
      return "https://rpc-mumbai.maticvigil.com/";
    case 1n:
      return "https://mainnet.infura.io/v3/YOUR_PROJECT_ID";
    default:
      return "http://localhost:8545";
  }
}

/**
 * 获取区块浏览器URL
 */
function getBlockExplorer(chainId) {
  switch (chainId) {
    case 137n:
      return "https://polygonscan.com";
    case 80001n:
      return "https://mumbai.polygonscan.com";
    case 1n:
      return "https://etherscan.io";
    default:
      return "http://localhost:8545";
  }
}

// 运行部署脚本
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
