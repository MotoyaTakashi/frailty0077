from fastapi import FastAPI

# FastAPIインスタンスを作成
app = FastAPI()

# ルートエンドポイント ("/") へのGETリクエストを処理する関数を定義
@app.get("/")
def read_root():
    return {"message": "Hello, World"}