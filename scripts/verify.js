const { run, network } = require("hardhat");
const fs = require("fs");
const path = require("path");

/**
 * 合约验证脚本
 * 自动读取部署信息并验证合约
 */
async function main() {
  console.log("🔍 开始验证Fish Token合约...");
  
  // 获取网络信息
  const networkInfo = await network.provider.getNetwork();
  console.log(`📡 当前网络: ${network.name} (Chain ID: ${networkInfo.chainId})`);
  
  try {
    // 读取部署信息
    const deploymentFile = path.join(__dirname, `../deployments/${network.name}-${networkInfo.chainId}.json`);
    
    if (!fs.existsSync(deploymentFile)) {
      console.error(`❌ 找不到部署文件: ${deploymentFile}`);
      console.log("请先运行部署脚本: npm run deploy:mumbai 或 npm run deploy:polygon");
      process.exit(1);
    }
    
    const deploymentInfo = JSON.parse(fs.readFileSync(deploymentFile, "utf8"));
    const contractAddress = deploymentInfo.contractAddress;
    const deployerAddress = deploymentInfo.deployerAddress;
    
    console.log(`📍 合约地址: ${contractAddress}`);
    console.log(`👤 部署者地址: ${deployerAddress}`);
    
    // 验证合约
    console.log("⏳ 正在验证合约...");
    
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [deployerAddress], // 构造函数参数
      contract: "contracts/FishToken.sol:FishToken" // 指定合约路径
    });
    
    console.log("✅ 合约验证成功!");
    console.log(`🔗 查看验证结果: ${getBlockExplorer(networkInfo.chainId)}/address/${contractAddress}#code`);
    
    // 更新部署信息
    deploymentInfo.verified = true;
    deploymentInfo.verifiedAt = new Date().toISOString();
    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
    
    console.log("📄 部署信息已更新");
    
  } catch (error) {
    console.error("❌ 验证失败:", error.message);
    
    if (error.message.includes("Already Verified")) {
      console.log("ℹ️  合约已经验证过了");
    } else if (error.message.includes("API Key")) {
      console.error("🔑 请检查POLYGONSCAN_API_KEY环境变量是否正确设置");
    } else if (error.message.includes("Constructor arguments")) {
      console.error("🔧 构造函数参数不匹配，请检查部署参数");
    }
    
    process.exit(1);
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

// 运行验证脚本
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
