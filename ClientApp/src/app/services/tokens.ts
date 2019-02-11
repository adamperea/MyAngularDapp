import { InjectionToken } from '@angular/core';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';


export const WEB3 = new InjectionToken<Web3>('web3Token', {
  providedIn: 'root',
  factory: () => {
    // based on https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    try {
      const provider = ('ethereum' in window) ? window['ethereum'] : Web3.givenProvider;
      return new Web3(provider);
    } catch (err) {
      throw new Error('Non-Ethereum browser detected. You should consider trying Mist or MetaMask!');
    }
  }
});

export const SmartContract = new InjectionToken<TruffleContract>('smartContract', {
  providedIn: 'root',
  factory: () => {
    const tokenAbi = require('../../../../build/contracts/NameChange.json');
    return TruffleContract(tokenAbi);
  }
});

