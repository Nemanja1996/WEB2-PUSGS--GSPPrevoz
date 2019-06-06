import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { ApplicationUser } from 'src/app/models/ApplicationUser';

@Injectable()
export class ApplicationUserHttpService extends BaseHttpService<ApplicationUser>{
    specificUrl = "/api/Account/UserInfo"
}

export class RegisterApplicationUserHttpService extends BaseHttpService<ApplicationUser>{
    specificUrl = "/api/Account/Register"
}

export class UserProfileHttpService extends BaseHttpService<ApplicationUser> {
    specificUrl = "/api/Account/RegularUserInfo"
}