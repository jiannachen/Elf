    // 风格配置系统
const styleConfigs = {
    // High Elf styles
    'noble': {
        weightAdjustments: { nature: 0.3, abstract: 0.7, darkConsonants: 0.1 },
        meaningTags: ['nobility', 'honor', 'grace', 'elegance', 'royal', 'dignity']
    },
    'scholarly': {
        weightAdjustments: { nature: 0.2, abstract: 0.8, darkConsonants: 0.1 },
        meaningTags: ['wisdom', 'knowledge', 'learning', 'ancient', 'lore', 'study']
    },
    'celestial': {
        weightAdjustments: { nature: 0.4, abstract: 0.6, darkConsonants: 0.0 },
        meaningTags: ['star', 'moon', 'light', 'celestial', 'divine', 'ethereal']
    },
    'arcane': {
        weightAdjustments: { nature: 0.3, abstract: 0.7, darkConsonants: 0.2 },
        meaningTags: ['magic', 'spell', 'enchant', 'mystical', 'power', 'arcane']
    },
    
    // Wood Elf styles
    'forest': {
        weightAdjustments: { nature: 0.9, abstract: 0.1, darkConsonants: 0.0 },
        meaningTags: ['tree', 'forest', 'grove', 'woodland', 'branch', 'root']
    },
    'hunter': {
        weightAdjustments: { nature: 0.6, abstract: 0.4, darkConsonants: 0.1 },
        meaningTags: ['swift', 'keen', 'arrow', 'track', 'hunt', 'precise']
    },
    'druidic': {
        weightAdjustments: { nature: 0.8, abstract: 0.2, darkConsonants: 0.0 },
        meaningTags: ['nature', 'growth', 'season', 'earth', 'wild', 'harmony']
    },
    'tribal': {
        weightAdjustments: { nature: 0.5, abstract: 0.5, darkConsonants: 0.1 },
        meaningTags: ['clan', 'ancestor', 'tradition', 'spirit', 'elder', 'heritage']
    },
    
    // Dark Elf styles
    'shadow': {
        weightAdjustments: { nature: 0.2, abstract: 0.8, darkConsonants: 0.8 },
        meaningTags: ['shadow', 'dark', 'stealth', 'hidden', 'night', 'silent']
    },
    'noble-dark': {
        weightAdjustments: { nature: 0.1, abstract: 0.9, darkConsonants: 0.6 },
        meaningTags: ['dark-noble', 'house', 'power', 'dominion', 'authority', 'command']
    },
    'spider': {
        weightAdjustments: { nature: 0.3, abstract: 0.7, darkConsonants: 0.9 },
        meaningTags: ['web', 'venom', 'spider', 'trap', 'cunning', 'deadly']
    },
    'exile': {
        weightAdjustments: { nature: 0.4, abstract: 0.6, darkConsonants: 0.5 },
        meaningTags: ['exile', 'outcast', 'lone', 'wandering', 'lost', 'seeking']
    },
    
    // Half Elf styles
    'balanced': {
        weightAdjustments: { nature: 0.5, abstract: 0.5, darkConsonants: 0.3 },
        meaningTags: ['balance', 'harmony', 'unity', 'peace', 'blend', 'merge']
    },
    'wanderer': {
        weightAdjustments: { nature: 0.6, abstract: 0.4, darkConsonants: 0.2 },
        meaningTags: ['journey', 'path', 'travel', 'explore', 'distant', 'roam']
    },
    'adaptive': {
        weightAdjustments: { nature: 0.4, abstract: 0.6, darkConsonants: 0.3 },
        meaningTags: ['change', 'flexible', 'adapt', 'versatile', 'fluid', 'transform']
    },
    'bridge': {
        weightAdjustments: { nature: 0.5, abstract: 0.5, darkConsonants: 0.2 },
        meaningTags: ['bridge', 'connect', 'link', 'between', 'unite', 'join']
    }
};

// 重构的语言学规则系统
class ElvishLinguistics {
    constructor() {
        // 音韵规则：基于托尔金语言学
        this.phoneticRules = {
            // 软化变音规则（Sindarin风格）
            softMutation: {
                'b': 'v', 'c': 'g', 'd': 'dh', 'g': '', 'm': 'v', 'p': 'b', 't': 'd'
            },
            // 鼻音变化规则
            nasalMutation: {
                'b': 'm', 'c': 'ng', 'd': 'n', 'g': 'ng', 'p': 'mh', 't': 'nh'
            },
            // 元音和谐规则
            vowelHarmony: {
                'high': ['i', 'e', 'y'],
                'mid': ['a', 'ae', 'ai'],
                'low': ['o', 'u', 'au']
            }
        };
        
        // 音节结构模式
        this.syllablePatterns = {
            'simple': ['CV', 'CVC'],           // 如: ma, mel
            'complex': ['CCV', 'CVCC'],       // 如: gla, mith
            'flowing': ['V', 'VC', 'VCV']     // 如: a, el, ara
        };
    }
    
    // 应用语音变化规则
    applyPhoneticRules(prefix, suffix, context = 'normal') {
        // 实现辅音接触时的音变
        const lastChar = prefix.slice(-1);
        const firstChar = suffix.charAt(0);
        
        if (this.phoneticRules.softMutation[firstChar] && 
            ['l', 'r', 'n'].includes(lastChar)) {
            return prefix + this.phoneticRules.softMutation[firstChar] + suffix.slice(1);
        }
        
        return prefix + suffix;
    }
}

class ElvishLexicon {
    constructor() {
        this.roots = {
            // Light/Sun themed roots (适合Blood Elf)
            light: [
                { text: 'Ael', meaning: 'light', syllables: 1, themes: ['light', 'divine'] },
                { text: 'Sil', meaning: 'silver light', syllables: 1, themes: ['light', 'moon'] },
                { text: 'Gil', meaning: 'star light', syllables: 1, themes: ['light', 'star'] },
                { text: 'Mith', meaning: 'grey light', syllables: 1, themes: ['light', 'dawn'] },
                { text: 'Ith', meaning: 'moon', syllables: 1, themes: ['light', 'moon'] },
                { text: 'Anor', meaning: 'sun', syllables: 2, themes: ['light', 'sun'] },
                { text: 'Eärendil', meaning: 'sea wanderer', syllables: 4, themes: ['light', 'sea', 'noble'] }
            ],
            
            // Nature themed roots (适合Wood Elf)
            nature: [
                { text: 'Gal', meaning: 'tree', syllables: 1, themes: ['nature', 'forest'] },
                { text: 'Las', meaning: 'leaf', syllables: 1, themes: ['nature', 'forest'] },
                { text: 'Nim', meaning: 'white flower', syllables: 1, themes: ['nature', 'flower'] },
                { text: 'Mal', meaning: 'gold', syllables: 1, themes: ['nature', 'precious'] },
                { text: 'Thran', meaning: 'vigorous', syllables: 1, themes: ['nature', 'strength'] },
                { text: 'Legolas', meaning: 'green leaves', syllables: 3, themes: ['nature', 'forest'] },
                { text: 'Tauriel', meaning: 'daughter of forest', syllables: 3, themes: ['nature', 'forest', 'female'] }
            ],
            
            // Shadow/Dark themed roots (适合Dark Elf)
            shadow: [
                { text: 'Mor', meaning: 'dark', syllables: 1, themes: ['shadow', 'night'] },
                { text: 'Dû', meaning: 'night', syllables: 1, themes: ['shadow', 'night'] },
                { text: 'Gorth', meaning: 'horror', syllables: 1, themes: ['shadow', 'fear'] },
                { text: 'Orch', meaning: 'orc', syllables: 1, themes: ['shadow', 'evil'] },
                { text: 'Ungol', meaning: 'spider', syllables: 2, themes: ['shadow', 'creature'] },
                { text: 'Nazgûl', meaning: 'ring wraith', syllables: 2, themes: ['shadow', 'undead'] }
            ],
            
            // Water/Sea themed roots
            water: [
                { text: 'Nen', meaning: 'water', syllables: 1, themes: ['water', 'river'] },
                { text: 'Aear', meaning: 'sea', syllables: 2, themes: ['water', 'sea'] },
                { text: 'Celorn', meaning: 'stream', syllables: 2, themes: ['water', 'river'] },
                { text: 'Nimrodel', meaning: 'lady of white grotto', syllables: 3, themes: ['water', 'cave', 'female'] }
            ],
            
            // Wind/Air themed roots
            wind: [
                { text: 'Sûl', meaning: 'wind', syllables: 1, themes: ['wind', 'air'] },
                { text: 'Gwaihir', meaning: 'wind lord', syllables: 2, themes: ['wind', 'noble'] },
                { text: 'Manwë', meaning: 'blessed one', syllables: 2, themes: ['wind', 'divine'] }
            ]
        };
        
        this.suffixes = {
            // Common elvish suffixes
            noble: [
                { text: 'iel', meaning: 'daughter', syllables: 1, gender: 'female' },
                { text: 'ion', meaning: 'son', syllables: 1, gender: 'male' },
                { text: 'wen', meaning: 'maiden', syllables: 1, gender: 'female' },
                { text: 'dir', meaning: 'man', syllables: 1, gender: 'male' },
                { text: 'eth', meaning: 'female name ending', syllables: 1, gender: 'female' },
                { text: 'orn', meaning: 'tree (masculine)', syllables: 1, gender: 'male' },
                { text: 'las', meaning: 'leaf collection', syllables: 1, gender: 'neutral' }
            ],
            
            // Short, melodic suffixes for names like "Faelynn"
            melodic: [
                { text: 'lynn', meaning: 'waterfall', syllables: 1, gender: 'female' },
                { text: 'wyn', meaning: 'fair', syllables: 1, gender: 'neutral' },
                { text: 'lin', meaning: 'song', syllables: 1, gender: 'neutral' },
                { text: 'rin', meaning: 'crowned lady', syllables: 1, gender: 'female' },
                { text: 'mir', meaning: 'jewel', syllables: 1, gender: 'neutral' },
                { text: 'ael', meaning: 'lake', syllables: 1, gender: 'neutral' }
            ]
        };
        
    }
    
