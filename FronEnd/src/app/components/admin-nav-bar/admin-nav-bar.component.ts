import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.css']
})
export class AdminNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  schedule(){
    this.router.navigate(["admin", "schedule"]);
  }

  linesGrid(){
    this.router.navigate(["admin", "linesGrid"])
  }

  vehicleLocation(){
    this.router.navigate(["admin", "vehicleLocation"])
  }

  priceList(){
    this.router.navigate(["admin", "priceList"])
  }

  profile() {
    this.router.navigate(["admin", "profile"])
  }

  ngOnInit() {
  }

}
