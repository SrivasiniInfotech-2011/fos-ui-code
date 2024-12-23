import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvrObservationComponent } from './fvr-observation.component';

describe('FvrObservationComponent', () => {
  let component: FvrObservationComponent;
  let fixture: ComponentFixture<FvrObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FvrObservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FvrObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