    // Get roots by theme and syllable count
    getRootsByTheme(theme, maxSyllables = null) {
        const allRoots = Object.values(this.roots).flat();
        let filtered = allRoots.filter(root => root.themes.includes(theme));
        
        if (maxSyllables) {
            filtered = filtered.filter(root => root.syllables <= maxSyllables);
        }
        
        return filtered;
    }
    
    // Get suffixes by gender and syllable count
    getSuffixes(gender = 'neutral', maxSyllables = null) {
        const allSuffixes = Object.values(this.suffixes).flat();
        let filtered = allSuffixes.filter(suffix => 
            suffix.gender === gender || suffix.gender === 'neutral'
        );
        
        if (maxSyllables) {
            filtered = filtered.filter(suffix => suffix.syllables <= maxSyllables);
        }
        
        return filtered;
    }
    
    // Get surname components
    getSurnameComponents() {
          return this.libraries.surnameRules;
    }
}

// 智能音节控制和名字构建
class IntelligentNameBuilder {
    constructor(lexicon, linguistics) {
        this.lexicon = lexicon;
        this.linguistics = linguistics;
    }
    
 

    // 构建名字（不考虑音节限制）
    buildNameWithoutSyllableLimit(bloodline, gender) {
        const theme = this.getThemeByBloodline(bloodline);
        const prefixes = this.lexicon.getRootsByTheme(theme);
        const suffixes = this.lexicon.getSuffixes(gender);
        
        if (!prefixes || prefixes.length === 0 || !suffixes || suffixes.length === 0) {
            return {
                text: "Silverleaf",
                meaning: "Silver Leaf",
                syllables: 3,
                components: {}
            };
        }
        
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        
        return this.constructName(prefix, suffix);
    }

    // 计算音韵评分
    calculatePhoneticScore(prefix, suffix) {
        const prefixEnd = prefix.text.slice(-1).toLowerCase();
        const suffixStart = suffix.text.slice(0, 1).toLowerCase();
        
        // 避免相同辅音连续
        const consonants = 'bcdfghjklmnpqrstvwxyz';
        if (consonants.includes(prefixEnd) && consonants.includes(suffixStart)) {
            return 0.5; // 较低评分
        }
        
        return 1.0; // 默认评分
    }

    // 组合组件
    combineComponents(prefix, suffix) {
        if (!prefix || !prefix.text || !suffix || !suffix.text) {
            console.error('Invalid components passed to combineComponents:', { prefix, suffix });
            return "Unnamed";
        }
        
        let combined = prefix.text + suffix.text;
        
        // 简单的语音优化
        combined = combined.replace(/([aeiou])\1+/g, '$1'); // 去除重复元音
        
        return combined.charAt(0).toUpperCase() + combined.slice(1).toLowerCase();
    }
        
    // 构建名字并应用语音规则
    constructName(prefix, suffix) {
        const nameText = this.linguistics.applyPhoneticRules(
            prefix.text, 
            suffix.text
        );
        
        return {
            text: nameText,
            meaning: `${prefix.meaning} ${suffix.meaning}`,
            syllables: prefix.syllables + suffix.syllables,
            components: { prefix, suffix }
        };
    }
    
    getThemeByBloodline(bloodline) {
        const themeMap = {
            'highElf': 'light',
            'woodElf': 'nature', 
            'darkElf': 'shadow',
            'halfElf': Math.random() > 0.5 ? 'light' : 'nature'
        };
        return themeMap[bloodline] || 'light';
    }
}

