# Frailty0077 プロジェクト

フロントエンド（Next.js）とバックエンド（FastAPI）を含むテスト用プロジェクトです。

## プロジェクト構造

```
frailty0077/
├── frontend/          # Next.js フロントエンド
├── application/       # FastAPI バックエンド
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

```bash
cd application

# 仮想環境を作成（推奨）
python -m venv venv

# 仮想環境を有効化
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# 依存関係をインストール
pip install -r requirements.txt

# サーバーを起動
python main.py
```

バックエンドは `http://localhost:8000` で起動します。

## 使用方法

1. バックエンドサーバーを起動（`application`ディレクトリで）
2. フロントエンドサーバーを起動（`frontend`ディレクトリで）
3. ブラウザで `http://localhost:3000` にアクセス

## API接続設定

フロントエンドからバックエンドAPIに接続する際のURLは、`frontend/lib/api.ts`で設定されています。

デフォルト: `http://localhost:8000`

環境変数で変更する場合は、`NEXT_PUBLIC_API_URL`を設定してください。

## デプロイ

### Firebase Hostingへのデプロイ

```bash
# フロントエンドをビルド
cd frontend
npm run build

# Firebaseにデプロイ
firebase deploy
```

## API ドキュメント

バックエンドサーバー起動後、以下のURLでAPIドキュメントを確認できます：
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
