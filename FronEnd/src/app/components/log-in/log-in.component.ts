import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  message: string;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(public authService: AuthService, public router: Router, private fb: FormBuilder) {
    this.setMessage();
  }

  setMessage() {
    //this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe((data) => {
        if(data === "admin"){
          this.router.navigate(["admin"]);
        }
        else if (data === "user") {
          this.router.navigate(["user"]);
        }
        else if(data === "controllor"){
          this.router.navigate(["controllor"]);
        }
        else{
          this.router.navigate(["unauthorizedUser", "logIn"]);
          this.message = "Pogresan email ili loznika";
        }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
  

  Register(){
    this.router.navigate(['unauthorizedUser', 'register'])
  }

  ngOnInit() {
  }

}
