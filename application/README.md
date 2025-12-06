# FastAPI バックエンド

テスト用のFastAPIバックエンドサーバーです。

## セットアップ

```bash
# 仮想環境を作成（推奨）
python -m venv venv

# 仮想環境を有効化
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# 依存関係をインストール
pip install -r requirements.txt
```

## 実行方法

```bash
# 開発サーバーを起動
python main.py

# または
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

サーバーは `http://localhost:8000` で起動します。

## API エンドポイント

### ヘルスチェック
- `GET /` - ルートエンドポイント
- `GET /api/health` - ヘルスチェック

### カウンター
- `GET /api/counter` - カウンターの値を取得
- `POST /api/counter` - カウンターの値を更新
- `POST /api/counter/increment` - カウンターを増やす
- `POST /api/counter/decrement` - カウンターを減らす
- `POST /api/counter/reset` - カウンターをリセット

### メッセージ
- `GET /api/messages` - メッセージ一覧を取得
- `POST /api/messages` - メッセージを作成
- `DELETE /api/messages` - すべてのメッセージを削除
- `DELETE /api/messages/{message_id}` - 指定されたメッセージを削除

## API ドキュメント

サーバー起動後、以下のURLでAPIドキュメントを確認できます：
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