class AdvancedElfNameGenerator {
    constructor() {
        // 添加新的系统组件
        this.lexicon = new ElvishLexicon();
        this.linguistics = new ElvishLinguistics();
            // 添加默认值常量
        this.DEFAULT_VALUES = {
          NAME: "Elara",
          MEANING: "Star Light", 
          SURNAME: "Silverleaf",
          SURNAME_MEANING: "Silver Leaf"
      };
        
        // 血统参数预设
        this.bloodlinePresets = {
            highElf: { natureRatio: 0.7, maleSuffixRatio: 0.3, darkConsonantRatio: 0.1 },
            woodElf: { natureRatio: 0.9, maleSuffixRatio: 0.1, darkConsonantRatio: 0.0 },
            darkElf: { natureRatio: 0.2, maleSuffixRatio: 0.5, darkConsonantRatio: 0.8 },
            halfElf: { natureRatio: 0.5, maleSuffixRatio: 0.4, darkConsonantRatio: 0.3 }
        };

        // 风格预设系统
        this.stylePresets = {
            classical_elegant: { 
                natureRatio: 0.8, 
                abstractRatio: 0.2, 
                preferredTags: ["celestial", "noble", "ancient"],
                description: "Classical Elegant"
            },
            natural_wild: { 
                natureRatio: 0.95, 
                abstractRatio: 0.05, 
                preferredTags: ["forest", "wild", "earth"],
                description: "Natural Wild"
            },
            mysterious_deep: { 
                natureRatio: 0.3, 
                abstractRatio: 0.7, 
                preferredTags: ["shadow", "mystery", "magic"],
                description: "Mysterious Deep"
            },
            heroic_warrior: { 
                natureRatio: 0.5, 
                abstractRatio: 0.5, 
                preferredTags: ["strength", "honor", "battle"],
                description: "Heroic Warrior"
            }
        };

        this.currentStyle = null;
        this.meaningPreference = null;

        // 语义化词库系统
        this.libraries = {
            // Natural element lexicon (prefixes)
            naturePrefixes: [
                { text: "Clan", meaning: "Moonlight", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["celestial", "gentle"] },
                { text: "Alm", meaning: "High Mountain", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["earth", "noble"] },
                { text: "Ioe", meaning: "Emerald", syllables: 2, bloodline: ["woodElf"], tags: ["forest", "precious"] },
                { text: "Imr", meaning: "Dewdrop", syllables: 1, bloodline: ["woodElf"], tags: ["water", "gentle"] },
                { text: "Ash", meaning: "Ashes", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["fire", "ancient"] },
                { text: "Sel", meaning: "Starlight", syllables: 1, bloodline: ["highElf"], tags: ["celestial", "light"] },
                { text: "Gyl", meaning: "Golden Radiance", syllables: 1, bloodline: ["highElf"], tags: ["light", "noble"] },
                { text: "Dar", meaning: "Oak Tree", syllables: 1, bloodline: ["woodElf"], tags: ["forest", "strength"] },
                { text: "Ayl", meaning: "Morning Breeze", syllables: 1, bloodline: ["woodElf", "halfElf"], tags: ["air", "gentle"] },
                { text: "Fae", meaning: "Magic", syllables: 1, bloodline: ["highElf"], tags: ["magic", "mystery"] },
                { text: "Lor", meaning: "Golden", syllables: 1, bloodline: ["highElf"], tags: ["precious", "noble"] },
                { text: "Nim", meaning: "White", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["pure", "light"] },
                { text: "Thal", meaning: "Forest", syllables: 1, bloodline: ["woodElf"], tags: ["forest", "wild"] },
                { text: "Cele", meaning: "Silver Radiance", syllables: 2, bloodline: ["highElf"], tags: ["celestial", "noble"] },
                { text: "Mith", meaning: "Gray", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["ancient", "wisdom"] },
                { text: "Luin", meaning: "Blue River", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["water", "flow"] },
                { text: "Aer", meaning: "Ocean Sky", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["air", "vast"] },
                { text: "Lith", meaning: "Dust Sand", syllables: 1, bloodline: ["woodElf", "darkElf"], tags: ["earth", "ancient"] },
                { text: "Sol", meaning: "Sun", syllables: 1, bloodline: ["highElf"], tags: ["light", "power"] },
                { text: "Taur", meaning: "Great Forest", syllables: 1, bloodline: ["woodElf"], tags: ["forest", "vast"] },
                { text: "Eryn", meaning: "Woodland", syllables: 2, bloodline: ["woodElf"], tags: ["forest", "home"] },
                { text: "Gael", meaning: "Gentle Breeze", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["air", "gentle"] }
            ],
        
            // Abstract concept lexicon (prefixes)
            abstractPrefixes: [
                { text: "Vyr", meaning: "Void", syllables: 1, bloodline: ["darkElf", "halfElf"], tags: ["shadow", "mystery"] },
                { text: "Syl", meaning: "Shadow", syllables: 1, bloodline: ["darkElf"], tags: ["shadow", "stealth"] },
                { text: "Quel", meaning: "Ancient", syllables: 1, bloodline: ["highElf", "darkElf"], tags: ["ancient", "wisdom"] },
                { text: "Dras", meaning: "Dragonborn", syllables: 1, bloodline: ["darkElf"], tags: ["power", "fire"] },
                { text: "Xan", meaning: "Chaos", syllables: 1, bloodline: ["darkElf"], tags: ["chaos", "wild"] },
                { text: "Phae", meaning: "Fate", syllables: 1, bloodline: ["highElf", "darkElf"], tags: ["destiny", "mystery"] },
                { text: "Zor", meaning: "Pain", syllables: 1, bloodline: ["darkElf"], tags: ["battle", "strength"] },
                { text: "Vael", meaning: "Fallen", syllables: 1, bloodline: ["darkElf", "halfElf"], tags: ["sorrow", "honor"] },
                { text: "Riv", meaning: "Wisdom", syllables: 1, bloodline: ["highElf"], tags: ["wisdom", "ancient"] },
                { text: "Elen", meaning: "Stars", syllables: 2, bloodline: ["highElf"], tags: ["celestial", "destiny"] },
                { text: "Val", meaning: "Power Divine", syllables: 1, bloodline: ["highElf"], tags: ["power", "divine"] },
                { text: "Myr", meaning: "Mystery", syllables: 1, bloodline: ["highElf", "darkElf"], tags: ["mystery", "magic"] },
                { text: "Tyr", meaning: "Justice Order", syllables: 1, bloodline: ["highElf"], tags: ["justice", "honor"] },
                { text: "Sor", meaning: "Sorrow", syllables: 1, bloodline: ["darkElf", "halfElf"], tags: ["sorrow", "deep"] },
                { text: "Nor", meaning: "Knowledge Legend", syllables: 1, bloodline: ["highElf"], tags: ["wisdom", "legend"] },
                { text: "Dae", meaning: "Artistry Creation", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["art", "creation"] },
                { text: "Ryn", meaning: "Memory", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["memory", "ancient"] },
                { text: "Kael", meaning: "Hatred Vengeance", syllables: 1, bloodline: ["darkElf"], tags: ["battle", "strength"] }
            ],
        
            // Infix connection library
            infixes: [
                { text: "a", syllables: 1 },
                { text: "e", syllables: 1 },
                { text: "i", syllables: 1 },
                { text: "y", syllables: 1 },
                { text: "ae", syllables: 1 },
                { text: "ie", syllables: 1 },
                { text: "ar", syllables: 1 },
                { text: "en", syllables: 1 },
                { text: "el", syllables: 1 },
                { text: "yr", syllables: 1 },
                { text: "th", syllables: 1 },
                { text: "nn", syllables: 1 },
                { text: "ia", syllables: 1 },
                { text: "ua", syllables: 1 },
                { text: "il", syllables: 1 },
                { text: "on", syllables: 1 }
            ],
        
            // Suffix system (gender-based)
            suffixes: {
                female: [
                    { text: "ire", meaning: "Flower of", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["gentle", "nature"] },
                    { text: "ara", meaning: "Light of", syllables: 2, bloodline: ["highElf"], tags: ["light", "noble"] },
                    { text: "ena", meaning: "Daughter of", syllables: 2, bloodline: ["highElf", "woodElf"], tags: ["family", "honor"] },
                    { text: "yll", meaning: "Leaf of", syllables: 1, bloodline: ["woodElf"], tags: ["nature", "gentle"] },
                    { text: "ryn", meaning: "Water of", syllables: 1, bloodline: ["woodElf", "halfElf"], tags: ["water", "flow"] },
                    { text: "dria", meaning: "Stars", syllables: 2, bloodline: ["highElf"], tags: ["celestial", "destiny"] },
                    { text: "phine", meaning: "Leaf of", syllables: 2, bloodline: ["woodElf"], tags: ["nature", "delicate"] },
                    { text: "wynn", meaning: "Blessing", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["blessing", "divine"] },
                    { text: "ssa", meaning: "Shadow of", syllables: 1, bloodline: ["darkElf"], tags: ["shadow", "mystery"] },
                    { text: "nelis", meaning: "Song of", syllables: 2, bloodline: ["highElf"], tags: ["art", "beauty"] },
                    { text: "elle", meaning: "Grace", syllables: 2, bloodline: ["highElf"], tags: ["grace", "noble"] },
                    { text: "eth", meaning: "Wisdom", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["wisdom", "ancient"] },
                    { text: "iana", meaning: "Daughter of the Moon", syllables: 3, bloodline: ["highElf"], tags: ["celestial", "noble"] },
                    { text: "lya", meaning: "Whisper", syllables: 1, bloodline: ["woodElf"], tags: ["gentle", "mystery"] },
                    { text: "nara", meaning: "Flame Passion", syllables: 2, bloodline: ["darkElf", "halfElf"], tags: ["fire", "passion"] },
                    { text: "syl", meaning: "Daughter of the Forest", syllables: 1, bloodline: ["woodElf"], tags: ["forest", "family"] }
                ],
                male: [
                    { text: "ios", meaning: "Son of", syllables: 1, bloodline: ["highElf"], tags: ["family", "honor"] },
                    { text: "en", meaning: "Stone of", syllables: 1, bloodline: ["woodElf"], tags: ["strength", "earth"] },
                    { text: "or", meaning: "Blade of", syllables: 1, bloodline: ["darkElf"], tags: ["battle", "strength"] },
                    { text: "as", meaning: "Eagle of", syllables: 1, bloodline: ["highElf"], tags: ["noble", "freedom"] },
                    { text: "ir", meaning: "Fire of", syllables: 1, bloodline: ["darkElf", "halfElf"], tags: ["fire", "power"] },
                    { text: "ric", meaning: "King", syllables: 1, bloodline: ["highElf"], tags: ["noble", "power"] },
                    { text: "drin", meaning: "Guardian", syllables: 1, bloodline: ["woodElf"], tags: ["protection", "honor"] },
                    { text: "thas", meaning: "Scholar", syllables: 1, bloodline: ["highElf"], tags: ["wisdom", "knowledge"] },
                    { text: "vain", meaning: "Blood of", syllables: 1, bloodline: ["darkElf"], tags: ["family", "strength"] },
                    { text: "mir", meaning: "Gemstone", syllables: 1, bloodline: ["highElf"], tags: ["precious", "beauty"] },
                    { text: "ion", meaning: "Noble Descendant", syllables: 1, bloodline: ["highElf"], tags: ["noble", "family"] },
                    { text: "ael", meaning: "Radiance", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["light", "divine"] },
                    { text: "dur", meaning: "Steadfast", syllables: 1, bloodline: ["woodElf", "darkElf"], tags: ["strength", "honor"] },
                    { text: "mar", meaning: "Glory", syllables: 1, bloodline: ["highElf"], tags: ["honor", "victory"] },
                    { text: "nil", meaning: "Void Profound", syllables: 1, bloodline: ["darkElf"], tags: ["mystery", "deep"] },
                    { text: "rond", meaning: "Sanctuary Dome", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["protection", "home"] }
                ],
                neutral: [
                    { text: "an", meaning: "Land of", syllables: 1, bloodline: ["woodElf"], tags: ["earth", "home"] },
                    { text: "is", meaning: "Spirit of", syllables: 1, bloodline: ["darkElf"], tags: ["spirit", "mystery"] },
                    { text: "ys", meaning: "Mist of", syllables: 1, bloodline: ["highElf", "darkElf"], tags: ["mystery", "ethereal"] },
                    { text: "ar", meaning: "Sun of", syllables: 1, bloodline: ["highElf"], tags: ["light", "power"] },
                    { text: "in", meaning: "Wind of", syllables: 1, bloodline: ["woodElf"], tags: ["air", "freedom"] },
                    { text: "al", meaning: "Essence Belonging", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["essence", "belonging"] },
                    { text: "en", meaning: "Ancient From", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["ancient", "origin"] },
                    { text: "ith", meaning: "Path Passage", syllables: 1, bloodline: ["woodElf", "darkElf"], tags: ["journey", "path"] },
                    { text: "oril", meaning: "Crystal Light", syllables: 2, bloodline: ["highElf"], tags: ["light", "precious"] }
                ]
            },
        

          // Surname generation rules (扩展版本)
          surnameRules: {
              prefix: [
                  // 原有的前缀
                  { text: "Mag", meaning: "Moon", syllables: 1, bloodline: ["highElf"], tags: ["celestial"] },
                  { text: "Wys", meaning: "Forest", syllables: 1, bloodline: ["woodElf"], tags: ["forest"] },
                  { text: "Ol", meaning: "River", syllables: 1, bloodline: ["woodElf"], tags: ["water"] },
                  { text: "Bry", meaning: "Rock", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["earth"] },
                  { text: "Rey", meaning: "Sun", syllables: 1, bloodline: ["highElf"], tags: ["light"] },
                  { text: "Sha", meaning: "Shadow", syllables: 1, bloodline: ["darkElf"], tags: ["shadow"] },
                  { text: "Faf", meaning: "Flame", syllables: 1, bloodline: ["darkElf"], tags: ["fire"] },
                  { text: "Er", meaning: "Ancient", syllables: 1, bloodline: ["highElf"], tags: ["ancient"] },
                  { text: "Rav", meaning: "Raven", syllables: 1, bloodline: ["darkElf"], tags: ["dark"] },
                  { text: "Vir", meaning: "Poison", syllables: 1, bloodline: ["darkElf"], tags: ["danger"] },
                  { text: "Sil", meaning: "Silver", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["precious"] },
                  { text: "Lor", meaning: "Gold Dream", syllables: 1, bloodline: ["highElf"], tags: ["precious"] },
                  { text: "Tyr", meaning: "Watch", syllables: 1, bloodline: ["highElf"], tags: ["vigilance"] },
                  { text: "Fen", meaning: "Swamp Border", syllables: 1, bloodline: ["woodElf", "darkElf"], tags: ["wild"] },
                  { text: "Val", meaning: "Prosperity", syllables: 1, bloodline: ["highElf"], tags: ["prosperity"] },
                  { text: "Nigh", meaning: "Night", syllables: 1, bloodline: ["darkElf", "woodElf"], tags: ["night"] },
                  { text: "Star", meaning: "Star", syllables: 1, bloodline: ["highElf"], tags: ["celestial"] },
                  { text: "Oak", meaning: "Oak", syllables: 1, bloodline: ["woodElf"], tags: ["forest"] },
                  { text: "Moon", meaning: "Moon", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["celestial"] },
                  { text: "Dusk", meaning: "Dusk", syllables: 1, bloodline: ["darkElf", "halfElf"], tags: ["twilight"] },
                  
                  // 从 surnameRoots 整合的高质量前缀
                  { text: "Gil", meaning: "Star", syllables: 1, bloodline: ["highElf"], tags: ["celestial", "light"] },
                  { text: "Gal", meaning: "Light", syllables: 1, bloodline: ["highElf"], tags: ["light", "divine"] },
                  { text: "Mith", meaning: "Grey", syllables: 1, bloodline: ["highElf"], tags: ["wisdom", "ancient"] },
                  { text: "Taur", meaning: "Forest", syllables: 1, bloodline: ["woodElf"], tags: ["nature", "forest"] },
                  { text: "Eryn", meaning: "Wood", syllables: 2, bloodline: ["woodElf"], tags: ["forest", "wild"] },
                  { text: "Dol", meaning: "Dark", syllables: 1, bloodline: ["darkElf"], tags: ["shadow", "mystery"] },
                  { text: "Mor", meaning: "Black", syllables: 1, bloodline: ["darkElf"], tags: ["darkness", "power"] },
                  { text: "Wind", meaning: "Wind", syllables: 1, bloodline: ["woodElf", "halfElf"], tags: ["air", "movement"] },
                  { text: "Dawn", meaning: "Dawn", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["time", "light"] },
                  { text: "River", meaning: "River", syllables: 2, bloodline: ["woodElf", "halfElf"], tags: ["water", "flow"] }
              ],
              suffix: [
                  // 原有的后缀
                  { text: "ven", meaning: "Family", syllables: 1, bloodline: ["highElf"], tags: ["family"] },
                  { text: "anel", meaning: "Watcher", syllables: 2, bloodline: ["highElf"], tags: ["vigilance"] },
                  { text: "aran", meaning: "Descendant", syllables: 2, bloodline: ["woodElf"], tags: ["family"] },
                  { text: "ris", meaning: "Clan", syllables: 1, bloodline: ["woodElf"], tags: ["family"] },
                  { text: "neiros", meaning: "Temple", syllables: 3, bloodline: ["highElf"], tags: ["sacred"] },
                  { text: "wenys", meaning: "Woodland", syllables: 2, bloodline: ["woodElf"], tags: ["forest"] },
                  { text: "fir", meaning: "Embers", syllables: 1, bloodline: ["darkElf"], tags: ["fire"] },
                  { text: "phine", meaning: "Leaf Veins", syllables: 2, bloodline: ["woodElf"], tags: ["nature"] },
                  { text: "awynn", meaning: "Oath", syllables: 2, bloodline: ["highElf"], tags: ["honor"] },
                  { text: "ran", meaning: "Bloodline", syllables: 1, bloodline: ["darkElf"], tags: ["family"] },
                  { text: "fall", meaning: "Waterfall Fall", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["water"] },
                  { text: "gleam", meaning: "Glimmer", syllables: 1, bloodline: ["highElf"], tags: ["light"] },
                  { text: "wood", meaning: "Forest", syllables: 1, bloodline: ["woodElf"], tags: ["forest"] },
                  { text: "brook", meaning: "Stream", syllables: 1, bloodline: ["woodElf", "halfElf"], tags: ["water"] },
                  { text: "blade", meaning: "Blade", syllables: 1, bloodline: ["darkElf", "highElf"], tags: ["battle"] },
                  { text: "song", meaning: "Song", syllables: 1, bloodline: ["highElf", "woodElf"], tags: ["art"] },
                  { text: "rider", meaning: "Traveler Rider", syllables: 2, bloodline: ["woodElf", "halfElf"], tags: ["journey"] },
                  { text: "shade", meaning: "Shadow Shelter", syllables: 1, bloodline: ["darkElf", "woodElf"], tags: ["shadow"] },
                  { text: "fire", meaning: "Flame", syllables: 1, bloodline: ["highElf", "darkElf"], tags: ["fire"] },
                  { text: "arrow", meaning: "Arrow", syllables: 2, bloodline: ["woodElf"], tags: ["battle"] },
                  
                  // 从 surnameRoots 整合的高质量后缀
                  { text: "ion", meaning: "Son of", syllables: 1, bloodline: ["highElf"], tags: ["family", "lineage"] },
                  { text: "iel", meaning: "Daughter of", syllables: 1, bloodline: ["highElf"], tags: ["family", "grace"] },
                  { text: "dir", meaning: "Lord", syllables: 1, bloodline: ["highElf"], tags: ["noble", "leadership"] },
                  { text: "wen", meaning: "Maiden", syllables: 1, bloodline: ["highElf"], tags: ["grace", "beauty"] },
                  { text: "thil", meaning: "Point", syllables: 1, bloodline: ["highElf"], tags: ["sharp", "high"] },
                  { text: "leaf", meaning: "Leaf", syllables: 1, bloodline: ["woodElf"], tags: ["nature", "growth"] },
                  { text: "branch", meaning: "Branch", syllables: 1, bloodline: ["woodElf"], tags: ["nature", "strength"] },
                  { text: "root", meaning: "Root", syllables: 1, bloodline: ["woodElf"], tags: ["nature", "foundation"] },
                  { text: "bow", meaning: "Bow", syllables: 1, bloodline: ["woodElf"], tags: ["weapon", "hunt"] },
                  { text: "wind", meaning: "Wind", syllables: 1, bloodline: ["woodElf", "halfElf"], tags: ["air", "freedom"] },
                  { text: "gûl", meaning: "Wraith", syllables: 1, bloodline: ["darkElf"], tags: ["shadow", "fear"] },
                  { text: "dûr", meaning: "Secret", syllables: 1, bloodline: ["darkElf"], tags: ["mystery", "hidden"] },
                  { text: "star", meaning: "Star", syllables: 1, bloodline: ["halfElf"], tags: ["celestial", "hope"] },
                  { text: "bridge", meaning: "Bridge", syllables: 1, bloodline: ["halfElf"], tags: ["connection", "unity"] },
                  { text: "haven", meaning: "Haven", syllables: 2, bloodline: ["halfElf"], tags: ["safety", "peace"] },
                  { text: "heart", meaning: "Heart", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["emotion", "core"] },
                  { text: "keeper", meaning: "Keeper", syllables: 2, bloodline: ["highElf", "woodElf"], tags: ["guardian", "protection"] },
                  { text: "born", meaning: "Born", syllables: 1, bloodline: ["highElf", "halfElf"], tags: ["origin", "birth"] }
              ]
          }

        };

        // 默认配置
        this.config = {
            bloodline: "highElf",
            gender: "female",
            style: "classical_elegant",
            meaningPreference: [],
            includeSurname: false,
            difficulty: "medium",
            allowDarkConsonants: true
        };
        this.setBloodline(this.config.bloodline);
    }

 

