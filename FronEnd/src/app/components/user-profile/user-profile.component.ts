import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/models/ApplicationUser';
import { UserProfileHttpService, EditUserProfileService } from 'src/app/services/user/user.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfileInfo: ApplicationUser = new ApplicationUser;
  message:string

  updateForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required], 
    phoneNumber: ['', Validators.required],
    birthdate: ['', Validators.required],
    verificationStatus : [''],
    passengerType : [''],
    imageUrl: ['']
  });

  constructor(private fb: FormBuilder, private http: UserProfileHttpService, private updateUserService : EditUserProfileService) { }

  updateInfo() {
    this.updateUserService.post(this.updateForm.value).subscribe((userProfileInfo) =>  {
      if (userProfileInfo) {
        //this.updateForm.reset();
        this.message = "Uspesno ste izmenili profil";
      } 
      else {
        err => console.log("Greska pri izmeni profila");
        this.message = "GresGreska pri izmeni profila";
      }
    });
  }


  ngOnInit() {
    this.http.getAll().subscribe((userProfileInfo) => {
      this.userProfileInfo = userProfileInfo;

      if (userProfileInfo.Approved == "True") {
        this.userProfileInfo.Approved = "Odobren";
      } 
      else {
        this.userProfileInfo.Approved = "Nije odobren";
      }

      if (userProfileInfo.PassengerTypeId == "1") {
        this.userProfileInfo.PassengerTypeId = "Djak/Student";
      }
      else if (userProfileInfo.PassengerTypeId == "2") {
        this.userProfileInfo.PassengerTypeId = "Penzioner";
      }
      else if (userProfileInfo.PassengerTypeId == "3") {
        this.userProfileInfo.PassengerTypeId = "Regularan putnik";
      }
      else {
        this.userProfileInfo.PassengerTypeId = "Nepoznato";
      }

      this.updateForm.patchValue({ firstName : userProfileInfo.FirstName, lastName: userProfileInfo.LastName, 
        email: userProfileInfo.Email, address : userProfileInfo.Address, phoneNumber : userProfileInfo.PhoneNumber, 
      birthdate : userProfileInfo.BirthDate, verificationStatus : userProfileInfo.Approved, 
      passengerType : userProfileInfo.PassengerTypeId , imageUrl: userProfileInfo.ImageUrl})


      console.log(this.userProfileInfo);
      err => console.log(err);
    });
  }

}
