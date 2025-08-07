const { ethers } = require("hardhat");

async function main() {
  console.log("🔑 生成新的测试钱包...");
  
  // 生成随机钱包
  const wallet = ethers.Wallet.createRandom();
  
  console.log("📋 钱包信息:");
  console.log("地址:", wallet.address);
  console.log("私钥:", wallet.privateKey);
  console.log("助记词:", wallet.mnemonic.phrase);
  
  console.log("\n⚠️  安全提醒:");
  console.log("1. 请妥善保管私钥和助记词");
  console.log("2. 这是测试钱包，请勿存入大量资金");
  console.log("3. 部署前需要向此地址转入测试MATIC");
  
  console.log("\n🚰 获取测试MATIC:");
  console.log("Mumbai测试网水龙头: https://faucet.polygon.technology/");
  console.log("输入地址:", wallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