      /**
       * 构建复合姓氏（从 IntelligentNameBuilder 移过来的）
       */
      _buildCompoundSurname(theme) {
        const surnameComponents = this.libraries.surnameRules; // 改为使用 surnameRules
        const prefixes = surnameComponents.prefix.filter(item => 
            item.tags && item.tags.includes(theme)
        );
        const suffixes = surnameComponents.suffix;
        
        if (!prefixes || prefixes.length === 0 || !suffixes || suffixes.length === 0) {
            return {
                text: this.DEFAULT_VALUES.SURNAME,
                meaning: this.DEFAULT_VALUES.SURNAME_MEANING,
                syllables: 3
            };
        }
        
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        
        return {
            text: prefix.text + suffix.text,
            meaning: `${prefix.meaning} ${suffix.meaning}`,
            syllables: prefix.syllables + suffix.syllables,
            components: { prefix, suffix }
        };
      }

          /**
         * 构建名字（替代原来的 buildNameWithoutSyllableLimit）
         */
        _buildFirstName(bloodline, gender) {
        const theme = this.getThemeByBloodline(bloodline);
        
        // 直接获取前缀，不使用 _getPrefixesByTheme 方法
        const allPrefixes = [
            ...this.libraries.naturePrefixes,
            ...this.libraries.abstractPrefixes
        ];
        
        // 根据血统过滤前缀
        let prefixes = allPrefixes.filter(prefix => 
            prefix.bloodline && prefix.bloodline.includes(bloodline)
        );
        
        // 如果没有匹配的前缀，使用所有前缀
        if (prefixes.length === 0) {
            prefixes = allPrefixes;
        }
        
        const suffixes = this.libraries.suffixes[gender] || this.libraries.suffixes.neutral;
        
        if (!prefixes || prefixes.length === 0 || !suffixes || suffixes.length === 0) {
            return {
                text: this.DEFAULT_VALUES.NAME,
                meaning: this.DEFAULT_VALUES.MEANING,
                syllables: 3,
                components: {}
            };
        }
        
        const prefix = this._randomChoice(prefixes);
        const suffix = this._randomChoice(suffixes);
        const infix = this._randomChoice(this.libraries.infixes);
        
        return {
            text: prefix.text + infix.text + suffix.text,
            meaning: `${prefix.meaning} ${suffix.meaning}`,
            syllables: prefix.syllables + suffix.syllables + infix.syllables,
            components: { prefix, suffix, infix }
        };
         }


