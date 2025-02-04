import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyFvrHirerNeighbourComponent } from './read-only-fvr-hirer-neighbour.component';

describe('ReadOnlyFvrHirerNeighbourComponent', () => {
  let component: ReadOnlyFvrHirerNeighbourComponent;
  let fixture: ComponentFixture<ReadOnlyFvrHirerNeighbourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyFvrHirerNeighbourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyFvrHirerNeighbourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
