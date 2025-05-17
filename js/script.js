  // 动态生成魔法元素
  function createParticles() {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        particle.style.width = `${Math.random() * 15 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
    }
}


// 生成漂浮符文
function createRunes() {
    const runes = ['ᚨ', 'ᛒ', 'ᚷ', 'ᛞ', 'ᛖ', 'ᚠ', 'ᚷ', 'ᚺ'];
    const container = document.getElementById('runes-container');
    for (let i = 0; i < 12; i++) {
        const rune = document.createElement('div');
        rune.className = 'rune';
        rune.textContent = runes[Math.floor(Math.random() * runes.length)];
        rune.style.left = `${Math.random() * 100}%`;
        rune.style.top = `${Math.random() * 100}%`;
        rune.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(rune);
    }
}

// 设置当前年份
document.getElementById('current-year').textContent = new Date().getFullYear();
  


document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createRunes();
     // 性别按钮交互
     const genderBtns = document.querySelectorAll('.gender-btn');
     genderBtns.forEach(btn => {
         btn.addEventListener('click', function() {
             genderBtns.forEach(b => b.classList.remove('active'));
             this.classList.add('active');
             
             // 这里可以添加生成名字的逻辑
             const gender = this.dataset.gender;
             // 调用生成名字的函数
             // generateName(gender);
         });
     });

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const nameResultsArea = document.getElementById('name-results-area');
    const genderButtons = document.querySelectorAll('.gender-btn');
    let selectedGender = 'male'; // Default gender

    // Function to generate and display names
    function generateAndDisplayNames() {
        if (typeof elfGeneratorInstance === 'undefined' || !elfGeneratorInstance) {
            nameResultsArea.innerHTML = '<p class="error-message">精灵名字生成器尚未准备好，请稍后再试。</p>';
            console.error("elfGeneratorInstance is not available.");
            return;
        }

        const namesCount = 10; // 5 rows * 2 names per row
        // Assuming elfGeneratorInstance.generateBatch returns an array of objects like { name: "Actual Name", ... }
        const nameObjects = elfGeneratorInstance.setGender(selectedGender).generateBatch(namesCount);
        displayNames(nameObjects);
    }

    // Function to display names in the results area
    function displayNames(nameObjects) {
        nameResultsArea.innerHTML = ''; // Clear previous results

        if (!nameObjects || nameObjects.length === 0) {
            nameResultsArea.innerHTML = '<p class="error-message">未能生成名字。请尝试不同的设置或扩展词典。</p>';
            return;
        }

        nameObjects.forEach(nameObj => {
            const name = nameObj.name; // Extract the name string

            const nameItem = document.createElement('div');
            nameItem.classList.add('name-item');

            const nameText = document.createElement('span');
            nameText.classList.add('name-text');
            nameText.textContent = name;

            const buttonContainer = document.createElement('div'); // Container for buttons

            const speakButton = document.createElement('button');
            speakButton.classList.add('speak-btn', 'interactive-btn');
            speakButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            speakButton.setAttribute('aria-label', `朗读名字 ${name}`);
            speakButton.title = "朗读名字";
            speakButton.dataset.name = name;

            const copyButton = document.createElement('button');
            copyButton.classList.add('copy-btn', 'interactive-btn');
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.setAttribute('aria-label', `复制名字 ${name}`);
            copyButton.title = "复制名字";
            copyButton.dataset.name = name;

            buttonContainer.appendChild(speakButton);
            buttonContainer.appendChild(copyButton);
            
            nameItem.appendChild(nameText);
            nameItem.appendChild(buttonContainer);
            nameResultsArea.appendChild(nameItem);
        });

        // Add event listeners after elements are created
        addInteractiveButtonListeners();
    }

    // Function to add event listeners to interactive buttons
    function addInteractiveButtonListeners() {
        document.querySelectorAll('.speak-btn').forEach(button => {
            button.addEventListener('click', handleSpeakName);
        });
        document.querySelectorAll('.copy-btn').forEach(button => {
            button.addEventListener('click', handleCopyName);
        });
    }

    // Handler for speaking the name
    function handleSpeakName(event) {
        const name = event.currentTarget.dataset.name;
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(name);
            
            const voices = window.speechSynthesis.getVoices();
            // Try to find an English voice, preferably female for a softer tone often associated with elves
            let elfVoice = voices.find(voice => voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female'));
            if (!elfVoice) {
                elfVoice = voices.find(voice => voice.lang.startsWith('en')); // Fallback to any English voice
            }
            if (elfVoice) {
                utterance.voice = elfVoice;
            }
            utterance.pitch = 1.2; // Slightly higher pitch
            utterance.rate = 0.9;  // Slightly slower for clarity

            const icon = event.currentTarget.querySelector('i');
            if (icon) icon.classList.add('fa-beat');
            
            utterance.onend = () => {
                if (icon) icon.classList.remove('fa-beat');
            };
            utterance.onerror = (e) => {
                if (icon) icon.classList.remove('fa-beat');
                console.error("语音合成错误:", e);
                // Optionally inform the user
            };

            window.speechSynthesis.cancel(); // Cancel any ongoing speech
            window.speechSynthesis.speak(utterance);
        } else {
            alert('抱歉，您的浏览器不支持语音合成功能。');
        }
    }

    // Handler for copying the name
    function handleCopyName(event) {
        event.preventDefault();
        const name = event.currentTarget.dataset.name;
        
        // 创建临时textarea元素
        const textarea = document.createElement('textarea');
        textarea.value = name;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px'; // 移出可视区域
        textarea.style.opacity = '0'; // 完全透明
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            // 尝试使用execCommand
            const successful = document.execCommand('copy');
            const button = event.currentTarget;
            const originalIconHTML = button.innerHTML;
            
            // 立即移除临时元素
            document.body.removeChild(textarea);
            
            if (successful) {
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.disabled = true;
                setTimeout(() => {
                    button.innerHTML = originalIconHTML;
                    button.disabled = false;
                }, 1500);
                return;
            }
        } catch (err) {
            console.error('execCommand复制失败:', err);
            document.body.removeChild(textarea); // 确保异常时也移除
        }

        // 尝试使用Clipboard API
        navigator.clipboard.writeText(name).then(() => {
            const button = event.currentTarget;
            const originalIconHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i>';
            button.disabled = true;
            setTimeout(() => {
                button.innerHTML = originalIconHTML;
                button.disabled = false;
            }, 1500);
        }).catch(err => {
            console.error('Clipboard API复制失败:', err);
            alert('复制失败: ' + err.message);
        }).finally(() => {
            if (textarea.parentNode) {
                document.body.removeChild(textarea);
            }
        });
    }

    // Event listeners for gender selection buttons
    genderButtons.forEach(button => {
        button.addEventListener('click', () => {
            genderButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedGender = button.dataset.gender;
            generateAndDisplayNames();
        });
    });

    // Initial name generation
    // Ensure voices are loaded before first generation if relying on specific voices
    if ('speechSynthesis' in window && window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            generateAndDisplayNames();
        };
    } else {
        generateAndDisplayNames();
    }
});