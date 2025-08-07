const { ethers } = require("hardhat");

async function main() {
  console.log("💰 检查钱包余额...");
  
  // 获取网络信息
  const network = await ethers.provider.getNetwork();
  console.log(`📡 当前网络: ${network.name} (Chain ID: ${network.chainId})`);
  
  // 获取部署账户
  const [deployer] = await ethers.getSigners();
  console.log(`👤 钱包地址: ${deployer.address}`);
  
  // 获取余额
  const balance = await ethers.provider.getBalance(deployer.address);
  const balanceInEther = ethers.formatEther(balance);
  
  console.log(`💰 余额: ${balanceInEther} ${getNetworkCurrency(network.chainId)}`);
  
  // 检查是否有足够的余额部署
  const minBalance = ethers.parseEther("0.01"); // 最少需要0.01 MATIC
  
  if (balance >= minBalance) {
    console.log("✅ 余额充足，可以进行部署");
  } else {
    console.log("❌ 余额不足，需要获取更多代币");
    console.log(`🚰 获取测试代币: https://faucet.polygon.technology/`);
    console.log(`📍 钱包地址: ${deployer.address}`);
  }
}

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

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
