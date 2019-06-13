import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controllor',
  templateUrl: './controllor.component.html',
  styleUrls: ['./controllor.component.css']
})
export class ControllorComponent implements OnInit {
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
