import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RouterModule, Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { UnauthorizeUserComponent } from './components/unauthorize-user/unauthorize-user.component';
import { UnauthorizedHeaderComponent } from './components/unauthorized-header/unauthorized-header.component';
import { UnauthorizedNavBarComponent } from './components/unauthorized-nav-bar/unauthorized-nav-bar.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';

const childrenRoutes : Routes = [
  {path: "logIn", component: LogInComponent},
  {path: "register", component: RegisterComponent}
]

const routes: Routes = [
  {path: "unauthorizedUser", component: UnauthorizeUserComponent, children: childrenRoutes},
  {path: "", redirectTo: "/unauthorizedUser", pathMatch: "full"}
]

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizeUserComponent,
    UnauthorizedHeaderComponent,
    UnauthorizedNavBarComponent,
    LogInComponent,
    RegisterComponent
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
