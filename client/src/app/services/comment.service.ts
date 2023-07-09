import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../store/auth.actions';
import { Comments } from '../store/comments.action';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
//   private apiUrl = 'http://localhost:8000/comment';
  private apiUrl = 'https://stack-8xlr.onrender.com/comment';
  constructor(private http: HttpClient) {}

  deletePostComment(postId: string | undefined): any {
    const user: User = JSON.parse(`${this.getData('access-token')}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    console.log(postId, 234, `${this.apiUrl}/post/${postId}`);

    return this.http.delete(`${this.apiUrl}/post/${postId}`, httpOptions);
  }
  deleteComment(postId: string): any {
    const user: User = JSON.parse(`${this.getData('access-token')}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    console.log(postId, 123, `${this.apiUrl}/${postId}`);
    return this.http.delete(`${this.apiUrl}/${postId}`, httpOptions);
  }

  createComment(comment: Comments): Observable<any> {
    const user: User = JSON.parse(`${this.getData('access-token')}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    return this.http.post<Comments>(this.apiUrl, comment, httpOptions);
  }
  getComment(): Observable<any[]> {
    return this.http.get<Comments[]>(this.apiUrl);
  }
  updateComment(payload: any): Observable<any> {
    const user: User = JSON.parse(`${this.getData('access-token')}`);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }),
    };
    console.log(payload, 'upda');
    return this.http.patch(
      `${this.apiUrl}/${payload.id}`,
      { comment: payload.comment },
      httpOptions
    );
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
}
