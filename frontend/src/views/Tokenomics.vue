<template>
  <div class="tokenomics">
    <div class="container">
      <div class="tokenomics-header">
        <h1>📊 Fish Token 代币经济学</h1>
        <p>了解Fish Token的分配机制、使用场景和经济模型</p>
      </div>

      <!-- 代币概览 -->
      <section class="token-overview">
        <h2>🐟 代币概览</h2>
        <div class="overview-grid">
          <el-card class="overview-card">
            <div class="stat-item">
              <div class="stat-icon">🏷️</div>
              <div class="stat-content">
                <h3>代币名称</h3>
                <p>Fish Token (FISH)</p>
              </div>
            </div>
          </el-card>

          <el-card class="overview-card">
            <div class="stat-item">
              <div class="stat-icon">📈</div>
              <div class="stat-content">
                <h3>总供应量</h3>
                <p>1,000,000,000 FISH</p>
              </div>
            </div>
          </el-card>

          <el-card class="overview-card">
            <div class="stat-item">
              <div class="stat-icon">🔒</div>
              <div class="stat-content">
                <h3>最大供应量</h3>
                <p>10,000,000,000 FISH</p>
              </div>
            </div>
          </el-card>

          <el-card class="overview-card">
            <div class="stat-item">
              <div class="stat-icon">⚡</div>
              <div class="stat-content">
                <h3>网络</h3>
                <p>Polygon (MATIC)</p>
              </div>
            </div>
          </el-card>
        </div>
      </section>

      <!-- 代币分配 -->
      <section class="token-distribution">
        <h2>🥧 代币分配</h2>
        <div class="distribution-content">
          <div class="distribution-chart">
            <div class="chart-container">
              <div class="pie-chart">
                <div class="slice slice-1" :style="{ '--percentage': 40 }">
                  <span class="slice-label">社区奖励<br>40%</span>
                </div>
                <div class="slice slice-2" :style="{ '--percentage': 25 }">
                  <span class="slice-label">流动性<br>25%</span>
                </div>
                <div class="slice slice-3" :style="{ '--percentage': 20 }">
                  <span class="slice-label">团队<br>20%</span>
                </div>
                <div class="slice slice-4" :style="{ '--percentage': 15 }">
                  <span class="slice-label">生态发展<br>15%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="distribution-details">
            <div class="distribution-item">
              <div class="item-color color-1"></div>
              <div class="item-content">
                <h4>社区奖励 (40% - 400,000,000 FISH)</h4>
                <p>用于社区激励、空投、质押奖励等，促进生态发展</p>
                <ul>
                  <li>质押奖励: 200,000,000 FISH</li>
                  <li>社区空投: 100,000,000 FISH</li>
                  <li>活动奖励: 100,000,000 FISH</li>
                </ul>
              </div>
            </div>

            <div class="distribution-item">
              <div class="item-color color-2"></div>
              <div class="item-content">
                <h4>流动性供应 (25% - 250,000,000 FISH)</h4>
                <p>提供给去中心化交易所，确保代币流动性</p>
                <ul>
                  <li>Uniswap V3: 150,000,000 FISH</li>
                  <li>SushiSwap: 100,000,000 FISH</li>
                </ul>
              </div>
            </div>

            <div class="distribution-item">
              <div class="item-color color-3"></div>
              <div class="item-content">
                <h4>团队与顾问 (20% - 200,000,000 FISH)</h4>
                <p>团队激励和顾问奖励，12个月锁定期</p>
                <ul>
                  <li>核心团队: 150,000,000 FISH</li>
                  <li>技术顾问: 50,000,000 FISH</li>
                </ul>
              </div>
            </div>

            <div class="distribution-item">
              <div class="item-color color-4"></div>
              <div class="item-content">
                <h4>生态发展 (15% - 150,000,000 FISH)</h4>
                <p>用于合作伙伴关系、市场推广和生态建设</p>
                <ul>
                  <li>合作伙伴: 75,000,000 FISH</li>
                  <li>市场推广: 75,000,000 FISH</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 释放时间表 -->
      <section class="vesting-schedule">
        <h2>⏰ 代币释放时间表</h2>
        <el-card>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-marker active"></div>
              <div class="timeline-content">
                <h4>TGE (代币生成事件)</h4>
                <p>初始释放 300,000,000 FISH (30%)</p>
                <span class="timeline-date">2025年1月</span>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>第一季度</h4>
                <p>释放 200,000,000 FISH (20%)</p>
                <span class="timeline-date">2025年4月</span>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>第二季度</h4>
                <p>释放 200,000,000 FISH (20%)</p>
                <span class="timeline-date">2025年7月</span>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>第三季度</h4>
                <p>释放 150,000,000 FISH (15%)</p>
                <span class="timeline-date">2025年10月</span>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4>第四季度</h4>
                <p>释放 150,000,000 FISH (15%)</p>
                <span class="timeline-date">2026年1月</span>
              </div>
            </div>
          </div>
        </el-card>
      </section>

      <!-- 使用场景 -->
      <section class="use-cases">
        <h2>🎯 使用场景</h2>
        <div class="use-cases-grid">
          <el-card class="use-case-card">
            <div class="use-case-icon">💰</div>
            <h3>支付媒介</h3>
            <p>在Fish生态系统中作为主要支付工具，享受交易费用折扣</p>
          </el-card>

          <el-card class="use-case-card">
            <div class="use-case-icon">🗳️</div>
            <h3>治理投票</h3>
            <p>持有FISH代币可参与社区治理，对重要决策进行投票</p>
          </el-card>

          <el-card class="use-case-card">
            <div class="use-case-icon">🔒</div>
            <h3>质押奖励</h3>
            <p>质押FISH代币获得额外奖励，支持网络安全和稳定</p>
          </el-card>

          <el-card class="use-case-card">
            <div class="use-case-icon">🎁</div>
            <h3>生态激励</h3>
            <p>参与生态活动、推荐用户等可获得FISH代币奖励</p>
          </el-card>

          <el-card class="use-case-card">
            <div class="use-case-icon">🔄</div>
            <h3>流动性挖矿</h3>
            <p>提供流动性获得FISH代币奖励，促进市场活跃度</p>
          </el-card>

          <el-card class="use-case-card">
            <div class="use-case-icon">🏆</div>
            <h3>会员权益</h3>
            <p>持有一定数量FISH代币可享受VIP服务和专属权益</p>
          </el-card>
        </div>
      </section>

      <!-- 经济模型 -->
      <section class="economic-model">
        <h2>📈 经济模型</h2>
        <div class="model-content">
          <div class="model-features">
            <el-card>
              <template #header>
                <span>通缩机制</span>
              </template>
              <ul>
                <li>🔥 定期销毁机制：每季度销毁交易费用的50%</li>
                <li>📉 减少流通供应量，增加代币稀缺性</li>
                <li>💎 长期持有者受益于通缩效应</li>
              </ul>
            </el-card>

            <el-card>
              <template #header>
                <span>激励机制</span>
              </template>
              <ul>
                <li>🎯 质押奖励：年化收益率8-15%</li>
                <li>🏊 流动性挖矿：提供LP获得额外奖励</li>
                <li>🎪 社区活动：参与获得代币奖励</li>
              </ul>
            </el-card>

            <el-card>
              <template #header>
                <span>治理机制</span>
              </template>
              <ul>
                <li>🗳️ 提案投票：持币者可提交和投票</li>
                <li>⚖️ 权重投票：持币量决定投票权重</li>
                <li>🔄 动态调整：根据投票结果调整参数</li>
              </ul>
            </el-card>
          </div>
        </div>
      </section>

      <!-- 路线图 -->
      <section class="roadmap">
        <h2>🗺️ 发展路线图</h2>
        <el-card>
          <div class="roadmap-timeline">
            <div class="roadmap-phase">
              <div class="phase-header">
                <h3>第一阶段 - 启动 (Q1 2025)</h3>
                <el-tag type="success">已完成</el-tag>
              </div>
              <ul>
                <li>✅ 智能合约开发和审计</li>
                <li>✅ 代币发行和初始分配</li>
                <li>✅ 官方网站和文档</li>
                <li>✅ 社区建设</li>
              </ul>
            </div>

            <div class="roadmap-phase">
              <div class="phase-header">
                <h3>第二阶段 - 扩展 (Q2 2025)</h3>
                <el-tag type="warning">进行中</el-tag>
              </div>
              <ul>
                <li>🔄 DEX上市 (Uniswap, SushiSwap)</li>
                <li>🔄 质押功能开发</li>
                <li>🔄 移动端应用</li>
                <li>🔄 合作伙伴关系</li>
              </ul>
            </div>

            <div class="roadmap-phase">
              <div class="phase-header">
                <h3>第三阶段 - 生态 (Q3-Q4 2025)</h3>
                <el-tag>计划中</el-tag>
              </div>
              <ul>
                <li>📅 治理系统上线</li>
                <li>📅 跨链桥接</li>
                <li>📅 NFT市场集成</li>
                <li>📅 DeFi协议集成</li>
              </ul>
            </div>
          </div>
        </el-card>
      </section>
    </div>
  </div>
