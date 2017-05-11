import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ValidationService } from '../../services/validation.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  newUser: any = {};

  constructor(
    private router: Router,
    private auth: AuthService,
    private flashMessage: FlashMessagesService,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if(!this.validationService.validateRegister(this.newUser)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if(!this.validationService.validateEmail(this.newUser.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    this.auth.registerUser(this.newUser).subscribe(
      data => {
        if(data.success){
          this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 1500});
          this.router.navigate(['login']);
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 2000});
          this.router.navigate(['register']);
        }
      }
    );
  }

  // TODO: Remove this
  get diagnostic() { return JSON.stringify(this.newUser); }
}
