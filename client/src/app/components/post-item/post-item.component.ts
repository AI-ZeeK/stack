import { Component, Input } from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { postType } from 'src/app/pages/dashboard/dashboard.component';
import { AuthState, DeletePost, Post, User } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {
  @Input() post!: Post;
  faClose = faClose;
  @Select(AuthState.getUser) user$!: Observable<User>;
  constructor(private store: Store) {}
  deletePost(postId: string | undefined) {
    this.store.dispatch(new DeletePost(postId));
  }
}
