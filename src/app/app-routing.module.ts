import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";

import { AuthGuard } from "./core/auth.guard";

// Pages
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { MqttDashComponent } from "./mqtt-dash/mqtt-dash.component";
import { BioMedComponent } from "./bio-med/bio-med.component";
import { LoggerComponent } from "./logger/logger.component";
import { EspDashComponent } from "./esp-dash/esp-dash.component";
import { EspMeterComponent } from "./esp-meter/esp-meter.component";

import { LoraMapComponent } from "./lora-map/lora-map.component";
import { UsersComponent } from "./users/users.component";
import { AddUserComponent } from "./add-user/add-user.component";

const appRoutes: Routes = [
  {
    path: "",
    component: MqttDashComponent
  },
  {
    path: "espdash",
    component: EspDashComponent
  },
  {
    path: "espmeter",
    component: EspMeterComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "add-user",
    component: AddUserComponent
  }
  // {
  //   path: "ciet/home",
  //   component: HomeComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: "ciet",
  //   component: LoginComponent
  // },
  // {
  //   path: "",
  //   component: MqttDashComponent
  // }
  // {
  //   path: "ciet/logger",
  //   component: LoggerComponent,
  //   canActivate: [AuthGuard]
  // }

  // {
  //   path: "home",
  //   component: BioMedComponent
  // },

  // {
  //   path: "",
  //   component: LoraMapComponent
  // }
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
