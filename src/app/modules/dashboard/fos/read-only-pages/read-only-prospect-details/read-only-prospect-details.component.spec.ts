import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyProspectDetailsComponent } from './read-only-prospect-details.component';

describe('ReadOnlyProspectDetailsComponent', () => {
  let component: ReadOnlyProspectDetailsComponent;
  let fixture: ComponentFixture<ReadOnlyProspectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyProspectDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyProspectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
