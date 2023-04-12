import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Select, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import {
  AuthState,
  GetPosts,
  Post,
  QueryState,
  User,
  GetUser,
  GetUsers,
} from 'src/app/store/auth.actions';
import { GetComments } from 'src/app/store/comments.action';

export interface postType {
  id: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  name!: string;
  userData: User = {
    id: '',
    name: '',
    email: '',
    password: '',
    createdAt: '',
    token: '',
  };
  post = this.store.select((state) => state.users.posts);
  @Select(AuthState.getUser) user$!: Observable<User>;
  @Select(AuthState.getPosts) posts$!: Observable<Post[]>;
  @Select(AuthState.getPostsState) postsState$!: Observable<QueryState>;
  @Select(AuthState.getPostAuthors) PostAuthors$!: Observable<User>;
  postAuthorId!: string | undefined;
  // posts!: Post[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postData: PostService,
    private store: Store
  ) {}
  async ngOnInit() {
    this.store.dispatch(new GetPosts());
    this.store.dispatch(new GetUsers());
    this.store.dispatch(new GetComments());
  }
  ngDoCheck() {
    let data: User = JSON.parse(`${this.getData('access-token')}`);
    let user = data === null ? false : true;
    if (user) {
      this.userData.name = data.name;
      this.userData.email = data.email;
      this.userData.createdAt = data.createdAt;
    }
  }
  public getData(key: string) {
    return localStorage.getItem(key);
  }
}
