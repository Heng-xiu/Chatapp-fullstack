from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
from langserve import add_routes
import os
import json
import asyncio
from dotenv import load_dotenv
from urllib.parse import unquote_plus
import asyncio
import time

# 載入環境變數
load_dotenv()

app = FastAPI()

# 添加 CORS 中間件
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
        # "http://localhost:4200",
        # "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 從環境變數獲取 OpenAI API 金鑰
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OPENAI_API_KEY 環境變數未設置")

# 建立一個簡單的聊天鏈
chat_model = ChatOpenAI(streaming=True)
prompt = ChatPromptTemplate.from_template("Human: {message}\nAI: ")
chat_chain = prompt | chat_model | StrOutputParser()

@app.get("/chat")
async def chat(request: Request):
    async def generate():
        params = dict(request.query_params)
        message = unquote_plus(params.get("message", ""))
        if not message:
            yield f"data: {json.dumps({'error': '消息內容不能為空'})}\n\n"
            return

        async for chunk in chat_chain.astream({"message": message}):
            yield f"data: {json.dumps({'type': 'chunk', 'content': chunk})}\n\n"
        yield f"data: {json.dumps({'type': 'end'})}\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")

async def event_generator():
    while True:
        # 这里可以替换为实际的聊天消息
        yield f"data: 服务器时间是 {time.strftime('%Y-%m-%d %H:%M:%S')}\n\n"
        await asyncio.sleep(1)

@app.get('/sse_time')
async def sse_endpoint():
    return StreamingResponse(event_generator(), media_type='text/event-stream')

add_routes(
    app,
    chat_chain,
    path="/chat_langserve",
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)