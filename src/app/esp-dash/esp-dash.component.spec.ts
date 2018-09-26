import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspDashComponent } from './esp-dash.component';

describe('EspDashComponent', () => {
  let component: EspDashComponent;
  let fixture: ComponentFixture<EspDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
