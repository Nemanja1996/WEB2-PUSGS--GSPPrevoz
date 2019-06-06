import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  Profile(){
    this.router.navigate(["user", "profile"]);
  }
  LogOut(){
    this.authService.logout();
    this.router.navigate(["unauthorizedUser"]);
  }

}
