function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    // Get current theme from body data-attribute
    const currentTheme = document.body.getAttribute('data-theme') || 'default'; // Fallback to 'default'
    notification.className = `notification ${type} notification-${currentTheme}`;
    
    // 添加图标和消息内容
    const icon = document.createElement('i');
    icon.className = `fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`;
    notification.appendChild(icon);
    
    const messageText = document.createElement('span');
    messageText.textContent = message;
    notification.appendChild(messageText);
    
    // Add to container
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 1500); // Adjusted duration
}

document.addEventListener('DOMContentLoaded', () => {
    // Global variables
    let favorites = JSON.parse(localStorage.getItem('elfFavorites')) || [];
    let currentNames = [];
    let currentTheme = 'high-elf';
    let speechSynthesisInstance = null;


    // DOM elements
    const generateBtn = document.getElementById('generate-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');
    const resultsContainer = document.getElementById('name-results');
    const favoritesContainer = document.getElementById('favorites-container');
    const favoritesCount = document.getElementById('favorites-count');
    const clearFavoritesBtn = document.getElementById('clear-favorites-btn'); // New button
    const nameModal = document.getElementById('name-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalName = document.getElementById('modal-name');
    const modalMeaning = document.getElementById('modal-meaning');
    const modalPronunciation = document.getElementById('modal-pronunciation');
    const modalUsage = document.getElementById('modal-usage');
    const modalSaveBtn = document.getElementById('modal-save');
    const modalCopyBtn = document.getElementById('modal-copy');





    
    // Initialize function
    function init() {
          // 初始化语音合成
        if ('speechSynthesis' in window) {
            speechSynthesisInstance = window.speechSynthesis;
            // 尝试获取语音列表
            availableVoices = speechSynthesisInstance.getVoices();
            // 监听voiceschanged事件，确保语音列表加载完成
            speechSynthesisInstance.addEventListener('voiceschanged', function() {
                availableVoices = speechSynthesisInstance.getVoices();
                console.log("语音列表已加载，共", availableVoices.length, "个语音");
            });
        }
        
        generateBtn.addEventListener('click', generateNames);
        if (regenerateBtn) {
            regenerateBtn.addEventListener('click', generateNames);
        }
        if (modalClose) modalClose.addEventListener('click', closeModal);
        if (modalSaveBtn) modalSaveBtn.addEventListener('click', () => {
            // Ensure modalName.textContent is the source of truth for the name to save from modal
            if (modalName && modalName.textContent) {
                toggleFavoriteInModal(modalName.textContent);
            }
        });
        if (modalCopyBtn) modalCopyBtn.addEventListener('click', copyCurrentName);
        if (clearFavoritesBtn) clearFavoritesBtn.addEventListener('click', clearAllFavorites); // Add event listener
        


        document.querySelectorAll('.bloodline-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.bloodline-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                // 将这段代码移到循环内部的回调函数中
                const bloodline = this.getAttribute('data-bloodline');
                switchTheme(bloodline);
                
                // 更新主题按钮的激活状态
                document.querySelectorAll('.theme-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-theme') === bloodline);
                });
            });
        });
        
        document.querySelectorAll('.gender-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        


        regenerateBackgroundEffects(); // This function needs to be defined or removed if not used
        renderFavorites(); // This function needs to be defined or removed if not used
    }


  function generateNames() {
    console.log("=== 开始生成名字 ===");
    const bloodlineElement = document.querySelector('.bloodline-option.active');
    const genderElement = document.querySelector('.gender-btn.active');

    if (!bloodlineElement || !genderElement) {
        console.error("Bloodline or gender not selected.");
        resultsContainer.innerHTML = `
            <div class="error-container">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Please select a bloodline and gender first.</p>
            </div>
        `;
        return;
    }



    const bloodline = bloodlineElement.getAttribute('data-bloodline');
    const gender = genderElement.getAttribute('data-gender');
    console.log(`选择的血统: ${bloodline}, 性别: ${gender}`);

    // 转换血统格式从连字符到驼峰命名法
    const bloodlineMap = {
        'high-elf': 'highElf',
        'wood-elf': 'woodElf',
        'dark-elf': 'darkElf',
        'half-elf': 'halfElf'
    };
    const formattedBloodline = bloodlineMap[bloodline] || bloodline;
    console.log(`转换后的血统格式: ${formattedBloodline}`);

    
    // 禁用生成按钮并显示加载状态
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    
    // 显示加载中状态
    resultsContainer.innerHTML = `
        <div class="loading-container">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Generating names...</p>
        </div>
    `;
    
    if (window.elfGeneratorInstance) {
        console.log("elfGeneratorInstance存在，设置选项...");
        window.elfGeneratorInstance.setBloodline(formattedBloodline);
        window.elfGeneratorInstance.setGender(gender);
    } else {
        console.error("Elf Name Generator instance not found.");
        resultsContainer.innerHTML = `
            <div class="error-container">
                <i class="fas fa-cogs"></i>
                <p>Name generator is not initialized. Please refresh the page.</p>
            </div>
        `;
        // 恢复生成按钮状态
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Names';
        return;
    }
    
    // 设置超时处理
    const timeoutId = setTimeout(() => {
        console.error('Name generation timeout');
        resultsContainer.innerHTML = `
            <div class="error-container">
                <i class="fas fa-clock"></i>
                <p>Generation is taking longer than expected. Please try again.</p>
                <button class="retry-btn">Retry</button>
            </div>
        `;
        
        const retryBtn = document.querySelector('.retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', generateNames);
        }
        
        // 恢复生成按钮状态
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Names';
    }, 1500); // 1.5秒超时
    
    try {
        // 使用setTimeout来确保UI更新
        setTimeout(() => {
            try {
                console.log("调用generateBatch生成名字...");
                const names = window.elfGeneratorInstance.generateBatch();
                console.log("生成结果:", names);
                
                // 清除超时
                clearTimeout(timeoutId);
                
                // 检查是否生成失败
                if (names && names.failed) {
                    console.error("生成名字失败:", names.reason);
                    resultsContainer.innerHTML = `
                        <div class="error-container">
                            <i class="fas fa-exclamation-circle"></i>
                            <p>Failed to generate names: ${names.reason || 'Unknown error'}</p>
                            <button class="retry-btn">Try Again</button>
                        </div>
                    `;
                    
                    const retryBtn = document.querySelector('.retry-btn');
                    if (retryBtn) {
                        retryBtn.addEventListener('click', generateNames);
                    }
                } else {
                    // 成功生成名字
                    console.log("成功生成名字，数量:", names ? names.length : 0);
                    currentNames = names;
                    renderNames(currentNames);
                }
                
                // 恢复生成按钮状态
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Names';
            } catch (error) {
                // 清除超时
                clearTimeout(timeoutId);
                
                console.error('Name generation error:', error);
                resultsContainer.innerHTML = `
                    <div class="error-container">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>An error occurred while generating names. Please try again.</p>
                        <button class="retry-btn">Retry</button>
                    </div>
                `;
                
                const retryBtn = document.querySelector('.retry-btn');
                if (retryBtn) {
                    retryBtn.addEventListener('click', generateNames);
                }
                
                // 恢复生成按钮状态
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Names';
            }
        }, 0);
    } catch (error) {
        // 清除超时
        clearTimeout(timeoutId);
        
        console.error('Name generation error:', error);
        resultsContainer.innerHTML = `
            <div class="error-container">
                <i class="fas fa-exclamation-circle"></i>
                <p>An error occurred while generating names. Please try again.</p>
                <button class="retry-btn">Retry</button>
            </div>
        `;
        
        const retryBtn = document.querySelector('.retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', generateNames);
        }
        
        // 恢复生成按钮状态
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Names';
    }
  } 

    // ... existing code ...
    function toggleFavoriteInModal(name) {
        const favoriteIndex = favorites.findIndex(fav => fav.name === name);
        const nameCardInResults = document.querySelector(`.name-card[data-name="${name}"]`);
        let saveButtonOnCard = null;
        if (nameCardInResults) {
            saveButtonOnCard = nameCardInResults.querySelector('.save-btn');
        }

        if (favoriteIndex > -1) {
            favorites.splice(favoriteIndex, 1);
            modalSaveBtn.innerHTML = '<i class="far fa-heart"></i> Save';
            modalSaveBtn.classList.remove('saved');
            if (saveButtonOnCard) {
                saveButtonOnCard.classList.remove('saved');
                saveButtonOnCard.innerHTML = '<i class="far fa-heart"></i>';
                saveButtonOnCard.title = 'Save';
            }
            showNotification(`Removed "${name}" from favorites`, 'success');
        } else {
            // **关键修改：直接从模态框的元素中获取含义和发音**
            const meaning = modalMeaning.textContent || ''; // 从 id="modal-meaning" 的元素获取
            const pronunciation = modalPronunciation.textContent || ''; // 从 id="modal-pronunciation" 的元素获取
            
            favorites.push({ name, meaning, pronunciation }); // 使用获取到的信息
            
            modalSaveBtn.innerHTML = '<i class="fas fa-heart"></i> Saved';
            modalSaveBtn.classList.add('saved');
            if (saveButtonOnCard) {
                saveButtonOnCard.classList.add('saved');
                saveButtonOnCard.innerHTML = '<i class="fas fa-heart"></i>';
                saveButtonOnCard.title = 'Saved';
            }
            showNotification(`Added "${name}" to favorites`, 'success');
        }
        localStorage.setItem('elfFavorites', JSON.stringify(favorites));
        renderFavorites();
    }
