import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
    theme: 'light' // 'light' | 'dark' | 'auto'
  }),
  
  getters: {
    currentTheme: (state) => state.isDark ? 'dark' : 'light'
  },
  
  actions: {
    // 初始化主题
    initTheme() {
      const savedTheme = localStorage.getItem('fish-token-theme')
      if (savedTheme) {
        this.theme = savedTheme
      } else {
        // 检测系统主题偏好
        this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      
      this.applyTheme()
      
      // 监听系统主题变化
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (this.theme === 'auto') {
          this.isDark = e.matches
          this.updateDOM()
        }
      })
    },
    
    // 切换主题
    toggleTheme() {
      this.theme = this.isDark ? 'light' : 'dark'
      this.applyTheme()
      this.saveTheme()
    },
    
    // 设置主题
    setTheme(theme) {
      this.theme = theme
      this.applyTheme()
      this.saveTheme()
    },
    
    // 应用主题
    applyTheme() {
      switch (this.theme) {
        case 'dark':
          this.isDark = true
          break
        case 'light':
          this.isDark = false
          break
        case 'auto':
          this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          break
      }
      
      this.updateDOM()
    },
    
    // 更新DOM
    updateDOM() {
      const html = document.documentElement
      
      if (this.isDark) {
        html.classList.add('dark')
        html.setAttribute('data-theme', 'dark')
      } else {
        html.classList.remove('dark')
        html.setAttribute('data-theme', 'light')
      }
    },
    
    // 保存主题设置
    saveTheme() {
      localStorage.setItem('fish-token-theme', this.theme)
    }
  }
})
