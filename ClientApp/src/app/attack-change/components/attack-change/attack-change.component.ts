import { Component, OnInit, Inject  } from '@angular/core';

// NGRX
import { Store, select } from '@ngrx/store';
import * as fromAttackChange from '../../index';

// RXJS
import { Observable } from 'rxjs';


@Component({
  selector: 'app-attack-change',
  templateUrl: './attack-change.component.html',
  styleUrls: ['./attack-change.component.css']
})
export class AttackChangeComponent implements OnInit {

  public attack$: Observable<string>;

  constructor(private store: Store<fromAttackChange.AppState>) {}

  ngOnInit() {

    this.store.dispatch( new fromAttackChange.GetAttack() );
    this.attack$ = this.store.pipe(select(fromAttackChange.getAttack));

  }

}
