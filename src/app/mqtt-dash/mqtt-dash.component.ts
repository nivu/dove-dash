import { Component, OnInit } from '@angular/core';
import {
  IMqttMessage,
  MqttService
} from 'ngx-mqtt';

@Component({
  selector: 'app-mqtt-dash',
  templateUrl: './mqtt-dash.component.html',
  styleUrls: ['./mqtt-dash.component.css']
})
export class MqttDashComponent implements OnInit {

  public message: string;
  incoming;
  loraPackets = new Array();
  duplicate = false;
  i = 0;

  downData = {
    "reference": "abcd1234",                  // reference which will be used on ack or error (this can be a random string)
    "confirmed": true,                        // whether the payload must be sent as confirmed data down or not
    "fPort": 10,
    "data": "MA==",                            // FPort to use (must be > 0)
  }

  constructor(private _mqttService: MqttService) {
    this._mqttService.observe('application/1/node/+/rx').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      this.incoming = JSON.parse(message.payload.toString());
      //console.log(this.incoming);
      this.incoming.data = atob(this.incoming.data);

      this.duplicate = false;

      if (this.loraPackets.length > 0) {
        for (this.i = 0; this.i < this.loraPackets.length; this.i++) {
          if (this.loraPackets[this.i].deviceName === this.incoming.deviceName) {
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

      this.sendDownLink(this.incoming.data);
    });
  }

  sendDownLink(data) {
    console.log(data);
    var dataArray = data.split(',');
    if (dataArray.length == 2) {

      var dlNode = 'application/1/node/' + dataArray[0] + '/tx';
      var dlData = btoa(dataArray[1]);
      var dlPort = Math.floor(Math.random() * 244) + 1; // Random No 1 - 244 (!= 0)

      this.downData.data = dlData;
      this.downData.reference = '1234abcd' + dlPort;
      this.downData.fPort = dlPort;
      this.unsafePublish(dlNode, JSON.stringify(this.downData))
      console.log(this.downData);
    }
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  ngOnInit() {
  }

}


//application/1/node/0004a30b00200d67/rx
//application/2/node/+/rx
