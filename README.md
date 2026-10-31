# NPCTracker

<p align="center">
  <strong>Degrees of Lewdity NPC Tracker</strong>
  <br>
  查询已命名 NPC 的当前位置与当前活动
</p>

<p align="center">
  <a href="#简体中文">简体中文</a>
  &nbsp;|&nbsp;
  <a href="#english">English</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/game-Degrees%20of%20Lewdity-purple" alt="Game">
  <img src="https://img.shields.io/badge/language-简体中文%20%7C%20繁體中文%20%7C%20English-green" alt="Languages">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/author-toastbunnie-orange" alt="Author">
</p>

---

<a id="简体中文"></a>

## 简体中文

NPCTracker 是一款用于《Degrees of Lewdity》的 NPC 动向查询模组。它会自动发现游戏中的原版及第三方模组具名 NPC，并展示当前能够获取的角色地点与活动信息。

### 功能介绍

| 功能 | 说明 |
| --- | --- |
| 自动发现 NPC | 自动收录游戏中的原版及第三方模组具名 NPC |
| 分类浏览 | 分为恋爱角色、其他 NPC、模组 NPC 三个分类 |
| 动向查询 | 查看 NPC 当前可获取的地点与活动信息 |
| 关注角色 | 最多关注三名 NPC，支持星标关注与取消关注 |
| 悬浮显示 | 在游戏界面右上角查看关注角色的当前动向 |
| 快速切换 | 使用悬浮面板左右按钮或键盘方向键切换关注角色 |
| 多语言界面 | 支持简体中文、繁体中文与英文 |

### 界面预览

<!-- 将游戏截图放入 docs 文件夹后，可取消下面的注释并修改图片路径：

<p align="center">
  <img src="docs/screenshot-main.png" width="720" alt="NPCTracker 主界面">
</p>

<p align="center">
  <img src="docs/screenshot-floating.png" width="720" alt="NPCTracker 悬浮面板">
</p>
-->

### 安装方法

1. 下载 NPCTracker 的发布压缩包。
2. 按照游戏 ModLoader 的模组安装方式，将 NPCTracker 安装到模组目录。
3. 确认已安装并启用依赖 **TweeReplacer**。
4. 启用 NPCTracker。
5. 进入游戏，在日志或笔记界面打开 NPC 动向查询入口。

### 依赖

| 依赖 | 版本要求 | 用途 |
| --- | --- | --- |
| TweeReplacer | `^1.0.0` | 替换游戏界面内容，添加 NPC 动向查询入口 |

### 兼容性说明

- NPCTracker 通过游戏运行时数据发现具名 NPC。
- NPC 的地点与活动信息取决于游戏本身或相关模组公开的数据。
- 对于没有提供可读取地点或活动信息的 NPC，界面可能显示未知。
- 第三方模组新增 NPC 可以被自动发现，但具体动向信息仍取决于该模组的数据接口。

### 项目结构

```text
NPCTracker/
├── README.md
├── LICENSE
├── boot.json
├── javascript/
│   └── npc-tracker.js
├── stylesheet/
│   └── npc-tracker.css
└── twee/
    ├── npc-tracker.twee
    ├── patch-overlay.twee
    ├── patch-title-journal.twee
    └── patch-title-notes.twee
```

### 问题反馈

如果遇到模组无法加载、NPC 未被正确识别或动向信息异常等问题，欢迎在 GitHub Issues 中提交反馈。

建议附上以下信息：

- 游戏版本
- ModLoader 版本
- NPCTracker 版本
- 相关第三方模组及版本
- 问题描述与复现步骤
- 控制台报错或截图

### 许可证

本项目采用 [MIT License](LICENSE) 开源许可证。允许自由使用、修改和分发，具体条款请参阅许可证文件。

### 作者

**toastbunnie**

---

<a id="english"></a>

## English

NPCTracker is an NPC tracking mod for *Degrees of Lewdity*. It automatically discovers named NPCs from the base game and third-party mods, and displays their currently available location and activity information.

### Features

| Feature | Description |
| --- | --- |
| Automatic NPC Discovery | Automatically discovers named NPCs from the base game and third-party mods |
| NPC Categories | Browse Romance NPCs, Other NPCs, and Mod NPCs |
| Location & Activity | View currently available location and activity information |
| Favorites | Star or unstar up to three NPCs |
| Floating Tracker | View favorited NPCs' current status in the upper-right corner of the game screen |
| Quick Navigation | Switch between favorited NPCs using the panel buttons or keyboard arrow keys |
| Multilingual UI | Supports Simplified Chinese, Traditional Chinese, and English |

### Preview

<!-- Add screenshots to the docs folder and uncomment the following section:

<p align="center">
  <img src="docs/screenshot-main.png" width="720" alt="NPCTracker Main Interface">
</p>

<p align="center">
  <img src="docs/screenshot-floating.png" width="720" alt="NPCTracker Floating Tracker">
</p>
-->

### Installation

1. Download the NPCTracker release archive.
2. Install NPCTracker into your mods directory using the game's ModLoader installation method.
3. Make sure the required dependency **TweeReplacer** is installed and enabled.
4. Enable NPCTracker.
5. Launch the game and open the NPC Tracker entry from the Journal or Notes interface.

### Dependencies

| Dependency | Required Version | Purpose |
| --- | --- | --- |
| TweeReplacer | `^1.0.0` | Replaces game interface content and adds NPC Tracker entry points |

### Compatibility

- NPCTracker discovers named NPCs through the game's runtime data.
- Available location and activity information depends on data exposed by the base game or the relevant mod.
- NPCs without accessible location or activity data may display as Unknown.
- Newly added NPCs from third-party mods can be discovered automatically. Their tracking information still depends on the data interfaces provided by those mods.

### Project Structure

```text
NPCTracker/
├── README.md
├── LICENSE
├── boot.json
├── javascript/
│   └── npc-tracker.js
├── stylesheet/
│   └── npc-tracker.css
└── twee/
    ├── npc-tracker.twee
    ├── patch-overlay.twee
    ├── patch-title-journal.twee
    └── patch-title-notes.twee
```

### Bug Reports & Feedback

If you encounter loading issues, missing NPCs, or incorrect tracking information, feel free to open an issue on GitHub.

Please include the following information when possible:

- Game version
- ModLoader version
- NPCTracker version
- Related third-party mods and their versions
- Description of the issue and reproduction steps
- Console errors or screenshots

### License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this project under its terms.

### Author

**toastbunnie**

---

<p align="center">
  <sub>Made for Degrees of Lewdity · NPCTracker v0.1.0</sub>
</p>