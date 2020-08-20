import { Component, OnInit } from "@angular/core";
import { IMqttMessage, MqttService } from "ngx-mqtt";

@Component({
  selector: "app-esp-meter",
  templateUrl: "./esp-meter.component.html",
  styleUrls: ["./esp-meter.component.scss"],
})
export class EspMeterComponent implements OnInit {
  public message: string;
  incoming;
  duplicate = false;
  mqPackets = new Array();
  i = 0;

  public canvasWidth = 300;
  public needleValue = 5;
  public centralLabel = "";
  public name = "Gauge chart";
  public bottomLabel = "5";
  public options = {
    hasNeedle: true,
    needleColor: "gray",
    needleUpdateSpeed: 100,
    arcColors: ["rgb(44, 151, 222)", "lightgray"],
    arcDelimiters: [30],
    rangeLabel: ["0", "10"],
    needleStartValue: 0,
  };

  // mosquitto_pub -h mqtt.eclipse.org -p 1883 -t kt-data/1 -m '{"node":1, "pin":1, "value":1}'

  // hive mqtt
  // mosquitto_pub -h broker.hivemq.com -p 1883 -t kt-data/1 -m '{"node":1, "pin":1, "value":1}'
  // mosquitto_sub -h broker.hivemq.com -p 1883 -t "kt-data/+" -v
  // mosquitto_pub -h broker.hivemq.com -p 1883 -t kt-control -m '1'

  constructor(private _mqttService: MqttService) {
    this._mqttService
      .observe("kt-data/#")
      .subscribe((message: IMqttMessage) => {
        this.message = message.payload.toString();
        console.log(this.message);
        this.incoming = JSON.parse(message.payload.toString());

        this.duplicate = false;

        if (this.mqPackets.length > 0) {
          for (this.i = 0; this.i < this.mqPackets.length; this.i++) {
            if (this.mqPackets[this.i].node === this.incoming.node) {
              this.mqPackets[this.i].node = this.incoming.node;
              this.mqPackets[this.i].pin = this.incoming.pin;
              this.mqPackets[this.i].value = parseInt(this.incoming.value);
              this.mqPackets[this.i].count += 1;
              this.duplicate = true;
            }
          }
          if (!this.duplicate) {
            this.incoming.count = 1;
            this.mqPackets.push(this.incoming);
          }
        } else {
          this.incoming.count = 1;
          this.mqPackets.push(this.incoming);
        }
      });
  }

  directDownLink(node, val) {
    this.unsafePublish("kt-control/n" + node, val);
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {
      qos: 1,
      retain: true,
    });
  }

  ngOnInit() {}
}
