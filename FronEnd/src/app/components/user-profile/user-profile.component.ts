import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/models/ApplicationUser';
import { UserProfileHttpService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfileInfo: ApplicationUser = new ApplicationUser

  constructor(private http: UserProfileHttpService) { }

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

      console.log(this.userProfileInfo);
      err => console.log(err);
    });
  }

}
