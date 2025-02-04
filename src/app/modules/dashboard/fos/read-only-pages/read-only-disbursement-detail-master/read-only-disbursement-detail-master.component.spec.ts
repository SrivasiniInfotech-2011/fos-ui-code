import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyDisbursementDetailMasterComponent } from './read-only-disbursement-detail-master.component';

describe('ReadOnlyDisbursementDetailMasterComponent', () => {
  let component: ReadOnlyDisbursementDetailMasterComponent;
  let fixture: ComponentFixture<ReadOnlyDisbursementDetailMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyDisbursementDetailMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyDisbursementDetailMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
