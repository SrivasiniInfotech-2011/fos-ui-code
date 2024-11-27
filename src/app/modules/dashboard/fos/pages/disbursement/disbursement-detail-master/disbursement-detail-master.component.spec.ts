import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisbursementDetailMasterComponent } from './disbursement-detail-master.component';

describe('DisbursementDetailMasterComponent', () => {
  let component: DisbursementDetailMasterComponent;
  let fixture: ComponentFixture<DisbursementDetailMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisbursementDetailMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisbursementDetailMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