    /**
     * 设置姓氏生成开关
     */
    setSurnameEnabled(enabled) {
        this.config.includeSurname = enabled;
        return this;
    }

    /**
     * 获取姓氏开关状态
     */
    isSurnameEnabled() {
        return this.config.includeSurname;
    }

    /**
     * 便捷方法：生成多个名字
     */
    generateMultiple(count = 5) {
        const names = [];
        for (let i = 0; i < count; i++) {
            names.push(this.generate());
        }
        return names;
    }

    /**
     * 设置风格
     */
    setStyle(style) {
        if (styleConfigs[style]) {
            this.currentStyle = style;
            const config = styleConfigs[style];
            if (config.weightAdjustments) {
                Object.assign(this.config, config.weightAdjustments);
            }
            console.log(`Style set to: ${style}`);
        } else {
            console.warn(`Style "${style}" not found. Using default.`);
            this.currentStyle = 'default';
        }
        return this;
    }

    /**
     * 设置含义偏好
     */
    setMeaningPreference(preference) {
        this.meaningPreference = preference;
        console.log(`Meaning preference set to: ${preference}`);
        return this;
    }

    /**
     * 获取可用的含义标签
     */
    getAvailableMeaningTags(style) {
        const styleConfig = styleConfigs[style];
        return styleConfig ? styleConfig.meaningTags : [];
    }

    /**
     * 设置血统类型
     */
    setBloodline(bloodline) {
        if (this.bloodlinePresets[bloodline]) {
            this.config.bloodline = bloodline;
            Object.assign(this.config, this.bloodlinePresets[bloodline]);
        } else {
            console.warn(`未找到血统预设: ${bloodline}. 将使用当前配置。`);
        }
        return this;
    }

    /**
     * 设置性别
     */
    setGender(gender) {
        this.config.gender = ["male", "female", "neutral"].includes(gender) ? gender : "female";
        return this;
    }

    /**
     * 获取推荐风格
     */
    getRecommendedStyles(bloodline) {
        const recommendations = {
            highElf: ["classical_elegant", "mysterious_deep"],
            woodElf: ["natural_wild", "classical_elegant"],
            darkElf: ["mysterious_deep", "heroic_warrior"],
            halfElf: ["heroic_warrior", "classical_elegant"]
        };
        return recommendations[bloodline] || [];
    }

