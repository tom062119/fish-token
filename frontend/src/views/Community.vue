<template>
  <div class="community">
    <div class="container">
      <div class="community-header">
        <h1>🌊 Fish Token 社区</h1>
        <p>加入我们的全球社区，与Fish Token爱好者一起探索DeFi的未来</p>
      </div>

      <!-- 社区统计 -->
      <section class="community-stats">
        <div class="stats-grid">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">👥</div>
              <div class="stat-info">
                <h3>{{ formatNumber(communityStats.members) }}</h3>
                <p>社区成员</p>
              </div>
            </div>
          </el-card>

          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">💬</div>
              <div class="stat-info">
                <h3>{{ formatNumber(communityStats.messages) }}</h3>
                <p>社区消息</p>
              </div>
            </div>
          </el-card>

          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">🌍</div>
              <div class="stat-info">
                <h3>{{ communityStats.countries }}</h3>
                <p>覆盖国家</p>
              </div>
            </div>
          </el-card>

          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon">🎯</div>
              <div class="stat-info">
                <h3>{{ formatNumber(communityStats.holders) }}</h3>
                <p>代币持有者</p>
              </div>
            </div>
          </el-card>
        </div>
      </section>

      <!-- 社交媒体链接 -->
      <section class="social-links">
        <h2>🔗 加入我们的社区</h2>
        <div class="social-grid">
          <a href="https://t.me/fishtoken6" target="_blank" class="social-card">
            <div class="social-icon telegram">📱</div>
            <div class="social-content">
              <h3>Telegram</h3>
              <p>实时讨论和最新消息</p>
              <span class="member-count">1,200+ 成员</span>
            </div>
            <div class="social-arrow">→</div>
          </a>

          <a href="https://discord.gg/fishtoken" target="_blank" class="social-card">
            <div class="social-icon discord">🎮</div>
            <div class="social-content">
              <h3>Discord</h3>
              <p>深度技术讨论和社区活动</p>
              <span class="member-count">800+ 成员</span>
            </div>
            <div class="social-arrow">→</div>
          </a>

          <a href="https://twitter.com/fishtoken" target="_blank" class="social-card">
            <div class="social-icon twitter">🐦</div>
            <div class="social-content">
              <h3>Twitter</h3>
              <p>官方公告和行业动态</p>
              <span class="member-count">2,500+ 关注者</span>
            </div>
            <div class="social-arrow">→</div>
          </a>

          <a href="https://github.com/tom062119/fish-token" target="_blank" class="social-card">
            <div class="social-icon github">💻</div>
            <div class="social-content">
              <h3>GitHub</h3>
              <p>开源代码和技术文档</p>
              <span class="member-count">开源项目</span>
            </div>
            <div class="social-arrow">→</div>
          </a>

          <a href="https://medium.com/@fishtoken" target="_blank" class="social-card">
            <div class="social-icon medium">📝</div>
            <div class="social-content">
              <h3>Medium</h3>
              <p>深度文章和项目更新</p>
              <span class="member-count">技术博客</span>
            </div>
            <div class="social-arrow">→</div>
          </a>

          <a href="https://reddit.com/r/fishtoken" target="_blank" class="social-card">
            <div class="social-icon reddit">🔴</div>
            <div class="social-content">
              <h3>Reddit</h3>
              <p>社区讨论和问答</p>
              <span class="member-count">500+ 成员</span>
            </div>
            <div class="social-arrow">→</div>
          </a>
        </div>
      </section>

      <!-- 社区活动 -->
      <section class="community-events">
        <h2>🎪 社区活动</h2>
        <div class="events-grid">
          <el-card class="event-card">
            <template #header>
              <div class="event-header">
                <span>🎁 空投活动</span>
                <el-tag type="success">进行中</el-tag>
              </div>
            </template>
            <div class="event-content">
              <p>关注官方社交媒体并完成任务，即可获得免费FISH代币空投</p>
              <div class="event-details">
                <div class="detail-item">
                  <span class="label">奖励池:</span>
                  <span class="value">100,000 FISH</span>
                </div>
                <div class="detail-item">
                  <span class="label">参与人数:</span>
                  <span class="value">1,500+</span>
                </div>
                <div class="detail-item">
                  <span class="label">结束时间:</span>
                  <span class="value">2025年2月28日</span>
                </div>
              </div>
              <el-button type="primary" style="width: 100%; margin-top: 1rem;">
                立即参与
              </el-button>
            </div>
          </el-card>

          <el-card class="event-card">
            <template #header>
              <div class="event-header">
                <span>🏆 交易大赛</span>
                <el-tag type="warning">即将开始</el-tag>
              </div>
            </template>
            <div class="event-content">
              <p>参与FISH代币交易竞赛，交易量排名前100名可获得丰厚奖励</p>
              <div class="event-details">
                <div class="detail-item">
                  <span class="label">总奖金:</span>
                  <span class="value">50,000 FISH</span>
                </div>
                <div class="detail-item">
                  <span class="label">开始时间:</span>
                  <span class="value">2025年3月1日</span>
                </div>
                <div class="detail-item">
                  <span class="label">持续时间:</span>
                  <span class="value">30天</span>
                </div>
              </div>
              <el-button style="width: 100%; margin-top: 1rem;">
                了解详情
              </el-button>
            </div>
          </el-card>

          <el-card class="event-card">
            <template #header>
              <div class="event-header">
                <span>🎨 NFT创作</span>
                <el-tag>计划中</el-tag>
              </div>
            </template>
            <div class="event-content">
              <p>社区NFT创作大赛，优秀作品将成为Fish Token官方NFT收藏品</p>
              <div class="event-details">
                <div class="detail-item">
                  <span class="label">主题:</span>
                  <span class="value">海洋生态</span>
                </div>
                <div class="detail-item">
                  <span class="label">奖励:</span>
                  <span class="value">限量NFT + FISH</span>
                </div>
                <div class="detail-item">
                  <span class="label">预计时间:</span>
                  <span class="value">2025年4月</span>
                </div>
              </div>
              <el-button style="width: 100%; margin-top: 1rem;">
                敬请期待
              </el-button>
            </div>
          </el-card>
        </div>
      </section>

      <!-- 社区贡献 -->
      <section class="community-contribution">
        <h2>🤝 如何贡献</h2>
        <div class="contribution-grid">
          <el-card class="contribution-card">
            <div class="contribution-icon">💡</div>
            <h3>提出建议</h3>
            <p>在社区论坛分享您的想法和建议，帮助Fish Token变得更好</p>
            <ul>
              <li>功能改进建议</li>
              <li>用户体验优化</li>
              <li>新功能提案</li>
            </ul>
          </el-card>

          <el-card class="contribution-card">
            <div class="contribution-icon">🔧</div>
            <h3>技术贡献</h3>
            <p>参与开源项目开发，为Fish Token生态系统贡献代码</p>
            <ul>
              <li>智能合约优化</li>
              <li>前端界面改进</li>
              <li>文档完善</li>
            </ul>
          </el-card>

          <el-card class="contribution-card">
            <div class="contribution-icon">📢</div>
            <h3>社区推广</h3>
            <p>帮助推广Fish Token，扩大社区影响力</p>
            <ul>
              <li>社交媒体分享</li>
              <li>内容创作</li>
              <li>活动组织</li>
            </ul>
          </el-card>

          <el-card class="contribution-card">
            <div class="contribution-icon">🎓</div>
            <h3>教育支持</h3>
            <p>帮助新用户了解和使用Fish Token</p>
            <ul>
              <li>新手指导</li>
              <li>教程制作</li>
              <li>问题解答</li>
            </ul>
          </el-card>
        </div>
      </section>

      <!-- 社区规则 -->
      <section class="community-rules">
        <h2>📋 社区规则</h2>
        <el-card>
          <div class="rules-content">
            <div class="rule-category">
              <h3>🤝 行为准则</h3>
              <ul>
                <li>保持友善和尊重的态度</li>
                <li>禁止发布垃圾信息和广告</li>
                <li>不得进行人身攻击或歧视</li>
                <li>遵守各平台的使用条款</li>
              </ul>
            </div>

            <div class="rule-category">
              <h3>💬 讨论规范</h3>
              <ul>
                <li>保持讨论内容与Fish Token相关</li>
                <li>分享有价值的信息和见解</li>
                <li>避免重复发布相同内容</li>
                <li>使用适当的频道进行讨论</li>
              </ul>
            </div>

            <div class="rule-category">
              <h3>🔒 安全提醒</h3>
              <ul>
                <li>不要分享私钥或助记词</li>
                <li>警惕钓鱼网站和诈骗信息</li>
                <li>官方不会主动索要您的资产</li>
                <li>投资前请做好充分研究</li>
              </ul>
            </div>
          </div>
        </el-card>
      </section>

      <!-- 联系我们 -->
      <section class="contact-us">
        <h2>📞 联系我们</h2>
        <el-card>
          <div class="contact-content">
            <div class="contact-info">
              <h3>官方联系方式</h3>
              <div class="contact-item">
                <span class="contact-label">官方邮箱:</span>
                <span class="contact-value">hello@fishtoken.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">商务合作:</span>
                <span class="contact-value">business@fishtoken.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">技术支持:</span>
                <span class="contact-value">support@fishtoken.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-label">媒体咨询:</span>
                <span class="contact-value">media@fishtoken.com</span>
              </div>
            </div>

            <div class="response-time">
              <h3>响应时间</h3>
              <p>我们承诺在24小时内回复您的邮件。对于紧急问题，请通过Telegram联系我们的管理员。</p>
            </div>
          </div>
        </el-card>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 社区统计数据
