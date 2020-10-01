// const SDK = require('switcheo-chain-js-sdk') // use this instead if running this sdk as a library
const SDK = require('../.')
const { clients } = SDK
const { WalletClient, RestClient } = clients
const mnemonics = require('../mnemonics.json')

async function createToken() {
  const wallet = await WalletClient.connectMnemonic(mnemonics[0], process.env.NET)
  const params = {
    name: 'Switcheo NEP-5',
    symbol: 'SWTHNV2',
    denom: 'swth-n-v2',
    decimals: '8',
    native_decimals: '8',
    blockchain: 'neo',
    chain_id: '4',
    asset_id: 'bce14688890823e90ccd2119b23cd7a212aca08b',
    is_collateral: false,
    lock_proxy_hash: '092cec2fd8e88693dc068a30176d667711df39e3',
    delegated_supply: '0',
  }
  const rest = new RestClient({ network: process.env.NET, wallet })
  rest.createToken(params).then(console.log)
}

createToken()
