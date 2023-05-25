# ベースイメージとして公式のNode.jsイメージを指定
FROM node:18

# アプリケーションのディレクトリを設定
WORKDIR /app

# コピー
COPY package*.json ./

RUN npm install

COPY ./public ./public
COPY ./src ./src
COPY tsconfig*.json ./
COPY .env ./

# ポート3000で実行
EXPOSE 3000

# アプリケーションの起動
CMD ["npm", "start"]