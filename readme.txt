# 精灵名网站项目 README

## 🌟 项目名称：精灵名生成器 (Elf Name Generator)

一个可以生成奇幻精灵名字的创意网站，为角色扮演游戏、小说创作或游戏玩家提供灵感。

## 🚀 功能特点

- **随机精灵名生成**：一键生成独特的精灵名字
- **名字分类**：按精灵种族（森林精灵、暗夜精灵等）分类

## 🛠️ 技术栈

```
前端：HTML5, CSS3, JavaScript
部署：GitHub Pages/Vercel
```


## 📜 名字数据示例 (JavaScript)

```javascript
// 精灵名字数据
const elfNames = {
    forest: ["Lirendel", "Faelivrin", "Celeborn", "Thanduil"],
    dark: ["Nurvaryn", "Drizzt", "Viconia", "Liriel"],
    high: ["Galadriel", "Elrond", "Celebrían", "Gil-galad"]
};

// 生成随机名字
function generateName(type) {
    const names = elfNames[type] || Object.values(elfNames).flat();
    return names[Math.floor(Math.random() * names.length)];
}
```

## 🚀 快速开始

1. 克隆仓库：
```bash
git clone https://github.com/jiannachen/Elf.git
```

2. 打开首页：
```bash
open index.html  # 或在浏览器中直接打开
```

## 🌍 在线体验

[点击这里访问在线版本](https://elfnamegenerator.online)

## 🤝 贡献指南

欢迎提交Pull Request：
1. Fork项目
2. 创建你的分支 (`git checkout -b feature/awesome-feature`)
3. 提交更改 (`git commit -m 'Add awesome feature'`)
4. 推送到分支 (`git push origin feature/awesome-feature`)
5. 创建Pull Request

## 📄 许可证

MIT License © 2025 []

