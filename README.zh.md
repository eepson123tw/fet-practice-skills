# 前端技能練習集 (中文版)

<div align="center">
  <a href="README.md" style="padding: 5px 15px; margin-right: 10px; text-decoration: none; background-color: #007BFF; color: white; border-radius: 5px; font-weight: bold;">English</a>
  <span style="padding: 5px 15px; background-color: #28A745; color: white; border-radius: 5px; font-weight: bold;">繁體中文</span>
</div>

這是一個用於練習和展示現代前端開發技能的綜合性倉庫。

![前端練習技能預覽](https://github.com/user-attachments/assets/5c96a124-e468-4818-a64f-1ec3169e3a86)

## 🚀 特點

- **互動式Canvas動畫**
- **TypeScript整合**
- **現代組件架構**
- **響應式UI模式**
- **瀏覽器API實現**
- **主題切換功能**
- **優化的打包配置**
- **自動化GitHub Actions流程**

## 📋 包含技術

- **TypeScript**: 類型安全的JavaScript，提供更好的開發體驗
- **React**: 基於組件的UI開發
- **現代CSS**: 利用最新的CSS特性和技術
- **Canvas API**: 創建動態視覺體驗
- **瀏覽器API**: 利用現代瀏覽器能力
- **Vite**: 快速的打包和開發體驗
- **GitHub Actions**: 自動化測試和部署

有關更新和改進的更多詳細信息，請參閱[更新日誌](docs/CHANGELOG.md)。

## 🔍 關鍵技術洞見

### 1. 局部導入和全局導入影響的是什麼?

#### 對打包大小和性能的影響

- **局部導入**: `import { feature } from 'package'`

  - 只包含特定功能
  - 減小打包體積
  - 更好的支持樹搖動(tree-shaking)

- **全局導入**: `import * as package from 'package'`
  - 導入包中所有功能
  - 可能增加打包體積
  - 可能包含未使用的代碼

局部導入和全局導入的選擇顯著影響您的最終打包大小和應用程序性能。

### 2. XHR vs Fetch API 比較

| 功能                  |    XHR     |  Fetch   |
| --------------------- | :--------: | :------: |
| 基本的請求能力        |     ✓      |    ✓     |
| 基本的獲取響應能力    |     ✓      |    ✓     |
| 監控請求速度          |     ✓      |    ✗     |
| 監控響應速度          |     ✓      |    ✓     |
| Service Worker 中使用 |     ✗      |    ✓     |
| 操作 Cookie 的攜帶    |     ✗      |    ✓     |
| 控制重定向            |     ✗      |    ✓     |
| 請求取消              |     ✓      |    ✓     |
| 自定義 Referrer       |     ✗      |    ✓     |
| 流                    |     ✗      |    ✓     |
| API 風格              |   Event    | Promise  |
| 活耀度                | 會逐漸淘汰 | 不會淘汰 |

## 🖥️ 快速開始

```bash
# 克隆倉庫
git clone https://github.com/yourusername/fet-practice-skills.git

# 導航到項目目錄
cd fet-practice-skills

# 安裝依賴
npm install

# 啟動開發服務器
npm run dev
```

## 🗂️ 項目結構

```
├── src/
│   ├── components/        # 可重用UI組件
│   ├── hooks/             # 自定義React鉤子
│   ├── pages/             # 應用程序頁面
│   ├── utils/             # 工具函數
│   ├── styles/            # 全局樣式
│   └── main.tsx           # 應用程序入口點
├── public/                # 靜態資源
├── docs/                  # 文檔
└── vite.config.ts         # Vite配置
```
