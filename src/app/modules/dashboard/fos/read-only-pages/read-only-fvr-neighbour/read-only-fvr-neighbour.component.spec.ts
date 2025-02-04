import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyFvrNeighbourComponent } from './read-only-fvr-neighbour.component';

describe('ReadOnlyFvrNeighbourComponent', () => {
  let component: ReadOnlyFvrNeighbourComponent;
  let fixture: ComponentFixture<ReadOnlyFvrNeighbourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyFvrNeighbourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyFvrNeighbourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
