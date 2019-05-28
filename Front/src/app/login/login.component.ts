import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username
password
loginInvalid = false;

  constructor(private authService: AuthService,
              private router:Router) { }
              
  ngOnInit() {}
  
  login(formValues) {
    this.authService.loginUser(formValues.username, formValues.password)
    .subscribe(resp => {
        if(!resp) {
          this.loginInvalid = true
        } else {
          this.authService.isTokenBad
          this.authService.setToken
          this.router.navigate(['/users'])
        }
       }
    )
  }
}

