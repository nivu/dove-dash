import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";

import { AuthGuard } from "./core/auth.guard";

// Pages
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { MqttDashComponent } from "./mqtt-dash/mqtt-dash.component";
import { AboutComponent } from "./about/about.component";
import { LoggerComponent } from "./logger/logger.component";
import { EspDashComponent } from "./esp-dash/esp-dash.component";

const appRoutes: Routes = [
  {
    path: "ciet/home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "ciet",
    component: LoginComponent
  },
  /* {
  path: 'mqtt-dash',
  component: MqttDashComponent,
  canActivate: [AuthGuard]
},*/ {
    path: "ciet/logger",
    component: LoggerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "esp-dash",
    component: EspDashComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
