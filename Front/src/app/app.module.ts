import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EmbedVideo } from 'ngx-embed-video'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { PlayersDetailsComponent } from './players/players-details/players-details.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './players/profile/profile.component';
import {  JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './login/register.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';



export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    NavBarComponent,
    HomeComponent,
    PlayersDetailsComponent,
    LoginComponent,
    SearchComponent,
    ProfileComponent,
    RegisterComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    EmbedVideo.forRoot(),
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000']
      }
      })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
