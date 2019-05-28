import { Component, OnInit } from '@angular/core';
import data from '../../assets/characters.json'
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
characters:any;
invalidInfo = false;

  constructor(public http:HttpClient,
              public auth:AuthService,
              public router:Router
              ) { }

  ngOnInit() {
   this.characters = data;
  }

  register(formValues){
    this.auth.registerUser(formValues).subscribe(
      result=>{
        if(result){
          this.auth.setUserSubject(result);  
          console.log(this.auth.isLoggedIn)
          
          this.auth.setLoggedIn(true)
          this.router.navigate(['/users'])
            
        } else this.invalidInfo = true;
      }
    )
  }
}
