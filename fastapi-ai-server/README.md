# FastAPI AI 伺服器

這是一個使用 FastAPI 和 LangChain 構建的 AI 聊天伺服器。

## 功能

- 使用 OpenAI 的 GPT 模型進行聊天
- 支持流式響應
- CORS 中間件支持跨域請求

## 安裝

1. 克隆此儲存庫：

```bash
git clone https://github.com/your-username/fastapi-ai-server.git
cd fastapi-ai-server
```

2. 創建並激活虛擬環境：

```bash
python -m venv venv
source venv/bin/activate  # 在 Windows 上使用 venv\Scripts\activate
```

3. 安裝依賴：

```bash
pip install -r requirements.txt
```

4. 創建 `.env` 文件並添加您的 OpenAI API 金鑰：

```
OPENAI_API_KEY=your-api-key-here
```

## 運行

要啟動伺服器，請運行：

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

伺服器將在 `http://localhost:8000` 上運行。

## API 使用

發送 POST 請求到 `/chat` 端點，包含以下 JSON 主體：

```json
{
  "message": "你的聊天消息"
}
```

## Langserve 使用
```
curl --location --request POST 'http://localhost:8000/chat_langserve/invoke' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "input": {
            "message": "How is the weather"
        }
    }'
```

伺服器將以流式事件響應。

## 部署

對於生產環境，請考慮以下建議：

1. 使用 HTTPS
2. 實施適當的身份驗證和授權
3. 設置適當的 CORS 策略
4. 使用生產級 WSGI 伺服器，如 Gunicorn
5. 實施速率限制和其他安全措施

## 貢獻

歡迎提交問題和拉取請求。

## 許可證

[MIT](https://choosealicense.com/licenses/mit/)
```

這些文件和修改應該能幫助您將 `fastapi-ai-server` 專案變得更加生產就緒。請記住在實際部署時還需要考慮其他因素，如安全性、可擴展性和監控等。