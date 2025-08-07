const { ethers } = require("hardhat");

/**
 * 监控钱包余额脚本
 * 定期检查测试钱包余额，当有足够代币时自动提醒
 */
async function main() {
  console.log("🔍 开始监控钱包余额...");
  
  const networks = [
    { name: "amoy", chainId: 80002n, minBalance: "0.01" },
    { name: "mumbai", chainId: 80001n, minBalance: "0.01" }
  ];
  
  for (const network of networks) {
    try {
      console.log(`\n📡 检查 ${network.name} 网络...`);
      
      // 获取网络信息
      const networkInfo = await ethers.provider.getNetwork();
      
      if (networkInfo.chainId !== network.chainId) {
        console.log(`⚠️  当前网络不匹配，跳过 ${network.name}`);
        continue;
      }
      
      // 获取部署账户
      const [deployer] = await ethers.getSigners();
      console.log(`👤 钱包地址: ${deployer.address}`);
      
      // 获取余额
      const balance = await ethers.provider.getBalance(deployer.address);
      const balanceInEther = ethers.formatEther(balance);
      const currency = getCurrency(network.chainId);
      
      console.log(`💰 当前余额: ${balanceInEther} ${currency}`);
      
      // 检查是否足够部署
      const minBalance = ethers.parseEther(network.minBalance);
      
      if (balance >= minBalance) {
        console.log("✅ 余额充足！可以开始部署");
        console.log("\n🚀 执行部署命令:");
        console.log(`npm run deploy:${network.name}`);
        console.log(`npm run verify:${network.name}`);
        
        // 显示部署后的验证链接
        const explorerUrl = getExplorerUrl(network.chainId);
        console.log(`\n🔗 部署后查看: ${explorerUrl}/address/[合约地址]`);
        
        return true; // 找到可用网络
      } else {
        console.log(`❌ 余额不足，需要至少 ${network.minBalance} ${currency}`);
        console.log(`🚰 获取测试代币: https://faucet.polygon.technology/`);
      }
      
    } catch (error) {
      console.error(`❌ 检查 ${network.name} 网络失败:`, error.message);
    }
  }
  
  console.log("\n⏳ 所有网络余额都不足，请等待测试代币到账");
  console.log("💡 提示: 您可以定期运行此脚本检查余额状态");
  
  return false;
}

function getCurrency(chainId) {
  switch (chainId) {
    case 137n:
    case 80001n:
    case 80002n:
      return "MATIC";
    case 1n:
      return "ETH";
    default:
      return "ETH";
  }
}

function getExplorerUrl(chainId) {
  switch (chainId) {
    case 137n:
      return "https://polygonscan.com";
    case 80001n:
      return "https://mumbai.polygonscan.com";
    case 80002n:
      return "https://amoy.polygonscan.com";
    case 1n:
      return "https://etherscan.io";
    default:
      return "http://localhost:8545";
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main()
    .then((hasBalance) => {
      if (hasBalance) {
        console.log("\n🎉 准备就绪，可以开始部署！");
        process.exit(0);
      } else {
        console.log("\n⏰ 请稍后再试");
        process.exit(1);
      }
    })
    .catch((error) => {
      console.error("❌ 监控失败:", error);
      process.exit(1);
    });
}

module.exports = { main };
