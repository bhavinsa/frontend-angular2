import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../config/app.settings';
console.log('AppSettings.API_URL ==>' + AppSettings.API_URL);

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    create(data: any) {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(AppSettings.API_URL + 'user', data, options).map((res: Response) => res.json());
    }
    getUsers(data: any) {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(AppSettings.API_URL + 'user/getUsers', data, options).map((res: Response) => res.json());
    }
    deleteUsers(data: any) {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        let body = { _id: data }
        return this.http.post(AppSettings.API_URL + 'user/delete', body, options).map((res: Response) => res.json());
    }
    update(data: any) {
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.post(AppSettings.API_URL + 'user/update', data, options).map((res: Response) => res.json());
    }
}