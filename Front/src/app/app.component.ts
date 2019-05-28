import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public authStatus: any;
  public currentUser
  
  
  constructor(public auth:AuthService, 
              public router: Router,
              public http:HttpClient){}

  ngOnInit(){
    this.auth.checkAuthenticationStatus().subscribe()
   }
  }

