import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/models/ApplicationUser';
import { Validators, FormBuilder } from '@angular/forms';
import { ConfirmPasswordValidator } from '../register/confirm-password.validator';
import { RegisterApplicationUserHttpService, RegisterControllorHttpService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-controlor',
  templateUrl: './add-controlor.component.html',
  styleUrls: ['./add-controlor.component.css']
})
export class AddControlorComponent implements OnInit {

  newUser: ApplicationUser = new ApplicationUser;
  message: string;
  url: string =  '';

  addControlorForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required], 
    phoneNumber: ['', Validators.required],
    birthdate: ['', Validators.required],
    password: ['', Validators.required], 
    confirmPassword: ['', Validators.required],
  }, {
    validator: ConfirmPasswordValidator.MatchPassword
  });

  constructor(private fb: FormBuilder, private registerService: RegisterControllorHttpService) { }

  register() {
    this.registerService.post(this.addControlorForm.value).subscribe((userData) =>  {
      if (userData) {
        this.addControlorForm.reset();
        this.message = "Uspesno ste registrovali kontrolora";
      } 
      else {
        err => console.log("Greska pri registraciji kontrolora");
        this.message = "Greska pri registraciji kontrolora";
      }
    });
  }

  ngOnInit() {
  }

}
