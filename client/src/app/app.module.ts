import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { HeaderComponent } from './components/header/header.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CounterState } from './store/store.actions';
import { AuthState } from './store/auth.actions';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { CommentState } from './store/comments.action';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    PostItemComponent,
    HeaderComponent,
    PostFormComponent,
    CommentBoxComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([CounterState, AuthState, CommentState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [AuthService, PostService, CommentState],
  bootstrap: [AppComponent],
})
export class AppModule {}
