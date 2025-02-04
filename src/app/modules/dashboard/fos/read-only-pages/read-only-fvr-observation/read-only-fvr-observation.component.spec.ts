import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyFvrObservationComponent } from './read-only-fvr-observation.component';

describe('ReadOnlyFvrObservationComponent', () => {
  let component: ReadOnlyFvrObservationComponent;
  let fixture: ComponentFixture<ReadOnlyFvrObservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyFvrObservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyFvrObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
