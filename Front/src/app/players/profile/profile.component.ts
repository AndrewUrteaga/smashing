import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import data from '../../../assets/characters.json'
import { switchMap, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { error } from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
profile:any = {name:""};
characters: Object;
invalidInfo: Boolean = false;
id:String;
selectedFile:File;
savedProfile=false
@ViewChild('editForm')
private myForm: NgForm;


  constructor(public auth: AuthService,
              public http: HttpClient) {  }


  ngOnInit() {
  this.characters = data;
  this.auth.checkAuthenticationStatus().subscribe(data=>{
    console.log(data)
    this.profile=data
    this.id = this.profile._id
  })
}
  onFileSelect(event){
    this.selectedFile=<File>event.target.files[0];
  }
  onUpload(){
    let fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post("http://localhost:3000/api/image-upload",fd).subscribe(data=>{
     this.myForm.value.picture = data
     
    }
    )
  } 
  
  submitEdit(formData){
    // this.myForm.value.url = "banana"
    console.log(formData)
    this.auth.editUser(formData, this.id).subscribe(data=>{
      if(data.error){
        console.log(data)
        this.invalidInfo = true
        this.savedProfile = false
      } else {
        this.savedProfile = true
        this.invalidInfo = false
      }

      
    }
    )
  }
}
