// const SDK = require('switcheo-chain-js-sdk') // use this instead if running this sdk as a library
const { RestClient, Network, newAccount, WalletClient } = require("../.")
const setupAccount = require("./setupAccount")
require('dotenv').config()

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const network = 'LOCALHOST'
async function set() {
    const wallet = await setupAccount(process.env.MNEMONICS)
    const minterClient = new RestClient({ wallet, network })
    const account = newAccount(network)
  
    
    const tokenReq = {
      toAddress: account.pubKeyBech32,
      mint: [
        {
          amount: '100000000',
          denom: 'swth',
        },
        {
          amount: '10000',
          denom: 'eth',
        },
        {
          amount: '1000000',
          denom: 'dai',
        }
      ],
    }
    const mintResult = await minterClient.mintMultipleTestnetTokens(tokenReq)
    console.log('mintResult', mintResult)
    await sleep(1000)
  
    const accountWallet = await WalletClient.connectMnemonic(account.mnemonic, network)
    const mainClient = new RestClient({ wallet: accountWallet, network})


  console.log('setting rewards')
  const params = {
      weights: [
          {
            pool_id: '1',
            weight: '1',
          },
      ],
  }
  const res = await mainClient.setRewardsWeights(params)
  console.log('set', res)
  process.exit()
}

set()
