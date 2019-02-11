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
export class NameChangeService {

    constructor( @Inject(SmartContract) private smartContract: TruffleContract) {
     }


    public getName(): Observable<string | Error> {
       // !!! here we are using the from operator to convert Promise to Observable
        // see https://www.learnrxjs.io/operators/creation/from.html
        // !!phenomenal
        return from(this.smartContract.deployed()).pipe(
            switchMap((instance: any) => from(instance.showName()).pipe(
            map((name: string) => name),
            catchError((err: Error) => of(err))
          )
        ));

    }


    public setName(name: string): Observable<string | Error> {

            return this.smartContract.changeName(name).pipe(
                tap((response: any) => console.log('Got response from ChangeName event', response)),
               // !!! see what i am getting and extract just name from the response
                // map((response: any) => response.arg.log.name),
                map(_ => of('Hopi')),
                catchError((err: Error) => of(err))
            );
        }


}
