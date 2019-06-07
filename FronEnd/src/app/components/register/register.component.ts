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
    ImageUpload: [''],
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

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }
  

  ngOnInit() {
  }

}
