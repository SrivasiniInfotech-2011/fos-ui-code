import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadProspectDetailComponent } from './lead-prospect-detail.component';

describe('LeadProspectDetailComponent', () => {
  let component: LeadProspectDetailComponent;
  let fixture: ComponentFixture<LeadProspectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadProspectDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadProspectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