    /**
     * 核心生成方法
     */
    generate() {
        const { bloodline, gender, includeSurname } = this.config;
        
       
        
        const firstName = this._buildFirstName(
            bloodline, 
            gender
        );
        
        let result = {
            name: firstName.text,
            meaning: firstName.meaning,
            syllables: firstName.syllables,
            bloodline,
            gender,
            components: firstName.components
        };
        
        // 根据开关决定是否生成姓氏
        if (includeSurname) {
          const theme = this.getThemeByBloodline(bloodline);
          const surname = this._buildCompoundSurname(theme); // 直接调用自己的方法
            
            result.name = `${firstName.text} ${surname.text}`;
            result.meaning = `${firstName.meaning}, ${surname.meaning}`;
            result.syllables = firstName.syllables + surname.syllables;
            result.surname = surname;
        }
        
        return result;
    }

    /**
     * 根据血统获取主题
     */
    getThemeByBloodline(bloodline) {
        const themeMap = {
            'highElf': 'light',
            'woodElf': 'nature', 
            'darkElf': 'shadow',
            'halfElf': Math.random() > 0.5 ? 'light' : 'nature'
        };
        return themeMap[bloodline] || 'light';
    }

    /**
     * 构建名字部分
     */
    _buildNamePart(prefix, suffixPool, bloodline) {
        if (!prefix || typeof prefix.text !== 'string' || typeof prefix.meaning !== 'string') {
            console.warn(`_buildNamePart 接收到无效的前缀对象。血统: ${bloodline}. 返回默认名字部分。`);
            return { text: "Elara", meaning: "Star Maiden", components: {} }; 
        }

        // 按血统过滤后缀
        let filteredSuffixes = suffixPool.filter(item => item.bloodline.includes(bloodline));
        
        // 根据含义偏好过滤后缀
        if (this.config.meaningPreference.length > 0) {
            const preferredSuffixes = filteredSuffixes.filter(item => 
                item.tags && item.tags.some(tag => this.config.meaningPreference.includes(tag))
            );
            if (preferredSuffixes.length > 0) {
                filteredSuffixes = preferredSuffixes;
            }
        }
        
        if (filteredSuffixes.length === 0) {
            const infixForDefault = this._randomChoice(this.libraries.infixes);
            return { 
                text: prefix.text + (infixForDefault ? infixForDefault.text : 'a') + "ia", 
                meaning: prefix.meaning + " Light", 
                components: { prefix, infix: infixForDefault } 
            };
        }

        const suffix = this._randomChoice(filteredSuffixes);
        const infix = this._randomChoice(this.libraries.infixes); 

        if (!suffix || typeof suffix.text !== 'string' || !infix || typeof infix.text !== 'string') {
            console.error("_buildNamePart 中选择的后缀或中缀无效。返回基于前缀的默认值。");
            return { 
                text: prefix.text + "ia", 
                meaning: prefix.meaning + " Radiance", 
                components: {prefix} 
            };
        }
        
        let nameText = prefix.text + infix.text + suffix.text;
        // 避免连续三个辅音
        if (/([^aeiou]{3})/.test(nameText)) {
            nameText = nameText.replace(/([^aeiou])([^aeiou])([^aeiou])/, "$1a$3");
        }

        return {
            text: nameText,
            meaning: `${prefix.meaning}${infix.text === "ie" ? " " : " "}${suffix.meaning}`,
            components: { prefix, infix, suffix }
        };
    }

    /**
     * 构建姓氏
     */
    _buildSurname(bloodline) {
        const { prefix, suffix } = this.libraries.surnameRules;
        let filteredPrefixes = prefix.filter(item => item.bloodline.includes(bloodline));
        let filteredSuffixes = suffix.filter(item => item.bloodline.includes(bloodline));

        // 根据含义偏好过滤姓氏组件
        if (this.config.meaningPreference.length > 0) {
            const preferredPrefixes = filteredPrefixes.filter(item => 
                item.tags && item.tags.some(tag => this.config.meaningPreference.includes(tag))
            );
            const preferredSuffixes = filteredSuffixes.filter(item => 
                item.tags && item.tags.some(tag => this.config.meaningPreference.includes(tag))
            );
            
            if (preferredPrefixes.length > 0) filteredPrefixes = preferredPrefixes;
            if (preferredSuffixes.length > 0) filteredSuffixes = preferredSuffixes;
        }

        if (filteredPrefixes.length === 0 || filteredSuffixes.length === 0) {
            console.warn(`无法为血统 ${bloodline} 构建姓氏，因为其姓氏前缀或后缀列表为空。返回默认姓氏。`);
            return { text: "Stonehand", meaning: "Stone Hand", syllables: 2 };
        }

        

        const selectedPrefix = this._randomChoice(filteredPrefixes);
        const selectedSuffix = this._randomChoice(filteredSuffixes);
        
        let surnameText = selectedPrefix.text + selectedSuffix.text;
        if (Math.random() < 0.1) {
            surnameText = this._applyPhoneticVariation(surnameText, bloodline);
        }
        const surnameMeaning = `${selectedPrefix.meaning} ${selectedSuffix.meaning}`;
        const currentSyllables = selectedPrefix.syllables + selectedSuffix.syllables;

        return {
            text: surnameText,
            meaning: surnameMeaning,
            syllables: currentSyllables
        };        
    }

    // 新增音韵变体方法
    _applyPhoneticVariation(text, bloodline) {
      const variations = {
          highElf: {
              'a': ['á', 'â'], 'e': ['ë', 'é'], 'i': ['í', 'î'], 
              'o': ['ó', 'ô'], 'u': ['ú', 'û']
          },
          woodElf: {
              'th': 'dh', 'ph': 'f', 'ch': 'sh'
          },
          darkElf: {
              'r': 'rr', 's': 'ss', 'z': 'zz'
          },
          halfElf: {
              // 混合变体，随机选择上述任一种
          }
      };
      
      const bloodlineVariations = variations[bloodline] || {};
      let result = text;
      
      for (const [from, to] of Object.entries(bloodlineVariations)) {
          if (Math.random() < 0.3) { // 30%概率应用变体
              if (Array.isArray(to)) {
                  result = result.replace(new RegExp(from, 'g'), to[Math.floor(Math.random() * to.length)]);
              } else {
                  result = result.replace(new RegExp(from, 'g'), to);
              }
          }
      }
      
      return result;
    }

    /**
     * 注入暗辅音以增加神秘感
     */
    _injectDarkConsonants(name) {
        const darkConsonants = ["x", "z", "q", "v", "ph"];
        const positions = [];
        
        // 找到元音后跟辅音的位置
        for (let i = 0; i < name.length - 1; i++) {
            if (/[aeiou]/.test(name[i]) && /[^aeiou]/.test(name[i + 1])) {
                positions.push(i + 1);
            }
        }

        if (positions.length > 0) {
            const pos = positions[Math.floor(Math.random() * positions.length)];
            const consonant = darkConsonants[Math.floor(Math.random() * darkConsonants.length)];
            return name.substring(0, pos) + consonant + name.substring(pos + 1);
        }
        return name;
    }

