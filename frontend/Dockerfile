# ベースイメージとして公式のNode.jsイメージを指定
FROM node:18

# アプリケーションのディレクトリを設定
WORKDIR /app

# コピー
COPY package*.json ./
#COPY tsconfig*.json ./
#COPY .env ./
#COPY ./public ./public
#COPY ./src ./src

RUN npm install

COPY .* .

# ポート3000で実行
EXPOSE 3000

# アプリケーションの起動
CMD ["npm", "start"]