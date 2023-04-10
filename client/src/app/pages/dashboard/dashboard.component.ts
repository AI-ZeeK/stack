import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState, GetPosts, Post, User } from 'src/app/store/auth.actions';

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
  poosts: Post[] = [];
  // user = false;
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
  // posts!: Post[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postData: PostService,
    private store: Store
  ) {}
  ngOnInit() {
    this.store.dispatch(new GetPosts()).subscribe((posts) => {
      console.log(posts);
      this.poosts = posts.users.posts;
      console.log(this.poosts, posts);
    });
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
