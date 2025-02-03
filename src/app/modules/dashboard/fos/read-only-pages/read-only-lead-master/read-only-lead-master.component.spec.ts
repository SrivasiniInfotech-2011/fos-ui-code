import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyLeadMasterComponent } from './read-only-lead-master.component';

describe('ReadOnlyLeadMasterComponent', () => {
  let component: ReadOnlyLeadMasterComponent;
  let fixture: ComponentFixture<ReadOnlyLeadMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyLeadMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyLeadMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
