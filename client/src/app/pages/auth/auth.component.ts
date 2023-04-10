import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthState, SignInUser, User } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  faUserAlt = faUserAlt;
  password!: string;
  email!: string;

  userN = this.store.select((state) => state.users.user);
  @Select(AuthState.getUser) user$!: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}
  submitAuthForm() {
    console.log(this.password, this.email);
    this.store.dispatch(
      new SignInUser({ email: this.email, password: this.password })
    );
  }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
