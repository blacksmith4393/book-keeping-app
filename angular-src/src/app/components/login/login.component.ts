import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    this.auth.authenticateUser(this.user).subscribe(
      data => {
        if (data.success) {
          this.auth.storeUserData(data.token, data.user);
          this.flashMessage.show('You are now logged in', {
            cssClass: 'alert-success',
            timeout: 1500
          });
          this.router.navigate(['']);
        } else {
          this.flashMessage.show(data.msg, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
          this.router.navigate(['login']);
        }
      }
    );
  }

}
