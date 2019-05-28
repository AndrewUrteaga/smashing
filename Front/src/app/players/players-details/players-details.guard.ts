import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlayersDetailsGuard implements CanActivate {
   constructor(private router: Router){ }
   canActivate(
     next: ActivatedRouteSnapshot,
     state: RouterStateSnapshot
   ){
     let id = +next.url[1].path;
      //http get request return an obs. Need to check db


     if (!id){
       this.router.navigate(['/users'])
       return false;
     } return true

   }
}
