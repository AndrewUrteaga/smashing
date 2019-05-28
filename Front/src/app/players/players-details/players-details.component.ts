import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayers } from '../players.interface';
import { PlayersService } from '../players.service';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-players-details',
  templateUrl: './players-details.component.html',
  styleUrls: ['./players-details.component.css']
})
export class PlayersDetailsComponent implements OnInit {
  // need to add getPlayer method to server to get requests
  private player$: Observable<IPlayers>;
  public hasPlayed = false;
  private id: String;
  private profileUser: any;
  public sameUserGame = false;
  private currentUser: any;
  private winRatio

  constructor(private route:ActivatedRoute,
              private router:Router,
              private playerService:PlayersService,
              private auth:AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.player$ = this.playerService.getPlayer(this.id);
    
    this.player$.subscribe(x=> this.profileUser = x)
    // returns profile details object
    
    this.player$.subscribe(x=> {
      if(x.winRatio == 0) {
        this.winRatio = x.winRatio;
      } else this.winRatio = Math.round((x.wins)/(x.wins+x.losses)*100)/100;

      })

    this.auth.userSubject$.subscribe(data=> this.currentUser = data)
  }

  onBack() {
    this.router.navigate(['/users'])
  }

  showResults(){
    return this.hasPlayed = true
  }

  sendMatch(formValue){
  if(this.currentUser.username === this.profileUser.username){
    return this.sameUserGame = true
    
  } else {
    if(formValue.winner === "other"){
      this.currentUser.losses+=1
      this.playerService.updatePlayer(this.currentUser._id, this.currentUser).subscribe()

      this.player$.pipe(
        map(winner=> {
         winner.wins+=1
          return winner}),
          switchMap(user=> this.playerService.updatePlayer(this.id, user))).subscribe()

          this.router.navigate(['./users'])
    }
    if(formValue.winner === "you"){
      this.currentUser.wins+=1
      this.playerService.updatePlayer(this.currentUser._id, this.currentUser).subscribe()

      
      this.player$.pipe(
        map(loser=> {
          loser.losses+=1
         return loser}),
         switchMap(user=> this.playerService.updatePlayer(this.id, user))).subscribe()
        this.router.navigate(['./users'])
    } 
  }
}
}
