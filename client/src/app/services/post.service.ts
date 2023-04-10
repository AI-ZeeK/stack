import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Post } from '../store/auth.actions';
const user: User = JSON.parse(localStorage.getItem('access-token') as string);
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
  }),
};
const httpOptionsf = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8000/post';
  constructor(private http: HttpClient) {}
  getTwits(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createPost(post: Post): Observable<any> {
    console.log(post, httpOptions, typeof httpOptions);
    return this.http.post<Post>(this.apiUrl, post, httpOptions);
  }
  deletePost(postId: string): Observable<any> {
    console.log(user.token);
    return this.http.delete(`${this.apiUrl}/${postId}`, httpOptions);
  }
}
