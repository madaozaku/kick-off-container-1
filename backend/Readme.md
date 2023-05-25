# Python-backend

## 動かし方
以下のコマンドでサーバーを起動
```
docker build -t python-web3app . 
docker run -it --rm -p 5001:5000 --name kick-off python-web3app
```
下のアドレスにアクセスする
```
http://localhost:5001/  : packの残量を表示する
http://localhost:5001/balance/<address>  : <address>のpackの所持数を表示する
http://localhost:5001/transfer_v1/<address> : <address>にpackを１つ転送する
```

## Restの仕様(検討中)
### transferのリクエスト : POST /transfer
  - 処理
    - アドレスに対して、リクエストされた数のpackを送る Pack足りなければハズレ件追加する？(デモのユースケースでは不要)
    - アドレスと表示名、転送済みのPack数を保存する
  - in
    - リクエスト元の表示名
    - リクエスト元のアドレス
    - パック要求数
```
{
    "name": "表示名",
    "address": "0x00000000...",
    "amount": 2
}
```
  - out
    - 成功 200
    - 失敗 TBD

### Packの獲得数ランキングを取得する : GET /ranking
  - in
    - なし
  - out
    - 表示名+Pack所有数の一覧(できればソート)
```
{
    "ranking": [
        {
            "name":"表示名",
            "address":"0x......",
            "amount":5
        },
        ...
    ]
}
```
### 1位、2位、3位の所持者を取得する : GET /result
  - in
    - なし
  - out
    - 各NFT(固定)の所有アドレスと表示名を返す
```
{
    "results":[
        {
            "id":0,
            "name":"表示名",
            "address":"0x000....."
        },
        ...
    ]
}
```

### BEウォレットのPackの残高を取得する(バックオフィス機能) GET /
  - in
    - なし
  - out
    - アドレス、ウォレット残高、Packの所持数(適当なHTMLを返す)