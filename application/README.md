# FastAPI バックエンド

テスト用のFastAPIバックエンドサーバーです。

## セットアップ方法

### 方法1: Docker Compose（推奨）

```bash
# コンテナをビルドして起動
docker-compose up -d

# ログを確認
docker-compose logs -f

# コンテナを停止
docker-compose down
```

### 方法2: Docker

```bash
# イメージをビルド
docker build -t fastapi-backend .

# コンテナを起動
docker run -d -p 8000:8000 --name fastapi-backend fastapi-backend

# ログを確認
docker logs -f fastapi-backend

# コンテナを停止
docker stop fastapi-backend
docker rm fastapi-backend
```

### 方法3: ローカル環境（開発用）

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

## Docker コマンド

```bash
# コンテナの状態を確認
docker-compose ps

# コンテナを再起動
docker-compose restart

# コンテナを再ビルド
docker-compose up -d --build

# コンテナのログを確認
docker-compose logs -f api
```

## API ドキュメント

サーバー起動後、以下のURLでAPIドキュメントを確認できます：
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

