import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { SetUsers, SignInUser, User } from 'src/app/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faArrowRightFromBracket = faArrowRightFromBracket;
  faArrowRightToBracket = faArrowRightToBracket;
  user: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}
  public getData(key: string) {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    return localStorage.removeItem(key);
  }

  ngDoCheck() {
    let data: User = JSON.parse(`${this.getData('access-token')}`);
    this.user = data === null ? false : true;
    // this.user && this.store.dispatch(new SetUsers(data));
  }
  ngOnInit() {
    let data: User = JSON.parse(`${this.getData('access-token')}`);
    this.user = data === null ? false : true;
    this.user && this.store.dispatch(new SetUsers(data));
    // console.log(this.name);
    this.user && this.router.navigate(['']);
    !this.user && this.router.navigate(['login']);
  }

  logout() {
    this.removeData('access-token');
    this.router.navigate(['login']);
  }
}
