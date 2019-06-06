import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.css']
})
export class UserNavBarComponent implements OnInit {

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  schedule(){
    this.router.navigate(["user", "schedule"]);
  }

  linesGrid(){
    this.router.navigate(["user", "linesGrid"])
  }

  vehicleLocation(){
    this.router.navigate(["user", "vehicleLocation"])
  }

  priceList(){
    this.router.navigate(["user", "priceList"])
  }

  profile() {
    this.router.navigate(["user", "profile"])
  }

}
