import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvrVehicleComponent } from './fvr-vehicle.component';

describe('FvrVehicleComponent', () => {
  let component: FvrVehicleComponent;
  let fixture: ComponentFixture<FvrVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FvrVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FvrVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
