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

     /*
     based on https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethdefaultaccount
     The default address is used for the following method, for example :

        web3.eth.sendTransaction()
        (optionally you can overwrite it by specifying the from property):
     */
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



}
