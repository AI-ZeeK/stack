import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt?: string;
}
export interface Post {
  id?: string;
  authorId: string | undefined;
  content: string;
  title: string;
  createdAt?: string;
}
export class QueryState {
  isLoading!: boolean;
  isError!: boolean;
  isSuccess!: boolean;
}
class AppInitial {
  user!: User | null;
  posts!: Post[];
  postAuthors!: User[];
  userState!: QueryState;
  postsState!: QueryState;
}

export class SignInUser {
  static readonly type = '[User] Signin User';
  constructor(public payload: any = null) {}
}

export class SetUsers {
  static readonly type = '[User] Set Users';
  constructor(public payload: User) {}
}
export class GetUser {
  static readonly type = '[User] Get User';
  constructor(public payload: string | undefined) {}
}
export class GetUsers {
  static readonly type = '[User] Get Users';
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
    postAuthors: [],
    posts: [],
    userState: {
      isLoading: false,
      isSuccess: false,
      isError: false,
    },
    postsState: {
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
  static getPostAuthors(state: AppInitial): User[] {
    return state.postAuthors;
  }
  @Selector()
  static getUser(state: any) {
    return state.user;
  }
  @Selector()
  static getUserState(state: any): QueryState {
    return state.userState;
  }
  @Selector()
  static getPostsState(state: any) {
    return state.postsState;
  }
  @Action(SignInUser)
  signInUser(
    { patchState, dispatch }: StateContext<AppInitial>,
    { payload }: any
  ): Observable<User> {
    patchState({
      userState: { isLoading: true, isSuccess: false, isError: false },
    });

    return this.authService.signInUser(payload).pipe(
      tap((user: User) => {
        dispatch(new SetUsers(user));
        patchState({
          userState: { isLoading: false, isSuccess: false, isError: false },
        });
        user && this.router.navigate(['']);
      })
    );
  }
  // @Action(GetUser)
  // getPostAuthor(
  //   ctx: StateContext<AppInitial>,
  //   { payload }: any
  // ): Observable<User> {
  //   return this.authService.getUser(payload).pipe(
  //     tap((postAuthor: User) => {
  //       ctx.patchState({
  //         postAuthor,
  //       });
  //     })
  //   );
  // }
  @Action(GetUsers)
  getPostAuthors(
    ctx: StateContext<AppInitial>,
    { payload }: any
  ): Observable<User[]> {
    return this.authService.getUsers().pipe(
      tap((postAuthors: User[]) => {
        ctx.patchState({
          postAuthors,
        });
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
    setTimeout(() => {
      localStorage.removeItem('access-token');
      this.router.navigate(['login']);
    }, 21600000);
  }
  @Action(GetPosts)
  getPosts(ctx: StateContext<AppInitial>): Observable<Post[]> {
    let state = ctx.getState();
    ctx.patchState({
      postsState: {
        isError: false,
        isLoading: true,
        isSuccess: false,
      },
    });
    return this.postService.getTwits().pipe(
      tap(
        (posts: Post[]) => {
          ctx.patchState({
            posts,
            postsState: {
              isError: false,
              isLoading: false,
              isSuccess: true,
            },
          });
          console.log(posts);
        },
        (error) => {
          ctx.patchState({
            postsState: {
              isError: true,
              isLoading: false,
              isSuccess: false,
            },
          });
        }
      )
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
  deletePost(ctx: StateContext<AppInitial>, { payload }: any) {
    const state = ctx.getState();
    ctx.patchState({
      posts: state.posts.filter((element) => {
        return element.id !== payload;
      }),
    });
    this.postService.deletePost(payload).subscribe((value) => {
      console.log(value);
    });
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
