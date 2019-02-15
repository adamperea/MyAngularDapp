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

  constructor(private store: Store<fromEth.AppState>) {}

  ngOnInit() {

    this.store.dispatch( new fromEth.GetAccounts() );
    this.store.dispatch( new fromEth.GetDefaultAccount() );

    this.accounts$ = this.store.pipe(select(fromEth.getAllAccounts));
    this.defaultAcc$ = this.store.pipe(select(fromEth.getDefaultAccount));

  }

}
