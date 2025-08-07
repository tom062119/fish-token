// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title Fish Token
 * @dev Fish Token是部署在Polygon链上的ERC-20代币
 * 
 * 功能特性:
 * - 标准ERC-20功能 (转账、授权、余额查询)
 * - 铸造功能 (仅合约所有者)
 * - 销毁功能 (持有者可销毁自己的代币)
 * - 暂停功能 (紧急情况下暂停转账)
 * - 所有权管理 (安全的所有权转移)
 * - 重入攻击防护
 * 
 * @author Fish Token Team
 */
contract FishToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ReentrancyGuard {
    
    // 代币基本信息
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10**18; // 10亿枚代币
    uint256 public constant MAX_SUPPLY = 10_000_000_000 * 10**18;    // 最大供应量100亿枚
    
    // 事件定义
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    event ContractPaused(address indexed account);
    event ContractUnpaused(address indexed account);
    
    /**
     * @dev 构造函数
     * @param initialOwner 初始所有者地址
     */
    constructor(address initialOwner) 
        ERC20("Fish Token", "FISH") 
        Ownable(initialOwner)
    {
        // 铸造初始供应量给合约所有者
        _mint(initialOwner, INITIAL_SUPPLY);
        emit TokensMinted(initialOwner, INITIAL_SUPPLY);
    }
    
    /**
     * @dev 铸造新代币 (仅所有者)
     * @param to 接收地址
     * @param amount 铸造数量
     */
    function mint(address to, uint256 amount) 
        public 
        onlyOwner 
        nonReentrant 
    {
        require(to != address(0), "FishToken: mint to zero address");
        require(amount > 0, "FishToken: mint amount must be greater than 0");
        require(
            totalSupply() + amount <= MAX_SUPPLY, 
            "FishToken: mint amount exceeds max supply"
        );
        
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
    
    /**
     * @dev 批量铸造代币 (仅所有者)
     * @param recipients 接收地址数组
     * @param amounts 对应的铸造数量数组
     */
    function batchMint(address[] calldata recipients, uint256[] calldata amounts) 
        external 
        onlyOwner 
        nonReentrant 
    {
        require(
            recipients.length == amounts.length, 
            "FishToken: recipients and amounts length mismatch"
        );
        require(recipients.length <= 100, "FishToken: too many recipients");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        require(
            totalSupply() + totalAmount <= MAX_SUPPLY, 
            "FishToken: batch mint exceeds max supply"
        );
        
        for (uint256 i = 0; i < recipients.length; i++) {
            require(recipients[i] != address(0), "FishToken: mint to zero address");
            require(amounts[i] > 0, "FishToken: mint amount must be greater than 0");
            
            _mint(recipients[i], amounts[i]);
            emit TokensMinted(recipients[i], amounts[i]);
        }
    }
    
    /**
     * @dev 销毁代币 (重写以添加事件)
     * @param amount 销毁数量
     */
    function burn(uint256 amount) public override {
        super.burn(amount);
        emit TokensBurned(_msgSender(), amount);
    }
    
    /**
     * @dev 从指定地址销毁代币 (重写以添加事件)
     * @param account 账户地址
     * @param amount 销毁数量
     */
    function burnFrom(address account, uint256 amount) public override {
        super.burnFrom(account, amount);
        emit TokensBurned(account, amount);
    }
    
    /**
     * @dev 暂停合约 (仅所有者)
     */
    function pause() public onlyOwner {
        _pause();
        emit ContractPaused(_msgSender());
    }
    
    /**
     * @dev 恢复合约 (仅所有者)
     */
    function unpause() public onlyOwner {
        _unpause();
        emit ContractUnpaused(_msgSender());
    }
    
    /**
     * @dev 紧急提取误发送的代币 (仅所有者)
     * @param token 代币合约地址
     * @param to 接收地址
     * @param amount 提取数量
     */
    function emergencyWithdraw(
        address token, 
        address to, 
        uint256 amount
    ) external onlyOwner nonReentrant {
        require(token != address(this), "FishToken: cannot withdraw FISH tokens");
        require(to != address(0), "FishToken: withdraw to zero address");
        
        IERC20(token).transfer(to, amount);
    }
    
    /**
     * @dev 获取代币详细信息
     * @return name_ 代币名称
     * @return symbol_ 代币符号
     * @return decimals_ 代币精度
     * @return totalSupply_ 总供应量
     * @return maxSupply_ 最大供应量
     */
    function getTokenInfo() 
        external 
        view 
        returns (
            string memory name_,
            string memory symbol_,
            uint8 decimals_,
            uint256 totalSupply_,
            uint256 maxSupply_
        ) 
    {
        return (
            name(),
            symbol(),
            decimals(),
            totalSupply(),
            MAX_SUPPLY
        );
    }
    
    /**
     * @dev 检查地址是否为合约
     * @param account 要检查的地址
     * @return 如果是合约返回true
     */
    function isContract(address account) public view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
    
    /**
     * @dev 重写_beforeTokenTransfer以支持暂停功能
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
    
    /**
     * @dev 重写_afterTokenTransfer以添加额外逻辑
     */
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        super._afterTokenTransfer(from, to, amount);
        
        // 可以在这里添加转账后的额外逻辑
        // 例如: 更新持有者列表、触发事件等
    }
    
    /**
     * @dev 支持ERC165接口检测
     */
    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        virtual 
        returns (bool) 
    {
        return interfaceId == type(IERC20).interfaceId ||
               interfaceId == type(IERC20Metadata).interfaceId;
    }
}
