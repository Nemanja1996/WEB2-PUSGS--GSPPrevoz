import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controllor-header',
  templateUrl: './controllor-header.component.html',
  styleUrls: ['./controllor-header.component.css']
})
export class ControllorHeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router:Router) { }
  

  ngOnInit() {
  }

  Profile(){
    this.router.navigate(["controllor", "profile"]);
  }
  LogOut(){
    this.authService.logout();
    this.router.navigate(["unauthorizedUser"]);
  }
}
