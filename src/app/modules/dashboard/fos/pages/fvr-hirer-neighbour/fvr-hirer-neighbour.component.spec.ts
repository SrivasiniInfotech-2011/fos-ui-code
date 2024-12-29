import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvrHirerNeighbourComponent } from './fvr-hirer-neighbour.component';

describe('FvrHirerNeighbourComponent', () => {
  let component: FvrHirerNeighbourComponent;
  let fixture: ComponentFixture<FvrHirerNeighbourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FvrHirerNeighbourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FvrHirerNeighbourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
