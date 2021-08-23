import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from "./components/signin/signin.component";
import { LoginComponent } from "./components/login/login.component";
import { LogsComponent} from "./components/logs/logs.component";
import { ChargeLogsComponent } from "./components/charge-logs/charge-logs.component"
import { DetailsComponent } from './components/details/details.component';
import { AdminviewComponent } from './components/adminview/adminview.component';

const routes: Routes = [
  {path:'signIn',component:SigninComponent},
  {path:'logIn',component:LoginComponent},
  {path:'logs',component:LogsComponent},
  {path:'charge-logs',component:ChargeLogsComponent},
  {path:'details/:_id',component:DetailsComponent},
  {path:'analistas',component:AdminviewComponent},
  {path:'**',redirectTo:'/signIn'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
