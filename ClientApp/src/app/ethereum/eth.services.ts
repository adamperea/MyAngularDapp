import { Injectable, Inject } from '@angular/core';
// Web3
import { WEB3 } from './tokens';
import Web3 from 'web3';

// RXJS
/*
!!! here we using bindNodeCallback. To be continue with explanation and example.....
*/
import { Observable, of, bindNodeCallback } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class AccountsService {

    constructor(@Inject(WEB3) private web3: Web3) {
     }

    get defaultAccount(): string { return this.web3.eth.defaultAccount; }
    set defaultAccount(account: string) { this.web3.eth.defaultAccount = account; }

    /** Returns all accounts available */
    public getAccounts(): Observable<string[]> {
        return bindNodeCallback(this.web3.eth.getAccounts)();
    }

    /** Get the current account */
    public currentAccount(): Observable<string | Error> {
        if (this.web3.eth.defaultAccount) {
            return of(this.web3.eth.defaultAccount);
        } else {
            return this.getAccounts().pipe(
                tap((accounts: string[]) => {
                    if (accounts.length === 0) { throw new Error('No accounts available'); }
                }),
                map((accounts: string[]) => accounts[0]),
                tap((account: string) => this.defaultAccount = account),
                catchError((err: Error) => of(err))
            );
        }
    }


    // ..put it into effect and call from the constructor!!!!
    /*
    async init() {
      if ('enable' in this.web3.currentProvider) {
        try {
          // Request account access if needed
          await this.web3.currentProvider.enable();
          // Accounts now exposed
          // do test call
          //this.web3.eth.sendTransaction({
            //
          //});

        } catch (error) {
          console.log('can not access web3 account', error);
        }
      }
    }
    */


}
