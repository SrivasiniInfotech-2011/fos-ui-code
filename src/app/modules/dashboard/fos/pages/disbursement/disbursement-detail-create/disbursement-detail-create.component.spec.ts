import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementDetailCreateComponent } from './disbursement-detail-create.component';

describe('DisbursementDetailCreateComponent', () => {
  let component: DisbursementDetailCreateComponent;
  let fixture: ComponentFixture<DisbursementDetailCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisbursementDetailCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisbursementDetailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
