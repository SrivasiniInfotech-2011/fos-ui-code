import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvrHirerMasterComponent } from './fvr-hirer-master.component';

describe('FvrHirerMasterComponent', () => {
  let component: FvrHirerMasterComponent;
  let fixture: ComponentFixture<FvrHirerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FvrHirerMasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FvrHirerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
