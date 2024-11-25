import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvrGuarantorComponent } from './fvr-guarantor.component';

describe('FvrGuarantorComponent', () => {
  let component: FvrGuarantorComponent;
  let fixture: ComponentFixture<FvrGuarantorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FvrGuarantorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FvrGuarantorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
