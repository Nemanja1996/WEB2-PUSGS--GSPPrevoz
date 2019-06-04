import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ConfirmPasswordValidator } from './confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required], 
    password: ['', Validators.required], 
    confirmPassword: ['', Validators.required],
  }, {
    validator: ConfirmPasswordValidator.MatchPassword
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
