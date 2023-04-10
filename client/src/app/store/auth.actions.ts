import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// export class User {
//   id!: string;
//   name!: string;
//   email!: string;
//   token!: string;
//   createdAt!: string;
// }
export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  createdAt?: string;
}
// export class Post {
//   id!: string;
//   authorId!: string;
//   content!: string;
//   title!: string;
//   createdAt!: string;
// }
export interface Post {
  id?: string;
  authorId: string | undefined;
  content: string;
  title: string;
  createdAt?: string;
}
class QueryState {
  isLoading!: boolean;
  isError!: boolean;
  isSuccess!: boolean;
}
class AppInitial {
  user!: User | null;
  posts!: Post[];
  userState!: QueryState;
}

export class SignInUser {
  static readonly type = '[User] Signin User';
  constructor(public payload: any = null) {}
}

export class SetUsers {
  static readonly type = '[User] Set Users';
  constructor(public payload: User) {}
}
export class GetPosts {
  static readonly type = '[Post] Get Posts';
}
export class DeletePost {
  static readonly type = '[Post] Delete Post';
  constructor(public payload: string | undefined) {}
}
export class CreatePost {
  static readonly type = '[Post] Create Post';
  constructor(public payload: Post) {}
}

@State<AppInitial>({
  name: 'users',
  defaults: {
    user: null,
    posts: [],
    userState: {
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
  },
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @Selector()
  static getUsers(state: AppInitial): User | null {
    return state.user;
  }
  @Selector()
  static getPosts(state: AppInitial): Post[] {
    return state.posts;
  }
  @Selector()
  static getUser(state: any) {
    return state.user;
  }
  @Action(SignInUser)
  signInUser(ctx: StateContext<User>, { payload }: any): Observable<User> {
    return this.authService.signInUser(payload).pipe(
      tap((user: User) => {
        ctx.dispatch(new SetUsers(user));
        user && this.router.navigate(['']);
      })
    );
  }

  @Action(SetUsers)
  setUsers(ctx: StateContext<AppInitial>, { payload }: SetUsers): void {
    const data = JSON.stringify(payload);
    const state = ctx.getState();
    ctx.patchState({
      user: payload,
    });
    this.saveData('access-token', data);
  }
  @Action(GetPosts)
  getPosts(ctx: StateContext<AppInitial>): Observable<Post[]> {
    return this.postService.getTwits().pipe(
      tap((posts: Post[]) => {
        ctx.patchState({
          posts,
        });
        console.log(posts);
      })
    );
  }
  @Action(CreatePost)
  createPost(
    ctx: StateContext<AppInitial>,
    { payload }: any
  ): Observable<Post> {
    const state = ctx.getState();
    return this.postService.createPost(payload).pipe(
      tap((post: Post) => {
        ctx.patchState({
          posts: [...state.posts, post],
        });
      })
    );
  }

  @Action(DeletePost)
  deletePost(
    ctx: StateContext<AppInitial>,
    { payload }: any
  ): Observable<Post> {
    const state = ctx.getState();
    console.log(state.posts, 12);
    ctx.patchState({
      posts: state.posts.filter((element) => {
        return element.id !== payload;
      }),
    });
    console.log(state.posts, 24);
    return this.postService.deletePost(payload);
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  public getData(key: string) {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    return localStorage.removeItem(key);
  }

  ngDoCheck() {
    let data = this.getData('access-token');

    // this.user = data === null ? false : true;
  }
}
