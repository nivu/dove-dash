import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BioMedComponent } from './bio-med.component';

describe('BioMedComponent', () => {
  let component: BioMedComponent;
  let fixture: ComponentFixture<BioMedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioMedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
