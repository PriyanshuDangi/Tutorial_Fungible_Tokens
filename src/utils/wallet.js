import {TezosToolkit, MichelsonMap} from '@taquito/taquito';
import {BeaconWallet} from '@taquito/beacon-wallet';
import * as config from '../config/config';
import {char2Bytes} from '@taquito/utils';

const Tezos = new TezosToolkit(config.RPC_URL);

const options = {
  name: config.NAME,
  iconUrl: 'https://tezostaquito.io/img/favicon.png',
  preferredNetwork: config.NETWORK,
};

const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);

const connectWallet = async () => {
  await wallet.requestPermissions({
    network: {
      type: config.NETWORK,
    },
  });
  return wallet;
};

const disconnectWallet = async () => {
  await wallet.clearActiveAccount();
};

const getPKH = async () => {
  const pkh = await wallet.getPKH();
  return pkh;
};

const getContract = async () => {
  const contract = await Tezos.wallet.at(config.CONTRACT_ADDRESS);
  return contract;
};

const mint = async (address, amount) => {
  await disconnectWallet();
  await connectWallet();
  const token_id = 0;
  let url = '';
  const contract = await getContract();
  url = char2Bytes(url);
  const op = await contract.methods.mint(address, amount, MichelsonMap.fromLiteral({'': url}), token_id).send();
  return await op.confirmation(3);
};

const transfer = async (address, transactions) => {
  await disconnectWallet();
  await connectWallet();
  const token_id = 0;
  const txs = transactions.map((transaction) => {
    return {
      to_: transaction.to,
      amount: transaction.amount,
      token_id: token_id,
    };
  });
  const contract = await getContract();
  const op = await contract.methods
    .transfer([
      {
        from_: address,
        txs: txs,
      },
    ])
    .send();
  return await op.confirmation(3);
};

export {mint, transfer};
