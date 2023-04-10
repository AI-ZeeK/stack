import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  constructor(private http: HttpClient) {}
  signInUser(authData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, authData);
  }
}
