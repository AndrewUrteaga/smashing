import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import {map, tap} from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IPlayers } from './players.interface';



@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  searchResults$ = new BehaviorSubject <IPlayers[]> (null);

  public playersUrl = "http://localhost:3000/api/users";
  

  constructor(public http: HttpClient) {}

  public getPlayers(): Observable < IPlayers[] > {
    return this.http.get <IPlayers[]>(this.playersUrl)
  }
  public search(q: string): Observable < IPlayers[] > {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getPlayers().pipe(
      map(players => this.filterPlayers(q, players)),
      tap(filteredPlayers => this.searchResults$.next(filteredPlayers))
    )
  }

  public filterPlayers(q: string, players: IPlayers[]) {
    return players.filter(player => player.username.toLowerCase().includes(q) || player.name.toLowerCase().includes(q))
  };

  public updatePlayer(id, user){
    let options = { headers: new HttpHeaders( {'Content-Type' : 'application/json'})};
    

    return this.http.put("http://localhost:3000/api/users/"+ id, user ,options)
      
  }

  public getPlayer(id):Observable<any> {
    return this.http.get("http://localhost:3000/api/users/"+ id)
  };
 


}