// ... existing code ...

    function renderNames(names) {
        if (!names || names.length === 0) {
            resultsContainer.innerHTML = `
                <div class="generated-name-placeholder">
                    <p>Click the generate button above to create elven names</p>
                    <div class="placeholder-decoration">✧</div>
                </div>
            `;
            return;
        }
        
        let html = '<div class="name-results-grid">';
        names.forEach(nameObj => {
            const isFavorite = favorites.some(fav => fav.name === nameObj.name);
            // const favoriteClass = isFavorite ? 'favorite' : ''; // 'favorite' class on name-card might be redundant if only button state changes
            
            html += `
                <div class="name-card" data-name="${nameObj.name}" data-meaning="${nameObj.meaning || ''}" data-pronunciation="${nameObj.pronunciation || ''}">
                    <span class="name-text">${nameObj.name}</span>
                    <div class="card-actions">
                        <button class="speak-btn" title="spaekName">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="save-btn ${isFavorite ? 'saved' : ''}" title="${isFavorite ? 'Saved' : 'saveName'}">
                            <i class="${isFavorite ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        <button class="copy-btn" title="copyName">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        resultsContainer.innerHTML = html;
        
        document.querySelectorAll('.name-text').forEach(nameText => {
            nameText.addEventListener('click', showNameDetails);
        });
        
        document.querySelectorAll('.speak-btn').forEach(btn => {
            btn.addEventListener('click', speakName);
        });

        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', toggleFavorite);
        });
        
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', copyName);
        });
    }
    // ... existing code ...
    function toggleFavorite(e) {
        e.stopPropagation(); 
        const saveButton = e.currentTarget; // Use currentTarget for the button itself
        const nameCard = saveButton.closest('.name-card');
        if (!nameCard) return;
        
        const name = nameCard.getAttribute('data-name');
        const meaning = nameCard.getAttribute('data-meaning') || '';
        const pronunciation = nameCard.getAttribute('data-pronunciation') || '';
        
        const favoriteIndex = favorites.findIndex(fav => fav.name === name);
        
        if (favoriteIndex > -1) {
            // Remove from favorites
            favorites.splice(favoriteIndex, 1);
            saveButton.classList.remove('saved');
            saveButton.innerHTML = '<i class="far fa-heart"></i>';
            saveButton.title = 'saveName'; //  Consider changing title to 'Save Name' or similar for consistency if other titles are in English
            showNotification(`"${name}" removed from favorites`, 'success'); // Added notification
        } else {
            // Add to favorites
            favorites.push({ name, meaning, pronunciation });
            saveButton.classList.add('saved');
            saveButton.innerHTML = '<i class="fas fa-heart"></i>';
            saveButton.title = 'Saved';
            showNotification(`"${name}" added to favorites`, 'success'); // Added notification
        }
        
        localStorage.setItem('elfFavorites', JSON.stringify(favorites));
        renderFavorites();
        // Update modal save button state if modal is open and showing this name
        if (nameModal && nameModal.classList.contains('active') && modalName.textContent === name) {
            modalSaveBtn.innerHTML = favoriteIndex === -1 ? 
                '<i class="fas fa-heart"></i> Saved' : 
                '<i class="far fa-heart"></i> Save';
            modalSaveBtn.classList.toggle('saved', favoriteIndex === -1);
        }
    }
    // ... existing code ...


 // ... existing code ...
    function showNameDetails(e) {
        const nameCard = e.target.closest('.name-card');
        if (!nameCard || !modalName || !modalMeaning || !modalPronunciation || !modalUsage || !modalSaveBtn || !nameModal) return;

        const name = nameCard.getAttribute('data-name');
        const meaning = nameCard.getAttribute('data-meaning') || 'The meaning of this elven name has not been recorded.';
        const pronunciation = nameCard.getAttribute('data-pronunciation') || generatePronunciation(name); 
        const usage = generateUsageSuggestions(name); 

        modalName.textContent = name;
        modalMeaning.textContent = meaning;
        modalPronunciation.textContent = pronunciation;
        modalUsage.textContent = usage;
        
        const isFavorite = favorites.some(fav => fav.name === name);
        modalSaveBtn.innerHTML = isFavorite ? 
            '<i class="fas fa-heart"></i> Saved' :  // Changed to Chinese
            '<i class="far fa-heart"></i> Save';   // Changed to Chinese
        modalSaveBtn.classList.toggle('saved', isFavorite);
        // REMOVED: modalSaveBtn.onclick = () => toggleFavoriteInModal(name); 
        
        nameModal.classList.add('active');
    }
// ... existing code ...

    const modalSpeakBtn = document.getElementById('modal-speak');
    if (modalSpeakBtn) {
        modalSpeakBtn.addEventListener('click', function() {
            const name = modalName.textContent;
            if (name) {
                // 添加动画效果
                this.classList.add('speaking');
                
                // 朗读完成后移除动画
                const removeAnimation = () => {
                    modalSpeakBtn.classList.remove('speaking');
                };
                
                // 设置超时以防止语音合成事件不触发
                const animationTimeout = setTimeout(removeAnimation, 3000);
                
                // 创建一个一次性事件监听器来检测语音结束
                window.speechSynthesis.addEventListener('end', function handler() {
                    clearTimeout(animationTimeout);
                    removeAnimation();
                    window.speechSynthesis.removeEventListener('end', handler);
                });
                
                speakText(name);
            }
        });
    }

    function closeModal() {
        if (nameModal) nameModal.classList.remove('active');
    }
    
    // Placeholder for saveCurrentName - you'll need to complete this based on your existing logic
    function saveCurrentName() {
        if (!modalName) return;
        const name = modalName.textContent;
        // ... rest of your save logic from the original file
        console.log("Save button clicked for:", name);
        // Update favorites array, localStorage, renderFavorites(), and button state
    }

    // Placeholder for copyCurrentName - you'll need to complete this
   
// 统一的复制函数
// ... existing code ...

// ... existing code ...
function copyNameToClipboard(name, buttonElement) { // Removed showText parameter and UI update logic
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(name).then(() => { // Return the promise
            showNotification(`Copied "${name}" to clipboard!`, 'success');
            return true; // Indicate success
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showNotification('Failed to copy name.', 'error');
            return false; // Indicate failure
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = name;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification(`Copied "${name}" to clipboard! (fallback)`, 'success');
            document.body.removeChild(textArea);
            return true; // Indicate success
        } catch (err) {
            console.error('Fallback failed to copy: ', err);
            showNotification('Failed to copy name using fallback.', 'error');
            document.body.removeChild(textArea);
            return false; // Indicate failure
        }
    }
}
// ... existing code ...



// ... existing code ...
    function copyName(event) {
        const nameCard = event.currentTarget.closest('.name-card');
        if (!nameCard) return;
        const name = nameCard.getAttribute('data-name');
        const buttonElement = event.currentTarget;

        copyNameToClipboard(name, buttonElement).then(success => {
            if (success && buttonElement) {
                const originalHTML = buttonElement.innerHTML;
                const originalTitle = buttonElement.title;
                buttonElement.innerHTML = '<i class="fas fa-check"></i>'; // 只显示图标
                buttonElement.disabled = true;
                setTimeout(() => {
                    buttonElement.innerHTML = originalHTML;
                    buttonElement.title = originalTitle;
                    buttonElement.disabled = false;
                }, 1500);
            }
        });
    }


 // ... existing code ...
    function copyCurrentName() {
        if (!modalName || !modalCopyBtn) return;
        const name = modalName.textContent;
        
        copyNameToClipboard(name, modalCopyBtn).then(success => {
            if (success && modalCopyBtn) {
                const originalHTML = modalCopyBtn.innerHTML;
                const originalTitle = modalCopyBtn.title;
                modalCopyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!'; // Specific UI for modal
                modalCopyBtn.disabled = true;
                setTimeout(() => {
                    modalCopyBtn.innerHTML = originalHTML;
                    modalCopyBtn.title = originalTitle;
                    modalCopyBtn.disabled = false;
                }, 1500);
            }
        });
    }

    // 修改复制收藏列表中的名字的函数
    function copyFavoriteName(event) {
        const favoriteItem = event.currentTarget.closest('.favorite-item');
        if (!favoriteItem) return;
        const name = favoriteItem.getAttribute('data-name');
        copyNameToClipboard(name, event.currentTarget);
    }
    // Placeholder for switchTheme - you'll need to complete this
    function switchTheme(theme) {
    currentTheme = theme;
    document.body.setAttribute('data-theme', currentTheme);
    console.log("Switched theme to:", theme);

    
    // 重新生成背景效果
    regenerateBackgroundEffects();
    }


    // 修改regenerateBackgroundEffects函数
    function regenerateBackgroundEffects() {
        console.log("Regenerating background effects for theme:", currentTheme);
        
        const particlesContainer = document.getElementById('particles-container');
        const runesContainer = document.getElementById('runes-container');
        const themeContainer = document.getElementById('theme-container');

        // 清除现有效果
        if (particlesContainer) {
            particlesContainer.innerHTML = ''; // 清除现有粒子
        }

        if (runesContainer) {
            runesContainer.innerHTML = ''; // 清除现有符文
        }
        
        // 移除旧的科幻效果
        const oldGrid = document.querySelector('.sci-fi-grid');
        if (oldGrid) oldGrid.remove();
        
        const oldHologram = document.querySelector('.hologram-effect');
        if (oldHologram) oldHologram.remove();
        
        const oldScanLine = document.querySelector('.scan-line');
        if (oldScanLine) oldScanLine.remove();
        
        // 根据主题设置颜色
        let particleColors, ionColors;
        switch(currentTheme) {
            case 'high-elf':
                particleColors = ['#a0c4e0', '#e0f0ff', '#c5b358'];
                ionColors = ['rgba(32, 222, 255, 0.6)', 'rgba(88, 124, 255, 0.6)', 'rgba(124, 88, 255, 0.6)'];
                break;
            case 'wood-elf':
                particleColors = ['#a0d4b4', '#e0fff0', '#c5b358'];
                ionColors = ['rgba(32, 255, 136, 0.6)', 'rgba(88, 255, 124, 0.6)', 'rgba(124, 255, 88, 0.6)'];
                break;
            case 'dark-elf':
                particleColors = ['#d4a0d4', '#fff0e0', '#c5b358'];
                ionColors = ['rgba(255, 32, 222, 0.6)', 'rgba(124, 88, 255, 0.6)', 'rgba(255, 88, 124, 0.6)'];
                break;
            case 'half-elf':
                particleColors = ['#e0c496', '#fff0e0', '#c5b358'];
                ionColors = ['rgba(255, 222, 32, 0.6)', 'rgba(255, 124, 88, 0.6)', 'rgba(255, 88, 124, 0.6)'];
                break;
            default:
                particleColors = ['#a0c4e0', '#e0f0ff', '#c5b358'];
                ionColors = ['rgba(32, 222, 255, 0.6)', 'rgba(88, 124, 255, 0.6)', 'rgba(124, 88, 255, 0.6)'];
        }
        
        // 创建新效果
        if (particlesContainer) {
            // 创建魔法粒子
            const particleGen = new ParticleGenerator('particles-container', 20, particleColors);
            particleGen.createParticles();
            
            // 创建离子粒子
            const ionGen = new IonParticleGenerator('particles-container', 15, ionColors);
            ionGen.createParticles();
            
            // 创建数据流
            const dataGen = new DataStreamGenerator('particles-container', 10);
            dataGen.createStreams();
            
            // 创建扫描线
            const scanGen = new ScanLineGenerator('particles-container');
            scanGen.createScanLine();
        }

        if (runesContainer) {
            // 创建符文
            const runeGen = new RuneGenerator('runes-container', 10, particleColors);
            runeGen.createRunes();
        }
        
        // 添加科幻网格和全息效果
        if (themeContainer) {
            // 添加网格效果
            const gridElement = document.createElement('div');
            gridElement.className = 'sci-fi-grid';
            themeContainer.appendChild(gridElement);
            
            // 添加全息效果
            const hologramElement = document.createElement('div');
            hologramElement.className = 'hologram-effect';
            themeContainer.appendChild(hologramElement);
        }
    }

    // Placeholder for renderFavorites - you'll need to complete this
    function renderFavorites() {
        if (!favoritesContainer || !favoritesCount) return;
        
        favoritesCount.textContent = `(${favorites.length})`;
        
        // Show or hide the "Clear All" button based on whether there are favorites
        if (clearFavoritesBtn) {
            clearFavoritesBtn.style.display = favorites.length > 0 ? 'inline-flex' : 'none';
        }

        if (favorites.length === 0) {
            favoritesContainer.innerHTML = "<div class=\"empty-favorites-message\">You haven't saved any names yet</div>";
            return;
        }

        let favoritesHtml = '<ul class="favorites-list">';
        favorites.forEach(fav => {
            favoritesHtml += `
                <li class="favorite-item" data-name="${fav.name}">
                    <span class="favorite-name-text">${fav.name}</span>
                    <div class="favorite-item-actions">
                        <button class="speak-favorite-btn" title="朗读名字">
                            <i class="fas fa-volume-up"></i>
                        </button>
                        <button class="copy-favorite-btn" title="复制名字">
                            <i class="fas fa-copy"></i>
                        </button>
                        <button class="remove-favorite-btn" title="移除收藏">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </li>
            `;
        });
        favoritesHtml += '</ul>';
        favoritesContainer.innerHTML = favoritesHtml;

        document.querySelectorAll('.remove-favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nameToRemove = e.currentTarget.closest('.favorite-item').getAttribute('data-name');
                removeFromFavorites(nameToRemove);
            });
        });

        document.querySelectorAll('.speak-favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nameCard = e.target.closest('.favorite-item');
                if (!nameCard) return;
                const nameToSpeak = nameCard.getAttribute('data-name');
                speakText(nameToSpeak); 
            });
        });

        document.querySelectorAll('.copy-favorite-btn').forEach(btn => { // Add event listener for new copy button
            btn.addEventListener('click', copyFavoriteName);
        });
    }

    function copyFavoriteName(event) {
        const favoriteItem = event.currentTarget.closest('.favorite-item');
        if (!favoriteItem) return;
        const name = favoriteItem.getAttribute('data-name');
        
        // Store original icon HTML before changing it
        const button = event.currentTarget;
        const originalIcon = button.innerHTML;
        
        navigator.clipboard.writeText(name).then(() => {
            console.log(`Copied "${name}" from favorites to clipboard`);
            // Update button icon safely
            if (button) {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    // Check if button still exists in DOM before updating
                    if (button.isConnected) {
                        button.innerHTML = originalIcon;
                    }
                }, 1500);
            }
            
            // Add notification - simplified call
            showNotification(`Copied "${name}" to clipboard`, 'success');
        }).catch(err => {
            console.error('Failed to copy favorite name: ', err);
            
            // Add error notification - simplified call
            showNotification('Failed to copy name. Please try again.', 'error');
        });
    }

   // ... existing code ...
function clearAllFavorites() {
    if (confirm('Are you sure you want to remove all favorite names?')) { // Confirmation dialog
        if (favorites.length === 0) {
            showNotification('Favorites list is already empty.', 'error'); // Added notification for empty list
            return;
        }
        favorites = [];
        localStorage.setItem('elfFavorites', JSON.stringify(favorites));
        renderFavorites();
        showNotification('All favorites cleared', 'success'); // Added notification

        // Update save buttons on all currently displayed name cards in the results section
        document.querySelectorAll('.name-card .save-btn.saved').forEach(btn => {
            btn.classList.remove('saved');
            btn.innerHTML = '<i class="far fa-heart"></i>';
            btn.title = 'saveName'; // Consider changing title to 'Save Name'
        });
        // Update modal save button if modal is open
        if (nameModal && nameModal.classList.contains('active')) {
             const currentModalName = modalName.textContent;
             const isCurrentModalNameFavorite = favorites.some(fav => fav.name === currentModalName);
             modalSaveBtn.innerHTML = isCurrentModalNameFavorite ? 
                '<i class="fas fa-heart"></i> Saved' : 
                '<i class="far fa-heart"></i> Save';
             modalSaveBtn.classList.toggle('saved', isCurrentModalNameFavorite);
        }
    }
}
// ... existing code ...
    
    // Placeholder for speakName - you'll need to complete this
    function speakText(text) { // General speak function
        if ('speechSynthesis' in window && text) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            
            if (availableVoices.length > 0) {
                // 尝试找到柔美的女声
                // 首先尝试找英文女声
                let selectedVoice = availableVoices.find(v => 
                    v.lang.startsWith("en") && 
                    v.name.toLowerCase().includes("female")
                ) || availableVoices.find(v => v.lang.startsWith("en"));
                
                // 如果找到了合适的声音，使用它
                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                    // 调整音调和语速使声音更柔美
                    utterance.pitch = 1.2;  // 稍微提高音调
                    utterance.rate = 0.9;   // 稍微放慢语速
                }
            }
            
            window.speechSynthesis.speak(utterance);
        }
    }

    function removeFromFavorites(name) {
        favorites = favorites.filter(fav => fav.name !== name);
        localStorage.setItem('elfFavorites', JSON.stringify(favorites));
        renderFavorites(); // Re-render the favorites list

        // Also update the save button state in the main results if the name is present there
        const nameCardInResults = document.querySelector(`.name-card[data-name="${name}"]`);
        if (nameCardInResults) {
            const saveButton = nameCardInResults.querySelector('.save-btn');
            if (saveButton) {
                saveButton.classList.remove('saved');
                saveButton.innerHTML = '<i class="far fa-heart"></i>';
                saveButton.title = 'saveName';
            }
        }
        // Update modal save button state if modal is open and showing this name
        if (nameModal && nameModal.classList.contains('active') && modalName.textContent === name) {
            modalSaveBtn.innerHTML = '<i class="far fa-heart"></i> Save';
            modalSaveBtn.classList.remove('saved');
        }
        showNotification(`"${name}" removed from favorites.`, 'success'); // Added notification
    }

    // Placeholder for speakName - you'll need to complete this
    function speakName(event) {
        const nameCard = event.target.closest('.name-card');
        if (!nameCard) return;
        const nameToSpeak = nameCard.getAttribute('data-name');
        speakText(nameToSpeak); // Use the general speakText function
    }

    // Placeholder for generatePronunciation - you'll need to complete this
    function generatePronunciation(name) {
        // A simple placeholder. Replace with your actual pronunciation logic.
        return name.split('').join('-').toLowerCase(); 
    }

    // Placeholder for generateUsageSuggestions - you'll need to complete this
    function generateUsageSuggestions(name) {
        return `The name ${name} could be used for a noble warrior or a wise mage. It evokes a sense of ancient power.`;
    }

    // Call init to set everything up
    init();
    // Show notification function
   // Show notification function
    const copyLinkBtn = document.getElementById('copy-link-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            const urlToCopy = window.location.href;
            navigator.clipboard.writeText(urlToCopy).then(() => {
                showNotification('Link copied to clipboard!', 'success');
            }).catch(err => {
                showNotification('Failed to copy link.', 'error');
                console.error('Failed to copy link: ', err);
            });
        });
    }
});
