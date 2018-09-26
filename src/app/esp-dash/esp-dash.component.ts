import { Component, OnInit } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";

@Component({
  selector: "app-esp-dash",
  templateUrl: "./esp-dash.component.html",
  styleUrls: ["./esp-dash.component.css"]
})
export class EspDashComponent implements OnInit {
  public message: string;
  incoming;
  duplicate = false;

  constructor(private _mqttService: MqttService) {
    this._mqttService.observe("#").subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      this.incoming = JSON.parse(message.payload.toString());

      this.duplicate = false;
    });
  }

  ngOnInit() {}
}
