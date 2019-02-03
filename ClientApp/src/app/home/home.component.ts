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

  public addresses$: Observable<string[]>;

  constructor(private store: Store<fromEth.AppState>) {}


  /*
  based on https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
and
  based on https://medium.com/b2expand/inject-web3-in-angular-6-0-a03ca345892
This code use the new way to connect to the MetaMask.
!!!The first time you use this token in your code you should call the enable method of window.ethereum :

  */

  ngOnInit() {

    this.store.dispatch( new fromEth.InitEth() );

  }

}
