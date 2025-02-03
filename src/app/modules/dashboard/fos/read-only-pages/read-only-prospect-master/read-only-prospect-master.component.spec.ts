import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOnlyProspectMasterComponent } from './read-only-prospect-master.component';

describe('ReadOnlyProspectMasterComponent', () => {
  let component: ReadOnlyProspectMasterComponent;
  let fixture: ComponentFixture<ReadOnlyProspectMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadOnlyProspectMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadOnlyProspectMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
