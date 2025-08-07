<template>
  <div class="not-found">
    <div class="container">
      <div class="not-found-content">
        <div class="error-icon">🐟</div>
        <h1>404</h1>
        <h2>页面未找到</h2>
        <p>抱歉，您访问的页面不存在或已被移动。</p>
        <div class="actions">
          <el-button type="primary" @click="$router.push('/')">
            返回首页
          </el-button>
          <el-button @click="$router.back()">
            返回上页
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 404页面
</script>

<style scoped>
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
}

.error-icon {
  font-size: 6rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.not-found h1 {
  font-size: 4rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.not-found h2 {
  font-size: 2rem;
  color: var(--text-regular);
  margin-bottom: 1rem;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
