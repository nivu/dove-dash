import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoraMapComponent } from './lora-map.component';

describe('LoraMapComponent', () => {
  let component: LoraMapComponent;
  let fixture: ComponentFixture<LoraMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoraMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoraMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
