import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlayersService } from '../players/players.service';
import { AuthService } from '../auth/auth.service'
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})


export class NavBarComponent implements OnInit {
  query: string;
  searchResults$;
  isLoggedIn:Boolean;

  constructor(public playersService:PlayersService,
              public auth:AuthService) { }
  
  

  
  searchUser() {
    this.playersService.search(this.query).subscribe(
      (data) => {this.searchResults$ = data },
      error => console.log(error)
    );
  }

  
  ngOnInit() {
    this.auth.isLoggedIn$.subscribe(status=> { 
      this.isLoggedIn = status;
      console.log(status);
    });
  }
}
