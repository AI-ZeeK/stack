import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { CommentService } from '../services/comment.service';
import { QueryState } from './auth.actions';

export interface Comments {
  id?: string;
  comment: string;
  postId: string | undefined;
  commentorId?: string;
}

class AppInitial {
  comments!: Comments[];
  commentState!: QueryState;
}

export class CreateComment {
  static readonly type = '[Comment] Create Comment';
  constructor(public payload: Comments) {}
}
export class GetComments {
  static readonly type = '[Comment] Get Comments';
}
export class DeleteComment {
  static readonly type = '[Comment] Delete Comment';
  constructor(public payload: string | undefined) {}
}
export class RemoveComment {
  static readonly type = '[Comment] Remove Comment';
  constructor(public payload: string | undefined) {}
}

@State<AppInitial>({
  name: 'comments',
  defaults: {
    comments: [],
    commentState: {
      isError: false,
      isLoading: false,
      isSuccess: false,
    },
  },
})
@Injectable()
export class CommentState {
  constructor(private commentService: CommentService) {}

  @Selector()
  static getComments(state: any) {
    return state.comments;
  }
  @Selector()
  static getCommentState(state: any) {
    return state.commentState;
  }
  @Action(CreateComment)
  createComment(
    ctx: StateContext<AppInitial>,
    { payload }: any
  ): Observable<Comments> {
    const state = ctx.getState();
    ctx.patchState({
      commentState: {
        isError: false,
        isLoading: true,
        isSuccess: false,
      },
    });
    return this.commentService.createComment(payload).pipe(
      tap(
        (comment: Comments) => {
          console.log(comment);

          ctx.patchState({
            comments: [...state.comments, comment],
            commentState: {
              isError: false,
              isLoading: false,
              isSuccess: true,
            },
          });
        },
        (error) => {
          ctx.patchState({
            commentState: {
              isError: true,
              isLoading: false,
              isSuccess: false,
            },
          });
        }
      )
    );
  }
  @Action(GetComments)
  getComment(ctx: StateContext<AppInitial>): Observable<Comments[]> {
    ctx.patchState({
      commentState: {
        isError: false,
        isLoading: true,
        isSuccess: false,
      },
    });
    return this.commentService.getComment().pipe(
      tap(
        (comments: Comments[]) => {
          console.log(comments);
          ctx.patchState({
            comments,
            commentState: {
              isError: false,
              isLoading: false,
              isSuccess: true,
            },
          });
        },
        (error) => {
          ctx.patchState({
            commentState: {
              isError: true,
              isLoading: false,
              isSuccess: false,
            },
          });
        }
      )
    );
  }

  @Action(DeleteComment)
  deleteComment(ctx: StateContext<AppInitial>, { payload }: any) {
    const state = ctx.getState();
    console.log(payload);
    this.commentService.deleteComment(payload).subscribe(
      (value: any) => {
        ctx.patchState({
          comments: state.comments.filter((element) => {
            return element.id !== payload;
          }),
        });
        console.log(value);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  @Action(RemoveComment)
  removePost(ctx: StateContext<AppInitial>, { payload }: any) {
    const state = ctx.getState();

    ctx.patchState({
      comments: state.comments.filter((element) => {
        return element.id !== payload;
      }),
    });
  }
}
