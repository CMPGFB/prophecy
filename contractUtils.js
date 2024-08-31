import { StacksMainnet } from '@stacks/network';
import { stringUtf8CV, uintCV, trueCV, falseCV } from '@stacks/transactions';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const CONTRACT_NAME = 'prophecy-dapp';
const NETWORK = new StacksMainnet();

export async function createMarketOnChain(doContractCall, question) {
  return doContractCall({
    network: NETWORK,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'create-market',
    functionArgs: [stringUtf8CV(question)],
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
    onCancel: () => {
      console.log('Transaction canceled');
    },
  });
}

export async function buyPredictionOnChain(doContractCall, marketId, prediction, amount) {
  return doContractCall({
    network: NETWORK,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'buy-prediction',
    functionArgs: [uintCV(marketId), prediction ? trueCV() : falseCV(), uintCV(amount)],
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
    onCancel: () => {
      console.log('Transaction canceled');
    },
  });
}

export async function resolveMarketOnChain(doContractCall, marketId, outcome) {
  return doContractCall({
    network: NETWORK,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'resolve-market',
    functionArgs: [uintCV(marketId), outcome ? trueCV() : falseCV()],
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
    onCancel: () => {
      console.log('Transaction canceled');
    },
  });
}

export async function claimRewardOnChain(doContractCall, marketId) {
  return doContractCall({
    network: NETWORK,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'claim-reward',
    functionArgs: [uintCV(marketId)],
    onFinish: (data) => {
      console.log('Transaction:', data);
    },
    onCancel: () => {
      console.log('Transaction canceled');
    },
  });
}