import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { UnauthorizedUserComponent } from './unauthorized-user/unauthorized-user.component';
import { UnauthorizedHeaderComponent } from './unauthorized-header/unauthorized-header.component';
import { UnauthorizedNavBarComponent } from './unauthorized-nav-bar/unauthorized-nav-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './Interceptors/token.interceptor';

const routes: Routes = [
  {path: "", component: UnauthorizedUserComponent},
  {path: "unauthorizedUser", component: UnauthorizedUserComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedUserComponent,
    UnauthorizedHeaderComponent,
    UnauthorizedNavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
