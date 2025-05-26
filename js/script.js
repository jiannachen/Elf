// 魔法粒子生成器
class ParticleGenerator {
    constructor(containerId, count = 30) {
      this.container = document.getElementById(containerId);
      this.count = count;
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
        
        this.container.appendChild(particle);
      }
    }
  }
  
  // 符文生成器
  class RuneGenerator {
    constructor(containerId, count = 12) {
      this.container = document.getElementById(containerId);
      this.count = count;
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
        
        this.container.appendChild(rune);
      }
    }
  }
  
  // 名字生成管理器
  class NameGeneratorManager {
    constructor() {
      this.nameResultsArea = document.getElementById('name-results-area');
      this.genderButtons = document.querySelectorAll('.gender-btn');
      this.selectedGender = 'male';
      this.init();
    }
  
    init() {
      this.setupEventListeners();
      this.updateYear();
      this.generateInitialNames();
    }
  
    setupEventListeners() {
      this.genderButtons.forEach(button => {
        button.addEventListener('click', () => this.handleGenderChange(button));
      });
    }
  
    handleGenderChange(button) {
      this.genderButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      this.selectedGender = button.dataset.gender;
      this.generateAndDisplayNames();
    }
  
    generateAndDisplayNames() {
      if (typeof elfGeneratorInstance === 'undefined' || !elfGeneratorInstance) {
        this.showErrorMessage('精灵名字生成器尚未准备好，请稍后再试。');
        return;
      }
  
      const namesCount = 10;
      const nameObjects = elfGeneratorInstance.setGender(this.selectedGender).generateBatch(namesCount);
      this.displayNames(nameObjects);
    }
  
    displayNames(nameObjects) {
      this.clearResultsArea();
  
      if (!nameObjects || nameObjects.length === 0) {
        this.showErrorMessage('未能生成名字。请尝试不同的设置或扩展词典。');
        return;
      }
  
      nameObjects.forEach(nameObj => {
        const nameItem = this.createNameItem(nameObj.name);
        this.nameResultsArea.appendChild(nameItem);
      });
  
      this.setupInteractiveButtons();
    }
  
    createNameItem(name) {
      const nameItem = document.createElement('div');
      nameItem.classList.add('name-item');
  
      const nameText = document.createElement('span');
      nameText.classList.add('name-text');
      nameText.textContent = name;
  
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('button-container');
  
      const speakButton = this.createButton('speak', name, '<i class="fas fa-volume-up"></i>', '朗读名字');
      const copyButton = this.createButton('copy', name, '<i class="fas fa-copy"></i>', '复制名字');
  
      buttonContainer.appendChild(speakButton);
      buttonContainer.appendChild(copyButton);
      nameItem.appendChild(nameText);
      nameItem.appendChild(buttonContainer);
  
      return nameItem;
    }
  
    createButton(type, name, icon, title) {
      const button = document.createElement('button');
      button.classList.add(`${type}-btn`, 'interactive-btn');
      button.innerHTML = icon;
      button.setAttribute('aria-label', `${title} ${name}`);
      button.title = title;
      button.dataset.name = name;
      return button;
    }
  
    setupInteractiveButtons() {
      document.querySelectorAll('.speak-btn').forEach(button => {
        button.addEventListener('click', this.handleSpeakName);
      });
      document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', this.handleCopyName);
      });
    }
  
    handleSpeakName(event) {
      speakElfName(event);
    }
  
    handleCopyName(event) {
      copyName(event);
    }
  
    clearResultsArea() {
      this.nameResultsArea.innerHTML = '';
    }
  
    showErrorMessage(message) {
      this.nameResultsArea.innerHTML = `<p class="error-message">${message}</p>`;
    }
  
    updateYear() {
      const currentYearSpan = document.getElementById('current-year');
      if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
      }
    }
  
    generateInitialNames() {
      if ('speechSynthesis' in window && window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.generateAndDisplayNames();
        };
      } else {
        this.generateAndDisplayNames();
      }
    }
  }
  
  
  // 语音合成功能
  const SpeechSynthesisManager = {
    isSpeaking: false,
    retryCount: 0,
  
    speak(text, element) {
      const synth = window.speechSynthesis;
      if (!synth) {
        console.error("浏览器不支持语音合成API");
        alert("您的浏览器不支持语音合成功能，请尝试使用Chrome或Edge。");
        return;
      }
  
      if (this.isSpeaking) {
        synth.cancel();
      }
      this.isSpeaking = true;
  
      this.toggleIconAnimation(element, true);
  
      const utterance = new SpeechSynthesisUtterance(text);
      this.configureElfVoice(utterance);
  
      utterance.onend = utterance.onerror = (e) => {
        this.handleSpeechEnd(e, element);
      };
  
      try {
        synth.cancel();
        synth.speak(utterance);
      } catch (e) {
        console.error("播放失败:", e);
        this.handleSpeechEnd(null, element);
      }
    },
  
    configureElfVoice(utterance) {
      const synth = window.speechSynthesis;
      
      const getVoices = () => {
        let voices = synth.getVoices();
        if (voices.length === 0) {
          synth.onvoiceschanged = () => {
            voices = synth.getVoices();
            synth.onvoiceschanged = null;
            this.setElfVoice(utterance, voices);
          };
        } else {
          this.setElfVoice(utterance, voices);
        }
      };
  
      getVoices();
    },
  
    setElfVoice(utterance, voices) {
      const elfVoice = voices.find(v => 
        v.lang.startsWith("en") && 
        v.name.toLowerCase().includes("female")
      ) || voices.find(v => v.lang.startsWith("en"));
      
      if (elfVoice) utterance.voice = elfVoice;
      utterance.pitch = 1.2;
      utterance.rate = 0.9;
    },
  
    handleSpeechEnd(event, element) {
      this.isSpeaking = false;
      this.toggleIconAnimation(element, false);
      
      if (event?.error === 'interrupted' && this.retryCount === 0) {
        this.retryCount = 1;
        setTimeout(() => {
          const text = element?.dataset?.name || '';
          if (text) this.speak(text, element);
        }, 300);
      } else {
        this.retryCount = 0;
      }
    },
  
    toggleIconAnimation(element, enable) {
      const icon = element?.querySelector("i");
      if (icon) {
        icon.classList.toggle('fa-beat', enable);
      }
    }
  };
  
  // 复制功能
  function copyName(event) {
    event.preventDefault();
    const name = event.currentTarget.dataset.name;
    
    const textarea = document.createElement('textarea');
    textarea.value = name;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      const successful = document.execCommand('copy');
      this.updateButtonState(event.currentTarget, successful);
    } catch (err) {
      console.error('execCommand复制失败:', err);
      this.fallbackCopy(name, event.currentTarget);
    } finally {
      document.body.removeChild(textarea);
    }
  }
  
  function updateButtonState(button, success) {
    const originalIconHTML = button.innerHTML;
    button.innerHTML = success ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
    button.disabled = true;
    
    setTimeout(() => {
      button.innerHTML = originalIconHTML;
      button.disabled = false;
    }, 1500);
  }
  
  function fallbackCopy(text, button) {
    navigator.clipboard.writeText(text).then(() => {
      this.updateButtonState(button, true);
    }).catch(err => {
      console.error('Clipboard API复制失败:', err);
      this.updateButtonState(button, false);
      alert('复制失败: ' + err.message);
    });
  }
  
  // 初始化函数
  function initializeApp() {
    // 创建魔法效果
    new ParticleGenerator('particles-container').createParticles();
    new RuneGenerator('runes-container').createRunes();
    
    // 初始化名字生成器
    new NameGeneratorManager();
    
    // 页面关闭时清理语音
    window.addEventListener("beforeunload", () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });
  }
  
  // DOM加载完成后初始化应用
  document.addEventListener('DOMContentLoaded', initializeApp);
  
  // 导出语音合成函数供外部使用
  function speakElfName(event, fallbackText) {
    const text = event?.currentTarget?.dataset?.name || fallbackText || "";
    if (text) {
      SpeechSynthesisManager.speak(text, event.currentTarget);
    }
  }