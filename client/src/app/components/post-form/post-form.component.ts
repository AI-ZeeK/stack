import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreatePost, User } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
  title!: string;
  content!: string;
  constructor(private store: Store) {}
  handleCreatePost() {
    let data: User = JSON.parse(`${this.getData('access-token')}`);

    console.log(this.title, this.content);
    this.store.dispatch(
      new CreatePost({
        title: this.title,
        content: this.content,
        authorId: data.id,
      })
    );
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
}
