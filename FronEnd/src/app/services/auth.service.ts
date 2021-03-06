import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, pipe, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/logInUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;

  loginUrl: string = 'http://localhost:52295/oauth/token';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return Observable.create((observable) => {
      
      this.http.post<any>(this.loginUrl, `username=`+ user.username +`&password=`+ user.password + `&grant_type=password`, { 'headers': { 'Content-type': 'x-www-form-urlencoded' } }).subscribe(
      res => {
        console.log(res.access_token);

        let jwt = res.access_token;

        let jwtData = jwt.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        let role = decodedJwtData.role

        console.log('jwtData: ' + jwtData)
        console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
        console.log('decodedJwtData: ' + decodedJwtData)
        console.log('Role ' + role)

        localStorage.setItem('jwt', jwt)
        localStorage.setItem('role', role);

        this.isLoggedIn = true;

        if(role === "Admin"){
          observable.next('admin');

          observable.complete();
        }
        else if (role === "AppUser") {
          observable.next('user');

          observable.complete();
        }
        else if(role === "Controller"){
          observable.next('controllor');

          observable.complete();
        }
      },
      err => {
      observable.next('greska')
      observable.complete();
      }
      )
    }
    )
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
