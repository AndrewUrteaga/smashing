import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../players/players.service';
import { IPlayers } from '../players/players.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults$: Observable<IPlayers[]>;

  constructor(private playersService: PlayersService) {

  }
  ngOnInit() {
    this.searchResults$ = this.playersService.searchResults$.pipe(tap(data => console.log(data)));
  }
}
