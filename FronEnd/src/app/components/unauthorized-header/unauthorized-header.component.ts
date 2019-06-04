import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized-header',
  templateUrl: './unauthorized-header.component.html',
  styleUrls: ['./unauthorized-header.component.css']
})
export class UnauthorizedHeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  LogIn(){
    this.router.navigate(['unauthorizedUser', 'logIn'])
  }

  ngOnInit() {
  }
  Register(){
    this.router.navigate(['unauthorizedUser', 'register']);
  }
}
