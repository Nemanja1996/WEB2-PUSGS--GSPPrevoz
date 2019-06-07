import { Component, OnInit } from '@angular/core';
import { ApplicationUserHttpService, EditAdminProfileHttpService } from 'src/app/services/user/user.service';
import { ApplicationUser } from 'src/app/models/ApplicationUser';
import { HttpBackend } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

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
