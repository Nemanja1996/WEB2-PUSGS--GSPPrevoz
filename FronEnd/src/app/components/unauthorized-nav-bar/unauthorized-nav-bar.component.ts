import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-nav-bar',
  templateUrl: './unauthorized-nav-bar.component.html',
  styleUrls: ['./unauthorized-nav-bar.component.css']
})
export class UnauthorizedNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  schedule(){
    this.router.navigate(["unauthorizedUser", "schedule"]);
  }

  linesGrid(){
    this.router.navigate(["unauthorizedUser", "linesGrid"])
  }

  vehicleLocation(){
    this.router.navigate(["unauthorizedUser", "vehicleLocation"])
  }

  priceList(){
    this.router.navigate(["unauthorizedUser", "priceList"])
  }

  ngOnInit() {
  }

}
