# README

## 專案名稱

即時聊天應用程式

[![IMAGE ALT TEXT](https://i.imgur.com/g75V70u.png)](http://www.youtube.com/watch?v=nZJ6o8ySyM4 "Chatapp")
## 專案簡介

本專案是一個基於 **Angular**、**NestJS** 和 **FastAPI** 的即時聊天應用程式，支援持續聊天和串流式訊息傳遞。使用者可以在網頁上與 AI 進行即時的聊天互動，體驗流暢的對話過程。

## 功能特色

- **即時聊天**：支援使用者與 AI 進行即時對話。
- **串流式訊息傳遞**：AI 的回覆以串流方式呈現，提供更佳的使用者體驗。
- **可擴展性**：採用模組化的架構設計，方便後續功能擴展。

## 技術堆疊

- **前端**：Angular
- **中間層**：NestJS
- **後端**：FastAPI
- **AI 模型**：OpenAI API，透過 LangChain 封裝

## 目錄結構

```
project-root/
├── angular-frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── chat/
│   │   │   │   ├── chat.component.ts
│   │   │   │   ├── chat.component.html
│   │   │   │   ├── chat.component.css
│   │   │   │   └── chat.service.ts
├── nestjs-backend/
│   ├── src/
│   │   ├── chat.controller.ts
│   │   └── app.module.ts
└── fastapi-server/
    └── fastapi_server.py
```

## 環境要求

- **Node.js**：>= 14.x
- **Python**：>= 3.7
- **Angular CLI**：>= 12.x
- **NestJS CLI**：>= 8.x
- **OpenAI API Key**

## 安裝與執行

### 1. 複製專案

```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

### 2. 執行 FastAPI 伺服器

```bash
cd fastapi-server
pip install -r requirements.txt
uvicorn fastapi_server:app --reload
```

### 3. 執行 NestJS 伺服器

```bash
cd nestjs-backend
npm install
npm run start
```

### 4. 執行 Angular 前端

```bash
cd angular-frontend
npm install
ng serve
```

### 5. 訪問應用程式

在瀏覽器中打開 `http://localhost:4200`，開始使用聊天應用程式。

## 使用說明

- **發送訊息**：在輸入框中輸入訊息，按下 Enter 鍵或點擊發送按鈕。
- **查看回覆**：AI 的回覆將以串流方式顯示在聊天介面中。
- **持續對話**：可以多次發送訊息，與 AI 進行連續對話。

## 常見問題

### 1. Angular 頁面未更新訊息

- **解決方法**：確保在 `EventSource` 的回調函數中，使用 `NgZone.run()` 包裹對資料的更新。

### 2. 跨域請求被阻止

- **解決方法**：在 FastAPI 和 NestJS 伺服器中正確配置 CORS，允許來自 Angular 前端的請求。

### 3. SSE 連線出現錯誤

- **解決方法**：檢查伺服器端的 SSE 實現，確保正確返回 `Content-Type: text/event-stream`，並按照 SSE 格式發送資料。

## 貢獻指南

歡迎對本專案提出改進建議和貢獻程式碼。您可以透過提交 Issue 或 Pull Request 的方式參與到專案的開發中。

## 授權

本專案採用 MIT 授權。

## 聯絡方式

如有任何問題或建議，請聯絡：

- 電子郵件：your-email@example.com
- GitHub：[@yourusername](https://github.com/yourusername)
