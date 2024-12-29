import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvrNeighbourComponent } from './fvr-neighbour.component';

describe('FvrNeighbourComponent', () => {
  let component: FvrNeighbourComponent;
  let fixture: ComponentFixture<FvrNeighbourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FvrNeighbourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FvrNeighbourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
