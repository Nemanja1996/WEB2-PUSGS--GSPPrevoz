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
import { ScheduleHttpService, AddScheduleHttpService, ChangeScheduleHttpService, DeleteScheduleHttpService } from './services/schedule/schedule.service';
import { CatalogueHttpService } from './services/catalogue/catalogue.service';
import { DepartureHttpService } from './services/schedule/departure.service';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminNavBarComponent } from './components/admin-nav-bar/admin-nav-bar.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminScheduleComponent } from './components/admin-schedule/admin-schedule.component';
import { AdminLinesGridComponent } from './components/admin-lines-grid/admin-lines-grid.component';
import { AdminVehicleLocationComponent } from './components/admin-vehicle-location/admin-vehicle-location.component';
import { AdminPricelistComponent } from './components/admin-pricelist/admin-pricelist.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { TimeTicketHttpService } from './services/ticket/timeTicket.service';
import { AddScheduleComponent } from './components/add-schedule/add-schedule.component';
import { DeleteScheduleComponent } from './components/delete-schedule/delete-schedule.component';
import { ChangeScheduleComponent } from './components/change-schedule/change-schedule.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AddStationComponent } from './components/add-station/add-station.component';
import { StationsComponent } from './components/stations/stations.component';
import { ApplicationUserHttpService, RegisterApplicationUserHttpService } from './services/user/user.service';
import { AgmCoreModule } from '@agm/core';
import { GetAllStationsHttpService } from './services/station/station.service';

const childrenRoutes : Routes = [
  {path: "logIn", component: LogInComponent},
  {path: "register", component: RegisterComponent},
  {path: "schedule", component: ScheduleComponent},
  {path: "linesGrid", component: LinesGridComponent},
  {path: "vehicleLocation", component: VehicleLocationComponent},
  {path: "priceList", component: PriceListComponent},
  {path: "buyTicket", component: BuyTicketComponent}
]

const childrenRoutesAdmin : Routes = [
  {path: "login", component: LogInComponent},
  {path: "schedule", component: AdminScheduleComponent},
  {path: "linesGrid", component: AdminLinesGridComponent},
  {path: "vehicleLocation", component: AdminVehicleLocationComponent},
  {path: "priceList", component: AdminPricelistComponent},
  {path: "deleteSchedule", component: DeleteScheduleComponent},
  {path: "addSchedule", component: AddScheduleComponent},
  {path: "changeSchedule", component: ChangeScheduleComponent},
  {path: "profile", component: AdminProfileComponent},
  {path: "stations", component: StationsComponent}
  
]

const routes: Routes = [
  {path: "unauthorizedUser", component: UnauthorizeUserComponent, children: childrenRoutes},
  {path: "admin", component: AdminComponent, canActivate: [AuthGuard], children: childrenRoutesAdmin},
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
    PriceListComponent,
    AdminComponent,
    AdminHeaderComponent,
    AdminNavBarComponent,
    AdminScheduleComponent,
    AdminLinesGridComponent,
    AdminVehicleLocationComponent,
    AdminPricelistComponent,
    BuyTicketComponent,
    AddScheduleComponent,
    DeleteScheduleComponent,
    ChangeScheduleComponent,
    AdminProfileComponent,
    AddStationComponent,
    StationsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, AuthService, ScheduleHttpService, CatalogueHttpService, DepartureHttpService, TimeTicketHttpService, AddScheduleHttpService, ChangeScheduleHttpService, DeleteScheduleHttpService, ApplicationUserHttpService, RegisterApplicationUserHttpService, GetAllStationsHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }


