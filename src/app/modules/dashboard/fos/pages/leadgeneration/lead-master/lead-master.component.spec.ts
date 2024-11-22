import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadMasterComponent } from './lead-master.component';

describe('LeadMasterComponent', () => {
  let component: LeadMasterComponent;
  let fixture: ComponentFixture<LeadMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
