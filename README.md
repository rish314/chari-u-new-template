# Docker Compose Setup for じてんしゃひろば遊

このプロジェクトは単純なNGINXを使用してHTMLファイルを公開する、シンプルなDocker構成です。

## 前提条件

- Docker
- Docker Compose (V2推奨)

## 使用方法

### 1. プロジェクトのビルドと起動

```bash
# Docker Compose V2の場合
docker compose up -d

# または Docker Compose V1の場合
docker-compose up -d
```

### 2. Webサイトへのアクセス

ブラウザで以下のURLにアクセスしてください：
http://localhost:8080

### 3. 停止

```bash
# Docker Compose V2の場合
docker compose down

# または Docker Compose V1の場合
docker-compose down
```

## 構成

- **Webサーバー**: NGINX (軽量で高性能)
- **ポート**: 8080 (ホスト) → 80 (コンテナ)
- **ベースイメージ**: nginx:alpine (軽量版)

## 特徴

- 単純なNGINXによる静的ファイル配信
- ビルドプロセス不要の簡単な構成
- HTMLファイルをそのまま公開
- 軽量で高速な動作
- **ライブ更新対応**: ファイルを更新すると即座に反映（再ビルド不要）
- ボリュームマウントによる開発効率の向上

## ライブ更新機能

このDocker構成では、ボリュームマウントを使用してファイルの変更を即座に反映します：

- **HTML、CSS、JSファイルの編集**: ファイルを保存すると即座にWebサイトに反映
- **画像ファイルの追加・変更**: 新しい画像や更新された画像がすぐに利用可能
- **再ビルド不要**: `docker compose build` を実行する必要がありません
- **開発効率向上**: コードの変更とテストのサイクルが高速化

## ファイル構成

- `Dockerfile`: 単純なNGINXベースのコンテナ設定（ボリュームマウント対応）
- `docker-compose.yml`: サービスの定義、ポート設定、ボリュームマウント設定
- 全ての静的ファイル（HTML、CSS、JS、画像など）がボリュームマウントで配信される

## トラブルシューティング

### ポート8080が使用中の場合

`docker-compose.yml`の以下の行を編集してください：

```yaml
ports:
  - "8081:80"  # 8080を8081に変更
```

### コンテナの再ビルドが必要な場合

```bash
docker compose build --no-cache
docker compose up -d
```