    /**
     * 从数组中随机选择一个元素
     */
    _randomChoice(array) {
        if (!array || array.length === 0) {
            return undefined; 
        }
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * 提取名字组件的标签
     */
    _extractTags(firstNameObj, surnameObj) {
        const tags = [];
        
        if (firstNameObj && firstNameObj.components) {
            if (firstNameObj.components.prefix && firstNameObj.components.prefix.tags) {
                tags.push(...firstNameObj.components.prefix.tags);
            }
            if (firstNameObj.components.suffix && firstNameObj.components.suffix.tags) {
                tags.push(...firstNameObj.components.suffix.tags);
            }
        }
        
        return [...new Set(tags)]; // 去重
    } /**
    * 批量生成名字
    */
   generateBatch(count = 9) {
       const collectedNameObjects = [];
       const usedFullNames = new Set();
       const usedFirstNames = new Set();
       const usedLastNames = new Set();
       
       let attempts = 0;
       const maxAttempts = count * 15 + 30;

       while (collectedNameObjects.length < count && attempts < maxAttempts) {
           const nameObj = this.generate(); 
           attempts++;

           if (!nameObj || typeof nameObj.name !== 'string' || nameObj.name.trim() === "") {
               console.warn("generateBatch: generate() returned invalid object or empty name string.");
               continue; 
           }

           const fullNameString = nameObj.name;
           const nameParts = fullNameString.split(' ');
           
           const firstName = nameParts[0] || ""; 
           const lastName = nameParts.slice(1).join(' ') || "";

           // 检查所有唯一性条件
           if (!usedFullNames.has(fullNameString)) {
               
               collectedNameObjects.push(nameObj);
               usedFullNames.add(fullNameString);
               if (firstName !== "") usedFirstNames.add(firstName);
               if (lastName !== "") usedLastNames.add(lastName);
           }
       }

       if (collectedNameObjects.length < count) {
           console.warn(`generateBatch: 最终只生成了 ${collectedNameObjects.length} 个符合所有唯一性条件的名字 (请求了 ${count} 个)，尝试次数: ${attempts}`);
       }
       return collectedNameObjects;
   }

   /**
    * 获取可用的风格列表
    */
   getAvailableStyles() {
       return Object.keys(this.stylePresets).map(key => ({
           value: key,
           label: this.stylePresets[key].description,
           tags: this.stylePresets[key].preferredTags
       }));
   }

   /**
    * 获取可用的含义标签
    */
   getAvailableTags() {
       const allTags = new Set();
       
       // 从词库中收集标签
       Object.values(this.lexicon.roots).flat().forEach(item => {
           if (item.themes) item.themes.forEach(tag => allTags.add(tag));
       });
       
       Object.values(this.lexicon.suffixes).flat().forEach(item => {
           if (item.themes) item.themes.forEach(tag => allTags.add(tag));
       });
       
       return Array.from(allTags).sort();
   }
}


// Ultimate Usage Generator - Fusion optimized intelligent name description system
class UltimateUsageGenerator {
    constructor() {
        // Streamlined feature matrix - minimized data structure
        this.featureMatrix = {
            // Lineage trait mapping
            lineage: {
                noble: { 
                    traits: ['noble', 'elegant', 'majestic'], 
                    roles: ['aristocrat', 'lord', 'court mage'], 
                    abilities: ['leadership', 'charisma', 'diplomacy'] 
                },
                exile: { 
                    traits: ['resilient', 'independent', 'mysterious'], 
                    roles: ['wanderer', 'hermit', 'avenger'], 
                    abilities: ['survival', 'stealth', 'adaptation'] 
                },
                wanderer: { 
                    traits: ['free-spirited', 'curious', 'brave'], 
                    roles: ['explorer', 'ranger', 'bard'], 
                    abilities: ['exploration', 'social skills', 'adventure'] 
                },
                balanced: { 
                    traits: ['balanced', 'wise', 'harmonious'], 
                    roles: ['scholar', 'mediator', 'guardian'], 
                    abilities: ['insight', 'balance', 'healing'] 
                },
                scholarly: { 
                    traits: ['learned', 'rational', 'focused'], 
                    roles: ['scholar', 'researcher', 'librarian'], 
                    abilities: ['research', 'memory', 'analysis'] 
                },
                celestial: { 
                    traits: ['divine', 'pure', 'radiant'], 
                    roles: ['cleric', 'angel', 'light bearer'], 
                    abilities: ['healing', 'purification', 'prophecy'] 
                }
            },
            
            // Semantic feature mapping
            semantic: {
                light: { essence: 'radiance', power: 'illumination', domain: 'celestial realm' },
                nature: { essence: 'wilderness', power: 'growth', domain: 'ancient forest' },
                shadow: { essence: 'darkness', power: 'concealment', domain: 'shadow realm' },
                fire: { essence: 'flame', power: 'burning', domain: 'elemental forge' },
                water: { essence: 'flow', power: 'purification', domain: 'endless ocean' },
                moon: { essence: 'lunar energy', power: 'transformation', domain: 'night sky' },
                star: { essence: 'starlight', power: 'guidance', domain: 'cosmic void' },
                wind: { essence: 'breeze', power: 'freedom', domain: 'sky realm' },
                earth: { essence: 'stone', power: 'stability', domain: 'mountain peaks' }
            },
            
            // Phonetic feature mapping
            phonetic: {
                melodic: 'melodiously beautiful',
                strong: 'powerfully resonant',
                mystical: 'mysteriously enchanting',
                gentle: 'gently flowing',
                ancient: 'anciently profound',
                ethereal: 'ethereally graceful'
            }
        };
        
        // Dynamic template pool - composable description fragments
       this.templatePool = {
            archetype: [
                '{name}, a {phonetic} name, is destined for the role of {role}',
                'Bearer of the name {name}, {phonetic} in nature, is fated to become {role}',
                'The {phonetic} name {name} foretells the destiny of {role}'
            ],
            traits: [
                'Possessing a {trait1} and {trait2} nature, gifted with exceptional talents',
                'Known for being {trait1}, while embodying {trait2} qualities',
                'Combining the dual essence of {trait1} and {trait2} characteristics'
            ],
            abilities: [
                'Master of {ability1} arts, excelling in {ability2} skills',
                'Naturally gifted in {ability1}, with superior {ability2} capabilities',
                'Wielding the mysteries of {ability1}, outstanding in {ability2} techniques'
            ],
            background: [
                'Legend speaks of origins from the depths of {domain}, carrying the power of {essence}',
                'Said to have mystical connections to {domain}, able to harness the force of {essence}',
                'Ancient magic of {domain} flows through their bloodline, with {essence} as their power source'
            ],
            destiny: [
                'Destiny guides them to {power} all things, writing legends within {domain}',
                'Fated to use the ability of {power} to protect the harmony of {domain}',
                'Will create miracles in {domain} through the force of {power}'
            ]
        };
        // Deduplication mechanism - feature fingerprint cache
        this.usedFingerprints = new Set();
        this.templateUsage = new Map();
    }
    
    // Intelligent feature extraction
    extractFeatures(nameObj) {
        const { name, meaning, lineage, components, gender} = nameObj;
        
        // Lineage features
        const lineageFeatures = this.featureMatrix.lineage[lineage] || this.featureMatrix.lineage.balanced;
        
        // Semantic feature extraction
        const meaningLower = (meaning || '').toLowerCase();
        let semanticFeatures = null;
        
        for (const [key, features] of Object.entries(this.featureMatrix.semantic)) {
            if (meaningLower.includes(key) || meaningLower.includes(features.essence)) {
                semanticFeatures = features;
                break;
            }
        }
        let componentTags = [];
        if (components) {
            if (components.prefix && components.prefix.tags) {
                componentTags.push(...components.prefix.tags);
            }
            if (components.suffix && components.suffix.tags) {
                componentTags.push(...components.suffix.tags);
            }
            if (components.infix && components.infix.tags) {
                componentTags.push(...components.infix.tags);
            }
        }
        // Default semantic features
        if (!semanticFeatures) {
            const semanticKeys = Object.keys(this.featureMatrix.semantic);
            const randomKey = semanticKeys[Math.floor(Math.random() * semanticKeys.length)];
            semanticFeatures = this.featureMatrix.semantic[randomKey];
        }
        
        // Phonetic feature analysis
        const phoneticFeature = this.analyzePhonetics(name);
        
        return {
            lineage: lineageFeatures,
            semantic: semanticFeatures,
            phonetic: phoneticFeature,
            name: name,
            gender: gender || 'neutral',
            componentTags: [...new Set(componentTags)]
        };
    }
    
    // Phonetic feature analysis
    analyzePhonetics(name) {
        const vowels = (name.match(/[aeiouAEIOU]/g) || []).length;
        const consonants = name.length - vowels;
        const hasFlow = /[lrn]/i.test(name);
        const hasStrong = /[kgtpb]/i.test(name);
        
        if (vowels > consonants && hasFlow) return this.featureMatrix.phonetic.melodic;
        if (hasStrong && consonants > vowels) return this.featureMatrix.phonetic.strong;
        if (name.length > 6) return this.featureMatrix.phonetic.mystical;
        if (hasFlow) return this.featureMatrix.phonetic.gentle;
        if (/th|ph|ch/i.test(name)) return this.featureMatrix.phonetic.ancient;
        return this.featureMatrix.phonetic.ethereal;
    }
    
    // Generate feature fingerprint (for deduplication)
    generateFingerprint(features) {
        return `${features.lineage.traits[0]}-${features.semantic.essence}-${features.phonetic.slice(0, 2)}`;
    }
    
