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


const raceStyleUIConfig = {
    'high-elf': {
        styles: [
            { id: 'noble', name: 'Noble', desc: 'Aristocratic and refined', icon: 'fas fa-crown' },
            { id: 'scholarly', name: 'Scholarly', desc: 'Wise and learned', icon: 'fas fa-book' },
            { id: 'celestial', name: 'Celestial', desc: 'Star and moon inspired', icon: 'fas fa-star' },
            { id: 'arcane', name: 'Arcane', desc: 'Magical and mystical', icon: 'fas fa-magic' }
        ]
    },
    'wood-elf': {
        styles: [
            { id: 'forest', name: 'Forest', desc: 'Deep woodland heritage', icon: 'fas fa-tree' },
            { id: 'hunter', name: 'Hunter', desc: 'Swift and precise', icon: 'fas fa-crosshairs' },
            { id: 'druidic', name: 'Druidic', desc: 'Nature magic focused', icon: 'fas fa-leaf' },
            { id: 'tribal', name: 'Tribal', desc: 'Ancient clan traditions', icon: 'fas fa-feather' }
        ]
    },
    'dark-elf': {
        styles: [
            { id: 'shadow', name: 'Shadow', desc: 'Darkness and stealth', icon: 'fas fa-mask' },
            { id: 'noble-dark', name: 'Noble', desc: 'Dark aristocracy', icon: 'fas fa-chess-king' },
            { id: 'spider', name: 'Spider', desc: 'Web and venom themed', icon: 'fas fa-spider' },
            { id: 'exile', name: 'Exile', desc: 'Outcast and wanderer', icon: 'fas fa-route' }
        ]
    },
    'half-elf': {
        styles: [
            { id: 'balanced', name: 'Balanced', desc: 'Human-Elf harmony', icon: 'fas fa-scale-balanced' },
            { id: 'wanderer', name: 'Wanderer', desc: 'Traveler between worlds', icon: 'fas fa-compass' },
            { id: 'adaptive', name: 'Adaptive', desc: 'Flexible and versatile', icon: 'fas fa-arrows-rotate' },
            { id: 'bridge', name: 'Bridge', desc: 'Connecting two cultures', icon: 'fas fa-bridge' }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Global variables
    let favorites = JSON.parse(localStorage.getItem('elfFavorites')) || [];
    let currentNames = [];
    let currentTheme = 'high-elf';
    let speechSynthesisInstance = null;

    // 在文件顶部添加常量
    const MAX_FAVORITES = 100;
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
    const exportFavoritesBtn = document.getElementById('export-favorites-btn'); // 添加导出按钮引用
    

// 在现有的血统选择事件处理后添加





// 更新风格选项的函数
function updateStyleOptions(race) {
    const styleSelector = document.getElementById('style-selector');
    if (!styleSelector) return;
    
    const config = raceStyleUIConfig[race];
    if (!config) return;
    
    styleSelector.innerHTML = '';
    
    config.styles.forEach((style, index) => {
        const styleOption = document.createElement('div');
        styleOption.className = `style-option ${index === 0 ? 'active' : ''}`;
        styleOption.dataset.style = style.id;
        
        styleOption.innerHTML = `
            <i class="style-icon ${style.icon}"></i>
            <span class="style-name">${style.name}</span>
            <p class="style-desc">${style.desc}</p>
        `;
        
        styleOption.addEventListener('click', function() {
            document.querySelectorAll('.style-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const selectedStyle = this.dataset.style;
            updateMeaningOptions(selectedStyle);
            
            if (window.elfGeneratorInstance) {
                window.elfGeneratorInstance.setStyle(selectedStyle);
            }
        });
        
        styleSelector.appendChild(styleOption);
    });
    
    if (config.styles.length > 0) {
        updateMeaningOptions(config.styles[0].id);
        if (window.elfGeneratorInstance) {
            window.elfGeneratorInstance.setStyle(config.styles[0].id);
        }
    }
}

// 更新含义选项函数（使用标签而非下拉框）
function updateMeaningOptions(style) {
    const meaningTags = document.getElementById('meaning-tags');
    if (!meaningTags) return;
    
    if (window.elfGeneratorInstance) {
        const availableMeanings = window.elfGeneratorInstance.getAvailableMeaningTags(style);
        
        meaningTags.innerHTML = '<span class="meaning-tag active" data-meaning="">Any</span>';
        
        availableMeanings.slice(0, 4).forEach(meaning => {
            const tag = document.createElement('span');
            tag.className = 'meaning-tag';
            tag.dataset.meaning = meaning;
            tag.textContent = meaning.charAt(0).toUpperCase() + meaning.slice(1).replace('-', ' ');
            
            tag.addEventListener('click', function() {
                document.querySelectorAll('.meaning-tag').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const selectedMeaning = this.dataset.meaning;
                if (window.elfGeneratorInstance) {
                    window.elfGeneratorInstance.setMeaningPreference(selectedMeaning);
                }
            });
            
            meaningTags.appendChild(tag);
        });
    }
}

// 添加名字数量选择功能
function initNameCountSelector() {
    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const count = parseInt(this.dataset.count);
            // 这里可以设置全局变量或传递给生成函数
            window.selectedNameCount = count;
        });
    });
}





    
    // Initialize function
    function init() {
     
         // 高级选项折叠功能
        const advancedFieldset = document.querySelector('.advanced-fieldset');
        const collapsibleLegend = document.querySelector('.collapsible-legend');
        const advancedContent = document.querySelector('.advanced-content');
        
        if (collapsibleLegend && advancedContent) {
            collapsibleLegend.addEventListener('click', function() {
                const isExpanded = advancedFieldset.classList.contains('expanded');
                
                if (isExpanded) {
                    advancedFieldset.classList.remove('expanded');
                    advancedContent.style.display = 'none';
                } else {
                    advancedFieldset.classList.add('expanded');
                    advancedContent.style.display = 'block';
                }
            });
        }
        
         // 姓氏开关功能
        const surnameToggle = document.getElementById('surname-toggle');
        const toggleLabel = document.querySelector('.toggle-label');
        
        if (surnameToggle && toggleLabel) {
            surnameToggle.addEventListener('change', function() {
                const isEnabled = this.checked;
                toggleLabel.textContent = isEnabled ? 'Enabled' : 'Disabled';
                
                if (window.elfGeneratorInstance) {
                    window.elfGeneratorInstance.setSurnameEnabled(isEnabled);  // 使用isEnabled变量
                }
            });
            
            // 初始化设置
            if (window.elfGeneratorInstance) {
                window.elfGeneratorInstance.setSurnameEnabled(false);
            }
        }


        const meaningSelect = document.getElementById('meaning-preference');
            if (meaningSelect) {
                meaningSelect.addEventListener('change', function() {
                    const selectedMeaning = this.value;
                    if (window.elfGeneratorInstance) {
                        window.elfGeneratorInstance.setMeaningPreference(selectedMeaning);
                    }
                });
            }
        
            // 页面加载时初始化风格选项
            const activeBloodline = document.querySelector('.bloodline-option.active');
            if (activeBloodline) {
                const race = activeBloodline.dataset.bloodline;
                updateStyleOptions(race);
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
        if (exportFavoritesBtn) exportFavoritesBtn.addEventListener('click', exportFavorites); // 添加导出按钮事件绑定



        document.querySelectorAll('.bloodline-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.bloodline-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                const bloodline = this.getAttribute('data-bloodline');
                switchTheme(bloodline);
                
                // 重要：添加风格联动
                updateStyleOptions(bloodline);
                
                // 更新主题按钮的激活状态
                document.querySelectorAll('.theme-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.getAttribute('data-theme') === bloodline);
                });
                // 🆕 添加血统切换通知功能
                const bloodlineNames = {
                    'high-elf': 'High Elves',
                    'wood-elf': 'Wood Elves', 
                    'dark-elf': 'Dark Elves',
                    'half-elf': 'Half-Elves'
                };
                const bloodlineName = bloodlineNames[bloodline] || bloodline;
                showNotification(`Switched to ${bloodlineName}`, 'success');
            });
        });
        
        document.querySelectorAll('.gender-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });


        
       
        
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
         initNameCountSelector();
        regenerateBackgroundEffects(); // This function needs to be defined or removed if not used
        renderFavorites(); // This function needs to be defined or removed if not used
    }


  function generateNames() {

    console.log('当前生成器状态:', {
        style: window.elfGeneratorInstance.currentStyle,
        meaning: window.elfGeneratorInstance.meaningPreference,
        surname: window.elfGeneratorInstance.isSurnameEnabled()
    });
    console.log("=== 开始生成名字 ===");
    const bloodlineElement = document.querySelector('.bloodline-option.active');
    const genderElement = document.querySelector('.gender-btn.active');

    if (!bloodlineElement || !genderElement) {
        handleError("Bloodline or gender not selected.");
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

     
     // 获取生成数量
     const nameCount = window.selectedNameCount || 9;
     console.log(`生成数量: ${nameCount}`);
     
     if (window.elfGeneratorInstance) {
 console.log("elfGeneratorInstance存在，设置选项...");
    window.elfGeneratorInstance.setBloodline(formattedBloodline);
    window.elfGeneratorInstance.setGender(gender);
    
    // 添加姓氏开关状态设置
    const surnameToggle = document.getElementById('surname-toggle');
    if (surnameToggle) {
        window.elfGeneratorInstance.setSurnameEnabled(surnameToggle.checked);
        console.log(`姓氏开关状态: ${surnameToggle.checked}`);
    }

     }else {
        handleError("Elf Name Generator instance not found.");
        resultsContainer.innerHTML = `
            <div class="error-container">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Name generator not initialized. Please refresh the page.</p>
            </div>
        `;
        // 恢复生成按钮状态
        generateBtn.disabled = false;
        generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Names';
        return;
    }
    
    // 设置超时处理
    const timeoutId = setTimeout(() => {
        handleError('Name generation timeout');
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
                const names = window.elfGeneratorInstance.generateBatch(window.selectedNameCount || 9);
                console.log("生成结果:", names);
                
                // 清除超时
                clearTimeout(timeoutId);
                
                // 检查是否生成失败
                if (names && names.failed) {
                    handleError("生成名字失败:", names.reason);
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
                
                handleError('Name generation error:', error);
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
        }, 100);
    } catch (error) {
        // 清除超时
        clearTimeout(timeoutId);
        
        handleError('Name generation error:', error);
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

    // 添加模式切换按钮事件监听器
    const modeToggle = document.getElementById('mode-toggle');
    const advancedOptions = document.getElementById('advanced-options');
    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            const isBasic = this.classList.contains('basic');
            
            if (isBasic) {
                // 当前是基础模式，切换到高级模式
                this.classList.remove('basic');
                this.classList.add('advanced');
                this.querySelector('.mode-text').textContent = 'Switch to Basic';
                this.querySelector('.mode-indicator i').className = 'fas fa-chevron-down';
                
                // 显示高级选项
                if (advancedOptions) {
                    advancedOptions.classList.remove('hidden');
                }
                
                showNotification('Switched to Advanced Mode', 'success');
            } else {
                // 当前是高级模式，切换到基础模式
                        this.classList.remove('advanced');
                        this.classList.add('basic');
                        this.querySelector('.mode-text').textContent = 'Switch to Advanced';
                        this.querySelector('.mode-indicator i').className = 'fas fa-chevron-right';

                        // 隐藏高级选项
                        if (advancedOptions) {
                            advancedOptions.classList.add('hidden');
                        }

                        // 🔥 完全重置生成器设置
                        if (window.elfGeneratorInstance) {
                            window.elfGeneratorInstance.setStyle(null);
                            window.elfGeneratorInstance.setMeaningPreference('');
                            window.elfGeneratorInstance.setSurnameEnabled(false);  // 改为false
                        }

                        // 🔥 彻底清理UI状态
                        document.querySelectorAll('.style-option').forEach(opt => {
                            opt.classList.remove('active');
                            // 移除所有风格选择的视觉状态
                        });

                        document.querySelectorAll('.meaning-tag').forEach(tag => {
                            tag.classList.remove('active');
                            // 移除所有含义选择的视觉状态
                        });

                        // 🔥 确保"Any"含义标签被选中
                        const anyMeaningTag = document.querySelector('.meaning-tag[data-meaning=""]');
                        if (anyMeaningTag) {
                            anyMeaningTag.classList.add('active');
                        }

                       // 🔥 重置姓氏开关
                        const surnameToggle = document.getElementById('surname-toggle');
                        if (surnameToggle) {
                            surnameToggle.checked = false;  // 改为false
                            const label = surnameToggle.nextElementSibling;
                            if (label) {
                                label.textContent = 'Include Surname';
                            }
                        }

                // 🔥 同步 advancedMasterToggle 状态
                const advancedMasterToggle = document.getElementById('advanced-master-toggle');
                if (advancedMasterToggle) {
                    advancedMasterToggle.checked = false;
                    // 触发change事件确保完全重置
                    advancedMasterToggle.dispatchEvent(new Event('change'));
                }

                showNotification('Switched to Basic Mode. All settings reset to default.', 'info');
                   }
        });
    }
 
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
            if (favorites.length >= MAX_FAVORITES) {
                showNotification(`Favorites limit reached (${MAX_FAVORITES}). Please remove some favorites first.`, 'error');
                return;
            }
            // **关键修改：直接从模态框的元素中获取含义和发音**
            const meaning = modalMeaning.textContent || ''; // 从 id="modal-meaning" 的元素获取
            const pronunciation = modalPronunciation.textContent || ''; // 从 id="modal-pronunciation" 的元素获取
            const usage = modalUsage.textContent || ''; // 添加这行

            favorites.push({ name, meaning, pronunciation,usage}); // 使用获取到的信息
            
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
             // 🔥 关键修复：动态生成缺失的字段
             if (!nameObj.pronunciation) {
                nameObj.pronunciation = generatePronunciation(nameObj.name);
            }
            if (!nameObj.usage) {
                nameObj.usage = window.elfGeneratorInstance.generateUltimateUsage(nameObj.name);
            }
            const isFavorite = favorites.some(fav => fav.name === nameObj.name);
            // const favoriteClass = isFavorite ? 'favorite' : ''; // 'favorite' class on name-card might be redundant if only button state changes
            
            html += `
                <div class="name-card" data-name="${nameObj.name}" data-meaning="${nameObj.meaning || ''}" data-pronunciation="${nameObj.pronunciation || ''}" data-usage="${nameObj.usage || ''}">
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
        
        resultsContainer.querySelectorAll('.name-text').forEach(nameText => {
            console.log('Adding click listener to:', nameText); // 调试日志
            nameText.addEventListener('click', function(e) {
                console.log('Name text clicked!', e.target); // 调试日志
                showNameDetails(e);
            });
        });
        
        resultsContainer.querySelectorAll('.speak-btn').forEach(btn => {
            btn.addEventListener('click', speakName);
        });

        resultsContainer.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', toggleFavorite);
        });
        
        resultsContainer.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', copyName);
        });
    }
    function handleError(error, userMessage = 'An error occurred') {
        handleError(error);
        showNotification(userMessage, 'error');
    }
    // 修改原有的 showNameDetails 函数
    function showNameDetails(e) {
        console.log('showNameDetails called with event:', e); // 调试日志
        console.log('Event target:', e.target); // 调试日志
        
        const nameCard = e.target.closest('.name-card');
        console.log('Found nameCard:', nameCard); // 调试日志
        
        if (!nameCard) {
            console.log('No nameCard found, returning'); // 调试日志
            return;
        }
        
        const nameData = {
            name: nameCard.getAttribute('data-name'),
            meaning: nameCard.getAttribute('data-meaning'),
            pronunciation: nameCard.getAttribute('data-pronunciation'),
            usage: nameCard.getAttribute('data-usage')
        };
        
        console.log('Name data:', nameData); // 调试日志
        showNameDetailsFromData(nameData);
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
        const usage = nameCard.getAttribute('data-usage') || ''; // 添加这行
        
        const favoriteIndex = favorites.findIndex(fav => fav.name === name);

        if (favoriteIndex > -1) {
            // Remove from favorites
            favorites.splice(favoriteIndex, 1);
            saveButton.classList.remove('saved');
            saveButton.innerHTML = '<i class="far fa-heart"></i>';
            saveButton.title = 'saveName'; //  Consider changing title to 'Save Name' or similar for consistency if other titles are in English
            showNotification(`"${name}" removed from favorites`, 'success'); // Added notification
        } else {
 
            if (favorites.length >= MAX_FAVORITES) {
                showNotification(`Favorites limit reached (${MAX_FAVORITES}). Please remove some favorites first.`, 'error');
                return;
            }
            favorites.push({ name, meaning, pronunciation,usage});
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
   


// ... existing code ...
function copyNameToClipboard(name, buttonElement) { // Removed showText parameter and UI update logic
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(name).then(() => { // Return the promise
            showNotification(`Copied "${name}" to clipboard!`, 'success');
            return true; // Indicate success
        }).catch(err => {
            handleError('Failed to copy: ', err);
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
            handleError('Fallback failed to copy: ', err);
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
        // 导出收藏功能
        function exportFavorites() {

            // 生成导出内容
            const currentDate = new Date().toLocaleDateString('en-US');
            let content = `My Elf Name Collection\n`;
            content += `Export Date: ${currentDate}\n`;
            content += `Total Names: ${favorites.length}\n`;
            content += `${'='.repeat(30)}\n\n`;
            
            favorites.forEach((fav, index) => {
                content += `${index + 1}. ${fav.name}\n`;
                if (fav.meaning) {
                    content += `   Meaning: ${fav.meaning}\n`;
                }
                if (fav.pronunciation) {
                    content += `   Pronunciation: ${fav.pronunciation}\n`;
                }
                if (fav.usage) {
                    content += `   Usage Ideas: ${fav.usage}\n`;
                }
                content += `\n`;
            });
            
            content += `\nExported from: Elf Name Generator\n`;
            content += `URL: ${window.location.href}`;
        
            // 创建并下载文件
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            
            // 生成文件名：Elf_Names_YYYY-MM-DD.txt
            const dateStr = new Date().toISOString().split('T')[0];
            a.download = `Elf_Names_${dateStr}.txt`;
            a.href = url;
            a.click();
            
            URL.revokeObjectURL(url);
            
            // 显示成功提示（如果有通知系统）
            if (typeof showNotification === 'function') {
                showNotification('Favorites exported successfully!', 'success');
            }
       }


    // Placeholder for renderFavorites - you'll need to complete this
    function renderFavorites() {
        if (!favoritesContainer || !favoritesCount) return;
    
    // Display count with limit
    favoritesCount.textContent = `(${favorites.length}/${MAX_FAVORITES})`;
    
    // Show warning when approaching limit
    if (favorites.length >= MAX_FAVORITES * 0.9) {
        favoritesCount.style.color = 'var(--warning-color, #ff9800)';
    } else {
        favoritesCount.style.color = '';
    }
    
    // Show or hide buttons based on favorites count
    if (clearFavoritesBtn) {
        clearFavoritesBtn.style.display = favorites.length > 0 ? 'inline-flex' : 'none';
    }
    if (exportFavoritesBtn) {
        exportFavoritesBtn.style.display = favorites.length > 0 ? 'inline-flex' : 'none';
    }

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `<div class="empty-favorites-message">
                                <p>You haven't saved any names yet</p>
                                <div class="placeholder-decoration">♡</div>
                    </div>`;
        return;
    }

    let favoritesHtml = '<ul class="favorites-list">';
    favorites.forEach(fav => {
        favoritesHtml += `
            <li class="favorite-item" data-name="${fav.name}">
                <span class="favorite-name-text">${fav.name}</span>
                <div class="favorite-item-actions">
                    <button class="speak-favorite-btn" title="Speak name">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <button class="copy-favorite-btn" title="Copy name">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="remove-favorite-btn" title="Remove favorite">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </li>
        `;
    });
    favoritesHtml += '</ul>';
    favoritesContainer.innerHTML = favoritesHtml;

    // Add event listeners for favorite actions
    favoritesContainer.querySelectorAll('.remove-favorite-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const nameToRemove = btn.closest('.favorite-item').getAttribute('data-name');
            removeFromFavorites(nameToRemove);
        });
    });
    favoritesContainer.querySelectorAll('.speak-favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nameCard = e.target.closest('.favorite-item');
                if (!nameCard) return;
                const nameToSpeak = nameCard.getAttribute('data-name');
                speakText(nameToSpeak); 
            });
        });

        favoritesContainer.querySelectorAll('.copy-favorite-btn').forEach(btn => { // Add event listener for new copy button
            btn.addEventListener('click', copyFavoriteName);
        });

            // 为收藏的名字添加点击事件
            favoritesContainer.querySelectorAll('.favorite-name-text').forEach(nameText => {
            nameText.addEventListener('click', (e) => {
                const favoriteItem = e.target.closest('.favorite-item');
                if (!favoriteItem) return;
                
                const name = favoriteItem.getAttribute('data-name');
                const favoriteData = favorites.find(fav => fav.name === name);
                
                if (favoriteData) {
                    showNameDetailsFromData(favoriteData);
                }
            });
        });
        
    }

    function showNameDetailsFromData(nameData) {
        console.log('showNameDetailsFromData called with:', nameData);
        
        if (!modalName || !modalMeaning || !modalPronunciation || !modalUsage || !modalSaveBtn || !nameModal) {
            console.log('Modal elements not ready');
            console.log('Elements check:', {
                modalName: !!modalName,
                modalMeaning: !!modalMeaning,
                modalPronunciation: !!modalPronunciation,
                modalUsage: !!modalUsage,
                modalSaveBtn: !!modalSaveBtn,
                nameModal: !!nameModal
            });
            return;
        }
        
        const name = nameData.name;
        const meaning = nameData.meaning || 'The meaning of this elven name has not been recorded.';
        const pronunciation = nameData.pronunciation || generatePronunciation(name);
        // 生成usage描述
        let usage;
        if (nameData.usage) {
            usage = nameData.usage;
        } else {
            // 创建临时名字对象用于生成usage
            const tempNameObj = {
                name: name,
                meaning: meaning,
                bloodline: nameData.bloodline || 'High Elf' // 默认血统
            };
            const usageObj = window.elfGeneratorInstance.generateUltimateUsage(tempNameObj);
            usage = usageObj.summary; // 使用 summary 属性
        }


        modalName.textContent = name;
        modalMeaning.textContent = meaning;
        modalPronunciation.textContent = pronunciation;
        modalUsage.textContent = usage;
        
        const isFavorite = favorites.some(fav => fav.name === name);
        modalSaveBtn.innerHTML = isFavorite ? 
            '<i class="fas fa-heart"></i> Saved' :
            '<i class="far fa-heart"></i> Save';
        modalSaveBtn.classList.toggle('saved', isFavorite);
        
        console.log('About to add active class to modal');
        nameModal.classList.add('active');
        console.log('Modal classes after adding active:', nameModal.className);
        console.log('Modal display style:', window.getComputedStyle(nameModal).display);

        
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
            handleError('Failed to copy favorite name: ', err);
            
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
            resultsContainer.querySelectorAll('.name-card .save-btn.saved').forEach(btn => {
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

    function generatePronunciation(name) {
        if (!name || typeof name !== 'string') return '';
        
        const syllables = splitIntoSyllables(name.toLowerCase());
        
        // 简单的音节连接，用连字符分隔
        return syllables.map(syllable => {
            // 首字母大写，便于阅读
            return syllable.charAt(0).toUpperCase() + syllable.slice(1);
        }).join('-');
    }

    // 简化的音节分割函数
    function splitIntoSyllables(word) {
        if (!word) return [];
        
        const vowels = 'aeiouAEIOU';
        const syllables = [];
        let currentSyllable = '';
        
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            const isVowel = vowels.includes(char);
            const nextChar = word[i + 1];
            const nextIsVowel = nextChar && vowels.includes(nextChar);
            
            currentSyllable += char;
            
            // 音节分割规则：
            // 1. 元音后跟辅音，且辅音后还有元音时分割
            // 2. 连续元音时可能分割（除了常见组合）
            if (isVowel && nextChar && !nextIsVowel) {
                // 元音后的辅音
                const consonantCluster = getConsonantCluster(word, i + 1);
                if (consonantCluster.length === 1 && i + 2 < word.length) {
                    // 单个辅音，在辅音前分割
                    syllables.push(currentSyllable);
                    currentSyllable = '';
                }
            } else if (isVowel && nextIsVowel) {
                // 连续元音，检查是否是常见组合
                const vowelPair = char + nextChar;
                if (!['ae', 'ai', 'au', 'ea', 'ei', 'ie', 'oa', 'oo', 'ou', 'ue'].includes(vowelPair)) {
                    // 不是常见组合，分割
                    syllables.push(currentSyllable);
                    currentSyllable = '';
                }
            }
        }
        
        // 添加最后一个音节
        if (currentSyllable) {
            syllables.push(currentSyllable);
        }
        
        // 确保至少有一个音节
        return syllables.length > 0 ? syllables : [word];
    }

    // 获取辅音群
    function getConsonantCluster(word, startIndex) {
        const vowels = 'aeiouAEIOU';
        let cluster = '';
        
        for (let i = startIndex; i < word.length; i++) {
            if (vowels.includes(word[i])) {
                break;
            }
            cluster += word[i];
        }
        
        return cluster;
    }


    // 在文件顶部添加一个用于存储已生成demo名字的集合
    let usedDemoNames = new Set();

    // 修改 generateDemoName 函数
    function generateDemoName() {
        if (window.elfGeneratorInstance) {
            const maxAttempts = 10; // 最大尝试次数
            let attempts = 0;
            let demoName;
            
            try {
                // 循环生成直到获得不重复的名字或达到最大尝试次数
                do {
                    demoName = window.elfGeneratorInstance.generate();
                    attempts++;
                } while (usedDemoNames.has(demoName.name) && attempts < maxAttempts);
                
                // 如果达到最大尝试次数仍然重复，清空历史记录并使用当前名字
                if (attempts >= maxAttempts && usedDemoNames.has(demoName.name)) {
                    usedDemoNames.clear();
                    console.log('Demo names history cleared due to too many duplicates');
                }
                
                // 将新名字添加到已使用集合中
                usedDemoNames.add(demoName.name);
                
                const nameDisplay = document.querySelector('.generated-name');
                const meaningDisplay = document.querySelector('.name-meaning');
                const descriptionDisplay = document.querySelector('.name-description');
                
                if (nameDisplay && meaningDisplay && descriptionDisplay) {
                    nameDisplay.textContent = demoName.name;
                    meaningDisplay.textContent = `"${demoName.meaning}"`;
                    // 生成usage描述
                    let usage;
                    if (demoName.usage) {
                        usage = demoName.usage;
                    } else {
                        window.elfGeneratorInstance.generateUltimateUsage(demoName);
                        usage = demoName.usage;
                    }
                    descriptionDisplay.textContent = usage;
                    
                    const demoContainer = document.querySelector('.demo-name-display');
                    if (demoContainer) {
                        demoContainer.style.opacity = '0.5';
                        setTimeout(() => {
                            demoContainer.style.opacity = '1';
                        }, 200);
                    }

                }
            } catch (error) {
                console.error('Demo name generation failed:', error);
                showNotification('Failed to generate demo name', 'error');
            }
        }
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
                handleError('Failed to copy link: ', err);
            });
        });
    }
    // 高级选项总开关功能
const advancedMasterToggle = document.getElementById('advanced-master-toggle');
const advancedStatus = document.getElementById('advanced-status');
const switchStatus = document.getElementById('switch-status');
const advancedOptionsWrapper = document.getElementById('advanced-options-wrapper');

if (advancedMasterToggle && advancedStatus && switchStatus && advancedOptionsWrapper) {
    // 初始状态
    let isAdvancedEnabled = false;
    
    advancedMasterToggle.addEventListener('change', function() {
        isAdvancedEnabled = this.checked;
        updateAdvancedOptionsState(isAdvancedEnabled);
    });
    
    function updateAdvancedOptionsState(enabled) {
        if (enabled) {
            // 启用高级选项
            advancedOptionsWrapper.classList.remove('disabled');
            advancedOptionsWrapper.classList.add('enabled');
            advancedStatus.textContent = 'Advanced Mode';
            advancedStatus.classList.add('advanced-mode');
            
            switchStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>Advanced options are enabled. Customize your name generation preferences.</span>';
            switchStatus.classList.add('enabled');
            
            // 应用默认的高级设置
            if (window.elfGeneratorInstance) {
                // 设置默认风格（如果有的话）
                const firstStyleOption = document.querySelector('.style-option');
                if (firstStyleOption) {
                    firstStyleOption.click(); // 触发默认风格选择
                }
                
                // 确保姓氏开关状态正确
                const surnameToggle = document.getElementById('surname-toggle');
                if (surnameToggle) {
                    window.elfGeneratorInstance.setSurnameEnabled(surnameToggle.checked);
                }
            }
            
            // 显示启用提示
            showNotification('Advanced options enabled! You can now customize styles and preferences.', 'success');
            
        } else {
            // 禁用高级选项
            advancedOptionsWrapper.classList.remove('enabled');
            advancedOptionsWrapper.classList.add('disabled');
            advancedStatus.textContent = 'Basic Mode';
            advancedStatus.classList.remove('advanced-mode');
            
            switchStatus.innerHTML = '<i class="fas fa-info-circle"></i><span>Advanced options are disabled. Toggle to enable custom settings.</span>';
            switchStatus.classList.remove('enabled');
            
            // 重置为基础设置
            if (window.elfGeneratorInstance) {
                window.elfGeneratorInstance.setStyle(null); // 重置风格
                window.elfGeneratorInstance.setMeaningPreference(''); // 重置含义偏好
                window.elfGeneratorInstance.setSurnameEnabled(false); // 改为false
            }
            
            // 重置UI状态
            document.querySelectorAll('.style-option').forEach(opt => opt.classList.remove('active'));
            document.querySelectorAll('.meaning-tag').forEach(tag => tag.classList.remove('active'));
            const anyMeaningTag = document.querySelector('.meaning-tag[data-meaning=""]');
            if (anyMeaningTag) anyMeaningTag.classList.add('active');
            
            showNotification('Switched to basic mode. Using default name generation settings.', 'info');
        }
    }
    
    // 修改现有的高级选项展开逻辑
    const originalCollapsibleHandler = collapsibleLegend.onclick;
    collapsibleLegend.addEventListener('click', function(e) {
        const isExpanded = advancedFieldset.classList.contains('expanded');
        
        if (isExpanded) {
            advancedFieldset.classList.remove('expanded');
            advancedContent.style.display = 'none';
        } else {
            advancedFieldset.classList.add('expanded');
            advancedContent.style.display = 'block';
            
            // 如果是第一次展开，显示提示
            if (!advancedMasterToggle.checked) {
                setTimeout(() => {
                    showNotification('Tip: Enable the master switch to activate advanced options!', 'info');
                }, 500);
            }
        }
    });
}
    const faqItems = document.querySelectorAll('.faq-item');
        
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 关闭其他已打开的FAQ项目
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前项目的状态
            item.classList.toggle('active');
        });
    });

    // 默认展开第一个FAQ项目
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }

    function initRaceSelector() {
        const raceTabs = document.querySelectorAll('.race-tab');
        const racePanels = document.querySelectorAll('.race-panel');
        
        if (raceTabs.length === 0 || racePanels.length === 0) return;
        
        raceTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetRace = this.getAttribute('data-race');
                
                // 移除所有活动状态
                raceTabs.forEach(t => t.classList.remove('active'));
                racePanels.forEach(p => {
                    p.classList.remove('active');
                    p.style.opacity = '0';
                    p.style.transform = 'translateY(20px)';
                });
                
                // 添加当前选中状态
                this.classList.add('active');
                
                // 延迟显示新面板，创建平滑过渡效果
                setTimeout(() => {
                    const targetPanel = document.getElementById(targetRace + '-panel');
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                        targetPanel.style.opacity = '1';
                        targetPanel.style.transform = 'translateY(0)';
                    }
                }, 150);
                
                // 添加点击反馈效果
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
        
               
            });
            
            // 添加键盘支持
            tab.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // 增强的种族面板切换动画
    function enhanceRacePanelAnimations() {
        const racePanels = document.querySelectorAll('.race-panel');
        
        racePanels.forEach(panel => {
            // 为每个面板添加过渡样式
            panel.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            panel.style.opacity = panel.classList.contains('active') ? '1' : '0';
            panel.style.transform = panel.classList.contains('active') ? 'translateY(0)' : 'translateY(20px)';
        });
    }
    
    // 种族选择器键盘导航
    function initRaceKeyboardNavigation() {
        const raceTabs = document.querySelectorAll('.race-tab');
        
        raceTabs.forEach((tab, index) => {
            tab.addEventListener('keydown', function(e) {
                let targetIndex;
                
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        targetIndex = index > 0 ? index - 1 : raceTabs.length - 1;
                        raceTabs[targetIndex].focus();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        targetIndex = index < raceTabs.length - 1 ? index + 1 : 0;
                        raceTabs[targetIndex].focus();
                        break;
                    case 'Home':
                        e.preventDefault();
                        raceTabs[0].focus();
                        break;
                    case 'End':
                        e.preventDefault();
                        raceTabs[raceTabs.length - 1].focus();
                        break;
                }
            });
        });
    }
    initRaceSelector();
    enhanceRacePanelAnimations();
    initRaceKeyboardNavigation();
     // 在现有事件监听器后添加（大约第265行之后）
     const demoGenerateBtn = document.querySelector('.demo-generate-btn');
     if (demoGenerateBtn) {
         demoGenerateBtn.addEventListener('click', function() {
             generateDemoName();
         });
     }
});
