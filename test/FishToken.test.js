const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FishToken", function () {
  let FishToken;
  let fishToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const INITIAL_SUPPLY = ethers.parseEther("1000000000"); // 10亿枚
  const MAX_SUPPLY = ethers.parseEther("10000000000");    // 100亿枚

  beforeEach(async function () {
    // 获取测试账户
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // 部署合约
    FishToken = await ethers.getContractFactory("FishToken");
    fishToken = await FishToken.deploy(owner.address);
    await fishToken.waitForDeployment();
  });

  describe("部署", function () {
    it("应该设置正确的代币名称和符号", async function () {
      expect(await fishToken.name()).to.equal("Fish Token");
      expect(await fishToken.symbol()).to.equal("FISH");
    });

    it("应该设置正确的精度", async function () {
      expect(await fishToken.decimals()).to.equal(18);
    });

    it("应该将初始供应量分配给所有者", async function () {
      const ownerBalance = await fishToken.balanceOf(owner.address);
      expect(ownerBalance).to.equal(INITIAL_SUPPLY);
    });

    it("应该设置正确的总供应量", async function () {
      const totalSupply = await fishToken.totalSupply();
      expect(totalSupply).to.equal(INITIAL_SUPPLY);
    });

    it("应该设置正确的所有者", async function () {
      expect(await fishToken.owner()).to.equal(owner.address);
    });
  });

  describe("代币信息", function () {
    it("应该返回正确的代币信息", async function () {
      const tokenInfo = await fishToken.getTokenInfo();
      
      expect(tokenInfo.name_).to.equal("Fish Token");
      expect(tokenInfo.symbol_).to.equal("FISH");
      expect(tokenInfo.decimals_).to.equal(18);
      expect(tokenInfo.totalSupply_).to.equal(INITIAL_SUPPLY);
      expect(tokenInfo.maxSupply_).to.equal(MAX_SUPPLY);
    });
  });

  describe("转账", function () {
    it("应该能够转账代币", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await fishToken.transfer(addr1.address, transferAmount);
      
      const addr1Balance = await fishToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(transferAmount);
      
      const ownerBalance = await fishToken.balanceOf(owner.address);
      expect(ownerBalance).to.equal(INITIAL_SUPPLY - transferAmount);
    });

    it("应该在余额不足时失败", async function () {
      const transferAmount = INITIAL_SUPPLY + ethers.parseEther("1");
      
      await expect(
        fishToken.transfer(addr1.address, transferAmount)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it("应该能够授权和转账", async function () {
      const transferAmount = ethers.parseEther("100");
      
      // 授权
      await fishToken.approve(addr1.address, transferAmount);
      expect(await fishToken.allowance(owner.address, addr1.address)).to.equal(transferAmount);
      
      // 从授权地址转账
      await fishToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount);
      
      const addr2Balance = await fishToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(transferAmount);
    });
  });

  describe("铸造", function () {
    it("所有者应该能够铸造代币", async function () {
      const mintAmount = ethers.parseEther("1000");
      
      await expect(fishToken.mint(addr1.address, mintAmount))
        .to.emit(fishToken, "TokensMinted")
        .withArgs(addr1.address, mintAmount);
      
      const addr1Balance = await fishToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(mintAmount);
      
      const totalSupply = await fishToken.totalSupply();
      expect(totalSupply).to.equal(INITIAL_SUPPLY + mintAmount);
    });

    it("非所有者不应该能够铸造代币", async function () {
      const mintAmount = ethers.parseEther("1000");
      
      await expect(
        fishToken.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("不应该能够铸造超过最大供应量的代币", async function () {
      const mintAmount = MAX_SUPPLY - INITIAL_SUPPLY + ethers.parseEther("1");
      
      await expect(
        fishToken.mint(addr1.address, mintAmount)
      ).to.be.revertedWith("FishToken: mint amount exceeds max supply");
    });

    it("不应该能够向零地址铸造", async function () {
      const mintAmount = ethers.parseEther("1000");
      
      await expect(
        fishToken.mint(ethers.ZeroAddress, mintAmount)
      ).to.be.revertedWith("FishToken: mint to zero address");
    });

    it("应该能够批量铸造", async function () {
      const recipients = [addr1.address, addr2.address];
      const amounts = [ethers.parseEther("100"), ethers.parseEther("200")];
      
      await fishToken.batchMint(recipients, amounts);
      
      expect(await fishToken.balanceOf(addr1.address)).to.equal(amounts[0]);
      expect(await fishToken.balanceOf(addr2.address)).to.equal(amounts[1]);
    });
  });

  describe("销毁", function () {
    it("应该能够销毁自己的代币", async function () {
      const burnAmount = ethers.parseEther("100");
      
      await expect(fishToken.burn(burnAmount))
        .to.emit(fishToken, "TokensBurned")
        .withArgs(owner.address, burnAmount);
      
      const ownerBalance = await fishToken.balanceOf(owner.address);
      expect(ownerBalance).to.equal(INITIAL_SUPPLY - burnAmount);
      
      const totalSupply = await fishToken.totalSupply();
      expect(totalSupply).to.equal(INITIAL_SUPPLY - burnAmount);
    });

    it("应该能够销毁授权的代币", async function () {
      const burnAmount = ethers.parseEther("100");
      
      // 先转账给addr1
      await fishToken.transfer(addr1.address, burnAmount);
      
      // addr1授权给addr2
      await fishToken.connect(addr1).approve(addr2.address, burnAmount);
      
      // addr2销毁addr1的代币
      await expect(fishToken.connect(addr2).burnFrom(addr1.address, burnAmount))
        .to.emit(fishToken, "TokensBurned")
        .withArgs(addr1.address, burnAmount);
      
      const addr1Balance = await fishToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(0);
    });
  });

  describe("暂停功能", function () {
    it("所有者应该能够暂停合约", async function () {
      await expect(fishToken.pause())
        .to.emit(fishToken, "ContractPaused")
        .withArgs(owner.address);
      
      expect(await fishToken.paused()).to.be.true;
    });

    it("所有者应该能够恢复合约", async function () {
      await fishToken.pause();
      
      await expect(fishToken.unpause())
        .to.emit(fishToken, "ContractUnpaused")
        .withArgs(owner.address);
      
      expect(await fishToken.paused()).to.be.false;
    });

    it("暂停时不应该能够转账", async function () {
      await fishToken.pause();
      
      await expect(
        fishToken.transfer(addr1.address, ethers.parseEther("100"))
      ).to.be.revertedWith("Pausable: paused");
    });

    it("非所有者不应该能够暂停", async function () {
      await expect(
        fishToken.connect(addr1).pause()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("所有权管理", function () {
    it("应该能够转移所有权", async function () {
      await fishToken.transferOwnership(addr1.address);
      expect(await fishToken.owner()).to.equal(addr1.address);
    });

    it("新所有者应该能够铸造代币", async function () {
      await fishToken.transferOwnership(addr1.address);
      
      const mintAmount = ethers.parseEther("1000");
      await fishToken.connect(addr1).mint(addr2.address, mintAmount);
      
      const addr2Balance = await fishToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(mintAmount);
    });
  });

  describe("紧急提取", function () {
    it("应该能够提取误发送的代币", async function () {
      // 这里需要部署另一个ERC20代币来测试
      const TestToken = await ethers.getContractFactory("FishToken");
      const testToken = await TestToken.deploy(owner.address);
      
      // 向FishToken合约发送测试代币
      const amount = ethers.parseEther("100");
      await testToken.transfer(await fishToken.getAddress(), amount);
      
      // 紧急提取
      await fishToken.emergencyWithdraw(
        await testToken.getAddress(),
        addr1.address,
        amount
      );
      
      const addr1Balance = await testToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(amount);
    });

    it("不应该能够提取FISH代币", async function () {
      await expect(
        fishToken.emergencyWithdraw(
          await fishToken.getAddress(),
          addr1.address,
          ethers.parseEther("100")
        )
      ).to.be.revertedWith("FishToken: cannot withdraw FISH tokens");
    });
  });

  describe("接口支持", function () {
    it("应该支持ERC20接口", async function () {
      const ERC20_INTERFACE_ID = "0x36372b07";
      expect(await fishToken.supportsInterface(ERC20_INTERFACE_ID)).to.be.true;
    });
  });

  describe("合约检测", function () {
    it("应该能够检测合约地址", async function () {
      expect(await fishToken.isContract(await fishToken.getAddress())).to.be.true;
      expect(await fishToken.isContract(owner.address)).to.be.false;
    });
  });
});
