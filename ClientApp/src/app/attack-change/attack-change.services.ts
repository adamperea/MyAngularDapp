import { Injectable, Inject } from '@angular/core';


import {SmartContract } from '../services/tokens';
import {TruffleContract} from 'truffle-contract';
// RXJS
/*
!!! here we using bindNodeCallback. To be continue with explanation and example.....
*/
import { Observable, of, from } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AttackChangeService {

    constructor( @Inject(SmartContract) private smartContract: TruffleContract) {
     }


    public getAttack(): Observable<string | Error> {
       // !!! here we are using the from operator to convert Promise to Observable
        // see https://www.learnrxjs.io/operators/creation/from.html
        // !!phenomenal
        return from(this.smartContract.deployed()).pipe(
            switchMap((instance: any) => from<string>(instance.currentAttack())
        ));

    }

    // ... pending fix this
    public setAttack(name: string): Observable<string | Error> {

            return this.smartContract.changeAttack(name).pipe(
                tap((response: any) => console.log('Got response from ChangeAttack event', response)),
               // !!! see what i am getting and extract just name from the response
                // map((response: any) => response.arg.log.name),
                map(_ => of('Hopi')),
                catchError((err: Error) => of(err))
            );
        }


}
