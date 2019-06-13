import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-controllor-nav-bar',
  templateUrl: './controllor-nav-bar.component.html',
  styleUrls: ['./controllor-nav-bar.component.css']
})
export class ControllorNavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  validateTicket(){
    this.router.navigate(["controllor","validateTicket"]);
  }
}
