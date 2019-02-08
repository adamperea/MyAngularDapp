import { Component, OnInit, Inject  } from '@angular/core';

// NGRX
import { Store, select } from '@ngrx/store';
import * as fromEth from '../ethereum';

// RXJS
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Super Angular with Smart Contract';

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
