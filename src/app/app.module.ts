import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// App, Core and Routing Module
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./core/core.module";
import { AuthGuard } from "./core/auth.guard";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { config } from "../environments/config";

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
import { Angular5Csv } from "angular5-csv/Angular5-csv";

import { MqttModule, IMqttServiceOptions } from "ngx-mqtt";
import { LoggerComponent } from "./logger/logger.component";
import { EspDashComponent } from "./esp-dash/esp-dash.component";
import { BioMedComponent } from "./bio-med/bio-med.component";
import { LoraMapComponent } from "./lora-map/lora-map.component";

import { AgmCoreModule } from "@agm/core";

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: "192.168.43.33",
  port: 1884,
  path: "/ws"
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
    BioMedComponent,
    LoraMapComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AgmCoreModule.forRoot({
      apiKey: config.mapApiKey
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
