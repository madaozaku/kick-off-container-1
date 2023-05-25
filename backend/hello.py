from flask import Flask, abort, request
from thirdweb import ThirdwebSDK

PACK_CONTRACT_ADDRESS = '0xAE55Cc3341396578EbeAc2AC43bDd380D8d20590'
PACK_ID = 0
BACKEND_ADDRESS = '0x167D61B31f41210A6833E0c7eEE94B41bcb35BF9'
BACKEND_PRIVATE_KEY = '0x353be6397118611a3fdf778041cae1ac6de20c214ca5d5b5cefcc6924a835105'
sdk = ThirdwebSDK.from_private_key(BACKEND_PRIVATE_KEY, 'https://avalanche-fuji.rpc.thirdweb.com')
contract = sdk.get_contract(PACK_CONTRACT_ADDRESS)

pack_history = {}
member_list = {}

app = Flask(__name__)

@app.route("/")
def hello_world():
    pack = contract.erc1155.balance(PACK_ID)
    return ('<p>pack amount = {}</p><p>{}</p><p>{}</p>'.format(pack, pack_history, member_list))

@app.route("/balance/<address>")
def balance(address):
  balance = contract.erc1155.balance_of(address, PACK_ID)
  return ('<p>address = {}, pack balance = {}</p>'.format(address, balance))

@app.route("/transfer_v1/<to>")
def transfer_v1(to):
   res = contract.erc1155.transfer(to, PACK_ID, 1)
   if (to in pack_history):
      pack_history[to] = pack_history[to] + 1
   else :
      pack_history[to] = 1
   return ('<p>1 pack transferd to {}</p><p>{}</p>'.format(to, res))

@app.route("/transfer", methods=['POST'])
def transfer():
    try:
        if request.method == 'POST':
            json = request.get_json()
            to = json['address']
            name = json['name']
            amount = json['amount']
            contract.erc1155.transfer(to, PACK_ID, amount)
            member_list[to] = name
            if (to in pack_history):
               pack_history[to] += amount
            else:
               pack_history[to] = amount
            return { "result": "success" }
    except:
      abort(500)
# test用コマンド
# curl -X POST -H "Content-Type: application/json" -d '{"name":"まつだ", "address":"0xe4C91a4954644DB084Dc5bf4ccfDe1936dC6156E", "amount":2}' http://localhost:5001/transfer


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5000, debug=True)