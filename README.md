# Frailty0077 プロジェクト

フロントエンド（Next.js）とバックエンド（FastAPI）を含むテスト用プロジェクトです。

## プロジェクト構造

```
frailty0077/
├── frontend/          # Next.js フロントエンド
├── application/       # FastAPI バックエンド
├── Dockerfile         # バックエンド用Dockerfile
├── docker-compose.yml # Docker Compose設定
├── cloudbuild.yaml    # Google Cloud Build設定
└── firebase.json      # Firebase Hosting設定
```

## セットアップ

### 1. フロントエンド（Next.js）

```bash
cd frontend
npm install
npm run dev
```

フロントエンドは `http://localhost:3000` で起動します。

### 2. バックエンド（FastAPI）

#### Docker Composeで起動（推奨）

```bash
# プロジェクトルートから実行
docker-compose up -d
```

#### ローカル環境（開発用）

```bash
cd application
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

バックエンドは `http://localhost:8000` で起動します。

## テスト

### フロントエンドのテスト

```bash
cd frontend
npm test              # テスト実行
npm run test:watch    # ウォッチモード
npm run test:coverage # カバレッジレポート
```

## デプロイ

### Google Cloud Buildを使用

```bash
# Cloud Buildでビルドとデプロイを実行
gcloud builds submit --config=cloudbuild.yaml

# 置換変数を指定する場合
gcloud builds submit --config=cloudbuild.yaml \
  --substitutions=_REGION=asia-northeast1,_FIREBASE_TOKEN=YOUR_TOKEN
```

### Firebase Hostingへのデプロイ（フロントエンドのみ）

```bash
cd frontend
npm run build
firebase deploy
```

### Dockerでバックエンドをデプロイ

```bash
# イメージをビルド
docker build -t fastapi-backend .

# Cloud Runにデプロイ
gcloud run deploy fastapi-backend \
  --image gcr.io/PROJECT_ID/fastapi-backend \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated
```

## API ドキュメント

バックエンドサーバー起動後、以下のURLでAPIドキュメントを確認できます：
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Cloud Build設定

`cloudbuild.yaml`には以下のステップが含まれています：

1. **フロントエンドのビルド** - Next.jsアプリをビルド
2. **バックエンドのDockerイメージビルド** - FastAPIアプリをDockerイメージ化
3. **Dockerイメージのプッシュ** - Container Registryにプッシュ
4. **Firebase Hostingへのデプロイ** - フロントエンドをデプロイ
5. **Cloud Runへのデプロイ** - バックエンドをデプロイ

### 必要な環境変数

- `_FIREBASE_TOKEN`: Firebase CLIの認証トークン
- `_REGION`: Cloud Runのリージョン（デフォルト: asia-northeast1）
