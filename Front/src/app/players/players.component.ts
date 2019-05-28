import { Component, OnInit } from '@angular/core';
import { PlayersService } from './players.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  public user$;

  constructor(private playersService: PlayersService) { }

  ngOnInit() {
  this.user$ = this.playersService.getPlayers()
}}