    // Intelligent template selection (avoid repetition)
    selectTemplate(templateType, fingerprint) {
        const templates = this.templatePool[templateType];
        const usageKey = `${templateType}-${fingerprint}`;
        
        let usedIndices = this.templateUsage.get(usageKey) || [];
        
        // Reset usage record if all templates have been used
        if (usedIndices.length >= templates.length) {
            usedIndices = [];
        }
        
        // Select unused template
        let availableIndices = templates.map((_, i) => i).filter(i => !usedIndices.includes(i));
        const selectedIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        
        // Update usage record
        usedIndices.push(selectedIndex);
        this.templateUsage.set(usageKey, usedIndices);
        
        return templates[selectedIndex];
    }
    
    // Dynamic variable replacement
    replaceVariables(template, features) {
        const genderPronouns = {
            male: { he: 'he', his: 'his', him: 'him' },
            female: { he: 'she', his: 'her', him: 'her' },
            neutral: { he: 'they', his: 'their', him: 'them' }
        };
        const pronouns = genderPronouns[features.gender] || genderPronouns.neutral;
        return template
        .replace('{name}', features.name)
        .replace('{phonetic}', features.phonetic)
        .replace('{role}', this.randomChoice(features.lineage.roles))
        .replace('{trait1}', this.randomChoice(features.lineage.traits))
        .replace('{trait2}', this.randomChoice(features.lineage.traits.filter(t => t !== features.lineage.traits[0])))
        .replace('{ability1}', this.randomChoice(features.lineage.abilities))
        .replace('{ability2}', this.randomChoice(features.lineage.abilities.filter(a => a !== features.lineage.abilities[0])))
        .replace('{essence}', features.semantic.essence)
        .replace('{power}', features.semantic.power)
        .replace('{domain}', features.semantic.domain)
        .replace('{he}', pronouns.he)
        .replace('{his}', pronouns.his)
        .replace('{him}', pronouns.him);
}
    
    // Random choice helper function
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Main generation function
    generate(nameObj) {
        // Feature extraction
        const features = this.extractFeatures(nameObj);
        
        // Generate feature fingerprint
        const fingerprint = this.generateFingerprint(features);
        
        // Check if need to force generate new description (avoid complete repetition)
        let attempts = 0;
        let finalFingerprint = fingerprint;
        
        while (this.usedFingerprints.has(finalFingerprint) && attempts < 3) {
            // Slightly adjust features to generate new fingerprint
            const altFeatures = { ...features };
            altFeatures.lineage = { ...features.lineage };
            altFeatures.lineage.traits = [...features.lineage.traits].sort(() => Math.random() - 0.5);
            finalFingerprint = this.generateFingerprint(altFeatures);
            attempts++;
        }
        
        // Record used fingerprint
        this.usedFingerprints.add(finalFingerprint);
        
        // Generate each part of description
        const archetype = this.replaceVariables(
            this.selectTemplate('archetype', finalFingerprint), features
        );
        
        const traits = this.replaceVariables(
            this.selectTemplate('traits', finalFingerprint), features
        );
        
        const abilities = this.replaceVariables(
            this.selectTemplate('abilities', finalFingerprint), features
        );
        
        const background = this.replaceVariables(
            this.selectTemplate('background', finalFingerprint), features
        );
        
        const destiny = this.replaceVariables(
            this.selectTemplate('destiny', finalFingerprint), features
        );
        
        // Combine final description
        return {
            archetype: archetype,
            personality: traits,
            abilities: abilities,
            background: background,
            destiny: destiny,
            summary: `${archetype}. ${traits}, ${abilities}. ${background}, ${destiny}.`
        };
    }
    
    // Clear cache (optional feature)
    clearCache() {
        this.usedFingerprints.clear();
        this.templateUsage.clear();
    }
}

// 创建全局实例
window.elfGeneratorInstance = new AdvancedElfNameGenerator();

// Create global intelligent description generator instance
const ultimateUsageGenerator = new UltimateUsageGenerator();
// 延迟初始化函数
function initializeUltimateUsage() {
    if (window.elfGeneratorInstance && !window.elfGeneratorInstance.generateUltimateUsage) {
        // Add intelligent description generation method
        window.elfGeneratorInstance.generateUltimateUsage = function(nameObj) {
            return ultimateUsageGenerator.generate(nameObj);
        };
        
        // Override generate method to automatically add intelligent descriptions
        const originalGenerate = window.elfGeneratorInstance.generate;
        window.elfGeneratorInstance.generate = function() {
            const nameObj = originalGenerate.call(this);
            if (nameObj) {
                nameObj.usage = ultimateUsageGenerator.generate(nameObj);
            }
            return nameObj;
        };
        
        // Override generateBatch method
        const originalGenerateBatch = window.elfGeneratorInstance.generateBatch;
        window.elfGeneratorInstance.generateBatch = function(count) {
            const nameObjects = originalGenerateBatch.call(this, count);
            return nameObjects.map(nameObj => {
                if (nameObj) {
                    nameObj.usage = ultimateUsageGenerator.generate(nameObj);
                }
                return nameObj;
            });
        };
        
        // Add cache clearing method
        window.elfGeneratorInstance.clearUsageCache = function() {
            ultimateUsageGenerator.clearCache();
        };
        
        console.log('UltimateUsageGenerator initialized successfully');
    }
}

// 立即尝试初始化
initializeUltimateUsage();



if (window.elfGeneratorInstance) {
    // Add intelligent description generation method
    window.elfGeneratorInstance.generateUltimateUsage = function(nameObj) {
        const usageObj = ultimateUsageGenerator.generate(nameObj);
        return usageObj.summary;
    };
    
    // Override generate method to automatically add intelligent descriptions
    const originalGenerate = window.elfGeneratorInstance.generate;
    window.elfGeneratorInstance.generate = function() {
        const nameObj = originalGenerate.call(this);
        if (nameObj) {
            const usageObj = ultimateUsageGenerator.generate(nameObj);
            nameObj.usage = usageObj.summary;
        }
        return nameObj;
    };
    
    // Override generateBatch method
    const originalGenerateBatch = window.elfGeneratorInstance.generateBatch;
    window.elfGeneratorInstance.generateBatch = function(count) {
        const nameObjects = originalGenerateBatch.call(this, count);
        return nameObjects.map(nameObj => {
            if (nameObj) {
                const usageObj = ultimateUsageGenerator.generate(nameObj);
                nameObj.usage = usageObj.summary;
            }
            return nameObj;
        });
    };
}

// ... existing code ...

/**
* 获取随机名字的便捷函数
*/
function getRandomNames(gender, count, options = {}) {
   const names = [];
   if (!elfGeneratorInstance) {
       console.error("elfGeneratorInstance is not initialized!");
       return ["ErrorInGenerator"]; 
   }
   try {
       // 应用配置选项
       elfGeneratorInstance.setGender(gender);
       
       if (options.style) {
           elfGeneratorInstance.setStyle(options.style);
       }
       
       if (options.meaningPreference) {
           elfGeneratorInstance.setMeaningPreference(options.meaningPreference);
       }
       
       const nameObjects = elfGeneratorInstance.generateBatch(count);
       
       nameObjects.forEach(nameObj => {
           if (nameObj && typeof nameObj.name === 'string') {
               names.push(nameObj.name);
           } else {
               console.warn("getRandomNames: Received invalid name object from generateBatch:", nameObj);
               names.push("InvalidNameGen"); 
           }
       });
       console.log(`getRandomNames: 为性别 ${gender} 生成了 ${names.length} 个名字:`, names);
   } catch (error) {
       console.error("Error in getRandomNames:", error);
       names.push("ErrorGeneratingName"); 
   }
   return names; 
}

/**
* 获取详细名字信息的函数
*/
function getDetailedNames(gender, count, options = {}) {
   if (!elfGeneratorInstance) {
       console.error("elfGeneratorInstance is not initialized!");
       return []; 
   }
   try {
       // 应用配置选项
       elfGeneratorInstance.setGender(gender);
       
       if (options.style) {
           elfGeneratorInstance.setStyle(options.style);
       }
       
       if (options.meaningPreference) {
           elfGeneratorInstance.setMeaningPreference(options.meaningPreference);
       }
       
       return elfGeneratorInstance.generateBatch(count);
   } catch (error) {
       console.error("Error in getDetailedNames:", error);
       return [];
   }
}