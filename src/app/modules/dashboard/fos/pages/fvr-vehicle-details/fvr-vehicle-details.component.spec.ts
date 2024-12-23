import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvrVehicleDetailsComponent } from './fvr-vehicle-details.component';

describe('FvrVehicleDetailsComponent', () => {
  let component: FvrVehicleDetailsComponent;
  let fixture: ComponentFixture<FvrVehicleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FvrVehicleDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FvrVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
