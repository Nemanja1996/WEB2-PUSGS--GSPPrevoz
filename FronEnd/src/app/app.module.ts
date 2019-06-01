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
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { LinesGridComponent } from './components/lines-grid/lines-grid.component';
import { VehicleLocationComponent } from './components/vehicle-location/vehicle-location.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { ScheduleHttpService } from './services/schedule/schedule.service';

const childrenRoutes : Routes = [
  {path: "logIn", component: LogInComponent},
  {path: "register", component: RegisterComponent},
  {path: "schedule", component: ScheduleComponent},
  {path: "linesGrid", component: LinesGridComponent},
  {path: "vehicleLocation", component: VehicleLocationComponent},
  {path: "priceList", component: PriceListComponent}
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
    RegisterComponent,
    ScheduleComponent,
    LinesGridComponent,
    VehicleLocationComponent,
    PriceListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}, AuthService, ScheduleHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }


