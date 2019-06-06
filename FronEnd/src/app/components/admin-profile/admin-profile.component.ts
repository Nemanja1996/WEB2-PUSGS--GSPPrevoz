import { Component, OnInit } from '@angular/core';
import { ApplicationUserHttpService } from 'src/app/services/user/user.service';
import { ApplicationUser } from 'src/app/models/ApplicationUser';
import { HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  profileInfo: ApplicationUser = new ApplicationUser

  constructor(private http: ApplicationUserHttpService) { }

  ngOnInit() {
    this.http.getAll().subscribe((profileInfo) => {
      this.profileInfo = profileInfo;
      console.log(this.profileInfo);
      err => console.log(err);
    });
  }
}