</template>

<script setup>
// 代币经济学页面逻辑
</script>

<style scoped>
.tokenomics {
  padding: 2rem 0;
}

.tokenomics-header {
  text-align: center;
  margin-bottom: 3rem;
}

.tokenomics-header h1 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.tokenomics-header p {
  color: var(--text-regular);
  font-size: 1.1rem;
}

section {
  margin-bottom: 4rem;
}

section h2 {
  margin-bottom: 2rem;
  color: var(--text-primary);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

/* 代币概览 */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.overview-card {
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 3rem;
}

.stat-content h3 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.stat-content p {
  color: var(--text-regular);
  font-weight: 600;
  font-size: 1.1rem;
}

/* 代币分配 */
.distribution-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: start;
}

.chart-container {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 0 auto;
}

.pie-chart {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    #409eff 0% 40%,
    #67c23a 40% 65%,
    #e6a23c 65% 85%,
    #f56c6c 85% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.distribution-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.distribution-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.item-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.color-1 { background: #409eff; }
.color-2 { background: #67c23a; }
.color-3 { background: #e6a23c; }
.color-4 { background: #f56c6c; }

.item-content h4 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.item-content p {
  margin-bottom: 0.5rem;
  color: var(--text-regular);
}

.item-content ul {
  margin: 0;
  padding-left: 1.5rem;
}

.item-content li {
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

/* 时间线 */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-base);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--border-base);
  border: 3px solid var(--bg-primary);
}

.timeline-marker.active {
  background: var(--primary-color);
}

.timeline-content h4 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.timeline-content p {
  margin-bottom: 0.5rem;
  color: var(--text-regular);
}

.timeline-date {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* 使用场景 */
.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.use-case-card {
  text-align: center;
  padding: 1rem;
}

.use-case-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.use-case-card h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.use-case-card p {
  color: var(--text-regular);
  line-height: 1.6;
}

/* 经济模型 */
.model-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.model-features ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.model-features li {
  margin-bottom: 0.75rem;
  color: var(--text-regular);
  line-height: 1.5;
}

/* 路线图 */
.roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.roadmap-phase {
  padding: 1.5rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-base);
}

.phase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.phase-header h3 {
  color: var(--text-primary);
}

.roadmap-phase ul {
  margin: 0;
  padding-left: 1.5rem;
}

.roadmap-phase li {
  margin-bottom: 0.5rem;
  color: var(--text-regular);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .distribution-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .chart-container {
    width: 250px;
    height: 250px;
  }
  
  .use-cases-grid,
  .model-features {
    grid-template-columns: 1fr;
  }
  
  .phase-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>
