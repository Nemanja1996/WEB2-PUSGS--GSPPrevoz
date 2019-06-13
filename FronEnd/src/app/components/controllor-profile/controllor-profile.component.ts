import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/models/ApplicationUser';
import { Validators, FormBuilder } from '@angular/forms';
import { ApplicationUserHttpService, EditAdminProfileHttpService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-controllor-profile',
  templateUrl: './controllor-profile.component.html',
  styleUrls: ['./controllor-profile.component.css']
})
export class ControllorProfileComponent implements OnInit {
  profileInfo: ApplicationUser = new ApplicationUser;
  message:string;

  updateForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required], 
    phoneNumber: ['', Validators.required],
    birthdate: ['', Validators.required],
  });

  constructor(private fb:FormBuilder, private http: ApplicationUserHttpService, private updateAdminService: EditAdminProfileHttpService) { }

  ngOnInit() {
    this.http.getAll().subscribe((profileInfo) => {
      this.profileInfo = profileInfo;
      this.updateForm.patchValue({ firstName : profileInfo.FirstName, lastName: profileInfo.LastName, 
        email: profileInfo.Email, address : profileInfo.Address, phoneNumber : profileInfo.PhoneNumber, 
      birthdate : profileInfo.BirthDate })
      console.log(this.profileInfo);
      err => console.log(err);
    });
  }

  updateInfo() {
    this.updateAdminService.post(this.updateForm.value).subscribe((profileInfo) =>  {
      if (profileInfo) {
        //this.updateForm.reset();
        this.message = "Uspesno ste izmenili profil";
      } 
      else {
        err => console.log("Greska pri izmeni profila");
        this.message = "GresGreska pri izmeni profila";
      }
    });
  }

}
