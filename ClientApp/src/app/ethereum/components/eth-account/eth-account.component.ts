import { Component, OnInit, Inject  } from '@angular/core';

// NGRX
import { Store, select } from '@ngrx/store';
import * as fromEth from '../../index';

// RXJS
import { Observable } from 'rxjs';


@Component({
  selector: 'app-eth-account',
  templateUrl: './eth-account.component.html',
  styleUrls: ['./eth-account.component.css']
})
export class EthAccountComponent implements OnInit {

  public accounts$: Observable<string[]>;
  public defaultAcc$: Observable<string>;
  public balance$: Observable<string>;

  constructor(private store: Store<fromEth.AppState>) {}

  ngOnInit() {

    // dispatch action to get default account balance
    [new fromEth.GetAccountBalance()].forEach(a => this.store.dispatch(a) );

    this.defaultAcc$ = this.store.pipe(select(fromEth.getDefaultAccount));
    this.balance$ = this.store.pipe(select(fromEth.getAccountBalance));
    this.accounts$ = this.store.pipe(select(fromEth.getAllAccounts));
  }

}
