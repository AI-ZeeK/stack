import { Component, Input } from '@angular/core';
import {
  faClose,
  faComments,
  faDeleteLeft,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { postType } from 'src/app/pages/dashboard/dashboard.component';
import { CommentService } from 'src/app/services/comment.service';
import { AuthState, DeletePost, Post, User } from 'src/app/store/auth.actions';
import {
  CommentState,
  Comments,
  CreateComment,
  DeleteComment,
} from 'src/app/store/comments.action';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  @Input() post!: Post;
  @Input() postAuthor!: User;
  faClose = faClose;
  faComments = faComments;
  faDeleteLeft = faDeleteLeft;
  faEdit = faEdit;
  comment!: string;
  isCommentBoxOpen: boolean = false;
  @Select(AuthState.getUser) user$!: Observable<User>;
  @Select(AuthState.getPostAuthors) PostAuthors$!: Observable<any>;

  @Select(CommentState.getComments) comments$!: Observable<Comments[]>;
  constructor(private store: Store, private commentService: CommentService) {}
  deletePost(postId: string | undefined) {
    this.store.dispatch(new DeletePost(postId));
    this.commentService.deletePostComment(postId).subscribe(
      (value: any) => {
        console.log(value);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  deleteComment(id: string | undefined) {
    this.store.dispatch(new DeleteComment(id));
  }

  handleOpenCommentBox() {
    this.isCommentBoxOpen = !this.isCommentBoxOpen;
  }
  handleCommentSubmit(postId: string | undefined) {
    console.log(postId, this.comment);
    this.store.dispatch(
      new CreateComment({
        postId,
        comment: this.comment,
      })
    );
    this.comment = '';
  }
}
