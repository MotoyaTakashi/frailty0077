from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="テスト用API", version="1.0.0")

# CORS設定（フロントエンドからのアクセスを許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "*"],  # 本番環境では適切なオリジンを指定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# データモデル
class Message(BaseModel):
    id: Optional[int] = None
    content: str

class CounterValue(BaseModel):
    value: int

# メモリ内ストレージ（テスト用）
messages_storage: List[Message] = []
counter_value: int = 0

@app.get("/")
async def root():
    """ルートエンドポイント"""
    return {"message": "FastAPI テスト用API", "status": "running"}

@app.get("/api/health")
async def health_check():
    """ヘルスチェックエンドポイント"""
    return {"status": "healthy", "service": "backend-api"}

@app.get("/api/counter")
async def get_counter():
    """カウンターの値を取得"""
    return {"value": counter_value}

@app.post("/api/counter")
async def update_counter(counter: CounterValue):
    """カウンターの値を更新"""
    global counter_value
    counter_value = counter.value
    return {"value": counter_value}

@app.post("/api/counter/increment")
async def increment_counter():
    """カウンターを増やす"""
    global counter_value
    counter_value += 1
    return {"value": counter_value}

@app.post("/api/counter/decrement")
async def decrement_counter():
    """カウンターを減らす"""
    global counter_value
    counter_value -= 1
    return {"value": counter_value}

@app.post("/api/counter/reset")
async def reset_counter():
    """カウンターをリセット"""
    global counter_value
    counter_value = 0
    return {"value": counter_value}

@app.get("/api/messages")
async def get_messages():
    """メッセージ一覧を取得"""
    return {"messages": messages_storage}

@app.post("/api/messages")
async def create_message(message: Message):
    """メッセージを作成"""
    message_id = len(messages_storage) + 1
    new_message = Message(id=message_id, content=message.content)
    messages_storage.append(new_message)
    return new_message

@app.delete("/api/messages")
async def delete_all_messages():
    """すべてのメッセージを削除"""
    global messages_storage
    messages_storage = []
    return {"message": "すべてのメッセージを削除しました"}

@app.delete("/api/messages/{message_id}")
async def delete_message(message_id: int):
    """指定されたメッセージを削除"""
    global messages_storage
    for i, msg in enumerate(messages_storage):
        if msg.id == message_id:
            deleted_message = messages_storage.pop(i)
            return {"message": "メッセージを削除しました", "deleted": deleted_message}
    raise HTTPException(status_code=404, detail="メッセージが見つかりません")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

