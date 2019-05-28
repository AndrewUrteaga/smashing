import { Injectable } from '@angular/core';
import { 
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // 1. Decode token and verify token 
    
      // 2. refresh token 
      // 3. continue 
      let token = this.auth.getToken()
      let req = request.clone({
        setHeaders: {
            Authorization: `Bearer ${{token}}`
        } 
      })
      return next.handle(req) 
    

    // 2. re-reoute to login
    console.log('poo')
    //this.router.navigate(['login']);
    return next.handle(request)
  }
}


// create auth guards for better use experience, prevent routes from being hit before interceptor intercepts requests
// persist login with decode token and set username as currentuser
// create logic for ranking and win%

// TO DO:
// CHECK AUTH FOR JWT AND USER ROUTE MIDDLEWARE
// CHECK PUT METHOD IN PLAYER DETAILS UPDATE METHOD 
