import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';

import { AppConfig } from './app.config';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { UserService } from './services/user.service';
import { ValidationService } from './services/validation.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'search', component: SearchComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService, 
    AuthService, 
    ValidationService, 
    AuthGuard,
    AppConfig, 
    BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
