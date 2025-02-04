import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyBmApprovalMasterComponent } from './read-only-bm-approval-master.component';

describe('ReadOnlyBmApprovalMasterComponent', () => {
  let component: ReadOnlyBmApprovalMasterComponent;
  let fixture: ComponentFixture<ReadOnlyBmApprovalMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyBmApprovalMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyBmApprovalMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
