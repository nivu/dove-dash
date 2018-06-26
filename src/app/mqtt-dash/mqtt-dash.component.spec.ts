import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MqttDashComponent } from './mqtt-dash.component';

describe('MqttDashComponent', () => {
  let component: MqttDashComponent;
  let fixture: ComponentFixture<MqttDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MqttDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MqttDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
