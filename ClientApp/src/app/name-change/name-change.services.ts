import { Injectable, Inject } from '@angular/core';
// Web3
import { WEB3 } from '../services/tokens';
import Web3 from 'web3';

// RXJS
/*
!!! here we using bindNodeCallback. To be continue with explanation and example.....
*/
import { Observable, of, from } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class NameChangeService {

    constructor(@Inject(WEB3) private web3: Web3) {
     }


    public getName(): Observable<string> {
       // !!! here we are using the from operator to convert Promise to Observable
        // see https://www.learnrxjs.io/operators/creation/from.html
        return from<string>(this.web3.eth.showName());
    }


    public setName(name: string): Observable<string | Error> {

            return this.web3.eth.changeName(name).pipe(
                tap((response: any) => console.log('Got response from ChangeName event', response)),
               // !!! see what i am getting and extract just name from the response
                // map((response: any) => response.arg.log.name),

                catchError((err: Error) => of(err))
            );
        }


}
