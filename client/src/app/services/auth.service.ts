import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../store/auth.actions';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
//   private apiUrl = 'http://localhost:8000/user';
  private apiUrl = 'https://stack-8xlr.onrender.com/user';
  constructor(private http: HttpClient) {}
  signInUser(authData: any): Observable<any> {
    return this.http.post(this.apiUrl, authData);
  }
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
}
