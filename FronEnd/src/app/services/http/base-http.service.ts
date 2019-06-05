import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseHttpService<T>{

    baseUrl = "http://localhost:52295"
    specificUrl = ""


    constructor(private http: HttpClient){
        
    }
    //za sve ostalo isto idu metode
    getAll():Observable<T>{
        return this.http.get<T>(this.baseUrl + this.specificUrl);
    }

    getById(id : number):Observable<T>{
        return this.http.get<T>(this.baseUrl + this.specificUrl + `/${id}`)
    }

    get(id1 : number, id2 : number):Observable<T>{
        return this.http.get<T>(this.baseUrl + this.specificUrl + `/${id1}` + `/${id2}`)
    }

    post(parms: T):Observable<T>{
        return this.http.post<T>(this.baseUrl + this.specificUrl, parms);
    }
    put(id: number, data: T):Observable<T>{
        return this.http.put<T>(this.baseUrl + this.specificUrl + `/${id}`, data);
    }
}