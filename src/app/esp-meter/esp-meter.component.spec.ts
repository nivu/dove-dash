import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EspMeterComponent } from "./esp-meter.component";

describe("EspMeterComponent", () => {
  let component: EspMeterComponent;
  let fixture: ComponentFixture<EspMeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EspMeterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
