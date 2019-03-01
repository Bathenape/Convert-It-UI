import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ViewRecordsComponent } from './view-records/view-records.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'landingpage', component: LandingPageComponent},
  {path: 'viewrecords', component: ViewRecordsComponent},
  {path: 'settings', component: SettingsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
