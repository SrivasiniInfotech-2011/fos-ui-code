import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmApprovalMasterComponent } from './bm-approval-master.component';

describe('BmApprovalMasterComponent', () => {
  let component: BmApprovalMasterComponent;
  let fixture: ComponentFixture<BmApprovalMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmApprovalMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmApprovalMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
