import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { HomeComponent } from './home/home.component';
import { PlayersDetailsComponent } from './players/players-details/players-details.component';
import { PlayersDetailsGuard } from './players/players-details/players-details.guard';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './players/profile/profile.component';
import { RegisterComponent } from './login/register.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: PlayersComponent},
  {path: 'search', component: SearchComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
  {path: 'users/:id', canActivate: [AuthGuard], component: PlayersDetailsComponent}, 
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
