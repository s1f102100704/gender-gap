
# Node.js 18 の公式イメージを使用
FROM node:18

# 作業ディレクトリを `/app` に設定
WORKDIR /app

# 依存関係をインストールするため package.json をコピー
COPY package.json package-lock.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# Vite の開発サーバーを起動
CMD ["npm", "run", "dev", "--", "--host"]
