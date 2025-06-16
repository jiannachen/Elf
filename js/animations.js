// 魔法粒子生成器
class ParticleGenerator {
    constructor(containerId, count = 30, colors = ['#a0c4e0', '#e0f0ff', '#c5b358']) {
      this.container = document.getElementById(containerId);
      this.count = count;
      this.colors = colors;
    }
  
    createParticles() {
      if (!this.container) return;
  
      for (let i = 0; i < this.count; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        
        // 随机大小 (5-20px)
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // 随机位置
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // 随机动画延迟
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // 随机颜色
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        particle.style.backgroundColor = randomColor;
        particle.style.boxShadow = `0 0 15px ${randomColor}`;
        
        this.container.appendChild(particle);
      }
    }
  }
  
  // 符文生成器
  class RuneGenerator {
    constructor(containerId, count = 12, colors = ['#a0c4e0', '#e0f0ff', '#c5b358']) {
      this.container = document.getElementById(containerId);
      this.count = count;
      this.colors = colors;
      this.runes = ['ᚨ', 'ᛒ', 'ᚷ', 'ᛞ', 'ᛖ', 'ᚠ', 'ᚷ', 'ᚺ'];
    }
  
    createRunes() {
      if (!this.container) return;
  
      for (let i = 0; i < this.count; i++) {
        const rune = document.createElement('div');
        rune.className = 'rune';
        
        // 随机选择符文
        rune.textContent = this.runes[Math.floor(Math.random() * this.runes.length)];
        
        // 随机位置
        rune.style.left = `${Math.random() * 100}%`;
        rune.style.top = `${Math.random() * 100}%`;
        
        // 随机动画延迟
        rune.style.animationDelay = `${Math.random() * 10}s`;
        
        // 随机颜色
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        rune.style.color = randomColor;
        rune.style.textShadow = `0 0 10px ${randomColor}`;
        
        this.container.appendChild(rune);
      }
    }
  }
  
  // 初始化背景特效
  document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子和符文生成器
    // 注意：这部分将由 script.js 中的 regenerateBackgroundEffects 函数替代
    // 因此这里可以保留为空，或者只在 script.js 未加载时作为备用
    if (typeof window.regenerateBackgroundEffects !== 'function') {
      const particleGen = new ParticleGenerator('particles-container');
      particleGen.createParticles();
      
      const runeGen = new RuneGenerator('runes-container');
      runeGen.createRunes();
    }
  });
  
  // ... existing code ...

// 离子粒子生成器
class IonParticleGenerator {
  constructor(containerId, count = 20, colors = ['rgba(32, 222, 255, 0.6)', 'rgba(88, 124, 255, 0.6)', 'rgba(124, 88, 255, 0.6)']) {
    this.container = document.getElementById(containerId);
    this.count = count;
    this.colors = colors;
  }

  createParticles() {
    if (!this.container) return;

    for (let i = 0; i < this.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'ion-particle';
      
      particle.style.setProperty('--x-drift', `${Math.random() * 100 - 50}px`);
      particle.style.setProperty('--y-drift', `${Math.random() * 100 - 50}px`);
      particle.style.setProperty('--r-drift', `${Math.random() * 360}deg`);

      // 随机大小 (3-12px)
      const size = Math.random() * 9 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // 随机位置
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // 随机动画延迟
      particle.style.animationDelay = `${Math.random() * 10}s`;
      
      // 随机颜色
      const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      particle.style.boxShadow = `0 0 15px ${randomColor}, 0 0 30px ${randomColor.replace('0.6', '0.3')}`;
      
      this.container.appendChild(particle);
    }
  }
}

// 数据流生成器
class DataStreamGenerator {
  constructor(containerId, count = 15) {
    this.container = document.getElementById(containerId);
    this.count = count;
  }

  createStreams() {
    if (!this.container) return;

    for (let i = 0; i < this.count; i++) {
      const stream = document.createElement('div');
      stream.className = 'data-stream';
      
      // 随机高度 (30-70% of container)
      const height = Math.random() * 40 + 30;
      stream.style.height = `${height}%`;
      
      // 随机位置
      stream.style.left = `${Math.random() * 100}%`;
      stream.style.top = `${Math.random() * 100}%`;
      
      // 随机动画延迟
      stream.style.animationDelay = `${Math.random() * 8}s`;
      stream.style.animationDuration = `${Math.random() * 4 + 4}s`;
      
      this.container.appendChild(stream);
    }
  }
}

// 扫描线生成器
class ScanLineGenerator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  createScanLine() {
    if (!this.container) return;

    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    this.container.appendChild(scanLine);
  }
}

// 修改初始化背景特效
document.addEventListener('DOMContentLoaded', () => {
  // 初始化粒子和符文生成器
  // 注意：这部分将由 script.js 中的 regenerateBackgroundEffects 函数替代
  // 因此这里可以保留为空，或者只在 script.js 未加载时作为备用
  if (typeof window.regenerateBackgroundEffects !== 'function') {
    const particleGen = new ParticleGenerator('particles-container');
    particleGen.createParticles();
    
    const runeGen = new RuneGenerator('runes-container');
    runeGen.createRunes();
    
    // 添加科幻特效
    const ionGen = new IonParticleGenerator('particles-container');
    ionGen.createParticles();
    
    const dataGen = new DataStreamGenerator('particles-container');
    dataGen.createStreams();
    
    const scanGen = new ScanLineGenerator('particles-container');
    scanGen.createScanLine();
    
    // 添加科幻网格和全息效果
    addSciFiEffects();
  }
});

// 添加科幻网格和全息效果
function addSciFiEffects() {
  const themeContainer = document.getElementById('theme-container');
  if (!themeContainer) return;
  
  // 添加网格效果
  const gridElement = document.createElement('div');
  gridElement.className = 'sci-fi-grid';
  themeContainer.appendChild(gridElement);
  
  // 添加全息效果
  const hologramElement = document.createElement('div');
  hologramElement.className = 'hologram-effect';
  themeContainer.appendChild(hologramElement);
}