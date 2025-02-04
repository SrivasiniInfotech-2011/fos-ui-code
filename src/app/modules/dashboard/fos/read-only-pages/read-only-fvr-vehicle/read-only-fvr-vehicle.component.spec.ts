import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyFvrVehicleComponent } from './read-only-fvr-vehicle.component';

describe('ReadOnlyFvrVehicleComponent', () => {
  let component: ReadOnlyFvrVehicleComponent;
  let fixture: ComponentFixture<ReadOnlyFvrVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyFvrVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyFvrVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
