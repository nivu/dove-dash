import { Component, OnInit } from "@angular/core";

import { MqttService, IMqttMessage } from "ngx-mqtt";

import { Observable } from "rxjs/Observable";

export type QoS = 0 | 1 | 2;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
}
@Component({
  selector: "app-lora-map",
  templateUrl: "./lora-map.component.html",
  styleUrls: ["./lora-map.component.scss"]
})
export class LoraMapComponent implements OnInit {
  public myOtherMessage$: Observable<IMqttMessage>;
  myMessage;
  incoming;
  zoom = 14;

  myMessage2;
  incoming2;

  markers: Marker[] = [
    {
      lat: 11.021015,
      lng: 76.937827,
      label: "0"
    }
  ];

  i = 0;

  lat = 11.021015;
  lng = 76.937827;

  loraPackets = new Array();
  duplicate = false;

  ngOnInit() {
    console.log("nginit");

    setTimeout(() => {
      this.markers.push({
        lat: 11.022115,
        lng: 76.938927,
        label: "1"
      });
    }, 5000);
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log("dragEnd", m, $event);
  }

  constructor(private mqtt: MqttService) {
    mqtt.connect();

    this.mqtt
      .observe("application/1/node/+/rx")
      .subscribe((message: IMqttMessage) => {
        this.myMessage = message.payload.toString();
        this.incoming = JSON.parse(message.payload.toString());
        //console.log(this.incoming);
        this.incoming.data = atob(this.incoming.data);
        const str: string = this.incoming.data.toString();

        // lat : 11021018 lng : 76937908
        console.log(str.substring(6, 13) + " a " + str.substring(21, 28));
        this.lat = parseFloat(str.substring(6, 8) + "." + str.substring(8, 13));
        this.lng = parseFloat(
          str.substring(21, 23) + "." + str.substring(23, 28)
        );

        this.markers.push({
          lat: this.lat,
          lng: this.lng,
          label: this.i.toString()
        });

        this.i++;

        console.log(this.lat);
        console.log(this.lng);
        console.log(this.incoming);

        this.loraPackets.push(this.incoming);

        /*
        this.duplicate = false;

        if (this.loraPackets.length > 0) {
          for (this.i = 0; this.i < this.loraPackets.length; this.i++) {
            if (
              this.loraPackets[this.i].deviceName === this.incoming.deviceName
            ) {
              this.loraPackets[this.i].data = this.incoming.data;
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

        */
      });
    this.myOtherMessage$ = this.mqtt.observe("#");
    this.myOtherMessage$.subscribe((message: IMqttMessage) => {
      this.myMessage2 = message.payload.toString();
      this.incoming2 = JSON.parse(message.payload.toString());
      console.log(this.incoming2);
    });
  }

  public unsafePublish(topic: string, message: string): void {
    this.mqtt.unsafePublish(topic, message, {
      qos: 1,
      retain: true
    });
  }

  public publish(
    topic: string,
    message: string,
    retain = false,
    qos: QoS = 0
  ): void {
    this.mqtt
      .publish(topic, message, {
        retain,
        qos
      })
      .subscribe(err => console.log(err));
  }
}
