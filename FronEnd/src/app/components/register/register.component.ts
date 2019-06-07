import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {ConfirmPasswordValidator } from './confirm-password.validator';
import { RegisterApplicationUserHttpService } from 'src/app/services/user/user.service';
import { ApplicationUser } from 'src/app/models/ApplicationUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: ApplicationUser = new ApplicationUser;
  message: string;
  url: '';

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required], 
    phone: ['', Validators.required],
    birthdate: ['', Validators.required],
    passengerType: ['', Validators.required],
    ImageUrl: [''],
    password: ['', Validators.required], 
    confirmPassword: ['', Validators.required],
  }, {
    validator: ConfirmPasswordValidator.MatchPassword
  });

  constructor(private fb: FormBuilder, private registerService: RegisterApplicationUserHttpService) { }

  register() {
    this.registerService.post(this.registerForm.value).subscribe((userData) =>  {
      if (userData) {
        this.registerForm.reset();
        this.message = "Uspesno ste se registrovali";
      } 
      else {
        err => console.log("Greska pri registraciji");
        this.message = "Greska pri registraciji";
      }
    });
  }

  public imagePath;
  imgURL: any;
  public msg: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      console.log(reader);
      this.imgURL = reader.result; 
    }
  }
  

  ngOnInit() {
  }

}
