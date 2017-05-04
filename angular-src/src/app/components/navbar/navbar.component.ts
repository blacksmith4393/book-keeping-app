import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isIn = false;   // store state

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  toggleState() { // click handler
    let bool = this.isIn;
    this.isIn = bool === false ? true : false; 
  }

  onLogoutClick(){
    this.auth.logout();
    this.flashMessage.show('Successfully logged out.', {
      cssClass: 'alert-success',
      timeout: 1500
    });
    this.router.navigate(['login']);
    return false;
  }

}
