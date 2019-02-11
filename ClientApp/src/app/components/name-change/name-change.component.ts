import { Component, OnInit, Inject  } from '@angular/core';

// NGRX
import { Store, select } from '@ngrx/store';
import * as fromNameChange from '../../name-change';

// RXJS
import { Observable } from 'rxjs';


@Component({
  selector: 'app-name-change',
  templateUrl: './name-change.component.html',
  styleUrls: ['./name-change.component.css']
})
export class NameChangeComponent implements OnInit {

  public name$: Observable<string>;

  constructor(private store: Store<fromNameChange.AppState>) {}

  ngOnInit() {

    this.store.dispatch( new fromNameChange.GetName() );
    this.name$ = this.store.pipe(select(fromNameChange.getName));

  }

}