const communityStats = ref({
  members: 5200,
  messages: 25000,
  countries: 45,
  holders: 1800
})

// 格式化数字显示
const formatNumber = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
.community {
  padding: 2rem 0;
}

.community-header {
  text-align: center;
  margin-bottom: 3rem;
}

.community-header h1 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.community-header p {
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

/* 社区统计 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
}

.stat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  font-size: 3rem;
}

.stat-info h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-info p {
  color: var(--text-regular);
  font-weight: 500;
}

/* 社交媒体链接 */
.social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.social-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-large);
  text-decoration: none;
  color: var(--text-primary);
  transition: var(--transition-base);
  background: var(--bg-primary);
}

.social-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-dark);
  border-color: var(--primary-color);
}

.social-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.social-icon.telegram { background: #0088cc20; }
.social-icon.discord { background: #5865f220; }
.social-icon.twitter { background: #1da1f220; }
.social-icon.github { background: #33333320; }
.social-icon.medium { background: #00ab6c20; }
.social-icon.reddit { background: #ff451420; }

.social-content {
  flex: 1;
}

.social-content h3 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.social-content p {
  color: var(--text-regular);
  margin-bottom: 0.5rem;
}

.member-count {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.social-arrow {
  font-size: 1.5rem;
  color: var(--primary-color);
}

/* 社区活动 */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.event-content p {
  color: var(--text-regular);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.event-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
}

.detail-item .label {
  color: var(--text-secondary);
}

.detail-item .value {
  color: var(--text-primary);
  font-weight: 600;
}

/* 社区贡献 */
.contribution-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.contribution-card {
  text-align: center;
  padding: 1rem;
}

.contribution-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contribution-card h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.contribution-card p {
  color: var(--text-regular);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.contribution-card ul {
  text-align: left;
  margin: 0;
  padding-left: 1.5rem;
}

.contribution-card li {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

/* 社区规则 */
.rules-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.rule-category h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.rule-category ul {
  margin: 0;
  padding-left: 1.5rem;
}

.rule-category li {
  color: var(--text-regular);
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

/* 联系我们 */
.contact-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.contact-info h3,
.response-time h3 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.contact-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-light);
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-label {
  color: var(--text-regular);
  font-weight: 500;
}

.contact-value {
  color: var(--text-primary);
  font-weight: 600;
}

.response-time p {
  color: var(--text-regular);
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .social-card {
    flex-direction: column;
    text-align: center;
  }
  
  .social-arrow {
    display: none;
  }
  
  .contact-content,
  .rules-content {
    grid-template-columns: 1fr;
  }
}
</style>
