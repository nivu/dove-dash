import { Component } from '@angular/core';
import {
  IMqttMessage,
  MqttService} from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public message: string;

  down = 'application/2/node/0004a30b001efbb2/tx';

  downData = {
    "reference": "abcd1234",                  // reference which will be used on ack or error (this can be a random string)
    "confirmed": true,                        // whether the payload must be sent as confirmed data down or not
    "fPort": 10,  
    "data":"MQ==",                            // FPort to use (must be > 0)
}

// "object": {                               // decoded object (when application coded has been configured)
//   "temperatureSensor": {"1": 25},       // when providing the 'object', you can omit 'data'
//   "humiditySensor": {"1": 32}
// }

  constructor(private _mqttService: MqttService) {
    this._mqttService.observe('application/2/node/+/rx').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
    });
  }

  sendDownLink(data){
    console.log(data)
    this.unsafePublish(this.down, JSON.stringify(this.downData))
  }


  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }
}

//application/1/node/0004a30b00200d67/rx
//application/2/node/+/rx