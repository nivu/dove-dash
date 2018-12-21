import { Component, OnInit } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";

@Component({
  selector: "app-esp-dash",
  templateUrl: "./esp-dash.component.html",
  styleUrls: ["./esp-dash.component.scss"]
})
export class EspDashComponent implements OnInit {
  public message: string;
  incoming;
  duplicate = false;
  loraPackets = new Array();
  i = 0;

  constructor(private _mqttService: MqttService) {
    this._mqttService.observe("data/#").subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      console.log(this.message);
      this.incoming = JSON.parse(message.payload.toString());

      this.duplicate = false;

      if (this.loraPackets.length > 0) {
        for (this.i = 0; this.i < this.loraPackets.length; this.i++) {
          if (this.loraPackets[this.i].node === this.incoming.node) {
            this.loraPackets[this.i].pin = this.incoming.pin;
            this.loraPackets[this.i].value = this.incoming.value;
            this.loraPackets[this.i].count += 1;
            this.duplicate = true;
          }
        }
        if (!this.duplicate) {
          this.incoming.count = 1;
          this.loraPackets.push(this.incoming);
        }
      } else {
        this.incoming.count = 1;
        this.loraPackets.push(this.incoming);
      }
    });
  }

  directDownLink(node, val) {
    this.unsafePublish("control/" + node, val);
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {
      qos: 1,
      retain: true
    });
  }

  ngOnInit() {}
}
