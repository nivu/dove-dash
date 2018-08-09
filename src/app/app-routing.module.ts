import {
  Routes,
  RouterModule
} from '@angular/router';

import {
  NgModule
} from '@angular/core';

import {
  AuthGuard
} from './core/auth.guard';

// Pages
import {
  LoginComponent
} from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MqttDashComponent } from './mqtt-dash/mqtt-dash.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'mqtt-dash',
  component: MqttDashComponent,
  //canActivate: [AuthGuard]
}, {
  path: 'about',
  component: AboutComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    enableTracing: false
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

