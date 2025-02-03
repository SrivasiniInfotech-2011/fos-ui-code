import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyLoanDetailsComponent } from './read-only-loan-details.component';

describe('ReadOnlyLoanDetailsComponent', () => {
  let component: ReadOnlyLoanDetailsComponent;
  let fixture: ComponentFixture<ReadOnlyLoanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyLoanDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyLoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
