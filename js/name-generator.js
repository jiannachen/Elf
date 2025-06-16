// ... existing code ...
class AdvancedElfNameGenerator {

    constructor() {
      // 1. 血统参数预设
      this.bloodlinePresets = {
        highElf: { natureRatio: 0.7, maleSuffixRatio: 0.3, darkConsonantRatio: 0.1 },
        woodElf: { natureRatio: 0.9, maleSuffixRatio: 0.1, darkConsonantRatio: 0.0 },
        darkElf: { natureRatio: 0.2, maleSuffixRatio: 0.5, darkConsonantRatio: 0.8 },
        halfElf: { natureRatio: 0.5, maleSuffixRatio: 0.4, darkConsonantRatio: 0.3 }
      };
  
      // 2. 语义化词库系统
      this.libraries = {
        // Natural element lexicon (prefixes)
        naturePrefixes: [
          { text: "Clan", meaning: "Moonlight", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Alm", meaning: "High Mountain", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Ioe", meaning: "Emerald", syllables: 2, bloodline: ["woodElf"] },
          { text: "Imr", meaning: "Dewdrop", syllables: 1, bloodline: ["woodElf"] },
          { text: "Ash", meaning: "Ashes", syllables: 1, bloodline: ["highElf", "halfElf"] },
          { text: "Sel", meaning: "Starlight", syllables: 1, bloodline: ["highElf"] },
          { text: "Gyl", meaning: "Golden Radiance", syllables: 1, bloodline: ["highElf"] },
          { text: "Dar", meaning: "Oak Tree", syllables: 1, bloodline: ["woodElf"] },
          { text: "Ayl", meaning: "Morning Breeze", syllables: 1, bloodline: ["woodElf", "halfElf"] },
          { text: "Fae", meaning: "Magic", syllables: 1, bloodline: ["highElf"] },
          { text: "Lor", meaning: "Golden", syllables: 1, bloodline: ["highElf"] },
          { text: "Nim", meaning: "White", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Thal", meaning: "Forest", syllables: 1, bloodline: ["woodElf"] },
          { text: "Cele", meaning: "Silver Radiance", syllables: 2, bloodline: ["highElf"] },
          { text: "Mith", meaning: "Gray", syllables: 1, bloodline: ["highElf", "halfElf"] },
          { text: "Luin", meaning: "Blue/River", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Aer", meaning: "Ocean/Sky", syllables: 1, bloodline: ["highElf", "halfElf"] },
          { text: "Lith", meaning: "Dust/Sand", syllables: 1, bloodline: ["woodElf", "darkElf"] },
          { text: "Sol", meaning: "Sun", syllables: 1, bloodline: ["highElf"] },
          { text: "Fuin", meaning: "Night/Shadow", syllables: 1, bloodline: ["darkElf", "woodElf"] },
          { text: "Taur", meaning: "Great Forest", syllables: 1, bloodline: ["woodElf"] },
          { text: "Eryn", meaning: "Woodland", syllables: 2, bloodline: ["woodElf"] },
          { text: "Gael", meaning: "Gentle Breeze", syllables: 1, bloodline: ["highElf", "woodElf"] }
        ],
      
        // Abstract concept lexicon (prefixes)
        abstractPrefixes: [
          { text: "Vyr", meaning: "Void", syllables: 1, bloodline: ["darkElf", "halfElf"] },
          { text: "Syl", meaning: "Shadow", syllables: 1, bloodline: ["darkElf"] },
          { text: "Quel", meaning: "Ancient", syllables: 1, bloodline: ["highElf", "darkElf"] },
          { text: "Dras", meaning: "Dragonborn", syllables: 1, bloodline: ["darkElf"] },
          { text: "Xan", meaning: "Chaos", syllables: 1, bloodline: ["darkElf"] },
          { text: "Phae", meaning: "Fate", syllables: 1, bloodline: ["highElf", "darkElf"] },
          { text: "Zor", meaning: "Pain", syllables: 1, bloodline: ["darkElf"] },
          { text: "Vael", meaning: "Fallen", syllables: 1, bloodline: ["darkElf", "halfElf"] },
          { text: "Riv", meaning: "Wisdom", syllables: 1, bloodline: ["highElf"] },
          { text: "Elen", meaning: "Stars", syllables: 2, bloodline: ["highElf"] },
          { text: "Val", meaning: "Power/Divine", syllables: 1, bloodline: ["highElf"] },
          { text: "Myr", meaning: "Mystery", syllables: 1, bloodline: ["highElf", "darkElf"] },
          { text: "Tyr", meaning: "Justice/Order", syllables: 1, bloodline: ["highElf"] },
          { text: "Sor", meaning: "Sorrow", syllables: 1, bloodline: ["darkElf", "halfElf"] },
          { text: "Nor", meaning: "Knowledge/Legend", syllables: 1, bloodline: ["highElf"] },
          { text: "Dae", meaning: "Artistry/Creation", syllables: 1, bloodline: ["highElf", "halfElf"] },
          { text: "Ryn", meaning: "Memory", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Kael", meaning: "Hatred/Vengeance", syllables: 1, bloodline: ["darkElf"] }
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
            { text: "ire", meaning: "Flower of", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "ara", meaning: "Light of", syllables: 2, bloodline: ["highElf"] },
            { text: "ena", meaning: "Daughter of", syllables: 2, bloodline: ["highElf", "woodElf"] },
            { text: "yll", meaning: "Leaf of", syllables: 1, bloodline: ["woodElf"] },
            { text: "ryn", meaning: "Water of", syllables: 1, bloodline: ["woodElf", "halfElf"] },
            { text: "dria", meaning: "Stars", syllables: 2, bloodline: ["highElf"] },
            { text: "phine", meaning: "Leaf of", syllables: 2, bloodline: ["woodElf"] },
            { text: "wynn", meaning: "Blessing", syllables: 1, bloodline: ["highElf", "halfElf"] },
            { text: "ssa", meaning: "Shadow of", syllables: 1, bloodline: ["darkElf"] },
            { text: "nelis", meaning: "Song of", syllables: 2, bloodline: ["highElf"] },
            { text: "elle", meaning: "Grace", syllables: 2, bloodline: ["highElf"] },
            { text: "eth", meaning: "Wisdom", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "iana", meaning: "Daughter of the Moon", syllables: 3, bloodline: ["highElf"] },
            { text: "lya", meaning: "Whisper", syllables: 1, bloodline: ["woodElf"] },
            { text: "nara", meaning: "Flame/Passion", syllables: 2, bloodline: ["darkElf", "halfElf"] },
            { text: "syl", meaning: "Daughter of the Forest", syllables: 1, bloodline: ["woodElf"] }
          ],
          male: [
            { text: "ios", meaning: "Son of", syllables: 1, bloodline: ["highElf"] },
            { text: "en", meaning: "Stone of", syllables: 1, bloodline: ["woodElf"] },
            { text: "or", meaning: "Blade of", syllables: 1, bloodline: ["darkElf"] },
            { text: "as", meaning: "Eagle of", syllables: 1, bloodline: ["highElf"] },
            { text: "ir", meaning: "Fire of", syllables: 1, bloodline: ["darkElf", "halfElf"] },
            { text: "ric", meaning: "King", syllables: 1, bloodline: ["highElf"] },
            { text: "drin", meaning: "Guardian", syllables: 1, bloodline: ["woodElf"] },
            { text: "thas", meaning: "Scholar", syllables: 1, bloodline: ["highElf"] },
            { text: "vain", meaning: "Blood of", syllables: 1, bloodline: ["darkElf"] },
            { text: "mir", meaning: "Gemstone", syllables: 1, bloodline: ["highElf"] },
            { text: "ion", meaning: "Noble/Descendant", syllables: 1, bloodline: ["highElf"] },
            { text: "ael", meaning: "Radiance", syllables: 1, bloodline: ["highElf", "halfElf"] },
            { text: "dur", meaning: "Steadfast", syllables: 1, bloodline: ["woodElf", "darkElf"] },
            { text: "mar", meaning: "Glory", syllables: 1, bloodline: ["highElf"] },
            { text: "nil", meaning: "Void/Profound", syllables: 1, bloodline: ["darkElf"] },
            { text: "rond", meaning: "Sanctuary/Dome", syllables: 1, bloodline: ["highElf", "woodElf"] }
          ],
          neutral: [
            { text: "an", meaning: "Land of", syllables: 1, bloodline: ["woodElf"] },
            { text: "is", meaning: "Spirit of", syllables: 1, bloodline: ["darkElf"] },
            { text: "ys", meaning: "Mist of", syllables: 1, bloodline: ["highElf", "darkElf"] },
            { text: "ar", meaning: "Sun of", syllables: 1, bloodline: ["highElf"] },
            { text: "in", meaning: "Wind of", syllables: 1, bloodline: ["woodElf"] },
            { text: "al", meaning: "Essence/Belonging", syllables: 1, bloodline: ["highElf", "halfElf"] },
            { text: "en", meaning: "Ancient/From", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "ith", meaning: "Path/Passage", syllables: 1, bloodline: ["woodElf", "darkElf"] },
            { text: "oril", meaning: "Crystal/Light", syllables: 2, bloodline: ["highElf"] }
          ]
        },
      
        // Surname generation rules
        surnameRules: {
          prefix: [
            { text: "Mag", meaning: "Moon", syllables: 1, bloodline: ["highElf"] },
            { text: "Wys", meaning: "Forest", syllables: 1, bloodline: ["woodElf"] },
            { text: "Ol", meaning: "River", syllables: 1, bloodline: ["woodElf"] },
            { text: "Bry", meaning: "Rock", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "Rey", meaning: "Sun", syllables: 1, bloodline: ["highElf"] },
            { text: "Sha", meaning: "Shadow", syllables: 1, bloodline: ["darkElf"] },
            { text: "Faf", meaning: "Flame", syllables: 1, bloodline: ["darkElf"] },
            { text: "Er", meaning: "Ancient", syllables: 1, bloodline: ["highElf"] },
            { text: "Rav", meaning: "Raven", syllables: 1, bloodline: ["darkElf"] },
            { text: "Vir", meaning: "Poison", syllables: 1, bloodline: ["darkElf"] },
            { text: "Sil", meaning: "Silver", syllables: 1, bloodline: ["highElf", "halfElf"] },
            { text: "Lor", meaning: "Gold/Dream", syllables: 1, bloodline: ["highElf"] },
            { text: "Tyr", meaning: "Watch", syllables: 1, bloodline: ["highElf"] },
            { text: "Fen", meaning: "Swamp/Border", syllables: 1, bloodline: ["woodElf", "darkElf"] },
            { text: "Val", meaning: "Prosperity", syllables: 1, bloodline: ["highElf"] },
            { text: "Nigh", meaning: "Night", syllables: 1, bloodline: ["darkElf", "woodElf"] },
            { text: "Star", meaning: "Star", syllables: 1, bloodline: ["highElf"] },
            { text: "Oak", meaning: "Oak", syllables: 1, bloodline: ["woodElf"] },
            { text: "Moon", meaning: "Moon", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "Dusk", meaning: "Dusk", syllables: 1, bloodline: ["darkElf", "halfElf"] }
          ],
          suffix: [
            { text: "ven", meaning: "Family", syllables: 1, bloodline: ["highElf"] },
            { text: "anel", meaning: "Watcher", syllables: 2, bloodline: ["highElf"] },
            { text: "aran", meaning: "Descendant", syllables: 2, bloodline: ["woodElf"] },
            { text: "ris", meaning: "Clan", syllables: 1, bloodline: ["woodElf"] },
            { text: "neiros", meaning: "Temple", syllables: 3, bloodline: ["highElf"] },
            { text: "wenys", meaning: "Woodland", syllables: 2, bloodline: ["woodElf"] },
            { text: "fir", meaning: "Embers", syllables: 1, bloodline: ["darkElf"] },
            { text: "phine", meaning: "Leaf Veins", syllables: 2, bloodline: ["woodElf"] },
            { text: "awynn", meaning: "Oath", syllables: 2, bloodline: ["highElf"] },
            { text: "ran", meaning: "Bloodline", syllables: 1, bloodline: ["darkElf"] },
            { text: "fall", meaning: "Waterfall/Fall", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "gleam", meaning: "Glimmer", syllables: 1, bloodline: ["highElf"] },
            { text: "wood", meaning: "Forest", syllables: 1, bloodline: ["woodElf"] },
            { text: "brook", meaning: "Stream", syllables: 1, bloodline: ["woodElf", "halfElf"] },
            { text: "blade", meaning: "Blade", syllables: 1, bloodline: ["darkElf", "highElf"] },
            { text: "song", meaning: "Song", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "rider", meaning: "Traveler/Rider", syllables: 2, bloodline: ["woodElf", "halfElf"] },
            { text: "shade", meaning: "Shadow/Shelter", syllables: 1, bloodline: ["darkElf", "woodElf"] },
            { text: "fire", meaning: "Flame", syllables: 1, bloodline: ["highElf", "darkElf"] },
            { text: "arrow", meaning: "Arrow", syllables: 2, bloodline: ["woodElf"] }
          ]
        }
      };

      // 3. 默认配置
      this.config = {
        bloodline: "highElf",
        gender: "female",
        minSyllables: 3,
        maxSyllables: 5,
        allowDarkConsonants: true
      };
      this.setBloodline(this.config.bloodline);
    }
  
    setBloodline(bloodline) {
      if (this.bloodlinePresets[bloodline]) {
        this.config.bloodline = bloodline;
        Object.assign(this.config, this.bloodlinePresets[bloodline]);
      } else {
        console.warn(`未找到血统预设: ${bloodline}. 将使用当前配置。`);
      }
      return this;
    }
  
    setGender(gender) {
      this.config.gender = ["male", "female", "neutral"].includes(gender) ? gender : "female";
      return this;
    }
  
    generate() {
      const { bloodline, gender, natureRatio, darkConsonantRatio } = this.config;
  
      const formatNamePart = (namePartStr) => {
          if (!namePartStr || typeof namePartStr !== 'string' || namePartStr.length === 0) {
              return "";
          }
          const lowercasedPart = namePartStr.toLowerCase();
          return lowercasedPart.charAt(0).toUpperCase() + lowercasedPart.slice(1);
      };
  
      const useNature = Math.random() < natureRatio;
      let prefixPoolSource = useNature ? this.libraries.naturePrefixes : this.libraries.abstractPrefixes;
      const prefixPool = prefixPoolSource.filter(item => item.bloodline.includes(bloodline));
  
      if (prefixPool.length === 0) {
        console.warn(`血统 ${bloodline} 的前缀词库为空 (nature: ${useNature})。返回默认名字。`);
        const defaultFormattedFirstName = formatNamePart("Defaultfirst");
        const defaultFormattedSurname = formatNamePart("Defaultsurname");
        return { 
          name: `${defaultFormattedFirstName} ${defaultFormattedSurname}`, 
          meaning: "默认含义", 
          syllables: this._countSyllables(`${defaultFormattedFirstName} ${defaultFormattedSurname}`), 
          structure: {
            firstName: { text: defaultFormattedFirstName, meaning: "默认名" },
            surname: { text: defaultFormattedSurname, meaning: "默认姓" }
          },
          meta: { bloodline, gender, isNatureName: useNature, error: "Empty prefix pool" } 
        };
      }
  
      const firstNameObj = this._buildNamePart(
        this._randomChoice(prefixPool), 
        this.libraries.suffixes[gender] || this.libraries.suffixes.neutral,
        bloodline
      );
  
      const baseSyllablesForSurname = (firstNameObj && typeof firstNameObj.text === 'string') ? this._countSyllables(firstNameObj.text) : 2;
      const surnameTargetSyllables = baseSyllablesForSurname + 1;
      const surnameObj = this._buildSurname(
        surnameTargetSyllables,
        bloodline
      );
  
      let rawFirstNameText = (firstNameObj && typeof firstNameObj.text === 'string') ? firstNameObj.text : "DefaultFirst";
      let rawSurnameText = (surnameObj && typeof surnameObj.text === 'string') ? surnameObj.text : "DefaultLast";
  
      let tempFullName = `${rawFirstNameText} ${rawSurnameText}`;
  
      if (this.config.allowDarkConsonants && Math.random() < darkConsonantRatio) {
        tempFullName = this._injectDarkConsonants(tempFullName);
      }
  
      const namePartsArray = tempFullName.split(' ');
      
      let finalFirstNameText;
      let finalSurnameText;
  
      if (namePartsArray.length === 0) { 
          finalFirstNameText = formatNamePart("Defaultfirst");
          finalSurnameText = formatNamePart("Defaultlast");
      } else if (namePartsArray.length === 1) { 
          const isRawFirstNameMeaningful = rawFirstNameText && rawFirstNameText !== "DefaultFirst" && rawFirstNameText.length > 0;
          const isRawSurnameMeaningful = rawSurnameText && rawSurnameText !== "DefaultLast" && rawSurnameText.length > 0;
  
          if (isRawFirstNameMeaningful && !isRawSurnameMeaningful) {
              finalFirstNameText = formatNamePart(namePartsArray[0]);
              finalSurnameText = formatNamePart(rawSurnameText === "DefaultLast" ? "Defaultlast" : "");
          } else if (!isRawFirstNameMeaningful && isRawSurnameMeaningful) {
              finalFirstNameText = formatNamePart(rawFirstNameText === "DefaultFirst" ? "Defaultfirst" : "");
              finalSurnameText = formatNamePart(namePartsArray[0]);
          } else { 
              finalFirstNameText = formatNamePart(namePartsArray[0]);
              finalSurnameText = formatNamePart(rawSurnameText === "DefaultLast" ? "Defaultlast" : rawSurnameText);
          }
      } else { 
          finalFirstNameText = formatNamePart(namePartsArray[0]);
          finalSurnameText = formatNamePart(namePartsArray.slice(1).join(' '));
      }
  
      const fullName = `${finalFirstNameText} ${finalSurnameText}`.replace(/\s+/g, ' ').trim(); 
  
      const finalFirstNameObj = firstNameObj || { meaning: "默认名", components: {} };
      finalFirstNameObj.text = finalFirstNameText;
  
      const finalSurnameObj = surnameObj || { meaning: "默认姓", components: {} };
      finalSurnameObj.text = finalSurnameText;
  
      return {
        name: fullName,
        meaning: `${finalFirstNameObj.meaning || '名'}·${finalSurnameObj.meaning || '姓'}`,
        syllables: this._countSyllables(fullName),
        structure: {
          firstName: finalFirstNameObj,
          surname: finalSurnameObj
        },
        meta: {
          bloodline,
          gender,
          isNatureName: useNature
        }
      };
    }
    
    _buildNamePart(prefix, suffixPool, bloodline) {
      if (!prefix || typeof prefix.text !== 'string' || typeof prefix.meaning !== 'string') {
        console.warn(`_buildNamePart 接收到无效的前缀对象。血统: ${bloodline}. 返回默认名字部分。`);
        return { text: "Elara", meaning: "星辰之女", components: {} }; 
      }

      const filteredSuffixes = suffixPool.filter(item => item.bloodline.includes(bloodline));
      if (filteredSuffixes.length === 0) {
        console.warn(`_buildNamePart 中血统 ${bloodline} (性别: ${this.config.gender}) 的后缀列表为空。使用默认后缀。`);
        const infixForDefault = this._randomChoice(this.libraries.infixes);
        return { 
            text: prefix.text + (infixForDefault ? infixForDefault.text : 'a') + "ia", 
            meaning: prefix.meaning + "之光", 
            components: { prefix, infix: infixForDefault } 
        };
      }

      const suffix = this._randomChoice(filteredSuffixes);
      const infix = this._randomChoice(this.libraries.infixes); 

      if (!suffix || typeof suffix.text !== 'string' || !infix || typeof infix.text !== 'string') {
          console.error("_buildNamePart 中选择的后缀或中缀无效。返回基于前缀的默认值。");
          return { 
            text: prefix.text + "ia", 
            meaning: prefix.meaning + "之辉", 
            components: {prefix} 
          };
      }
      let nameText = prefix.text + infix.text + suffix.text;
      if (/([^aeiou]{3})/.test(nameText)) {
        nameText = nameText.replace(/([^aeiou])([^aeiou])([^aeiou])/, "$1a$3");
      }
  
      return {
        text: nameText,
        meaning: `${prefix.meaning}${infix.text === "ie" ? "之" : ""}${suffix.meaning}`,
        components: { prefix, infix, suffix }
      };
    }

    _buildSurname(targetSyllables, bloodline) {
      const { prefix, suffix } = this.libraries.surnameRules;
      const filteredPrefixes = prefix.filter(item => item.bloodline.includes(bloodline));
      const filteredSuffixes = suffix.filter(item => item.bloodline.includes(bloodline));

      if (filteredPrefixes.length === 0 || filteredSuffixes.length === 0) {
        console.warn(`无法为血统 ${bloodline} 构建姓氏，因为其姓氏前缀或后缀列表为空。返回默认姓氏。`);
        return { text: "Stonehand", meaning: "石手", syllables: 2 };
      }

      let surnameText = "";
      let surnameMeaning = "";
      let currentSyllables = 0;
      let attempts = 0;
      const MAX_ATTEMPTS = 50;

      while (currentSyllables < targetSyllables && attempts < MAX_ATTEMPTS) {
        const pre = this._randomChoice(filteredPrefixes);
        const suf = this._randomChoice(filteredSuffixes);

        if (!pre || typeof pre.text !== 'string' || !suf || typeof suf.text !== 'string') {
            console.error("在 _buildSurname 中选择的姓氏前缀或后缀无效。跳过此次尝试。");
            attempts++;
            continue;
        }

        surnameText = pre.text + suf.text;
        surnameMeaning = `${pre.meaning}·${suf.meaning}`;
        currentSyllables = this._countSyllables(surnameText);
        attempts++;
      }

      if (attempts >= MAX_ATTEMPTS && currentSyllables < targetSyllables) {
        console.warn(`在 _buildSurname 中为血统 ${bloodline} 达到最大尝试次数 (${MAX_ATTEMPTS})，但未能满足目标音节数 ${targetSyllables} (得到 ${currentSyllables})。返回当前最佳结果。`);
      }
      
      if (surnameText === "") {
          console.warn(`_buildSurname 未能为血统 ${bloodline} 生成姓氏文本。返回默认姓氏。`);
          return { text: "DefaultSurname", meaning: "默认姓氏", syllables: 2 };
      }

      return {
        text: surnameText,
        meaning: surnameMeaning,
        syllables: currentSyllables
      };
    }

    _injectDarkConsonants(name) {
      const darkConsonants = ["x", "z", "q", "v", "ph"];
      const positions = [];
      
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

    _randomChoice(array) {
      if (!array || array.length === 0) {
        return undefined; 
      }
      return array[Math.floor(Math.random() * array.length)];
    }

    _countSyllables(str) {
      if (typeof str !== 'string' || str.length === 0) {
        return 0;
      }
      str = str.toLowerCase();
      if(str.length <= 3) { return 1; }
      str = str.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      str = str.replace(/^y/, '');
      const match = str.match(/[aeiouy]{1,2}/g);
      return match ? match.length : 0;
    }

    generateBatch(count = 9) {
      const collectedNameObjects = []; // 存储最终符合所有唯一性条件的名字对象
      const usedFullNames = new Set();
      const usedFirstNames = new Set();
      const usedLastNames = new Set();
      
      let attempts = 0;
      // 设定一个更宽松的最大尝试次数，因为约束更严格
      const maxAttempts = count * 10 + 20; 

      while (collectedNameObjects.length < count && attempts < maxAttempts) {
        const nameObj = this.generate(); 
        attempts++;

        if (!nameObj || typeof nameObj.name !== 'string' || nameObj.name.trim() === "") {
          console.warn("generateBatch: generate() returned invalid object or empty name string.");
          continue; 
        }

        const fullNameString = nameObj.name;
        const nameParts = fullNameString.split(' ');
        
        // 确保至少有一个部分，即使姓氏为空字符串，firstName 也会有值
        const firstName = nameParts[0] || ""; 
        // lastName 可能为空字符串，如果名字只有一个单词（尽管我们的生成器倾向于生成两部分）
        const lastName = nameParts.slice(1).join(' ') || ""; 

        // 检查所有唯一性条件
        if (!usedFullNames.has(fullNameString) && 
            (firstName === "" || !usedFirstNames.has(firstName)) && // 如果firstName为空，不检查其唯一性
            (lastName === "" || !usedLastNames.has(lastName))) {  // 如果lastName为空，不检查其唯一性
          
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
}

window.elfGeneratorInstance  = new AdvancedElfNameGenerator();

function getRandomNames(gender, count) {
  const names = [];
  if (!elfGeneratorInstance) {
    console.error("elfGeneratorInstance is not initialized!");
    return ["ErrorInGenerator"]; 
  }
  try {
    const nameObjects = elfGeneratorInstance.setGender(gender).generateBatch(count);
    
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