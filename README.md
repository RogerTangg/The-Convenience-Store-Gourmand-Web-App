# The Convenience Store Gourmand

AI 驅動的便利商店美食菜單生成器，將平凡食材轉化為米其林級創意料理。

## 功能

- **AI 菜單生成**：使用 Gemini AI 根據預算、商店、風格生成創意菜單
- **預算控制**：自由設定 50-500 TWD 預算範圍
- **多店支援**：7-Eleven、全家便利商店
- **風格選擇**：法式、日式、美式、深夜頹廢四種料理風格
- **詳細擺盤**：提供分步擺盤指南與主廚評論

## 技術棧

| 層級 | 技術 |
|------|------|
| 前端 | React 19, TypeScript, TailwindCSS |
| 建置 | Vite 6 |
| 後端 | Supabase Edge Functions (Deno) |
| 資料庫 | PostgreSQL (Supabase) |
| AI | Google Gemini 2.0 Flash |

## 快速開始

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

## 專案結構

```
├── components/          # React 組件
├── services/           # API 服務層
├── store/              # Zustand 狀態管理
├── supabase/
│   ├── functions/      # Edge Functions
│   └── migrations/     # 資料庫遷移
└── types.ts            # TypeScript 型別定義
```
## 部署網站

歡迎體驗本專案
```bash
https://the-convenience-store-gourmand-web-app.pages.dev/
```
---

**專案類型**：娛樂性質、非商業用途
