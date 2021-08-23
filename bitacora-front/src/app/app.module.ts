import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';//para peticiones http
import { FormsModule } from '@angular/forms';//para forms

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import { LogsComponent } from './components/logs/logs.component';

import { ReportService } from './services/reportService';
import { UserService } from './services/userService';
import { ChargeLogsComponent } from './components/charge-logs/charge-logs.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './components/details/details.component';
import { AdminviewComponent } from './components/adminview/adminview.component';

//material
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LoginComponent,
    LogsComponent,
    ChargeLogsComponent,
    NavbarComponent,
    DetailsComponent,
    AdminviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [
    UserService,
    ReportService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
