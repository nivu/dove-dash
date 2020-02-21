import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// App, Core and Routing Module
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { AuthGuard } from "./core/auth.guard";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
//import { config } from "../environments/config";

/* Angular Material*/
import { CustomMaterialModule } from "./core/custom-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

/* Pages */
import { HomeComponent } from "./home/home.component";
import { MqttDashComponent } from "./mqtt-dash/mqtt-dash.component";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./login/login.component";
import { DoveSnackbarComponent } from "./dove-snackbar/dove-snackbar.component";

/* http, rjx */
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

/* Gauge Plugin */
import { NgxGaugeModule } from "ngx-gauge";

import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { LoggerComponent } from "./logger/logger.component";
import { EspDashComponent } from "./esp-dash/esp-dash.component";
import { EspMeterComponent } from "./esp-meter/esp-meter.component";

import { BioMedComponent } from "./bio-med/bio-med.component";
import { LoraMapComponent } from "./lora-map/lora-map.component";

import { AgmCoreModule } from "@agm/core";
import { UsersComponent } from "./users/users.component";
import { AddUserComponent } from "./add-user/add-user.component";

// cloud mqtt broker free
// https://diyprojects.io/8-online-mqtt-brokers-iot-connected-objects-cloud#.XQeVObwzZnI
// HiveMq = host -> broker.hivemq.com, ws port -> 8000, tcp port -> 1883,
// Mosquitto =  host -> iot.eclipse.org, ws port -> 1883 / 8883, tcp port -> X,

// export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
//   hostname: "broker.hivemq.com", // "192.168.1.100",
//   port: 8000,
//   path: "/mqtt" //"/ws"
// };

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  //hostname: "192.168.43.216", // "192.168.1.100",
  hostname: "192.168.0.103", // "192.168.1.100",
  port: 1884,
  path: "/ws" //"/ws"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MqttDashComponent,
    AboutComponent,
    LoginComponent,
    LoggerComponent,
    DoveSnackbarComponent,
    EspDashComponent,
    EspMeterComponent,
    BioMedComponent,
    LoraMapComponent,
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AgmCoreModule.forRoot({
      apiKey: ""
    }),
    HttpModule,
    HttpClientModule,
    NgxGaugeModule,
    FormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [DoveSnackbarComponent]
})
export class AppModule {}
