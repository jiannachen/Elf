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
        // 自然元素词库（前缀）
        naturePrefixes: [
          { text: "Clan", meaning: "月光", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Alm", meaning: "高山", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Ioe", meaning: "翡翠", syllables: 2, bloodline: ["woodElf"] },
          { text: "Imr", meaning: "露珠", syllables: 1, bloodline: ["woodElf"] },
          { text: "Ash", meaning: "灰烬", syllables: 1, bloodline: ["highElf", "halfElf"] },
          { text: "Sel", meaning: "星光", syllables: 1, bloodline: ["highElf"] },
          { text: "Gyl", meaning: "金辉", syllables: 1, bloodline: ["highElf"] },
          { text: "Dar", meaning: "橡树", syllables: 1, bloodline: ["woodElf"] },
          { text: "Ayl", meaning: "晨风", syllables: 1, bloodline: ["woodElf", "halfElf"] },
          { text: "Fae", meaning: "魔法", syllables: 1, bloodline: ["highElf"] },
          { text: "Lor", meaning: "金色", syllables: 1, bloodline: ["highElf"] },
          { text: "Nim", meaning: "白色", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Thal", meaning: "森林", syllables: 1, bloodline: ["woodElf"] },
          { text: "Cele", meaning: "银辉", syllables: 2, bloodline: ["highElf"] },
          { text: "Mith", meaning: "灰色", syllables: 1, bloodline: ["highElf", "halfElf"] },
          // 新增自然前缀
          { text: "Luin", meaning: "蓝色/河流", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Aer", meaning: "海洋/天空", syllables: 1, bloodline: ["highElf", "halfElf"] },
          { text: "Lith", meaning: "灰尘/沙", syllables: 1, bloodline: ["woodElf", "darkElf"] },
          { text: "Sol", meaning: "太阳", syllables: 1, bloodline: ["highElf"] },
          { text: "Fuin", meaning: "夜晚/阴影", syllables: 1, bloodline: ["darkElf", "woodElf"] },
          { text: "Taur", meaning: "巨大森林", syllables: 1, bloodline: ["woodElf"] },
          { text: "Eryn", meaning: "树林", syllables: 2, bloodline: ["woodElf"] },
          { text: "Gael", meaning: "微风", syllables: 1, bloodline: ["highElf", "woodElf"] }
        ],
  
        // 抽象概念词库（前缀）
        abstractPrefixes: [
          { text: "Vyr", meaning: "虚空", syllables: 1, bloodline: ["darkElf", "halfElf"] },
          { text: "Syl", meaning: "阴影", syllables: 1, bloodline: ["darkElf"] },
          { text: "Quel", meaning: "远古", syllables: 1, bloodline: ["highElf", "darkElf"] },
          { text: "Dras", meaning: "龙裔", syllables: 1, bloodline: ["darkElf"] },
          { text: "Xan", meaning: "混沌", syllables: 1, bloodline: ["darkElf"] },
          { text: "Phae", meaning: "命运", syllables: 1, bloodline: ["highElf", "darkElf"] },
          { text: "Zor", meaning: "痛苦", syllables: 1, bloodline: ["darkElf"] },
          { text: "Vael", meaning: "堕落", syllables: 1, bloodline: ["darkElf", "halfElf"] },
          { text: "Riv", meaning: "智慧", syllables: 1, bloodline: ["highElf"] },
          { text: "Elen", meaning: "星辰", syllables: 2, bloodline: ["highElf"] },
          // 新增抽象前缀
          { text: "Val", meaning: "力量/神圣", syllables: 1, bloodline: ["highElf"] },
          { text: "Myr", meaning: "神秘", syllables: 1, bloodline: ["highElf", "darkElf"] },
          { text: "Tyr", meaning: "正义/秩序", syllables: 1, bloodline: ["highElf"] },
          { text: "Sor", meaning: "悲伤", syllables: 1, bloodline: ["darkElf", "halfElf"] },
          { text: "Nor", meaning: "知识/传说", syllables: 1, bloodline: ["highElf"] },
          { text: "Dae", meaning: "技艺/创造", syllables: 1, bloodline: ["highElf", "halfElf"] },
          { text: "Ryn", meaning: "记忆", syllables: 1, bloodline: ["highElf", "woodElf"] },
          { text: "Kael", meaning: "仇恨/复仇", syllables: 1, bloodline: ["darkElf"] }
        ],
  
        // 中缀连接库
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
          // 新增中缀
          { text: "ia", syllables: 1 },
          { text: "ua", syllables: 1 },
          { text: "il", syllables: 1 },
          { text: "on", syllables: 1 }
        ],
  
        // 后缀系统（分性别）
        suffixes: {
          female: [
            { text: "ire", meaning: "之花", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "ara", meaning: "之光", syllables: 2, bloodline: ["highElf"] },
            { text: "ena", meaning: "之女", syllables: 2, bloodline: ["highElf", "woodElf"] },
            { text: "yll", meaning: "之叶", syllables: 1, bloodline: ["woodElf"] },
            { text: "ryn", meaning: "之水", syllables: 1, bloodline: ["woodElf", "halfElf"] },
            { text: "dria", meaning: "星辰", syllables: 2, bloodline: ["highElf"] },
            { text: "phine", meaning: "之叶", syllables: 2, bloodline: ["woodElf"] },
            { text: "wynn", meaning: "祝福", syllables: 1, bloodline: ["highElf", "halfElf"] },
            { text: "ssa", meaning: "之影", syllables: 1, bloodline: ["darkElf"] },
            { text: "nelis", meaning: "之歌", syllables: 2, bloodline: ["highElf"] },
            // 新增女性后缀
            { text: "elle", meaning: "优雅", syllables: 2, bloodline: ["highElf"] },
            { text: "eth", meaning: "智慧", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "iana", meaning: "月之女", syllables: 3, bloodline: ["highElf"] },
            { text: "lya", meaning: "细语", syllables: 1, bloodline: ["woodElf"] },
            { text: "nara", meaning: "火焰/热情", syllables: 2, bloodline: ["darkElf", "halfElf"] },
            { text: "syl", meaning: "森林之女", syllables: 1, bloodline: ["woodElf"] }
          ],
          male: [
            { text: "ios", meaning: "之子", syllables: 1, bloodline: ["highElf"] },
            { text: "en", meaning: "之石", syllables: 1, bloodline: ["woodElf"] },
            { text: "or", meaning: "之刃", syllables: 1, bloodline: ["darkElf"] },
            { text: "as", meaning: "之鹰", syllables: 1, bloodline: ["highElf"] },
            { text: "ir", meaning: "之火", syllables: 1, bloodline: ["darkElf", "halfElf"] },
            { text: "ric", meaning: "之王", syllables: 1, bloodline: ["highElf"] },
            { text: "drin", meaning: "守护者", syllables: 1, bloodline: ["woodElf"] },
            { text: "thas", meaning: "学者", syllables: 1, bloodline: ["highElf"] },
            { text: "vain", meaning: "之血", syllables: 1, bloodline: ["darkElf"] },
            { text: "mir", meaning: "宝石", syllables: 1, bloodline: ["highElf"] },
            // 新增男性后缀
            { text: "ion", meaning: "贵族/后裔", syllables: 1, bloodline: ["highElf"] },
            { text: "ael", meaning: "光辉", syllables: 1, bloodline: ["highElf", "halfElf"] },
            { text: "dur", meaning: "坚毅", syllables: 1, bloodline: ["woodElf", "darkElf"] },
            { text: "mar", meaning: "荣耀", syllables: 1, bloodline: ["highElf"] },
            { text: "nil", meaning: "虚无/深邃", syllables: 1, bloodline: ["darkElf"] },
            { text: "rond", meaning: "庇护所/圆顶", syllables: 1, bloodline: ["highElf", "woodElf"] }
          ],
          neutral: [
            { text: "an", meaning: "之地", syllables: 1, bloodline: ["woodElf"] },
            { text: "is", meaning: "之魂", syllables: 1, bloodline: ["darkElf"] },
            { text: "ys", meaning: "之雾", syllables: 1, bloodline: ["highElf", "darkElf"] },
            { text: "ar", meaning: "之日", syllables: 1, bloodline: ["highElf"] },
            { text: "in", meaning: "之风", syllables: 1, bloodline: ["woodElf"] },
            // 新增中性后缀
            { text: "al", meaning: "本质/所属", syllables: 1, bloodline: ["highElf", "halfElf"] },
            { text: "en", meaning: "古老/来自", syllables: 1, bloodline: ["highElf", "woodElf"] }, // 重复但可用于不同组合
            { text: "ith", meaning: "小径/通道", syllables: 1, bloodline: ["woodElf", "darkElf"] },
            { text: "oril", meaning: "水晶/光芒", syllables: 2, bloodline: ["highElf"] }
          ]
        },
  
        // 姓氏生成规则
        surnameRules: {
          prefix: [
            { text: "Mag", meaning: "月", syllables: 1, bloodline: ["highElf"] },
            { text: "Wys", meaning: "林", syllables: 1, bloodline: ["woodElf"] },
            { text: "Ol", meaning: "河", syllables: 1, bloodline: ["woodElf"] },
            { text: "Bry", meaning: "岩", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "Rey", meaning: "阳", syllables: 1, bloodline: ["highElf"] },
            { text: "Sha", meaning: "影", syllables: 1, bloodline: ["darkElf"] },
            { text: "Faf", meaning: "焰", syllables: 1, bloodline: ["darkElf"] },
            { text: "Er", meaning: "古", syllables: 1, bloodline: ["highElf"] },
            { text: "Rav", meaning: "鸦", syllables: 1, bloodline: ["darkElf"] },
            { text: "Vir", meaning: "毒", syllables: 1, bloodline: ["darkElf"] },
            // 新增姓氏前缀
            { text: "Sil", meaning: "银", syllables: 1, bloodline: ["highElf", "halfElf"] },
            { text: "Lor", meaning: "金/梦", syllables: 1, bloodline: ["highElf"] },
            { text: "Tyr", meaning: "守望", syllables: 1, bloodline: ["highElf"] },
            { text: "Fen", meaning: "沼泽/边境", syllables: 1, bloodline: ["woodElf", "darkElf"] },
            { text: "Val", meaning: "强盛", syllables: 1, bloodline: ["highElf"] },
            { text: "Nigh", meaning: "夜", syllables: 1, bloodline: ["darkElf", "woodElf"] }, // Night的变体
            { text: "Star", meaning: "星", syllables: 1, bloodline: ["highElf"] },
            { text: "Oak", meaning: "橡", syllables: 1, bloodline: ["woodElf"] },
            { text: "Moon", meaning: "月", syllables: 1, bloodline: ["highElf", "woodElf"] }, // Moon的变体
            { text: "Dusk", meaning: "暮", syllables: 1, bloodline: ["darkElf", "halfElf"] }
          ],
          suffix: [
            { text: "ven", meaning: "家族", syllables: 1, bloodline: ["highElf"] },
            { text: "anel", meaning: "守望者", syllables: 2, bloodline: ["highElf"] },
            { text: "aran", meaning: "后裔", syllables: 2, bloodline: ["woodElf"] },
            { text: "ris", meaning: "氏族", syllables: 1, bloodline: ["woodElf"] },
            { text: "neiros", meaning: "圣殿", syllables: 3, bloodline: ["highElf"] },
            { text: "wenys", meaning: "林地", syllables: 2, bloodline: ["woodElf"] },
            { text: "fir", meaning: "余烬", syllables: 1, bloodline: ["darkElf"] },
            { text: "phine", meaning: "叶脉", syllables: 2, bloodline: ["woodElf"] },
            { text: "awynn", meaning: "誓言", syllables: 2, bloodline: ["highElf"] },
            { text: "ran", meaning: "血脉", syllables: 1, bloodline: ["darkElf"] },
            // 新增姓氏后缀
            { text: "fall", meaning: "瀑布/陨落", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "gleam", meaning: "微光", syllables: 1, bloodline: ["highElf"] },
            { text: "wood", meaning: "森林", syllables: 1, bloodline: ["woodElf"] },
            { text: "brook", meaning: "溪流", syllables: 1, bloodline: ["woodElf", "halfElf"] },
            { text: "blade", meaning: "之刃", syllables: 1, bloodline: ["darkElf", "highElf"] },
            { text: "song", meaning: "之歌", syllables: 1, bloodline: ["highElf", "woodElf"] },
            { text: "rider", meaning: "行者/骑手", syllables: 2, bloodline: ["woodElf", "halfElf"] },
            { text: "shade", meaning: "阴影/庇护", syllables: 1, bloodline: ["darkElf", "woodElf"] },
            { text: "fire", meaning: "火焰", syllables: 1, bloodline: ["highElf", "darkElf"] },
            { text: "arrow", meaning: "之箭", syllables: 2, bloodline: ["woodElf"] }
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

    generateBatch(count = 10) {
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

const elfGeneratorInstance = new AdvancedElfNameGenerator();

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