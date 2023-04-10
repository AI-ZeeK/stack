import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';
  homeLoad: boolean = false;
  loadOnce: boolean = true;
  ngOnInit() {
    this.homeLoad = true;
    setTimeout(() => {
      this.homeLoad = false;
      this.loadOnce = false;
    }, 5000);
  }
}
