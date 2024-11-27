import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmApprovalCreateComponent } from './bm-approval-create.component';

describe('BmApprovalCreateComponent', () => {
  let component: BmApprovalCreateComponent;
  let fixture: ComponentFixture<BmApprovalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BmApprovalCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BmApprovalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
