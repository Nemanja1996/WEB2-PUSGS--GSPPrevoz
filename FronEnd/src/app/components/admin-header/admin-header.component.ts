import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  Profile(){
    this.router.navigate(["admin", "profile"]);
  }
  LogOut(){
    this.authService.logout();
    this.router.navigate(["unauthorizedUser"]);
  }

}
