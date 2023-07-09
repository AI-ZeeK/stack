import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, Post } from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // user: User = JSON.parse(`${this.getData('access-token')}`);

//   private apiUrl = 'http://localhost:8000/post';
  private apiUrl = 'https://stack-8xlr.onrender.com/post';
  constructor(private http: HttpClient) {}
  getTwits(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createPost(post: Post): Observable<any> {
    const user: User = JSON.parse(`${this.getData('access-token')}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.post<Post>(this.apiUrl, post, httpOptions);
  }
  deletePost(postId: string): Observable<any> {
    const user: User = JSON.parse(`${this.getData('access-token')}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.delete(`${this.apiUrl}/${postId}`, httpOptions);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
}
