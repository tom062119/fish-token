<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>🐟 Fish Token</h3>
          <p>安全、快速、低成本的Polygon代币</p>
          <div class="social-links">
            <a href="https://github.com/tom062119/fish-token" target="_blank" class="social-link">
              <el-icon><Link /></el-icon>
              GitHub
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4>快速链接</h4>
          <ul class="footer-links">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/about">关于</router-link></li>
            <li><a href="https://polygonscan.com" target="_blank">区块浏览器</a></li>
            <li><a href="https://polygon.technology" target="_blank">Polygon网络</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>开发者</h4>
          <ul class="footer-links">
            <li><a href="/docs/API.md" target="_blank">API文档</a></li>
            <li><a href="/docs/DEPLOY.md" target="_blank">部署指南</a></li>
            <li><a href="https://docs.polygon.technology" target="_blank">Polygon文档</a></li>
            <li><a href="https://hardhat.org" target="_blank">Hardhat</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>网络信息</h4>
          <div class="network-stats">
            <div class="stat-item">
              <span class="label">当前网络:</span>
              <span class="value">{{ web3Store.networkInfo.name || 'Polygon' }}</span>
            </div>
            <div class="stat-item">
              <span class="label">代币符号:</span>
              <span class="value">FISH</span>
            </div>
            <div class="stat-item">
              <span class="label">总供应量:</span>
              <span class="value">{{ web3Store.formattedTotalSupply || '1,000,000,000' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p>&copy; 2025 Fish Token. All rights reserved.</p>
          <div class="footer-meta">
            <span>Built with ❤️ on Polygon</span>
            <span>•</span>
            <span>Version 1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useWeb3Store } from '@/stores/web3'
import { Link } from '@element-plus/icons-vue'

const web3Store = useWeb3Store()
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 3rem 0 2rem;
}

.footer-section h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.footer-section h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.footer-section p {
  color: var(--text-regular);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: var(--text-regular);
  text-decoration: none;
  transition: var(--transition-fast);
}

.footer-links a:hover {
  color: var(--primary-color);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-regular);
  text-decoration: none;
  transition: var(--transition-fast);
}

.social-link:hover {
  color: var(--primary-color);
}

.network-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-item .label {
  color: var(--text-regular);
  font-size: 0.9rem;
}

.stat-item .value {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.9rem;
}

.footer-bottom {
  border-top: 1px solid var(--border-light);
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.footer-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 2rem 0 1rem;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .footer-meta {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
